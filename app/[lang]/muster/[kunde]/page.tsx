import { redirect } from "next/navigation";

export default async function MusterRedirect({
  params,
}: {
  params: Promise<{ kunde: string }>;
}) {
  const { kunde } = await params;
  redirect(`/muster/${kunde}`);
}
