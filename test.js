// Basic checks before pushing (GitHub Pages serves main as it is): npm test. No dependencies.
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';

const read = (f) => fs.readFileSync(path.join(import.meta.dirname, f), 'utf8');
const html = read('index.html');
const sw = read('sw.js');

test('the app version, version.json and the newest CHANGELOG entry agree', () => {
  const app = html.match(/const APP_VERSION='([^']+)'/)?.[1];
  assert.ok(app, 'APP_VERSION not found in index.html');
  assert.equal(JSON.parse(read('version.json')).version, app);
  assert.equal(read('CHANGELOG.md').match(/^## (\S+)/m)?.[1], app);
});

test('every file the offline cache and the manifest name exists', () => {
  const local = [...sw.matchAll(/'([^'./][^']*\.(?:webmanifest|svg|png|glb))'/g)].map((m) => m[1]);
  const sounds = sw.match(/\.\.\.\[([^\]]+)\]\s*\.map\(n => `sounds\/\$\{n\}\.m4a`\)/)?.[1].match(/'([^']+)'/g).map((s) => `sounds/${s.slice(1, -1)}.m4a`) ?? [];
  const icons = JSON.parse(read('manifest.webmanifest')).icons.map((i) => i.src);
  assert.ok(local.length && sounds.length && icons.length);
  for (const f of [...local, ...sounds, ...icons]) assert.ok(fs.existsSync(path.join(import.meta.dirname, f)), `missing: ${f}`);
});

test('the offline cache holds the same library versions the page imports', () => {
  // 'three@0.186.1/...' or '@dimforge/rapier3d-compat@0.21.0/...' (the page writes .../npm/<pkg>, sw.js CDN + '<pkg>')
  const versions = (s) => new Set([...s.matchAll(/(?:npm\/|')((?:@[\w-]+\/)?[\w.-]+@\d[\d.]*)\//g)].map((m) => m[1]));
  const page = [...versions(html)].filter((v) => !v.startsWith('es-module-shims')); // the polyfill is loaded only when needed
  const cached = versions(sw);
  assert.ok(page.length >= 2, 'no library imports found in index.html');
  for (const v of page) assert.ok(cached.has(v), `${v} is imported but not cached for offline use`);
});

test('the page scripts have no syntax errors', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'coin-jar-'));
  const scripts = [...html.matchAll(/<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/g)].filter((m) => !/importmap/.test(m[1]));
  assert.ok(scripts.length >= 2);
  scripts.forEach(([, attrs, code], i) => {
    const file = path.join(dir, `s${i}.${/module/.test(attrs) ? 'mjs' : 'cjs'}`);
    fs.writeFileSync(file, code);
    execFileSync(process.execPath, ['--check', file]); // throws with the error on a syntax error
  });
  JSON.parse(html.match(/<script type="importmap">([\s\S]*?)<\/script>/)[1]);
});
