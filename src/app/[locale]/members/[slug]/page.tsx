import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import MemberProfileMagazine from "@/components/MemberProfileMagazine";
import { getMemberLive, getMembers, localized } from "@/lib/members";

// Must be a literal for Next.js static analysis (= CONTENT_REVALIDATE_SECONDS)
export const revalidate = 300;

export function generateStaticParams() {
  const members = getMembers();
  return routing.locales.flatMap((locale) =>
    members.map((m) => ({ locale, slug: m.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const member = await getMemberLive(slug);
  if (!member) return {};
  return {
    title: `${member.name} | BNI MASTER`,
    description: localized(member.tagline, locale),
  };
}

export default async function MemberProfilePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const member = await getMemberLive(slug);
  if (!member) notFound();

  return <MemberProfileMagazine member={member} locale={locale} />;
}
