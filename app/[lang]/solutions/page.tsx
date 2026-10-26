import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LoesungenHub from "../../../components/v3/LoesungenHub";
import { hubMetadata } from "../../../lib/loesungen-meta";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang: "en" }];
}

export async function generateMetadata(): Promise<Metadata> {
  return hubMetadata("en");
}

export default async function SolutionsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (lang !== "en") notFound();
  return <LoesungenHub lang="en" />;
}
