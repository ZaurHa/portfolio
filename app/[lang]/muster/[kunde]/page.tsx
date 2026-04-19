import { redirect } from "next/navigation";

const kunden = ["klempner", "elektriker"];
const langs = ["de", "en"];

export async function generateStaticParams() {
  return langs.flatMap((lang) =>
    kunden.map((kunde) => ({ lang, kunde }))
  );
}

export default async function MusterRedirect({
  params,
}: {
  params: Promise<{ lang: string; kunde: string }>;
}) {
  const { kunde } = await params;
  redirect(`/muster/${kunde}`);
}
