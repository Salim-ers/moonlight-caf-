import Image from "next/image";
import { photos, type PhotoKey } from "@/data/gallery-data";
import type { Locale } from "@/i18n/config";

type Props = {
  id: PhotoKey;
  locale: Locale;
  sizes: string;
  className?: string;
  preload?: boolean;
  /** Remplace le point focal défini dans gallery-data. */
  focus?: string;
  /** Pour une image purement décorative (le texte voisin la décrit déjà). */
  decorative?: boolean;
  fill?: boolean;
};

/** Photo du café optimisée (AVIF/WebP, tailles responsive, flou de chargement, pas de CLS). */
export function Photo({ id, locale, sizes, className = "", preload, focus, decorative, fill = true }: Props) {
  const p = photos[id];
  return (
    <Image
      src={p.src}
      alt={decorative ? "" : p.alt[locale]}
      sizes={sizes}
      placeholder="blur"
      quality={82}
      preload={preload}
      {...(fill ? { fill: true } : {})}
      className={`${fill ? "object-cover" : "h-auto w-full"} ${className}`}
      style={{ objectPosition: focus ?? p.focus }}
    />
  );
}
