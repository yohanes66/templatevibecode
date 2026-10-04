async (previewPage) => {
  const context = await previewPage.context().browser().newContext();
  const page = await context.newPage();
  try {
  const check = (value, message) => {
    if (!value) throw new Error(message);
  };
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const base = "http://127.0.0.1:3200";
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(base);
  await page.evaluate(() => localStorage.removeItem("maren-bag"));
  await page.reload();
  await page.evaluate(() => document.fonts.ready);
  for (const section of await page
    .locator(".beauty-home > section, footer")
    .all())
    await section.scrollIntoViewIfNeeded();
  await page.waitForFunction(() =>
    [...document.images].every((img) => img.complete && img.naturalWidth > 0),
  );
  const colors = {
    Bare: "rgb(217, 180, 158)",
    Petal: "rgb(237, 184, 191)",
    Rosewood: "rgb(153, 84, 90)",
    Fig: "rgb(110, 52, 70)",
    Coral: "rgb(229, 138, 114)",
  };
  for (const [name, color] of Object.entries(colors)) {
    await page
      .getByRole("button", { name: "Shade: " + name, exact: true })
      .click();
    check(
      (await page.locator("#shades").getAttribute("data-shade")) === name,
      "Shade state is wrong: " + name,
    );
    check(
      (await page
        .locator("#shades")
        .evaluate((el) => getComputedStyle(el).backgroundColor)) === color,
      "Background does not match " + name,
    );
    check(
      (await page
        .getByRole("button", { name: "Shade: " + name, exact: true })
        .getAttribute("aria-pressed")) === "true",
      "Swatch has no selected state",
    );
    const active = await page
      .locator('.shade-product[data-active="true"]')
      .boundingBox();
    const stage = await page.locator(".shade-stage").boundingBox();
    check(
      Math.abs(active.x + active.width / 2 - stage.x - stage.width / 2) < 1,
      "Active product is not centered",
    );
    await page
      .getByRole("button", {
        name: "Add Cloud Tint " + name + " to bag",
        exact: true,
      })
      .click();
  }
  check(
    (await page.locator('.shade-product[aria-hidden="false"]').count()) === 5,
    "There must be exactly five accessible shades",
  );
  check(
    !(await page.getByRole("button", { name: "Next shade", exact: true }).isDisabled()),
    "Loop navigation is disabled",
  );
  await page.getByRole("button", { name: "Next shade", exact: true }).click();
  check((await page.locator("#shades").getAttribute("data-shade")) === "Bare", "Last shade did not loop to first");
  await page.getByRole("button", { name: "Shade: Bare", exact: true }).click();
  check(
    !(await page.getByRole("button", { name: "Previous shade", exact: true }).isDisabled()),
    "Previous loop navigation is disabled",
  );
  await page.getByRole("button", { name: "Previous shade", exact: true }).click();
  check((await page.locator("#shades").getAttribute("data-shade")) === "Coral", "First shade did not loop to last");
  await page.getByRole("button", { name: "Shade: Bare", exact: true }).click();
  await page.locator(".shade-stage").focus();
  await page.keyboard.press("ArrowRight");
  check(
    (await page.locator("#shades").getAttribute("data-shade")) === "Petal",
    "Keyboard navigation failed",
  );
  await page
    .getByRole("button", { name: "Select Bare shade", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Select Petal shade", exact: true })
    .click();
  check(
    (await page.locator("#shades").getAttribute("data-shade")) === "Petal",
    "Product click failed",
  );
  const box = await page.locator(".shade-stage").boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + 100);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width / 2 - 85, box.y + 102, { steps: 6 });
  await page.mouse.up();
  check(
    (await page.locator("#shades").getAttribute("data-shade")) === "Rosewood",
    "Drag failed",
  );
  await page.getByRole("button", { name: "Bag (5)", exact: true }).click();
  check(
    (await page.locator(".bag-total").innerText()).includes("$120"),
    "Bag subtotal is wrong",
  );
  check(
    (await page.locator(".bag-item").count()) === 5,
    "Shade variants did not stay separate",
  );
  await page
    .getByRole("button", { name: "Add one Cloud Tint — Bare", exact: true })
    .click();
  check(
    (await page.locator(".bag-total").innerText()).includes("$144"),
    "Quantity subtotal failed",
  );
  await page
    .getByRole("button", { name: "Preview checkout →", exact: true })
    .click();
  check(
    (await page.locator(".demo-note").innerText()).includes("No payment"),
    "Checkout preview is misleading",
  );
  await page.keyboard.press("Escape");
  check(
    await page.evaluate(() => document.activeElement.textContent === "Bag (6)"),
    "Bag did not restore focus",
  );
  await page.reload();
  check(
    (await page
      .getByRole("button", { name: "Bag (6)", exact: true })
      .count()) === 1,
    "Bag did not persist",
  );
  await page.getByRole("button", { name: "Search", exact: true }).click();
  await page.getByRole("searchbox").fill("barrier");
  check(
    (await page.locator(".search-results > a").count()) === 1,
    "Search filter failed",
  );
  await page.getByRole("searchbox").fill("not-a-product");
  check(
    (await page.locator(".search-results").innerText()).includes("No products"),
    "Search empty state missing",
  );
  await page.getByRole("searchbox").fill("barrier");
  await page.locator(".search-results > a").click();
  check(
    new URL(page.url()).pathname === "/products/barrier-mist",
    "Product link failed",
  );
  await page.getByText("How to use", { exact: true }).click();
  check(
    (await page.locator("details").first().innerText()).includes("Apply"),
    "Beauty product instructions crashed",
  );
  await page.goto(base + "/products/unknown");
  check(
    (await page
      .getByRole("heading", { name: "A little lost?", exact: true })
      .count()) === 1,
    "404 failed",
  );
  await page.goto(base);
  await page.getByRole("button", { name: /Subscribe & save Save 15%/ }).click();
  check(
    (await page
      .getByRole("button", { name: /Subscribe & save Save 15%/ })
      .getAttribute("aria-expanded")) === "true",
    "Rewards accordion failed",
  );
  check(
    (await page.locator("#reward-0").getAttribute("inert")) !== null,
    "Closed accordion remains focusable",
  );
  await page
    .getByRole("textbox", { name: "Email address", exact: true })
    .fill("invalid");
  await page.getByRole("button", { name: "Subscribe", exact: true }).click();
  check(
    await page
      .locator("#newsletter-email")
      .evaluate((el) => !el.validity.valid),
    "Email validation failed",
  );
  await page
    .getByRole("textbox", { name: "Email address", exact: true })
    .fill("demo@example.com");
  await page.getByRole("button", { name: "Subscribe", exact: true }).click();
  check(
    (
      await page.locator(".beauty-newsletter [role=status]").innerText()
    ).includes("preview"),
    "Newsletter status missing",
  );
  for (const width of [320, 390, 640, 768, 1024, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    check(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      "Horizontal overflow at " + width,
    );
    check(
      await page.locator("footer").evaluate((footer) => {
        const bounds = footer.getBoundingClientRect();
        return [...footer.querySelectorAll("a,input,button,p,h2,h3")]
          .filter((el) => !el.closest(".social-strip"))
          .every((el) => {
            const box = el.getBoundingClientRect();
            return (
              box.left >= 0 &&
              box.right <= innerWidth + 1 &&
              box.bottom <= bounds.bottom + 1
            );
          });
      }),
      "Footer content clipped at " + width,
    );
    check(await page.locator('.social-strip img').evaluateAll(images => images.every(image => Math.abs(image.clientWidth - image.clientHeight) <= 1)), "Footer image ratio changed at " + width);
    await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
    check(await page.locator('footer').evaluate(footer => Math.abs(footer.getBoundingClientRect().bottom - innerHeight) <= 1), "Space after footer at " + width);
    if (width >= 640)
      check(
        await page.locator(".shade-stage").evaluate((stage) => {
          const bounds = stage.getBoundingClientRect();
          return [...stage.querySelectorAll('.shade-product[aria-hidden="false"]')].every((el) => {
            const box = el.getBoundingClientRect();
            return box.left >= bounds.left && box.right <= bounds.right;
          });
        }),
        "Desktop product clipped at " + width,
      );
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => scrollTo(0, 0));
  await page.getByRole("button", { name: "Menu", exact: true }).click();
  await page
    .locator("#mobile-navigation")
    .getByRole("link", { name: "Lip", exact: true })
    .click();
  check(
    (await page.locator("#mobile-navigation").count()) === 0,
    "Menu did not close",
  );
  check(new URL(page.url()).hash === "#shades", "Mobile anchor failed");
  check(await page.evaluate(() => getComputedStyle(document.documentElement).overflow !== "hidden" && getComputedStyle(document.body).overflow !== "hidden"), "Closing menu leaves scrolling locked");
  check(
    await page
      .locator("#shades")
      .evaluate((el) => el.getBoundingClientRect().top >= 63),
    "Sticky header obscures anchor",
  );
  await page.getByRole("button", { name: "Shade: Fig", exact: true }).click();
  check(
    (await page
      .locator("#shades")
      .evaluate((el) => getComputedStyle(el).backgroundColor)) === colors.Fig,
    "Mobile shade background failed",
  );
  await page.screenshot({
    path: "output/playwright/maren-v5-shades-mobile.png",
  });
  await page.getByRole("button", { name: "Next set", exact: true }).click();
  check(
    (await page.locator(".sets-track").evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).m41)) < 0,
    "Mobile sets carousel failed",
  );
  await page.getByRole("button", { name: "Previous set", exact: true }).click();
  for (const section of await page
    .locator(".beauty-home > section, footer")
    .all())
    await section.scrollIntoViewIfNeeded();
  await page.waitForFunction(() =>
    [...document.images].every((img) => img.complete && img.naturalWidth > 0),
  );
  await page.evaluate(() => scrollTo(0, 0));
  await page.screenshot({
    path: "output/playwright/maren-v5-mobile.png",
    fullPage: true,
  });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.reload();
  await page.locator("#shades").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: "Shade: Bare", exact: true }).click();
  await page.waitForFunction(
    () =>
      getComputedStyle(document.querySelector("#shades")).backgroundColor ===
      "rgb(217, 180, 158)",
  );
  await page.waitForFunction(() => document.querySelector(".shade-track").getAnimations().length === 0);
  const track = page.locator(".shade-track");
  const checkTrackBounds = async () => check(await track.evaluate(el => {
    const bounds = el.getBoundingClientRect();
    return bounds.width > 0 && [...el.children].every(product => {
      const box = product.getBoundingClientRect();
      return box.left >= bounds.left - 1 && box.right <= bounds.right + 1;
    });
  }), "Shade products escape the animated track paint bounds");
  await checkTrackBounds();
  const before = await track.evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).m41);
  await page.getByRole("button", { name: "Next shade", exact: true }).click();
  await page.waitForFunction(start => new DOMMatrix(getComputedStyle(document.querySelector(".shade-track")).transform).m41 < start - 1, before);
  const middle = await track.evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).m41);
  check(middle > before - 115, "Product transition jumps instantly");
  await page.waitForFunction(
    () =>
      document.querySelector(".shade-track").getAnimations()
        .length === 0,
  );
  await page.getByRole("button", { name: "Shade: Fig", exact: true }).click();
  await page.getByRole("button", { name: "Shade: Coral", exact: true }).click();
  await page.waitForFunction(
    () =>
      getComputedStyle(document.querySelector("#shades")).backgroundColor ===
      "rgb(229, 138, 114)",
  );
  check(
    (await page.locator("#shades").getAttribute("data-shade")) === "Coral",
    "Rapid changes desynchronised",
  );
  await page.evaluate(() => { for (let index = 0; index < 12; index++) document.querySelector('[aria-label="Next shade"]').click(); });
  await checkTrackBounds();
  check(await page.locator('.shade-product img').evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0)), "Shade images are not ready during rapid clicks");
  check(await page.locator('.shade-product').evaluateAll(products => products.some(product => getComputedStyle(product).getPropertyValue('--offset').trim() === '0')), "In-flight shade slots were removed early");
  await page.waitForFunction(() => document.querySelector('.shade-track').getAnimations().length === 0);
  await page.evaluate(() => { for (let index = 0; index < 24; index++) document.querySelector('[aria-label="Previous shade"]').click(); });
  await checkTrackBounds();
  await page.waitForFunction(() => document.querySelector('.shade-track').getAnimations().length === 0);
  await checkTrackBounds();
  check(await page.locator('.shade-product[data-active="true"]').evaluate(el => {
    const product = el.getBoundingClientRect(), stage = el.closest('.shade-stage').getBoundingClientRect();
    return Math.abs(product.x + product.width / 2 - stage.x - stage.width / 2) < 1;
  }), "Reverse looping lost the centered product");
  await page.locator('#sets').scrollIntoViewIfNeeded();
  await page.getByRole('button', {name:'Next set',exact:true}).click();
  await page.waitForFunction(() => new DOMMatrix(getComputedStyle(document.querySelector('.sets-track')).transform).m41 < -1);
  const setFrame = await page.locator('.sets-track').evaluate(el => ({x:new DOMMatrix(getComputedStyle(el).transform).m41, step:el.clientWidth * .88 + 16}));
  check(setFrame.x > -setFrame.step + 1, "Set change is instant");
  await page.waitForFunction(() => document.querySelector('.sets-track').getAnimations().length === 0);
  await page.setViewportSize({width:1440,height:900});
  await page.locator('#sets').scrollIntoViewIfNeeded();
  await page.getByRole('button', {name:'Next set',exact:true}).click();
  check(await page.locator('.sets-track').evaluate(el => el.getAnimations().length > 0), "Desktop sets do not animate");
  await page.waitForFunction(() => document.querySelector('.sets-track').getAnimations().length === 0);
  check((await page.locator('.sets-track > a[aria-hidden="false"]').count()) === 3, "Sets visible count is wrong");
  await page.getByRole('button', {name:'Search',exact:true}).click();
  await page.waitForFunction(() => document.querySelector('dialog').getAnimations().length === 0);
  await page.getByRole('button', {name:'Close dialog',exact:true}).click();
  check(await page.locator('dialog').evaluate(el => el.open && el.classList.contains('is-closing') && el.getAnimations().length > 0), "Dialog disappears before its exit animation");
  await page.waitForFunction(() => !document.querySelector('dialog').open);
  await page.emulateMedia({ reducedMotion: "reduce" });
  check(
    (await page
      .locator('.shade-product[data-active="true"]')
      .evaluate((el) => getComputedStyle(el).transitionDuration)) === "0s",
    "Reduced motion ignored",
  );
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(base);
  const promo = await page.locator(".promo-message").innerText();
  await page
    .getByRole("button", { name: "Next promotion", exact: true })
    .click();
  check(
    (await page.locator(".promo-message").innerText()) !== promo,
    "Promotion does not change",
  );
  await page
    .getByRole("button", { name: "Previous promotion", exact: true })
    .click();
  check(
    (await page.locator(".promo-message").innerText()) === promo,
    "Promotion previous arrow failed",
  );
  await page
    .getByRole("button", { name: "Close promotion", exact: true })
    .click();
  check(
    (await page.locator(".announcement").count()) === 0,
    "Promotion did not close",
  );
  await page.reload();
  check(
    (await page.locator(".announcement").count()) === 1,
    "Promotion did not return after refresh",
  );
  for (const section of await page
    .locator(".beauty-home > section, footer")
    .all())
    await section.scrollIntoViewIfNeeded();
  await page.waitForFunction(() =>
    [...document.images].every((img) => img.complete && img.naturalWidth > 0),
  );
  await page.evaluate(() => scrollTo(0, 0));
  await page.screenshot({
    path: "output/playwright/maren-v5-desktop.png",
    fullPage: true,
  });
  await page.screenshot({
    path: "apps/maren-botanical/preview.jpg",
    type: "jpeg",
    quality: 90,
  });
  check(errors.length === 0, "Browser errors: " + errors.join("; "));
  await page.emulateMedia({ reducedMotion: "no-preference" });
  return {
    result: "PASS",
    checked: [
      "five unique shades and colors",
      "centered products and looping through five shades",
      "keyboard, product click and drag",
      "cart variants, totals and persistence",
      "dialog focus",
      "search and product routes",
      "accordion and newsletter",
      "eight widths and unclipped desktop products/footer",
      "mobile menu and sets",
      "square footer images and no space after footer",
      "Sets intermediate frames and dialog exit completion",
      "intermediate animation frames and rapid changes",
      "reduced motion",
      "all original assets",
      "promo arrows, dismissal and refresh",
    ],
    errors,
  };
  } finally { await context.close(); }
}
