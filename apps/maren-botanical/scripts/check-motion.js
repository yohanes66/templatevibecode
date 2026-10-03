async (page) => {
  const check = (value, message) => { if (!value) throw new Error(message) }
  try {
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.mouse.move(0, 0)
  await page.goto('http://127.0.0.1:3200/')
  const finalStats = ['+11%', '+7%', '−32%', '90%']
  check(JSON.stringify(await page.locator('.stats-grid .number-value').allTextContents()) === JSON.stringify(['+0%', '+0%', '−0%', '0%']), 'Stats started counting offscreen')
  await page.locator('#results').scrollIntoViewIfNeeded()
  await page.waitForFunction(() => document.querySelector('.stat .number-value').textContent !== '+0%')
  await page.waitForFunction(() => [...document.querySelectorAll('.stats-grid .number-value')].map(e => e.textContent).join('|') === '+11%|+7%|−32%|90%')
  await page.evaluate(() => scrollTo(0, 0))
  await page.locator('#results').scrollIntoViewIfNeeded()
  check(JSON.stringify(await page.locator('.stats-grid .number-value').allTextContents()) === JSON.stringify(finalStats), 'Stats replayed on subsequent appearances')
  check(await page.locator('.site-header').evaluate(e => e.getBoundingClientRect().top === 0 && getComputedStyle(e).position === 'sticky'), 'Header is not sticky')
  await page.reload()
  await page.locator('.ritual-images').scrollIntoViewIfNeeded()
  await page.waitForFunction(() => document.querySelector('#ritual').dataset.playing === 'true')
  check(await page.locator('.ritual-progress').count() === 0, 'Progress rail remains')
  check(await page.locator('.ritual-controls, .step-progress').count() === 0, 'Old controls or horizontal loaders remain')
  check(await page.locator('.ritual-step').first().evaluate(e => getComputedStyle(e).borderTopWidth === '0px'), 'The line above Cleanse remains')
  await page.locator('.ritual-heading').hover()
  for (const filename of ['ritual-condition.png', 'ritual-treat.png', 'ritual-cleanse.png']) {
    await page.waitForFunction(file => document.querySelector('.ritual-images img.active').getAttribute('src').endsWith(file), filename, { timeout: 5500 })
  }
  await page.waitForFunction(() => getComputedStyle(document.querySelector('.ritual-step[aria-pressed=true]')).backgroundColor !== getComputedStyle(document.querySelector('.ritual-step[aria-pressed=false]')).backgroundColor)
  check(await page.locator('#ritual').getAttribute('data-playing') === 'true', 'Hover stopped autoplay')
  await page.mouse.move(0, 0)
  await page.waitForFunction(() => document.querySelector('#ritual').dataset.playing === 'true')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.waitForFunction(() => document.querySelector('#ritual').dataset.playing === 'false')
  await page.setViewportSize({ width: 390, height: 844 })
  await page.locator('.ritual-images').scrollIntoViewIfNeeded()
  check(await page.locator('.ritual-caption').evaluate(e => {
    const caption = e.getBoundingClientRect(), image = e.parentElement.getBoundingClientRect()
    return getComputedStyle(e).display !== 'none' && caption.top >= image.top && caption.bottom <= image.bottom
  }), 'Mobile image and active description are not in the same card')
  await page.getByRole('button', { name: '02 Condition the lengths', exact: true }).click()
  check(await page.locator('.ritual-caption h3').textContent() === 'Condition the lengths', 'Mobile caption is not synchronized')
  check((await page.locator('.ritual-images img.active').getAttribute('src')).endsWith('ritual-condition.png'), 'Mobile image is not synchronized')
  await page.locator('.ritual-images').scrollIntoViewIfNeeded()
  await page.screenshot({ path: 'output/playwright/maren-ritual-mobile-updated.png' })
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.locator('.ritual-step').nth(1).hover()
  await page.waitForFunction(() => document.querySelector('#ritual').dataset.playing === 'true')
  await page.waitForFunction(() => document.querySelector('.ritual-caption h3').textContent === 'Treat the roots', null, { timeout: 8500 })
  check((await page.locator('.ritual-images img.active').getAttribute('src')).endsWith('ritual-treat.png'), 'Mobile autoplay did not synchronize the image')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  const height = await page.evaluate(() => document.documentElement.scrollHeight)
  await page.getByRole('button', { name: 'Menu', exact: true }).click()
  check(await page.locator('dialog').evaluate(e => e.matches(':modal') && e.classList.contains('bag-dialog')), 'Mobile menu is not the shared modal drawer')
  check(await page.locator('dialog').evaluate(e => e.getBoundingClientRect().height === innerHeight), 'Menu is not full height')
  check(await page.evaluate(() => document.documentElement.scrollHeight) === height, 'Menu displaced the page layout')
  await page.screenshot({ path: 'output/playwright/maren-menu-mobile.png' })
  await page.keyboard.press('Escape')
  check(await page.evaluate(() => document.activeElement.textContent.trim() === 'Menu'), 'Menu failed to restore focus')
  await page.getByRole('button', { name: 'Menu', exact: true }).click()
  await page.locator('#mobile-navigation').getByRole('link', { name: 'Ingredients', exact: true }).click()
  check(await page.locator('dialog').evaluate(e => !e.open), 'Navigation failed to dismiss menu')
  await page.waitForFunction(() => document.querySelector('#ingredients').getBoundingClientRect().top >= 72 && document.querySelector('#ingredients').getBoundingClientRect().top < 100)
  for (const width of [320,390,640,768,1024,1440]) {
    await page.setViewportSize({ width, height: 1000 })
    check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Overflow at ${width}px`)
    if (width <= 640) {
      for (let step = 0; step < 3; step++) {
        await page.locator('.ritual-step').nth(step).click()
        check(await page.evaluate(() => {
          const image = document.querySelector('.ritual-images').getBoundingClientRect()
          const nav = document.querySelector('.ritual-steps').getBoundingClientRect()
          const caption = document.querySelector('.ritual-caption').getBoundingClientRect()
          return nav.left >= image.left && nav.right <= image.right && nav.top >= image.top && nav.bottom <= image.bottom && nav.bottom < caption.top && [...document.querySelectorAll('.ritual-step')].every(e => e.getBoundingClientRect().width >= 44 && e.getBoundingClientRect().height >= 44)
        }), `Mobile indicators overlap or leave the image at ${width}px, step ${step + 1}`)
      }
    }
  }
  check(errors.length === 0, errors.join('; '))
  return { result: 'PASS', checked: ['count-up only on first appearance', 'autoplay 01 → 02 → 03 → 01 while hovered', 'no progress rail; distinct active step', 'no pause/count overlay or top separator', 'mobile autoplay with synchronized caption', 'mobile indicators inside the image with no overlap and 44px touch targets', 'reduced motion', 'sticky header', 'mobile image/caption synchronization', 'shared drawer geometry', 'Escape and focus restoration', 'anchor offset below header', 'six viewport widths'], browserErrors: errors }
  } finally {
    await page.emulateMedia({ reducedMotion: null })
  }
}
