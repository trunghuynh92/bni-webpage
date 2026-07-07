// Content layer backed by a Google Sheet + Apps Script web app.
// Admins edit the sheet / Drive folder; the site re-reads it every few
// minutes (ISR). When CONTENT_API_URL is unset or unreachable, every
// consumer falls back to the content built into the repo, so the site
// can never break because of the sheet.

export interface RemoteStat {
  value: string;
  label_vi: string;
  label_en: string;
}

export interface RemoteSlide {
  id: string;
  name: string;
}

export type RemoteTexts = Record<string, string>;

// One row per member; keys mirror the sheet's column headers.
export type RemoteMemberRow = Record<string, string>;

export interface RemoteContent {
  slides: RemoteSlide[];
  stats: RemoteStat[];
  texts: RemoteTexts;
  members: RemoteMemberRow[];
}

export const CONTENT_REVALIDATE_SECONDS = 300;

export async function getRemoteContent(): Promise<RemoteContent | null> {
  const url = process.env.CONTENT_API_URL;
  if (!url) return null;
  const token = process.env.CONTENT_API_TOKEN ?? "";
  try {
    const res = await fetch(`${url}?token=${encodeURIComponent(token)}`, {
      next: { revalidate: CONTENT_REVALIDATE_SECONDS },
      // Apps Script redirects to script.googleusercontent.com
      redirect: "follow",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as RemoteContent & { error?: string };
    if (data.error) return null;
    return {
      slides: Array.isArray(data.slides) ? data.slides : [],
      stats: Array.isArray(data.stats) ? data.stats : [],
      texts: data.texts && typeof data.texts === "object" ? data.texts : {},
      members: Array.isArray(data.members) ? data.members : [],
    };
  } catch {
    return null;
  }
}

// Public image URL for a Drive file. Accepts a bare file ID or any of the
// common Drive link formats admins paste into the sheet.
export function driveImageUrl(idOrUrl: string, width = 1600): string | null {
  const v = idOrUrl.trim();
  if (!v) return null;
  let id = v;
  const m = v.match(/\/d\/([\w-]{20,})/) ?? v.match(/[?&]id=([\w-]{20,})/);
  if (m) id = m[1];
  else if (v.startsWith("http")) return v; // non-Drive URL: use as-is
  if (!/^[\w-]{20,}$/.test(id)) return null;
  return `https://drive.google.com/thumbnail?id=${id}&sz=w${width}`;
}
