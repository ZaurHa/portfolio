import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "../../../lib/seo";
import { ausgaben, neuesteAusgabe } from "../../../lib/ki-chancen";
import KiAusgabe from "../../../components/v3/KiAusgabe";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang: "de" }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const a = neuesteAusgabe();
  return pageMetadata({
    lang,
    path: "/ki-chancen",
    title: "KI-Chancen der Woche | Mit KI Geld verdienen",
    description: `Ausgabe ${a.nr}/${a.jahr}: geprüfte Chancen, mit KI Geld zu verdienen. Wer zahlt wofür, was es kostet, wann der erste Euro kommt. Von BrandWerkX, ohne Hype.`,
    onlyDe: true,
  });
}

export default async function KiChancen({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (lang !== "de") notFound();
  return <KiAusgabe ausgabe={neuesteAusgabe()} archiv={ausgaben.slice(1)} url="/de/ki-chancen" />;
}
