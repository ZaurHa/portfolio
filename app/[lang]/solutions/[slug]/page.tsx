import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LoesungView from "../../../../components/v3/LoesungView";
import { getLoesung, loesungen } from "../../../../lib/loesungen";
import { loesungMetadata } from "../../../../lib/loesungen-meta";

export const dynamicParams = false;

export function generateStaticParams() {
  return loesungen.en.map((l) => ({ lang: "en", slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const l = getLoesung("en", slug);
  return l ? loesungMetadata(l) : {};
}

export default async function SolutionPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const l = getLoesung("en", slug);
  if (!l || lang !== "en") notFound();
  return <LoesungView l={l} />;
}
