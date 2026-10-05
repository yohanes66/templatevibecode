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
  await page.evaluate(() => localStorage.setItem('maren-bag', JSON.stringify({
    'restore-shampoo': 1, 'restore-conditioner': 2, 'root-serum': 1, 'the-restore-set': 1,
  })));
  await page.reload();
  await page.getByRole('button', {name:'Bag (0)',exact:true}).click();
  check(await page.getByText('Your bag is empty.',{exact:true}).isVisible(), 'Old-only bag was not cleared');
  check(await page.evaluate(() => localStorage.getItem('maren-bag') === '{}'), 'Legacy products remain in saved cart');
  await page.getByRole('button', {name:'Close dialog',exact:true}).click();
  await page.waitForFunction(() => !document.querySelector('dialog').open);
  await page.evaluate(() => localStorage.setItem('maren-bag', JSON.stringify({
    'restore-shampoo': 1, 'root-serum': 2, 'barrier-mist': 2, 'cloud-tint-fig': 1,
  })));
  await page.reload();
  await page.getByRole('button', {name:'Bag (3)',exact:true}).click();
  check((await page.locator('.bag-item').count()) === 2, 'Mixed bag migration removed current products or retained old products');
  check((await page.locator('.bag-total').innerText()).includes('$80'), 'Migrated bag subtotal is wrong');
  check(await page.locator('.bag-thumbnail img').evaluateAll(images => images.every(image => image.getAttribute('src').startsWith('/images/v5/'))), 'Bag still uses legacy imagery');
  check(await page.evaluate(() => {
    const cart=JSON.parse(localStorage.getItem('maren-bag'));
    return cart['barrier-mist'] === 2 && cart['cloud-tint-fig'] === 1 && Object.keys(cart).length === 2;
  }), 'Mixed cart migration was not persisted');
  await page.waitForFunction(() => [...document.querySelectorAll('.bag-thumbnail img')].every(image => image.complete && image.naturalWidth > 0));
  await page.setViewportSize({width:390,height:844});
  await page.screenshot({path:'output/playwright/maren-bag-migrated-mobile.png'});
  await page.setViewportSize({width:1440,height:1000});
  await page.getByRole('button', {name:'Close dialog',exact:true}).click();
  await page.waitForFunction(() => !document.querySelector('dialog').open);
  await page.getByRole('button', {name:'Search',exact:true}).click();
  await page.getByRole('searchbox').fill('Restore');
  check((await page.locator('.search-results > a').count()) === 0, 'Legacy products remain searchable');
  await page.goto(base + '/shop');
  check((await page.locator('.beauty-card').count()) === 16, 'Shop does not match the current beauty catalog');
  check(await page.locator('.beauty-card img').evaluateAll(images => images.every(image => image.getAttribute('src').startsWith('/images/v5/'))), 'Shop still uses legacy product imagery');
  for (const width of [1440,390]) {
    await page.setViewportSize({width,height:900});
    for (const card of await page.locator('.beauty-card').all()) await card.scrollIntoViewIfNeeded();
    await page.waitForFunction(() => [...document.querySelectorAll('.beauty-card img')].every(image => image.complete && image.naturalWidth > 0));
    check(await page.locator('.beauty-card .product-photo').evaluateAll(photos => photos.every(photo => {
      const box=photo.getBoundingClientRect();
      if (Math.abs(box.width-box.height)>1) return false;
      const sprite=photo.querySelector('.catalog-sprite');
      if (!sprite) return true;
      const tube=sprite.getBoundingClientRect();
      const image=sprite.querySelector('img'), imageBox=image.getBoundingClientRect();
      const expectedRatio=photo.classList.contains('tint-photo') ? 138/380 : parseFloat(image.style.height)/parseFloat(image.style.width);
      return Math.abs(tube.x+tube.width/2-box.x-box.width/2)<1 && tube.top>=box.top-1 && tube.bottom<=box.bottom+1 && tube.left>=box.left-1 && tube.right<=box.right+1 && Math.abs(tube.width/tube.height-expectedRatio)<.01 && Math.abs(imageBox.width/imageBox.height-image.naturalWidth/image.naturalHeight)<.01;

    })), 'Catalog photo is oversized, stretched, clipped, or off center at '+width);
    check(await page.locator('.beauty-card .set-photo img').evaluateAll(images => images.every(image => getComputedStyle(image).objectFit === 'contain')), 'Kit or set catalog photo is cropped');
    await page.evaluate(() => scrollTo(0,0));
    await page.screenshot({path:'output/playwright/maren-catalog-'+width+'.png',fullPage:true});
  }
  await page.setViewportSize({width:1440,height:1000});
  await page.goto(base + '/products/restore-shampoo');
  check(await page.getByRole('heading', {name:'A little lost?',exact:true}).isVisible(), 'Legacy product route still accepts purchases');
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
  for (const width of [1440,390]) {
    await page.setViewportSize({width,height:900});
    for (const name of ['Previous shade','Next shade']) {
      const arrow=page.getByRole('button',{name,exact:true});
      await arrow.hover();
      await arrow.click();
      check(await page.locator('.shade-arrow').evaluateAll(buttons => buttons.every(button => {
        const box=button.getBoundingClientRect(), icon=button.querySelector('svg').getBoundingClientRect();
        return getComputedStyle(button).backgroundColor === 'rgba(0, 0, 0, 0)' && Math.abs(icon.x+icon.width/2-box.x-box.width/2)<1 && Math.abs(icon.y+icon.height/2-box.y-box.height/2)<1;
      })), 'Shade arrows differ in transparency or centering after hover/click at '+width);
    }
    await page.mouse.move(0,0);
    await page.locator('#shades').screenshot({path:'output/playwright/maren-arrows-'+width+'.png'});
  }
  await page.setViewportSize({width:1440,height:1000});
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
  for (const viewport of [
    { width: 1440, height: 900 },
    { width: 390, height: 844 },
    { width: 320, height: 480 },
    { width: 844, height: 390 },
  ]) {
    await page.setViewportSize(viewport);
    check(await page.locator('.bag-dialog').evaluate(el => {
      const box=el.getBoundingClientRect();
      return Math.abs(box.width - Math.min(520, innerWidth - 32)) < 1;
    }), 'Bag drawer occupies the full mobile width');
    check(
      await page.locator(".bag-summary").evaluate((el) => {
        const box = el.getBoundingClientRect();
        return (
          box.top >= 0 &&
          box.bottom <= innerHeight + 1 &&
          box.right <= innerWidth + 1
        );
      }),
      "Bag summary clipped at " + viewport.width,
    );
    check(
      await page.locator(".bag-items").evaluate((el) => {
        el.scrollTop = el.scrollHeight;
        const last = el.lastElementChild.getBoundingClientRect(),
          bounds = el.getBoundingClientRect();
      return last.bottom <= bounds.bottom + 1 && bounds.height >= 100;
      }),
      "Last bag item is unreachable at " + viewport.width,
    );
    check(
      await page.locator(".bag-item").evaluateAll((items) =>
        items.every((el) => {
          const box = el.getBoundingClientRect();
          return [...el.querySelectorAll("button,a,strong")].every(
            (control) => {
              const bounds = control.getBoundingClientRect();
              return bounds.left >= box.left && bounds.right <= box.right + 1;
            },
          );
        }),
      ),
      "Bag controls overflow at " + viewport.width,
    );
  }
  await page.screenshot({
    path: "output/playwright/maren-bag-landscape.png",
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator(".bag-items").evaluate((el) => (el.scrollTop = 0));
  await page.screenshot({ path: "output/playwright/maren-bag-mobile.png" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.screenshot({ path: "output/playwright/maren-bag-desktop.png" });
  await page
    .getByRole("button", { name: "Add one Cloud Tint — Bare", exact: true })
    .click();
  check(
    (await page.locator(".bag-total").innerText()).includes("$144"),
    "Quantity subtotal failed",
  );
  await page
    .getByRole("button", { name: "Preview checkout", exact: true })
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
      await page.locator(".size-select").evaluateAll((labels) =>
        labels.every((label) => {
          const select = label.querySelector("select"),
            icon = label.querySelector("svg");
          const box = select.getBoundingClientRect(),
            arrow = icon.getBoundingClientRect();
          return (
            getComputedStyle(select).appearance === "none" &&
            box.right - arrow.right >= 13 &&
            box.right - arrow.right <= 15 &&
            Math.abs(arrow.y + arrow.height / 2 - box.y - box.height / 2) <
              1 &&
            parseFloat(getComputedStyle(select).paddingRight) >= 42
          );
        }),
      ),
      "Dropdown arrow spacing is wrong at " + width,
    );
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
  check(await page.locator('.menu-dialog').evaluate(el => {
    const box=el.getBoundingClientRect();
    return Math.abs(box.width - (innerWidth - 32)) < 1;
  }), 'Mobile menu width is inconsistent with the bag');
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
  const setFrame = await page.locator('.sets-track').evaluate(el => ({x:new DOMMatrix(getComputedStyle(el).transform).m41, step:el.clientWidth + 16}));
  check(setFrame.x > -setFrame.step + 1, "Set change is instant");
  await page.waitForFunction(() => document.querySelector('.sets-track').getAnimations().length === 0);
  await page.setViewportSize({width:1440,height:900});
  await page.locator('#sets').scrollIntoViewIfNeeded();
  await page.getByRole('button', {name:'Next set',exact:true}).click();
  check(await page.locator('.sets-track').evaluate(el => el.getAnimations().length > 0), "Desktop sets do not animate");
  await page.waitForFunction(() => document.querySelector('.sets-track').getAnimations().length === 0);
  check((await page.locator('.sets-track > a[aria-hidden="false"]').count()) === 3, "Sets visible count is wrong");
  check(await page.locator('.sets-track > a[aria-hidden="false"] img').evaluateAll(images => {
    return new Set(images.map(image => image.currentSrc)).size === 3 && images.every(image => {
      const photo=image.parentElement, box=photo.getBoundingClientRect(), frame=image.getBoundingClientRect();
      return image.complete && image.naturalWidth > 0 &&
        getComputedStyle(image).objectFit === 'contain' &&
        !image.hasAttribute('style') &&
        Math.abs(image.naturalWidth / image.naturalHeight - 6/7) < .01 &&
        Math.abs(frame.x + frame.width/2 - box.x - box.width/2) < 1;
    });
  }), 'Sets photos are shared, cropped, stretched, or misaligned');
  await page.locator('#sets').screenshot({path:'output/playwright/maren-sets-new-desktop.png'});
  await page.setViewportSize({width:390,height:844});
  await page.waitForFunction(() => document.querySelector('.sets-track').getAnimations().length === 0 && document.querySelectorAll('.sets-track > a[aria-hidden="false"]').length === 1);
  check(await page.locator('.sets-track > a[aria-hidden="false"] .product-photo').evaluate(photo => {
    const box=photo.getBoundingClientRect(), frame=photo.closest('.sets-window').getBoundingClientRect();
    return box.left >= frame.left - 1 && box.right <= frame.right + 1 && Math.abs(box.x + box.width/2 - frame.x - frame.width/2) < 1;
  }), 'Mobile set photo is clipped or off center');
  await page.locator('#sets').screenshot({path:'output/playwright/maren-sets-new-mobile.png'});
  await page.setViewportSize({width:1440,height:900});
  await page.waitForFunction(() => document.querySelector('.sets-track').getAnimations().length === 0);
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
    path: "output/playwright/maren-v5-preview.jpg",
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
      "old-only and mixed saved cart migration, current product images and retired product routes",
      "bag summary visibility and scrollable items at desktop, mobile and short landscape sizes",
      "consistent dropdown arrow spacing at eight widths",
      "dialog focus",
      "search and product routes",
      "accordion and newsletter",
      "eight widths and unclipped desktop products/footer",
      "mobile menu and sets",
      "three independent generated Set photos, complete and centered without sprite crops",
      "entire 16-product catalog at desktop/mobile with square photos, centered complete tints, and consistent transparent arrows after hover/click",
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
