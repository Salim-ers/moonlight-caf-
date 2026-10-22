/**
 * Génère les déclinaisons du logo à partir du fichier original, sans jamais le redessiner :
 * le logo complet (jeune femme, tasse, vapeur et lettrage) est seulement détouré, redimensionné
 * et, pour la version claire, recoloré à l'identique sur fond sombre.
 *
 * Usage : node scripts/generate-brand-assets.mjs
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const ORIGINAL = path.join(root, "assets/originals/logo-moonlight-cafe-original.png");
const out = (p) => path.join(root, p);

const PINK = "#F6D9E1";
const BUTTER = "#F7ECCD";

// 1. Logo complet détouré (marge régulière, aucune partie coupée)
const trimmed = await sharp(ORIGINAL).trim({ threshold: 1 }).toBuffer({ resolveWithObject: true });
const PAD = Math.round(trimmed.info.width * 0.02);
const full = await sharp(trimmed.data)
  .extend({ top: PAD, bottom: PAD, left: PAD, right: PAD, background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer({ resolveWithObject: true });
console.log("logo complet", full.info.width, "x", full.info.height);

// Un seul fichier web : sur fond sombre, le site l'inverse en CSS (traits clairs), sans second téléchargement.
await sharp(full.data).resize({ width: 900 }).webp({ quality: 85, alphaQuality: 90, effort: 6 }).toFile(out("public/brand/moonlight-logo.webp"));
await sharp(full.data).resize({ width: 1200 }).png({ compressionLevel: 9, palette: true }).toFile(out("public/brand/logo-full.png"));

// 2. Icônes : logo complet centré sur fond crème (le lettrage reste entier)
async function icon(size, bg, file, scale = 0.84) {
  const logo = await sharp(full.data)
    .resize({ width: Math.round(size * scale) })
    .toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: bg } })
    .composite([{ input: logo, gravity: "center" }])
    .png({ compressionLevel: 9 })
    .toFile(out(file));
}
await icon(512, BUTTER, "public/brand/icon-512.png");
await icon(192, BUTTER, "public/brand/icon-192.png");
await icon(180, BUTTER, "src/app/apple-icon.png", 0.86);
await icon(512, BUTTER, "src/app/icon.png");

// favicon.ico (16 et 32 px) : à cette taille seule l'illustration reste lisible,
// on garde donc le dessin complet de la jeune femme et de sa tasse, sans la recadrer.
const illustrationArea = await sharp(full.data)
  .extract({ left: 0, top: 0, width: full.info.width, height: Math.round(full.info.height * 0.74) })
  .toBuffer();
const illustration = await sharp(illustrationArea).trim({ threshold: 1 }).toBuffer();
async function icoPng(size) {
  const ill = await sharp(illustration)
    .resize({ width: size - 2, height: size - 2, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: BUTTER } })
    .composite([{ input: ill, gravity: "center" }])
    .png()
    .toBuffer();
}
const pngs = [await icoPng(16), await icoPng(32), await icoPng(48)];
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(pngs.length, 4);
let offset = 6 + 16 * pngs.length;
const dir = pngs.map((png, i) => {
  const size = [16, 32, 48][i];
  const e = Buffer.alloc(16);
  e.writeUInt8(size, 0);
  e.writeUInt8(size, 1);
  e.writeUInt8(0, 2);
  e.writeUInt8(0, 3);
  e.writeUInt16LE(1, 4);
  e.writeUInt16LE(32, 6);
  e.writeUInt32LE(png.length, 8);
  e.writeUInt32LE(offset, 12);
  offset += png.length;
  return e;
});
fs.writeFileSync(out("src/app/favicon.ico"), Buffer.concat([header, ...dir, ...pngs]));

// 3. Image de partage Open Graph : logo complet sur fond rose, pastilles de la palette (aucune photo)
const og = await sharp(full.data).resize({ height: 430 }).toBuffer();
const dots = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <circle cx="96" cy="110" r="46" fill="#70894E"/>
  <circle cx="1110" cy="96" r="34" fill="#A79AD9"/>
  <circle cx="1120" cy="520" r="58" fill="#729DD6"/>
  <circle cx="120" cy="540" r="28" fill="#C78B59"/>
  <circle cx="1020" cy="590" r="16" fill="#272420"/>
</svg>`);
await sharp({ create: { width: 1200, height: 630, channels: 4, background: PINK } })
  .composite([{ input: dots }, { input: og, gravity: "center" }])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(out("public/og/moonlight-cafe-og.jpg"));

for (const f of [
  "public/brand/moonlight-logo.webp",
  "public/brand/logo-full.png",
  "public/og/moonlight-cafe-og.jpg",
  "src/app/icon.png",
  "src/app/favicon.ico",
]) {
  console.log(f, Math.round(fs.statSync(out(f)).size / 1024), "Ko");
}
