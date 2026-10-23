/**
 * Génère, une fois pour toutes, les versions web des 26 photographies :
 * AVIF + WebP en 6 largeurs, et un JPEG de secours pour les navigateurs anciens.
 * Les fichiers sont servis tels quels par le CDN (aucune optimisation « à la volée » :
 * pas de première visite lente, pas de quota, pas d'échec de génération).
 *
 * Usage : npm run images   (à relancer après avoir remplacé ou ajouté une photo)
 * Sortie : public/img/<nom>.<empreinte>-<largeur>.(avif|webp), public/img/<nom>.<empreinte>.jpg
 *          src/data/photo-variants.generated.ts (table lue par le composant Photo)
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const root = path.resolve(import.meta.dirname, "..");
const SRC = path.join(root, "src/assets/photos");
const OUT = path.join(root, "public/img");
const TABLE = path.join(root, "src/data/photo-variants.generated.ts");
const WIDTHS = [480, 640, 828, 1080, 1440, 1672];

fs.mkdirSync(OUT, { recursive: true });
const files = fs
  .readdirSync(SRC)
  .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
  .sort();
const table = {};
const keep = new Set();
let made = 0;

for (const file of files) {
  const input = path.join(SRC, file);
  const buf = fs.readFileSync(input);
  const hash = crypto.createHash("md5").update(buf).digest("hex").slice(0, 8);
  const stem = file.replace(/\.[^.]+$/, "");
  const base = `${stem}.${hash}`;
  const meta = await sharp(buf).metadata();
  const widths = WIDTHS.filter((w) => w <= meta.width);
  if (!widths.includes(meta.width) && meta.width < WIDTHS.at(-1)) widths.push(meta.width);

  for (const w of widths) {
    const avif = `${base}-${w}.avif`;
    const webp = `${base}-${w}.webp`;
    keep.add(avif).add(webp);
    if (!fs.existsSync(path.join(OUT, avif))) {
      await sharp(buf).resize({ width: w }).avif({ quality: 60, effort: 5 }).toFile(path.join(OUT, avif));
      made++;
    }
    if (!fs.existsSync(path.join(OUT, webp))) {
      await sharp(buf).resize({ width: w }).webp({ quality: 80, effort: 5 }).toFile(path.join(OUT, webp));
      made++;
    }
  }
  const jpg = `${base}.jpg`;
  keep.add(jpg);
  if (!fs.existsSync(path.join(OUT, jpg))) {
    await sharp(buf).resize({ width: 1080 }).jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(OUT, jpg));
    made++;
  }
  // Couleur dominante : affichée le temps du chargement (aucun coût de rendu)
  const { dominant } = await sharp(buf).stats();
  const color = `#${[dominant.r, dominant.g, dominant.b].map((c) => c.toString(16).padStart(2, "0")).join("")}`;
  table[file] = { base: `/img/${base}`, hash, widths, width: meta.width, height: meta.height, color };
}

// Supprime les anciennes versions (photo remplacée)
let removed = 0;
for (const f of fs.readdirSync(OUT)) {
  if (!keep.has(f)) {
    fs.unlinkSync(path.join(OUT, f));
    removed++;
  }
}

fs.writeFileSync(
  TABLE,
  `// Fichier généré par scripts/build-images.mjs — ne pas modifier à la main (npm run images).\n` +
    `export type PhotoVariant = { base: string; hash: string; widths: number[]; width: number; height: number; color: string };\n\n` +
    `export const photoVariants: Record<string, PhotoVariant> = ${JSON.stringify(table, null, 2)};\n`,
);

const total = fs.readdirSync(OUT).reduce((s, f) => s + fs.statSync(path.join(OUT, f)).size, 0);
console.log(`${files.length} photos · ${made} fichiers générés · ${removed} supprimés · ${(total / 1024 / 1024).toFixed(1)} Mo dans public/img`);
