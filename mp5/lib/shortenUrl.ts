"use server";

import type { urlRecord, ShortenResult } from "@/types";
import getCollection, { URLS_COLLECTION} from "@/db";


export default async function createShortUrl(
  url: string,
  alias: string,
): Promise<ShortenResult> {
  const trimmedUrl = url.trim();
  const trimmedAlias = alias.trim();

  const u: urlRecord = {
    url: trimmedUrl,
    alias: trimmedAlias,
  };

  const urlCollection = await getCollection(URLS_COLLECTION);

  // stop if its duplicate (cant have 2 aliases)
  const dupe = await urlCollection.findOne({ alias: trimmedAlias });
  
  if (dupe) {
    return { ok: false, error: "Alias already exists" };
  }

  const res = await urlCollection.insertOne(u);

  if (!res.acknowledged) {
    return { ok: false, error: "Failed to create URL record" };
  }
  // insertOne mutates `u` with `_id` (ObjectId); client needs plain JSON only
  return { ok: true, urlRecord: { url: u.url, alias: u.alias } };
}