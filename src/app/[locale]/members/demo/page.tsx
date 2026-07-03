import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// The magazine design demo has been rolled out to all member pages;
// keep old /members/demo links working by pointing at Clara's profile.
export default async function MemberDemoRedirect({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(
    locale === routing.defaultLocale
      ? "/members/clara-thu-nguyen"
      : `/${locale}/members/clara-thu-nguyen`
  );
}
