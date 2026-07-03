import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import MemberProfileMagazine from "@/components/MemberProfileMagazine";
import { getMember, getMembers, localized } from "@/lib/members";

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
  const member = getMember(slug);
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
  const member = getMember(slug);
  if (!member) notFound();

  return <MemberProfileMagazine member={member} locale={locale} />;
}
