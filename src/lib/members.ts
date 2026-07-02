import fs from "fs";
import path from "path";

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
  sections: MemberSection[];
  images: MemberImages;
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

export function localized(text: LocalizedText, locale: string): string {
  return locale === "vi" ? text.vi : text.en;
}

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}
