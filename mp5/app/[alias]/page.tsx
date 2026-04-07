import getCollection, { URLS_COLLECTION } from "@/db";
import { redirect } from "next/navigation";

export default async function RedirectPage({
  params,
}: {
  params: Promise<{ alias: string }>;
}) {
  const { alias: rawAlias } = await params;
  const alias = decodeURIComponent(rawAlias).trim();
  const urlCollection = await getCollection(URLS_COLLECTION);
  const url = await urlCollection.findOne({ alias });

  if (!url?.url) {
    redirect("/error");
  }

  redirect(url.url);
}
