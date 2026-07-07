import fs from "fs";
import path from "path";
import {
  driveImageUrl,
  getRemoteContent,
  type RemoteMemberRow,
} from "./content-api";

export interface LocalizedText {
  vi: string;
  en: string;
}

export interface MemberSection {
  key:
    | "about"
    | "business"
    | "journey"
    | "achievements"
    | "vision"
    | "philosophy"
    | "customers"
    | "referrals";
  vi: string;
  en: string;
}

export interface MemberImages {
  logo: string | null;
  profile: string | null;
  business: string[];
}

export interface MemberStat {
  value: string;
  label: LocalizedText;
}

export interface MemberCallout {
  afterKey: MemberSection["key"];
  sourceKey: MemberSection["key"];
  quote: LocalizedText;
}

export interface Member {
  slug: string;
  name: string;
  jobTitle: LocalizedText;
  company: string;
  industry: LocalizedText;
  founded: string | null;
  phone: string | null;
  email: string | null;
  tagline: LocalizedText;
  shortName?: string;
  stats?: MemberStat[];
  callouts?: MemberCallout[];
  sections: MemberSection[];
  images: MemberImages;
}

// Short given name for the connect CTA. Vietnamese names put the given name
// last; parentheticals like "(Huệ Yose)" are stripped before taking it.
export function connectName(member: Member): string {
  if (member.shortName) return member.shortName;
  const base = member.name.replace(/\(.*?\)/g, "").trim();
  return base.split(/\s+/).pop() ?? member.name;
}

const contentDir = path.join(process.cwd(), "src/content/members");
const publicDir = path.join(process.cwd(), "public");

function imagesFor(slug: string): MemberImages {
  const base = `/members/${slug}`;
  const exists = (file: string) =>
    fs.existsSync(path.join(publicDir, "members", slug, file));

  return {
    logo: exists("logo.jpg") ? `${base}/logo.jpg` : null,
    profile: exists("profile.jpg") ? `${base}/profile.jpg` : null,
    business: [1, 2, 3, 4]
      .map((n) => `business-${n}.jpg`)
      .filter(exists)
      .map((f) => `${base}/${f}`),
  };
}

export function getMembers(): Member[] {
  const files = fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith(".json"));

  const members = files.map((f) => {
    const data = JSON.parse(
      fs.readFileSync(path.join(contentDir, f), "utf8")
    ) as Omit<Member, "images">;
    return { ...data, images: imagesFor(data.slug) };
  });

  return members.sort((a, b) => a.name.localeCompare(b.name, "vi"));
}

export function getMember(slug: string): Member | undefined {
  return getMembers().find((m) => m.slug === slug);
}

// Apply one sheet row to a repo member. By design the sheet can ONLY change
// photos (and visibility, handled by the caller) — profile text is managed in
// the repo so the polished copy can't be accidentally edited. Photo cells:
// non-empty Drive link wins; empty keeps the photo built into the site.
function applyRow(base: Member | undefined, row: RemoteMemberRow): Member | null {
  if (!base) return null; // members can't be created from the sheet
  const m = structuredClone(base);
  const cell = (k: string) => (row[k] ?? "").trim();

  const img = (k: string, width?: number) => {
    const v = cell(k);
    return v ? driveImageUrl(v, width) : null;
  };
  m.images.profile = img("profilePhoto", 1200) ?? m.images.profile;
  m.images.logo = img("logoPhoto", 600) ?? m.images.logo;
  const business = [1, 2, 3, 4].map((n) => img(`businessPhoto${n}`, 1600));
  if (business.some(Boolean)) {
    // Any business-photo cell filled → the four cells replace the repo set
    m.images.business = business.filter((b): b is string => Boolean(b));
  }

  return m;
}

// Members with sheet overrides applied. Falls back to repo content when the
// sheet is unreachable. Rows with visible = no/hide/0 are excluded.
export async function getMembersLive(): Promise<Member[]> {
  const base = getMembers();
  const remote = await getRemoteContent();
  if (!remote || remote.members.length === 0) return base;

  const bySlug = new Map(base.map((m) => [m.slug, m]));
  const hidden = new Set<string>();
  for (const row of remote.members) {
    const slug = (row.slug ?? "").trim();
    if (!slug) continue;
    if (/^(no|hide|hidden|0|false)$/i.test((row.visible ?? "").trim())) {
      hidden.add(slug);
      continue;
    }
    const merged = applyRow(bySlug.get(slug), row);
    if (merged) bySlug.set(slug, merged);
  }
  return [...bySlug.values()]
    .filter((m) => !hidden.has(m.slug))
    .sort((a, b) => a.name.localeCompare(b.name, "vi"));
}

export async function getMemberLive(slug: string): Promise<Member | undefined> {
  return (await getMembersLive()).find((m) => m.slug === slug);
}

// TEMPORARY: English is turned off for member profile pages — all member
// content renders in Vietnamese on both locales. To re-enable English,
// change this to `return locale;`.
export function memberContentLocale(locale: string): string {
  void locale;
  return "vi";
}

export function localized(text: LocalizedText, locale: string): string {
  return memberContentLocale(locale) === "vi" ? text.vi : text.en;
}

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}
