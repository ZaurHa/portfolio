import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LoesungView from "../../../../components/v3/LoesungView";
import { getLoesung, loesungen } from "../../../../lib/loesungen";
import { loesungMetadata } from "../../../../lib/loesungen-meta";

export const dynamicParams = false;

export function generateStaticParams() {
  return loesungen.de.map((l) => ({ lang: "de", slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const l = getLoesung("de", slug);
  return l ? loesungMetadata(l) : {};
}

export default async function LoesungSeite({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const l = getLoesung("de", slug);
  if (!l || lang !== "de") notFound();
  return <LoesungView l={l} />;
}
