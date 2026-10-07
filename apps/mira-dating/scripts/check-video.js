async (page) => {
  const base = new URL('/', page.url()).href;
  const errors = [];
  const requests = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('request', request => { if (request.url().includes('/videos/')) requests.push(request.url()); });
  const check = (ok, message) => { if (!ok) throw new Error(message); };
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(base);
  await page.waitForTimeout(300);
  check(requests.length === 0, 'Reduced motion downloads video');
  check(await page.locator('.hero-bg video').evaluate(el => !el.hasAttribute('src') && el.paused), 'Reduced motion enables video');
  check(await page.getByRole('button', { name: /background video/ }).count() === 0, 'Reduced motion exposes video control');
  for (const [width, height, variant] of [[390, 844, 'portrait'], [744, 1133, 'portrait'], [1440, 900, 'desktop']]) {
    await page.setViewportSize({ width, height });
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto(base);
    await page.waitForFunction(() => { const el = document.querySelector('.hero-bg video'); return !el.paused && el.readyState >= 3 && el.currentTime > 0; });
    check(await page.locator('.hero-bg video').evaluate((el, variant) => el.currentSrc.endsWith(`meadow-${variant}.mp4`) && el.muted && el.loop && el.playsInline && el.classList.contains('is-ready'), variant), `Wrong video configuration at ${width}px`);
    await page.evaluate(() => {
      const video = document.querySelector('.hero-bg video').getBoundingClientRect();
      const hero = document.querySelector('.hero').getBoundingClientRect();
      if (video.left > hero.left || video.right < hero.right || video.top > hero.top || video.bottom < hero.bottom) throw new Error('Video leaves hero edges exposed');
      const control = document.querySelector('.hero-video-toggle').getBoundingClientRect();
      for (const el of document.querySelectorAll('.hero-tag, .hero-title, .hero-sub, .hero-ctas, .float-card')) {
        if (!el.getClientRects().length) continue;
        const rect = el.getBoundingClientRect();
        if (control.left < rect.right && control.right > rect.left && control.top < rect.bottom && control.bottom > rect.top) throw new Error('Video control overlaps hero content');
      }
    });
    await page.getByRole('button', { name: 'Pause background video', exact: true }).click();
    await page.waitForFunction(() => document.querySelector('.hero-bg video').paused);
    check(await page.locator('.hero-bg video').evaluate(el => el.classList.contains('is-ready')), 'Manual pause loses the displayed frame');
    await page.getByRole('button', { name: 'Play background video', exact: true }).click();
    await page.waitForFunction(() => !document.querySelector('.hero-bg video').paused);
    await page.locator('.privacy').scrollIntoViewIfNeeded();
    await page.waitForFunction(() => document.querySelector('.hero-bg video').paused);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.waitForFunction(() => !document.querySelector('.hero-bg video').paused);
  }
  const source = await page.locator('.hero-bg video').getAttribute('src');
  requests.length = 0;
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(300);
  check(await page.locator('.hero-bg video').getAttribute('src') === source && requests.length === 0, 'Resize downloads a second video');
  await page.evaluate(() => { Object.defineProperty(document, 'hidden', { configurable: true, value: true }); document.dispatchEvent(new Event('visibilitychange')); });
  await page.waitForFunction(() => document.querySelector('.hero-bg video').paused);
  await page.evaluate(() => { delete document.hidden; document.dispatchEvent(new Event('visibilitychange')); });
  await page.waitForFunction(() => !document.querySelector('.hero-bg video').paused);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForFunction(() => !document.querySelector('.hero-bg video').hasAttribute('src'));
  check(await page.locator('.hero-bg video').evaluate(el => !el.classList.contains('is-ready')), 'Reduced motion does not restore the poster');
  for (const policy of ['save-data', 'blocked-autoplay']) {
    const testPage = await page.context().newPage();
    try {
      await testPage.emulateMedia({ reducedMotion: 'no-preference' });
      await testPage.addInitScript(policy => {
        if (policy === 'save-data') Object.defineProperty(navigator, 'connection', { configurable: true, value: Object.assign(new EventTarget(), { saveData: true }) });
        else HTMLMediaElement.prototype.play = () => Promise.reject(new DOMException('Blocked by browser policy', 'NotAllowedError'));
      }, policy);
      let downloaded = false;
      testPage.on('request', request => { if (request.url().includes('/videos/')) downloaded = true; });
      await testPage.goto(base);
      await testPage.waitForFunction(() => document.querySelector('.hero-bg img').complete && document.querySelector('.hero-bg img').naturalWidth > 0);
      if (policy === 'blocked-autoplay') await testPage.getByRole('button', { name: 'Play background video', exact: true }).waitFor();
      await testPage.waitForTimeout(300);
      check(await testPage.locator('.hero-bg video').evaluate(el => el.paused && !el.classList.contains('is-ready')), `${policy} does not preserve the poster`);
      if (policy === 'save-data') check(!downloaded, 'Save-Data downloads video');
    } finally { await testPage.close(); }
  }
  await page.route('**/videos/*.mp4', route => route.abort());
  try {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    const requested = page.waitForRequest('**/videos/*.mp4');
    await page.goto(base);
    await requested;
    await page.waitForFunction(() => { const el = document.querySelector('.hero-bg video'); return el.error !== null || !el.hasAttribute('src'); });
    check(await page.locator('.hero-bg video').evaluate(el => !el.classList.contains('is-ready')), 'Failed video hides poster');
    check(await page.locator('.hero-bg img').evaluate(el => el.complete && el.naturalWidth > 0), 'Failed video has no image fallback');
  } finally { await page.unroute('**/videos/*.mp4'); }
  check(errors.length === 0, errors.join('\n'));
  return { result: 'PASS', checks: 'responsive source and coverage, playback, manual pause, offscreen pause/resume, hidden tab, reduced motion, Save-Data, blocked autoplay, network failure, no second download on resize' };
}
