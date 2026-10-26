import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LoesungenHub from "../../../components/v3/LoesungenHub";
import { hubMetadata } from "../../../lib/loesungen-meta";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang: "de" }];
}

export async function generateMetadata(): Promise<Metadata> {
  return hubMetadata("de");
}

export default async function LoesungenSeite({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (lang !== "de") notFound();
  return <LoesungenHub lang="de" />;
}
