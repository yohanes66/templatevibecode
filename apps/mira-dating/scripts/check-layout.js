async (page) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(new URL('/', page.url()).href);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() => [...document.images].every(img => img.complete && img.naturalWidth));
  const widths = [320, 360, 375, 390, 600, 601, 744, 820, 900, 901, 1024, 1080, 1081, 1133, 1180, 1194, 1200, 1201, 1366, 1440, 1920];
  for (const width of widths) {
    await page.setViewportSize({ width, height: width === 744 ? 1133 : 900 });
    await page.waitForFunction(width => innerWidth === width && parseFloat(getComputedStyle(document.querySelector('.nav')).paddingLeft) === (width <= 600 ? 20 : width <= 1200 ? 64 : 120), width);
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    await page.waitForTimeout(100);
    await page.evaluate(() => {
      const pad = innerWidth <= 600 ? 20 : innerWidth <= 1200 ? 64 : 120;
      const check = (ok, message) => { if (!ok) throw new Error(`${innerWidth}px: ${message}`); };
      const close = (a, b) => Math.abs(a - b) < 1;
      const bounds = selector => document.querySelector(selector).getBoundingClientRect();
      check(document.documentElement.scrollWidth <= innerWidth, 'horizontal overflow');
      for (const selector of ['.nav', '.how', '.statement', '.privacy', '.stories', '.cta', '.footer']) {
        const style = getComputedStyle(document.querySelector(selector));
        check(close(parseFloat(style.paddingLeft), pad) && close(parseFloat(style.paddingRight), pad), `${selector} has different page padding`);
      }
      for (const selector of ['.how-intro', '.statement-media', '.privacy > .split-head', '.privacy > .grid-3', '.stories > .col', '.stories > .grid-3']) {
        const rect = bounds(selector);
        check(close(rect.left, pad) && close(innerWidth - rect.right, pad), `${selector} is off the page edges`);
      }
      check(close(bounds('.nav > .wordmark').left, pad), 'nav logo is misaligned');
      check(close(innerWidth - bounds('.nav-cta').right, pad), 'nav button is misaligned');
      check(close(bounds('.footer > .col').left, pad) && close(innerWidth - bounds('.footer-cols').right, pad), 'footer is misaligned');
      const hero = bounds('.hero-copy');
      check(close(hero.left, innerWidth - hero.right) && hero.width <= innerWidth - 2 * pad + 1, 'hero copy has uneven margins');
      if (innerWidth <= 1366) {
        check(close(bounds('.statement > h2').left, pad) && close(parseFloat(getComputedStyle(document.querySelector('.statement > h2')).paddingLeft), 0), 'statement title has extra inset');
      }
      const statement = document.querySelector('.statement img');
      const frame = bounds('.statement-media');
      const scale = Math.max(frame.width / statement.naturalWidth, frame.height / statement.naturalHeight);
      const visibleLeft = statement.naturalWidth - frame.width / scale;
      // The couple occupies source x=900..1780 in couple.webp.
      check(getComputedStyle(statement).objectPosition === '100% 50%' && getComputedStyle(statement).transform === 'none', 'statement photo loses its right focus or is zoomed');
      check(visibleLeft <= 900 && statement.naturalWidth >= 1780, 'statement photo crops the couple');
      const columns = [...document.querySelectorAll('.footer-cols > .col')].map(el => el.getBoundingClientRect());
      check(columns.every(rect => close(rect.top, columns[0].top)), 'footer columns are not aligned');
      for (const chapter of document.querySelectorAll('.chapter')) {
        const rect = chapter.getBoundingClientRect();
        check(close(rect.left, pad) && close(innerWidth - rect.right, pad), 'chapter has uneven margins');
        for (const card of chapter.querySelectorAll('.pop-card, .debrief, .v4-thread .bubble')) {
          const cardRect = card.getBoundingClientRect();
          check(cardRect.left >= rect.left && cardRect.right <= rect.right && cardRect.top >= rect.top && cardRect.bottom <= rect.bottom, `${card.className} escapes its chapter panel`);
          check(card.scrollWidth <= card.clientWidth + 1, `${card.className} clips its content`);
        }
        if (innerWidth <= 1080) {
          for (const child of chapter.querySelectorAll(':scope > .ch-text, :scope > .ch-visual')) {
            const childRect = child.getBoundingClientRect();
            check(close(childRect.left - rect.left, rect.right - childRect.right), 'stacked chapter content is not centered');
          }
          check(close(chapter.querySelector('.ch-text').getBoundingClientRect().width, chapter.querySelector('.ch-visual').getBoundingClientRect().width), 'chapter text and visual widths differ');
        }
      }
      const photo = bounds('.v2 .ph'), visual = bounds('.v2');
      check(close(photo.width, visual.width) && close(photo.left, visual.left) && close(photo.right, visual.right), 'chapter 02 photo must fill the visual at every width');
      for (const el of document.querySelectorAll('.ch-text h3, .pop-card, .pop-card .t-title, .pop-card .t-headline, .pop-card .btn, .pop-card .chip, .debrief, .debrief .t-headline, .debrief .chip, .cta h2, .footer a')) {
        check(el.scrollWidth <= el.clientWidth + 1, `${el.className || el.tagName} clips its content`);
      }
    });
  }
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.reload();
  for (const width of [1440, 390, 744, 1440, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.waitForTimeout(1500);
    await page.evaluate(() => {
      const rect = document.querySelector('.hero-copy').getBoundingClientRect();
      if (Math.abs(rect.left - (innerWidth - rect.right)) >= 1 || rect.left < 0) throw new Error(`${innerWidth}px: animated hero loses centering after resize`);
    });
  }
  for (const [width, height] of [[744, 1133], [1133, 744], [1366, 1024], [390, 844]]) {
    await page.setViewportSize({ width, height });
    await page.locator('.chapter').last().scrollIntoViewIfNeeded();
    await page.waitForTimeout(4000);
    await page.evaluate(() => {
      const panel = document.querySelector('.chapter:last-child').getBoundingClientRect();
      const card = document.querySelector('.debrief').getBoundingClientRect();
      if (card.left < panel.left || card.right > panel.right || card.bottom > panel.bottom) throw new Error(`${innerWidth}px: animated debrief escapes its chapter`);
      if (getComputedStyle(document.querySelector('.statement img')).transform !== 'none') throw new Error('Animated statement zooms or shifts its photo');
    });
  }
  if (errors.length) throw new Error(errors.join('\n'));
  return { result: 'PASS', widths, checks: 'page padding, chapter alignment, proportional cards and containment, photo width, couple framing without zoom, footer columns, text clipping, overflow, animated hero resize and debrief, browser errors' };
}
