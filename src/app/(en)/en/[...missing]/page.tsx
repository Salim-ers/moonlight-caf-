import { notFound } from "next/navigation";

/** Toute URL inconnue affiche la page 404 dans la bonne langue. */
export default function Missing() {
  notFound();
}
