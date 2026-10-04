import { readdir, readFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join, dirname, resolve } from 'node:path';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const filenames = (await readdir(root)).filter(name => name.endsWith('.html'));
const failures = [];
let localReferences = 0;
let externalReferences = 0;

for (const filename of filenames) {
  const html = await readFile(join(root, filename), 'utf8');
  if ((html.match(/<h1[\s>]/g) ?? []).length !== 1) failures.push(`${filename}: needs one h1`);
  if (!html.includes('lang="en"') || !html.includes('name="viewport"') || !html.includes('noindex, nofollow')) failures.push(`${filename}: missing page metadata`);
  for (const image of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\balt="[^"]*"/.test(image[0])) failures.push(`${filename}: image needs alt`);
  }
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  if (new Set(ids).size !== ids.length) failures.push(`${filename}: duplicate ids`);
  for (const [, attribute, raw] of html.matchAll(/\b(href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|tel:|data:)/.test(raw)) { externalReferences++; continue; }
    const [path, fragment] = raw.split('#');
    const target = resolve(dirname(join(root, filename)), path || filename);
    if (!target.startsWith(root)) { failures.push(`${filename}: reference escapes site: ${raw}`); continue; }
    try {
      await access(target);
      if (fragment && attribute === 'href' && target.endsWith('.html')) {
        const targetHtml = await readFile(target, 'utf8');
        if (!targetHtml.includes(`id="${fragment}"`)) failures.push(`${filename}: missing fragment ${raw}`);
      }
      localReferences++;
    } catch { failures.push(`${filename}: missing local asset/page ${raw}`); }
  }
}
const home = await readFile(join(root, 'index.html'), 'utf8');
const about = await readFile(join(root, 'about.html'), 'utf8');
const originalMission = 'is to educate and develop the whole individual in mind, body, and spirit in keeping with the love and teaching of Jesus Christ, our Lord and Savior.';
const originalVision = 'is to be preparing children ages three through eighth grade for a successful future, both academically, spiritually, and socially. Through a diverse and well-rounded curriculum, we achieve that goal every single day with every single student.';
if (!home.includes(originalMission) || !about.includes(originalMission) || !about.includes(originalVision)) failures.push('Original mission/vision wording changed');
if (failures.length) { console.error(failures.join('\n')); process.exit(1); }
console.log(`Validated ${filenames.length} pages, ${localReferences} local references, page fragments, image labels, and original mission/vision. ${externalReferences} external/contact references identified.`);
