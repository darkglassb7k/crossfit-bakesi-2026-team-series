#!/usr/bin/env node
// Reads embed-*.html files from scripts/ dir, extracts Google Photos URLs,
// and writes src/data/photos.ts
//
// Usage:
//   1. Save each publicalbum.org embed code as:
//      scripts/embed-26.1.html
//      scripts/embed-26.2.html
//      scripts/embed-26.3.html
//   2. Run: node scripts/build-photos.js

const fs = require("fs");
const path = require("path");

const albums = [
  {
    id: "26.1",
    title: "26.1 @ CrossFit Ba Ke Si",
    date: "Feb 27 \u2013 28",
    link: "https://photos.google.com/share/AF1QipNPqu1lXkkQVAfk7t6FqXCdrWEei3LC7w1C-r-R7IUhGXaHjLpNfLViUoBUl9Qz4g?pli=1&key=a1R0cWphVmctakRxeG9BU09DMV9QMEpZZlNqX0pn",
  },
  {
    id: "26.2",
    title: "26.2 @ CrossFit Ba Ke Si",
    date: "Mar 6 \u2013 7",
    link: "https://photos.google.com/share/AF1QipNXbpkQgtgZ4SIRUi7lWLGknZBD2o_0TfuK_ShZ98eza_mMquGayF_ydSdrrHNRjw?key=bUdBV3pKbkVqOHhXbTByeU9HOFJya2pQcGlUR1Nn",
  },
  {
    id: "26.3",
    title: "26.3 @ CrossFit Ba Ke Si",
    date: "Mar 13 \u2013 16",
    link: "https://photos.google.com/share/AF1QipNqgsgErKO7UFYpsVH4GpNeMnNCg1WV42woFyaY-Lfjt1ijhN_thGwfnB2sJsa2Og?key=VVJ2bVFpcEhiYzdYYl9LM3pQQWRtNDJpb2VDcWh3",
  },
];

const scriptsDir = __dirname;
const outFile = path.join(scriptsDir, "..", "src", "data", "photos.ts");

let ts = `// Auto-generated — do not edit by hand.
// Regenerate: node scripts/build-photos.js

export interface PhotoAlbum {
  id: string;
  title: string;
  date: string;
  link: string;
  photos: string[];
}

export const photoAlbums: PhotoAlbum[] = [\n`;

let total = 0;
for (const a of albums) {
  const htmlFile = path.join(scriptsDir, `embed-${a.id}.html`);
  if (!fs.existsSync(htmlFile)) {
    console.error(`ERROR: missing ${htmlFile}`);
    console.error(`Save the publicalbum.org embed code there first.`);
    process.exit(1);
  }
  const html = fs.readFileSync(htmlFile, "utf-8");
  const urls = [];
  const re = /object\s+data="(https:\/\/lh3\.googleusercontent\.com\/pw\/[^"]+)"/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    urls.push(m[1].replace(/=w\d+-h\d+$/, "=w1200-h800"));
  }
  total += urls.length;
  console.log(`${a.id}: ${urls.length} photos`);

  ts += `  {\n    id: ${JSON.stringify(a.id)},\n    title: ${JSON.stringify(a.title)},\n    date: ${JSON.stringify(a.date)},\n    link: ${JSON.stringify(a.link)},\n    photos: [\n`;
  for (const u of urls) ts += `      ${JSON.stringify(u)},\n`;
  ts += `    ],\n  },\n`;
}
ts += `];\n`;

fs.writeFileSync(outFile, ts, "utf-8");
console.log(`\nWrote ${outFile} — ${total} photos total`);
