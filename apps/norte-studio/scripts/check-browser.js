async (page) => {
  const base = __BASE__;
  const check = (ok, message) => { if (!ok) throw new Error(message); };
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(base);
  await page.evaluate(() => document.fonts.ready);
  for (const section of await page.locator('main > section').all()) await section.scrollIntoViewIfNeeded();
  await page.waitForFunction(() => [...document.images].every(i => i.complete && i.naturalWidth > 0));
  await page.evaluate(() => Promise.all([...document.images].map(img => img.decode())));
  const sections = await page.locator('main > section').evaluateAll(nodes => nodes.map(n => [n.id, n.offsetTop, n.offsetHeight]));
  const reference = [['chapter-0',358,780],['chapter-1',1138,594],['chapter-2',1732,1406],['chapter-3',3138,854],['chapter-4',4936,1428],['chapter-5',6364,2003],['chapter-6',8367,621],['chapter-7',8988,635]];
  for (const [i, expected] of reference.entries()) {
    check(sections[i][0] === expected[0] && Math.abs(sections[i][1] - expected[1]) <= 1 && Math.abs(sections[i][2] - expected[2]) <= 1, `Figma chapter geometry mismatch: ${JSON.stringify(sections[i])}`);
  }
  check(await page.evaluate(() => Math.abs(document.body.scrollHeight - 10491) <= 1), 'Figma full-page height mismatch');
  for (const [selector, width, height] of [['.prologue>img',1440,780],['#discipline-0 img',300,380],['.case-photo>img',352,450],['.door:nth-child(1) img',716,760],['.door:nth-child(2) img',358,420],['.door:nth-child(3) img',358,560],['.backstage>img',1440,820],['.partner img',620,340]]) {
    check(await page.locator(selector).evaluateAll((nodes, size) => nodes.every(n => Math.abs(n.getBoundingClientRect().width - size[0]) < 1 && Math.abs(n.getBoundingClientRect().height - size[1]) < 1), [width,height]), `Figma photo geometry mismatch: ${selector}`);
  }
  for (const [i, name] of ['Communication','Influence','Events','Content'].entries()) {
    const button = page.locator('.service-row').nth(i);
    if (await button.getAttribute('aria-expanded') !== 'true') await button.click();
    check(await button.getAttribute('aria-expanded') === 'true', `${name} did not open`);
    check(await page.locator('.service[data-open=true]').count() === 1, 'Accordion has multiple active disciplines');
    const photos = page.locator(`#discipline-${i} img`);
    check(await photos.count() === 5, `${name} has no five-image series`);
    check(await photos.evaluateAll(nodes => nodes.every(n => n.clientWidth === 300 && n.clientHeight === 380)), `${name} photo cards have the wrong size`);
    await page.waitForFunction(index => [...document.querySelectorAll(`#discipline-${index} img`)].every(img => img.complete && img.naturalWidth > 0), i);
    check(await photos.first().getAttribute('src').then(src => src.includes(i ? name.toLowerCase() : 'press')), `${name} has the wrong photo series`);
    await button.click();
    check(await button.getAttribute('aria-expanded') === 'false', `${name} did not close`);
    check(await page.locator(`#discipline-${i}`).evaluate(el => el.inert), 'Closed panel remains keyboard accessible');
  }
  await page.locator('.service-row').first().click();
  const widths = [320,375,390,640,768,1024,1280,1440,1920];
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Horizontal overflow at ${width}px`);
    check(await page.locator('.service-name').evaluateAll(nodes => nodes.every(el => el.scrollWidth <= el.clientWidth + 1)), `Discipline title clipped at ${width}px`);
    check(await page.locator('.wordmark h1,.footer-wordmark').evaluateAll(nodes => nodes.every(el => el.scrollWidth <= el.clientWidth + 1)), `Wordmark clipped at ${width}px`);
    await page.locator('.floating-menu').hover();
    check(await page.locator('.floating-menu').evaluate(el => {
      const bounds = el.getBoundingClientRect();
      return Math.abs(bounds.x + bounds.width / 2 - innerWidth / 2) < 1;
    }), `Menu moves away from viewport center on hover at ${width}px`);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: '[ Menu ]', exact: true }).click();
  check(await page.locator('dialog').evaluate(el => el.open), 'Menu did not open');
  await page.getByRole('navigation', { name: 'Chapter menu' }).getByRole('link', { name: /02 What we do/ }).click();
  check(await page.locator('dialog').count() === 0 && new URL(page.url()).hash === '#chapter-2', 'Chapter menu navigation failed');
  await page.getByRole('button', { name: '[ Menu ]', exact: true }).click();
  await page.keyboard.press('Escape');
  check(await page.locator('dialog').count() === 0, 'Escape did not close menu');
  check(await page.evaluate(() => document.activeElement.classList.contains('floating-menu')), 'Menu did not restore focus');
  await page.getByRole('button', { name: /Our journal/ }).click();
  check(await page.locator('.story-dialog').count() === 1, 'Journal did not open');
  await page.keyboard.press('Escape');
  await page.locator('#newsletter-email').fill('invalid');
  await page.getByRole('button', { name: '[ Send ]', exact: true }).click();
  check(await page.locator('#newsletter-email').evaluate(el => !el.validity.valid), 'Invalid email was accepted');
  await page.locator('#newsletter-email').fill('demo@example.com');
  await page.getByRole('button', { name: '[ Send ]', exact: true }).click();
  check(await page.getByRole('status').innerText().then(t => t.toLowerCase().includes('preview')), 'Newsletter preview status missing');
  await page.locator('.case-card').first().click();
  check(new URL(page.url()).pathname === '/work/aurora', 'TanStack case route failed');
  check(await page.getByRole('heading', { name: 'Aurora Skin — Launch campaign' }).count() === 1, 'Case content missing');
  await page.reload();
  check(await page.getByRole('heading', { name: 'Aurora Skin — Launch campaign' }).count() === 1, 'Direct case URL failed');
  await page.goto(base + '/work');
  check(await page.locator('.case-card').count() === 6, 'All work route missing cases');
  await page.goto(base + '/work/unknown');
  check(await page.getByRole('heading', { name: 'Case not found.' }).count() === 1, 'Unknown case has no fallback');
  await page.goto(base);
  check(await page.locator('.hero-statement').evaluate(el => getComputedStyle(el).animationName === 'none'), 'Reduced-motion hero still animates');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.reload();
  await page.locator('.floating-menu').hover();
  await page.waitForFunction(() => {
    const el = document.querySelector('.floating-menu');
    return el && el.getAnimations().every(animation => animation.playState === 'finished');
  });
  check(await page.locator('.floating-menu').evaluate(el => {
    const bounds = el.getBoundingClientRect();
    return Math.abs(bounds.x + bounds.width / 2 - innerWidth / 2) < 1;
  }), 'Animated menu hover loses viewport centering');
  await page.locator('.discipline-intro').scrollIntoViewIfNeeded();
  await page.waitForFunction(() => document.querySelector('.discipline-intro h2').classList.contains('is-visible'));
  check(await page.locator('.service-expansion').first().evaluate(el => parseFloat(getComputedStyle(el).transitionDuration) > 0), 'Accordion animation missing');
  check(errors.length === 0, `Browser errors: ${errors.join('; ')}`);
  return { result: 'PASS', checked: ['8 Figma chapter positions and heights','all 34 images','four accordion panels','exclusive selection and close','9 responsive widths','menu hover centering','menu navigation, Escape and focus','journal dialog','email validation and preview status','TanStack routes and direct reload','unknown case fallback','reduced motion','scroll reveal'], browserErrors: errors };
}
