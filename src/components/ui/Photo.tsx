import Image from "next/image";
import { photoManifest, type PhotoId } from "@/data/photo-manifest";
import type { Locale } from "@/i18n/config";

type Props = {
  id: PhotoId;
  locale: Locale;
  sizes: string;
  className?: string;
  /** Image principale de la page (LCP) : préchargée. */
  preload?: boolean;
  /** Recadrage propre à cet emplacement (sinon le point focal du registre). */
  focus?: string;
  /** Le texte voisin décrit déjà l'image. */
  decorative?: boolean;
  quality?: 60 | 72;
};

/**
 * Photo du café optimisée : AVIF/WebP, tailles responsive, flou de chargement, dimensions réservées (pas de CLS).
 * Toujours en `fill` : le conteneur parent fixe le format et le masque.
 */
export function Photo({ id, locale, sizes, className = "", preload, focus, decorative, quality = 60 }: Props) {
  const p = photoManifest[id];
  return (
    <Image
      src={p.src}
      alt={decorative ? "" : p.alt[locale]}
      sizes={sizes}
      placeholder="blur"
      quality={quality}
      preload={preload}
      fill
      className={`object-cover ${className}`}
      style={{ objectPosition: focus ?? p.focus }}
    />
  );
}
