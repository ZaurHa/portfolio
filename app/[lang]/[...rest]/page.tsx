import { notFound } from "next/navigation";

// Fängt alle unbekannten Pfade unter /de und /en ab, damit die gestaltete 404 greift.
export default function CatchAll() {
  notFound();
}
