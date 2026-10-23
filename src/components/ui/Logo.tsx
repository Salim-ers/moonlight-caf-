import Image from "next/image";

/**
 * Le logo officiel COMPLET (jeune femme, tasse, vapeur, lettrage « Moonlight café »),
 * détouré depuis le fichier original sans redessin. Un seul fichier (33 Ko) partagé par
 * l'en-tête, la transition de page et le pied de page : il n'est téléchargé qu'une fois.
 * `object-fit: contain` : le ratio d'origine est toujours respecté.
 */
export function Logo({
  className = "",
  light = false,
  preload = false,
  eager = false,
  alt = "Moonlight café",
}: {
  className?: string;
  light?: boolean;
  preload?: boolean;
  /** Chargé tout de suite même s'il est caché (impression) : Safari ne charge pas une image différée invisible. */
  eager?: boolean;
  alt?: string;
}) {
  return (
    <Image
      src="/brand/moonlight-logo.webp"
      alt={alt}
      width={900}
      height={637}
      unoptimized
      preload={preload}
      loading={preload ? undefined : eager ? "eager" : "lazy"}
      className={`object-contain ${light ? "logo-light" : ""} ${className}`}
    />
  );
}
