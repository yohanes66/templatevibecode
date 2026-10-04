import assert from "node:assert/strict";
import { existsSync, statSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import {
  ingredients,
  products,
  readCart,
  reviews,
  steps,
  stories,
} from "../src/content.ts";

assert.deepEqual(readCart("{broken"), {});
assert.deepEqual(readCart("null"), {});
assert.deepEqual(readCart("[]"), {});
assert.deepEqual(
  readCart(
    '{"root-serum":2,"unknown":3,"restore-shampoo":-1,"restore-conditioner":1.5,"the-restore-set":100}',
  ),
  { "root-serum": 2 },
);
assert.deepEqual(readCart('{"root-serum":"3"}'), {});
assert.deepEqual(readCart('{"root-serum":99}'), { "root-serum": 99 });
assert.equal(new Set(products.map((p) => p.slug)).size, products.length);
for (const item of [
  ...products,
  ...ingredients,
  ...steps,
  ...reviews,
  ...stories,
]) {
  const path = fileURLToPath(
    new URL(`../public/images/${item.image}.png`, import.meta.url),
  );
  assert.ok(
    existsSync(path) && statSync(path).size > 0,
    `Missing image: ${item.image}`,
  );
}
for (const filename of readdirSync(
  new URL("../public/images/v5/", import.meta.url),
)) {
  assert.ok(
    statSync(new URL("../public/images/v5/" + filename, import.meta.url)).size >
      0,
    "Empty Figma v5 asset: " + filename,
  );
}
assert.deepEqual(
  readCart('{"cloud-tint-bare":2,"cloud-tint-fig":1,"unknown":1}'),
  { "cloud-tint-bare": 2, "cloud-tint-fig": 1 },
);
console.log(
  "PASS: cart recovery, quantity validation, hair/beauty products, and all original Figma assets.",
);
