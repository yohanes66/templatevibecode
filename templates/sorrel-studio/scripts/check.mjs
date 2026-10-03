import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";
import {
  projects,
  articles,
  team,
  logos,
  inquiryUrl,
  formatCount,
} from "../src/content.ts";

const root = new URL("../public/", import.meta.url);
const files = new Set([
  ...projects.flatMap((p) => [p.image, p.before]),
  ...articles.map((a) => a.image),
  ...team.map((p) => p.image),
  ...logos,
  "4770d.webp",
  "9521f.webp",
  "599c4.webp",
  "3ba18.svg",
]);
for (const file of files) {
  const url = new URL(`images/${file}`, root);
  assert.ok(statSync(url).size > 0, `Empty asset: ${file}`);
  if (file.endsWith(".webp")) {
    const bytes = readFileSync(url);
    assert.equal(
      bytes.subarray(0, 4).toString(),
      "RIFF",
      `Invalid WebP: ${file}`,
    );
    assert.equal(
      bytes.subarray(8, 12).toString(),
      "WEBP",
      `Invalid WebP: ${file}`,
    );
  }
}
for (const list of [projects, articles]) {
  assert.equal(
    new Set(list.map((p) => p.slug)).size,
    list.length,
    "Duplicate routes",
  );
  assert.ok(
    list.every((p) => /^[a-z0-9-]+$/.test(p.slug)),
    "Invalid route slug",
  );
}
for (const file of ["archivo.ttf", "geist.ttf", "pinyon-script.ttf"])
  assert.ok(statSync(new URL(`fonts/${file}`, root)).size > 1000);
assert.equal(
  readFileSync(new URL("sorrel-company-profile.pdf", root))
    .subarray(0, 5)
    .toString(),
  "%PDF-",
);
const url = new URL(
  inquiryUrl(
    " Alex & Mei ",
    "alex+studio@example.com",
    "Workplace & Retail",
    "Budget? €50k\nA&B #1",
  ),
);
assert.equal(url.protocol, "mailto:");
assert.equal(url.pathname, "hello@sorrel.studio");
assert.equal(
  url.searchParams.get("subject"),
  "Project inquiry — Workplace & Retail",
);
assert.equal(
  url.searchParams.get("body"),
  "Name: Alex & Mei\nEmail: alex+studio@example.com\nProject type: Workplace & Retail\n\nBudget? €50k\nA&B #1",
);

assert.equal(formatCount("120+", 0), "0+");
assert.equal(formatCount("120+", 0.5), "60+");
assert.equal(formatCount("+38%", 0.5), "+19%");
assert.equal(formatCount("4.9★", 0.5), "2.5★");
assert.equal(formatCount("14 wks", 1), "14 wks");
assert.equal(formatCount("2014", 1), "2014");
assert.equal(formatCount("+27%", -1), "+0%");
assert.equal(formatCount("120+", 2), "120+");
console.log(
  `PASS: ${files.size} local images/SVG, 3 fonts, PDF, route slugs, email encoding and count animation formatting.`,
);
