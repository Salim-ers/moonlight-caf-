/**
 * Audit des photographies — exécuté avant chaque build (npm run build → prebuild).
 *
 * Règles vérifiées :
 * 1. Chaque identifiant du registre (src/data/photo-manifest.ts) est utilisé UNE SEULE FOIS dans le code,
 *    et uniquement dans le fichier déclaré par `usedIn` (une photo = un emplacement éditorial).
 * 2. Aucun identifiant inconnu n'est utilisé.
 * 3. Chaque fichier déclaré existe, et aucun fichier de src/assets/photos n'est un doublon d'un autre :
 *    empreinte MD5 identique, ou image quasi identique (hachage perceptuel dHash, distance ≤ 6/64).
 * 4. Les photos ne sont importées que par le registre (pas d'import direct ailleurs).
 *
 * Sortie : tableau d'attribution + code 1 en cas d'erreur.
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const root = path.resolve(import.meta.dirname, "..");
const MANIFEST = path.join(root, "src/data/photo-manifest.ts");
const PHOTOS_DIR = path.join(root, "src/assets/photos");
const rel = (p) => path.relative(root, p).split(path.sep).join("/");
const errors = [];

// 1. Lecture du registre
const manifestSrc = fs.readFileSync(MANIFEST, "utf8");
const entries = [];
for (const m of manifestSrc.matchAll(/photo\(\{([\s\S]*?)\n\s{2}\}\),/g)) {
  const block = m[1];
  const get = (k) => block.match(new RegExp(`\\b${k}:\\s*"([^"]*)"`))?.[1];
  entries.push({
    id: get("id"),
    file: get("file"),
    page: get("page"),
    section: get("section"),
    usedIn: get("usedIn"),
    source: get("source"),
    status: get("status"),
  });
}
if (entries.length === 0) errors.push("Registre illisible : aucune entrée trouvée.");
const ids = new Set(entries.map((e) => e.id));
if (ids.size !== entries.length) errors.push("Identifiants en double dans le registre.");

// 2. Recherche des usages dans le code
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = path.join(dir, d.name);
    if (d.isDirectory()) return walk(p);
    return /\.(tsx?|jsx?|mdx?)$/.test(d.name) ? [p] : [];
  });
}
const usages = new Map();
for (const file of walk(path.join(root, "src"))) {
  if (path.resolve(file) === MANIFEST) continue;
  const code = fs.readFileSync(file, "utf8");
  for (const m of code.matchAll(/["'`](p\d{2})["'`]/g)) {
    const list = usages.get(m[1]) ?? [];
    list.push(rel(file));
    usages.set(m[1], list);
  }
  if (/@\/assets\/photos\//.test(code) || /assets\/photos\/[^"']+\.(jpe?g|png|webp)/.test(code)) {
    errors.push(`${rel(file)} importe une photo directement : passez par photo-manifest.ts.`);
  }
}
for (const [id, files] of usages) {
  if (!ids.has(id)) errors.push(`Identifiant inconnu « ${id} » utilisé dans ${files.join(", ")}.`);
}
for (const e of entries) {
  const files = usages.get(e.id) ?? [];
  if (e.status === "used" && files.length === 0) errors.push(`${e.id} (${e.file}) est déclarée « used » mais n'est utilisée nulle part.`);
  if (files.length > 1) errors.push(`DOUBLON : ${e.id} (${e.file}) apparaît ${files.length} fois : ${files.join(", ")}.`);
  if (files.length === 1 && files[0] !== e.usedIn) errors.push(`${e.id} est utilisée dans ${files[0]} au lieu de ${e.usedIn}.`);
  if (!fs.existsSync(path.join(PHOTOS_DIR, e.file))) errors.push(`${e.id} : fichier manquant ${e.file}.`);
}

// 3. Doublons de fichiers (MD5 + dHash perceptuel)
const files = fs.readdirSync(PHOTOS_DIR).filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f));
const md5 = new Map();
for (const f of files) {
  const h = crypto
    .createHash("md5")
    .update(fs.readFileSync(path.join(PHOTOS_DIR, f)))
    .digest("hex");
  if (md5.has(h)) errors.push(`DOUBLON DE FICHIER : ${f} est identique à ${md5.get(h)}.`);
  md5.set(h, f);
}
let perceptual = "non vérifié (sharp indisponible)";
try {
  const { default: sharp } = await import("sharp");
  const hashes = [];
  for (const f of files) {
    const px = await sharp(path.join(PHOTOS_DIR, f)).greyscale().resize(9, 8, { fit: "fill" }).raw().toBuffer();
    let bits = 0n;
    for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) bits = (bits << 1n) | (px[y * 9 + x] > px[y * 9 + x + 1] ? 1n : 0n);
    hashes.push([f, bits]);
  }
  let minPair = null;
  for (let i = 0; i < hashes.length; i++)
    for (let j = i + 1; j < hashes.length; j++) {
      let x = hashes[i][1] ^ hashes[j][1];
      let d = 0;
      while (x) {
        d += Number(x & 1n);
        x >>= 1n;
      }
      if (!minPair || d < minPair[2]) minPair = [hashes[i][0], hashes[j][0], d];
      if (d <= 6) errors.push(`DOUBLON VISUEL probable : ${hashes[i][0]} ≈ ${hashes[j][0]} (distance dHash ${d}/64).`);
    }
  perceptual = `OK — paire la plus proche : ${minPair[0]} / ${minPair[1]} (distance ${minPair[2]}/64, seuil ≤ 6)`;
} catch (e) {
  perceptual = `non vérifié (${e.message})`;
}

// 4. Versions web à jour (npm run images) : une entrée par photo, empreinte identique au fichier source
const variantsSrc = fs.readFileSync(path.join(root, "src/data/photo-variants.generated.ts"), "utf8");
const variants = JSON.parse(
  variantsSrc
    .slice(variantsSrc.lastIndexOf("= {") + 2)
    .trim()
    .replace(/;\s*$/, ""),
);
for (const f of files) {
  const h = crypto
    .createHash("md5")
    .update(fs.readFileSync(path.join(PHOTOS_DIR, f)))
    .digest("hex")
    .slice(0, 8);
  const v = variants[f];
  if (!v) errors.push(`${f} : versions web absentes — lancez « npm run images ».`);
  else if (v.hash !== h) errors.push(`${f} : versions web périmées (photo modifiée) — lancez « npm run images ».`);
  else if (
    !fs.existsSync(path.join(root, "public", `${v.base}.jpg`)) ||
    !v.widths.every((w) => fs.existsSync(path.join(root, "public", `${v.base}-${w}.avif`)))
  )
    errors.push(`${f} : fichiers de public/img manquants — lancez « npm run images ».`);
}
console.log(`Versions web : ${Object.keys(variants).length} photos à jour dans public/img`);

// Rapport
const byPage = {};
for (const e of entries) (byPage[e.page] ??= []).push(e);
console.log("\nAudit des photographies — Moonlight Café");
console.log("─".repeat(72));
for (const [page, list] of Object.entries(byPage)) {
  console.log(`${page.padEnd(10)} ${String(list.length).padStart(2)} photo(s)`);
  for (const e of list) console.log(`  ${e.id}  ${e.file.padEnd(42)} → ${e.section}`);
}
console.log("─".repeat(72));
console.log(
  `Registre : ${entries.length} photos · utilisées : ${entries.filter((e) => (usages.get(e.id) ?? []).length === 1).length} · fichiers : ${files.length}`,
);
console.log(`Empreintes MD5 : ${md5.size === files.length ? "OK, aucun fichier identique" : "doublons détectés"}`);
console.log(`Hachage perceptuel : ${perceptual}`);
if (errors.length) {
  console.error(`\n✗ ${errors.length} problème(s) :`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log("\n✓ Aucun doublon : chaque photographie a un seul emplacement éditorial.\n");
