import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "../../../../lib/seo";
import { ausgaben, ausgabeZuSlug, neuesteAusgabe } from "../../../../lib/ki-chancen";
import KiAusgabe from "../../../../components/v3/KiAusgabe";

export const dynamicParams = false;

export function generateStaticParams() {
  return ausgaben.map((a) => ({ lang: "de", ausgabe: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; ausgabe: string }> }): Promise<Metadata> {
  const { lang, ausgabe } = await params;
  const a = ausgabeZuSlug(ausgabe);
  if (!a) return {};
  // Die neueste Ausgabe steht auch unter /de/ki-chancen: dorthin zeigt die Canonical (kein doppelter Inhalt)
  const istNeueste = a.slug === neuesteAusgabe().slug;
  return pageMetadata({
    lang,
    path: istNeueste ? "/ki-chancen" : `/ki-chancen/${a.slug}`,
    title: `KI-Chancen Ausgabe ${a.nr}/${a.jahr} | Mit KI Geld verdienen`,
    description: `${a.chancen.map((c) => `${c.titel} ${c.titelAkzent}`).join(", ")}. Geprüfte KI-Chancen vom ${a.datum}, von BrandWerkX.`,
    onlyDe: true,
  });
}

export default async function KiChancenAusgabe({ params }: { params: Promise<{ lang: string; ausgabe: string }> }) {
  const { lang, ausgabe } = await params;
  const a = ausgabeZuSlug(ausgabe);
  if (!a || lang !== "de") notFound();
  return <KiAusgabe ausgabe={a} archiv={ausgaben.filter((x) => x.slug !== a.slug)} url={`/de/ki-chancen/${a.slug}`} />;
}
