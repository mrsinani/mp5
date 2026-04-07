export type urlRecord = {
    alias: string;
    url: string;
}

export type ShortenResult =
  | { ok: true; urlRecord: urlRecord }
  | { ok: false; error: string };