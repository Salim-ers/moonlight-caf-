import { preload as preloadImage } from "react-dom";
import { photoManifest, type PhotoId } from "@/data/photo-manifest";
import { photoVariants } from "@/data/photo-variants.generated";
import type { Locale } from "@/i18n/config";

type Props = {
  id: PhotoId;
  locale: Locale;
  sizes: string;
  className?: string;
  /** Image principale de la page (LCP) : préchargée en priorité haute, jamais différée. */
  preload?: boolean;
  /** Recadrage propre à cet emplacement (sinon le point focal du registre). */
  focus?: string;
  /** Le texte voisin décrit déjà l'image. */
  decorative?: boolean;
  /** `contain` : image entière (visionneuse). */
  fit?: "cover" | "contain";
};

/** Jeux de sources d'une photo, générés par `npm run images` (fichiers statiques, cache permanent). */
export function photoSources(file: string) {
  const v = photoVariants[file];
  if (!v) throw new Error(`Variantes manquantes pour ${file} : lancez « npm run images ».`);
  return {
    avif: v.widths.map((w) => `${v.base}-${w}.avif ${w}w`).join(", "),
    webp: v.widths.map((w) => `${v.base}-${w}.webp ${w}w`).join(", "),
    largestAvif: `${v.base}-${v.widths.at(-1)}.avif`,
    jpg: `${v.base}.jpg`,
    color: v.color,
    width: v.width,
    height: v.height,
  };
}

/**
 * Photo du café : AVIF (navigateurs récents) → WebP → JPEG (navigateurs anciens), tailles responsive,
 * couleur dominante pendant le chargement, dimensions réservées (pas de décalage de mise en page), chargement différé
 * hors de l'écran. Toujours en remplissage : le conteneur parent fixe le format et le masque.
 */
export function Photo({ id, locale, sizes, className = "", preload, focus, decorative, fit = "cover" }: Props) {
  const p = photoManifest[id];
  const s = photoSources(p.file);
  if (preload) preloadImage(s.largestAvif, { as: "image", imageSrcSet: s.avif, imageSizes: sizes, type: "image/avif", fetchPriority: "high" });
  return (
    <picture>
      <source type="image/avif" srcSet={s.avif} sizes={sizes} />
      <source type="image/webp" srcSet={s.webp} sizes={sizes} />
      <img
        src={s.jpg}
        alt={decorative ? "" : p.alt[locale]}
        width={s.width}
        height={s.height}
        loading={preload ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={preload ? "high" : "auto"}
        draggable={false}
        className={`absolute inset-0 h-full w-full ${fit === "contain" ? "object-contain" : "object-cover"} ${className}`}
        style={{
          objectPosition: focus ?? p.focus,
          ...(fit === "cover" ? { backgroundColor: s.color } : {}),
        }}
      />
    </picture>
  );
}
