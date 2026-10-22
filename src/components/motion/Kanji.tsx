import { KANJI, type KanjiChar } from "./kanji-paths";

/**
 * Idéogramme japonais dessiné en SVG (tracés de Shippori Mincho) : décoratif,
 * aucun téléchargement de police CJK. Toujours accompagné d'un texte accessible ailleurs.
 */
export function Kanji({ char, className = "" }: { char: KanjiChar; className?: string }) {
  return (
    <svg viewBox="0 -40 1000 1000" className={className} aria-hidden="true" focusable="false">
      <path d={KANJI[char]} transform="matrix(1 0 0 -1 0 880)" fill="currentColor" />
    </svg>
  );
}
