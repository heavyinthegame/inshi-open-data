#!/usr/bin/env node
// 院試hubの公開データ（CC BY 4.0）を GitHub heavyinthegame/inshi-open-data の作業ツリーへ写す。
// 本番の公開URLから取得するので、配信済みの内容だけが入る。コミット・pushは差分を見てから行う。
//
// Usage:
//   node scripts/sync-open-data.mjs --out=../inshi-open-data [--base=https://inshihub.com]

import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const args = Object.fromEntries(process.argv.slice(2).map((arg) => {
  const [key, value] = arg.replace(/^--/, "").split("=");
  return [key, value ?? true];
}));
if (!args.out || args.out === true) throw new Error("--out=<inshi-open-data の作業ツリー> を指定してください");
const base = String(args.base ?? "https://inshihub.com").replace(/\/$/, "");
const out = resolve(String(args.out), "data");
mkdirSync(out, { recursive: true });

const FILES = [
  ["/resources/official-past-exams.json", "official-past-exams.json"],
  ["/resources/official-past-exams.csv", "official-past-exams.csv"],
  ["/resources/data/graduate-schools.json", "graduate-schools.json"],
  ["/resources/data/themes.json", "themes.json"],
];

const summary = {};
for (const [path, name] of FILES) {
  const response = await fetch(base + path);
  if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);
  const text = await response.text();
  if (name.endsWith(".json")) {
    const data = JSON.parse(text);
    summary[name] = data.meta?.count ?? data.universities?.length ?? null;
    writeFileSync(join(out, name), `${JSON.stringify(data, null, 2)}\n`);
  } else {
    summary[name] = text.trim().split("\n").length - 1;
    writeFileSync(join(out, name), text);
  }
  console.log(`${name}\t${summary[name]}`);
}
writeFileSync(join(out, "source.json"), `${JSON.stringify({ source: base, files: FILES.map(([path, name]) => ({ name, url: base + path })), counts: summary }, null, 2)}\n`);
