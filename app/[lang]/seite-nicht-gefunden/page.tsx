import NotFoundView from "../../../components/v3/NotFoundView";

/**
 * Statische Kopie der 404-Seite. scripts/postbuild.mjs kopiert sie nach out/404.html,
 * die Cloudflare Pages für unbekannte Adressen (mit Status 404) ausliefert.
 */
export const metadata = { title: "404 – Seite nicht gefunden", robots: { index: false, follow: true } };

export function generateStaticParams() {
  return [{ lang: "de" }];
}

export default function SeiteNichtGefunden() {
  return <NotFoundView />;
}
