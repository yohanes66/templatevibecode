import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
import { spawn, execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { services, cases, partners } from '../src/content.ts';

assert.equal(new Set(cases.map(item => item.slug)).size, 6);
assert.equal(new Set(services.flatMap(service => service.images)).size, 20);
for (const name of [...services.flatMap(service => service.images), ...cases.map(item => item.image), ...partners.map(item => item.image), 'prologue.webp', 'backstage.webp', 'door-work.webp', 'door-story.webp', 'door-journal.webp', 'emblem-88.svg', 'emblem-56.svg']) {
  assert.ok(statSync(new URL(`../public/images/${name}`, import.meta.url)).size > 0, `Missing image: ${name}`);
}
const base = 'http://127.0.0.1:3301';
const vite = spawn(process.execPath, ['node_modules/vite/bin/vite.js', '--host', '127.0.0.1', '--port', '3301', '--strictPort'], { cwd: fileURLToPath(new URL('..', import.meta.url)), stdio: 'ignore' });
const cli = (...args) => execFileSync('npx', ['--yes', '--package', '@playwright/cli', 'playwright-cli', '-s=norte-check', ...args], { encoding: 'utf8', timeout: 180000, maxBuffer: 4 * 1024 * 1024 });
try {
  let ready = false;
  for (let i = 0; i < 50; i++) {
    try { ready = (await fetch(base)).ok; } catch {}
    if (ready) break;
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  assert.ok(ready, 'QA server did not start on port 3301');
  cli('open', base);
  const script = readFileSync(new URL('check-browser.js', import.meta.url), 'utf8').replace('__BASE__', JSON.stringify(base));
  let result;
  try { result = cli('run-code', script); }
  catch (error) { throw new Error(error.stdout || error.message); }
  assert.match(result, /"result":\s*"PASS"/, 'Browser verification did not pass');
  console.log(result.split('### Ran Playwright code')[0].trim());
} finally {
  try { cli('close'); } catch {}
  vite.kill();
}
