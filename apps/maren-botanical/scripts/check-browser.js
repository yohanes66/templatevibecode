async (page) => {
  const check = (value, message) => { if (!value) throw new Error(message) }
  const base = 'http://127.0.0.1:3200'
  try {
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto(base)
  await page.evaluate(() => localStorage.removeItem('maren-bag'))
  await page.reload()
  await page.evaluate(() => document.fonts.ready)
  for (const section of await page.locator('main > div > section').all()) await section.scrollIntoViewIfNeeded()
  await page.waitForFunction(() => [...document.images].every(i => i.complete && i.naturalWidth > 0))
  for (const [width, height] of [[1024,600],[1280,650],[1440,780],[1512,820],[1728,980],[1920,900]]) {
    await page.setViewportSize({ width, height })
    await page.evaluate(() => scrollTo(0, 0))
    const geometry = await page.evaluate(() => {
      const header = document.querySelector('.site-header').getBoundingClientRect().height
      return {
        heroBottom: document.querySelector('.hero').getBoundingClientRect().bottom,
        trustBottom: document.querySelector('.trust-row').getBoundingClientRect().bottom,
        ritualBalanced: Math.abs(document.querySelector('.ritual-images').getBoundingClientRect().bottom - document.querySelector('.ritual-steps').getBoundingClientRect().bottom) < 2,
        productPhotosFill: [...document.querySelectorAll('.product-card')].every(e => Math.abs(e.clientWidth - e.querySelector('.product-image').clientWidth) < 2),
        undersized: [...document.querySelectorAll('.products')].filter(e => e.getBoundingClientRect().height < innerHeight - header - 1).map(e => e.classList[0]),
        cramped: [...document.querySelectorAll('.hero ~ section')].filter(e => parseFloat(getComputedStyle(e).paddingTop) < 64 || parseFloat(getComputedStyle(e).paddingBottom) < 64).map(e => e.classList[0]),
        clipped: [...document.querySelectorAll('.review-card, .story-card')].filter(e => e.matches('.story-card') ? e.querySelector('.story-copy').getBoundingClientRect().height > e.clientHeight + 1 : e.scrollHeight > e.clientHeight + 1).map(e => e.classList[0]),
      }
    })
    check(geometry.heroBottom <= height + 1 && geometry.trustBottom < height, `Hero statistics fall below the first viewport at ${width}×${height}`)
    check(geometry.ritualBalanced && geometry.productPhotosFill, `Unbalanced ritual or product photo width at ${width}×${height}`)
    check(geometry.undersized.length === 0, `Next section peeks into the viewport at ${width}×${height}: ${geometry.undersized.join(', ')}`)
    check(geometry.cramped.length === 0 && geometry.clipped.length === 0, `Cramped or clipped content at ${width}×${height}: ${[...geometry.cramped, ...geometry.clipped].join(', ')}`)
    await page.locator('#ritual').evaluate(e => e.scrollIntoView({ block: 'start' }))
    check(await page.locator('#ritual').evaluate(e => e.getBoundingClientRect().top >= document.querySelector('.site-header').getBoundingClientRect().height - 1), `Ritual heading is obscured by the sticky header at ${width}×${height}`)
  }
  await page.setViewportSize({ width: 1440, height: 1000 })
  for (const [number, filename] of [['02', 'ritual-condition.png'], ['03', 'ritual-treat.png'], ['01', 'ritual-cleanse.png']]) {
    await page.getByRole('button', { name: new RegExp('^' + number + ' ') }).click()
    check((await page.locator('.ritual-images img.active').getAttribute('src')).endsWith(filename), 'Wrong ritual image')
    check(await page.getByRole('button', { name: new RegExp('^' + number + ' ') }).getAttribute('aria-pressed') === 'true', 'Step selection is inaccessible')
  }
  await page.getByRole('button', { name: 'Next review', exact: true }).click()
  check(await page.locator('.review-card').first().innerText().then(t => t.includes('Sinta W.')), 'Review carousel did not advance')
  await page.getByRole('button', { name: 'Previous review', exact: true }).click()
  await page.getByRole('button', { name: 'Add Root Serum to bag', exact: true }).click()
  await page.getByRole('button', { name: 'Add Restore Shampoo to bag', exact: true }).click()
  await page.getByRole('button', { name: 'Bag (2)', exact: true }).click()
  check(await page.locator('.bag-total').innerText().then(t => t.includes('$102')), 'Incorrect bag subtotal')
  await page.getByRole('button', { name: 'Add one Root Serum', exact: true }).click()
  check(await page.locator('.bag-total').innerText().then(t => t.includes('$166')), 'Quantity update did not update subtotal')
  await page.getByRole('button', { name: 'Preview checkout →', exact: true }).click()
  check(await page.locator('.demo-note').innerText().then(t => t.includes('No payment')), 'Checkout preview is not clearly labeled')
  await page.keyboard.press('Escape')
  check(await page.evaluate(() => document.activeElement.textContent === 'Bag (3)'), 'Dialog did not restore focus')
  await page.reload()
  check(await page.getByRole('button', { name: 'Bag (3)', exact: true }).count() === 1, 'Cart did not persist')
  await page.getByRole('button', { name: 'Bag (3)', exact: true }).click()
  await page.getByRole('button', { name: 'Remove one Root Serum', exact: true }).click()
  await page.getByRole('button', { name: 'Remove one Root Serum', exact: true }).click()
  await page.getByRole('button', { name: 'Remove one Restore Shampoo', exact: true }).click()
  check(await page.locator('.empty-bag').count() === 1, 'Removing the last item did not empty the bag')
  await page.keyboard.press('Escape')
  await page.getByRole('button', { name: 'Search', exact: true }).click()
  await page.getByRole('searchbox', { name: 'Search products', exact: true }).fill('serum')
  check(await page.locator('.search-results > a').count() === 1, 'Search returned incorrect matches')
  await page.getByRole('searchbox').fill('no-such-product')
  check(await page.locator('.search-results').innerText().then(t => t.includes('No products found')), 'Search has no empty state')
  await page.getByRole('searchbox').fill('serum')
  await page.locator('.search-results > a').click()
  check(new URL(page.url()).pathname === '/products/root-serum', 'Product route is broken')
  check(await page.getByRole('heading', { name: 'Root Serum', exact: true }).count() === 1, 'Product content is missing')
  await page.goto(base + '/journal/a-single-leaf')
  check(await page.getByRole('heading', { name: 'Why every formula begins with a single leaf', exact: true }).count() === 1, 'Article route is broken')
  await page.goto(base + '/products/unknown')
  check(await page.getByRole('heading', { name: 'A little lost?', exact: true }).count() === 1, 'Unknown product has no 404')
  await page.goto(base)
  await page.getByRole('textbox', { name: 'Email address', exact: true }).fill('invalid')
  await page.getByRole('button', { name: 'Subscribe', exact: true }).click()
  check(await page.locator('#newsletter-email').evaluate(e => !e.validity.valid), 'Invalid email was accepted')
  await page.getByRole('textbox', { name: 'Email address', exact: true }).fill('demo@example.com')
  await page.getByRole('button', { name: 'Subscribe', exact: true }).click()
  check(await page.locator('.newsletter-status').innerText().then(t => t.includes('preview')), 'Newsletter preview is misleading')
  await page.reload()
  const widths = [320, 390, 640, 768, 1024, 1280, 1440, 1920]
  for (const width of widths) {
    await page.setViewportSize({ width, height: 1000 })
    check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Horizontal overflow at ${width}px`)
  }
  await page.setViewportSize({ width: 390, height: 844 })
  await page.getByRole('button', { name: 'Menu', exact: true }).click()
  check(await page.getByRole('button', { name: 'Menu', exact: true }).getAttribute('aria-expanded') === 'true', 'Mobile menu did not open')
  await page.locator('#mobile-navigation').getByRole('link', { name: 'Ingredients', exact: true }).click()
  check(await page.locator('#mobile-navigation').count() === 0, 'Mobile navigation did not close')
  check(new URL(page.url()).hash === '#ingredients', 'Mobile section navigation is broken')
  await page.goto(base)
  for (const section of await page.locator('main > div > section').all()) await section.scrollIntoViewIfNeeded()
  await page.waitForFunction(() => [...document.images].every(i => i.complete && i.naturalWidth > 0))
  await page.evaluate(() => scrollTo(0, 0))
  await page.screenshot({ path: 'output/playwright/maren-mobile.png', fullPage: true })
  check(await page.locator('.ticker-track').evaluate(e => getComputedStyle(e).animationName === 'none'), 'Reduced-motion ticker still animates')
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.reload()
  await page.locator('#ingredients').scrollIntoViewIfNeeded()
  await page.waitForFunction(() => document.querySelector('.ingredients-heading').classList.contains('is-revealed'))
  check(await page.locator('.ticker-track').evaluate(e => getComputedStyle(e).animationName === 'ticker'), 'Motion ticker is missing')
  check(errors.length === 0, 'Browser errors: ' + errors.join('; '))
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto(base)
  for (const section of await page.locator('main > div > section').all()) await section.scrollIntoViewIfNeeded()
  await page.waitForFunction(() => [...document.images].every(i => i.complete && i.naturalWidth > 0))
  await page.evaluate(() => scrollTo(0, 0))
  await page.screenshot({ path: 'output/playwright/maren-desktop.png', fullPage: true })
  await page.screenshot({ path: 'apps/maren-botanical/preview.jpg', type: 'jpeg', quality: 90 })
  return { result: 'PASS', checked: ['hero statistics visible in six laptop/desktop viewports', 'generous section spacing and no clipped cards', 'product section fills the area below the header', 'all 19 assets', 'three ritual images', 'reviews', 'cart totals and persistence', 'checkout preview', 'dialog focus and Escape', 'product search and empty state', 'product and journal routes', '404', 'email validation', 'mobile navigation', 'eight viewport widths', 'reduced motion', 'scroll reveal'], browserErrors: errors }
  } finally {
    await page.emulateMedia({ reducedMotion: null })
  }
}
