import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Hero from "@/components/Hero";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function TreasurerSecretaryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "TreasurerSecretary" });
  const tp = await getTranslations({ locale, namespace: "Placeholder" });

  return (
    <main>
      <Hero title={t("heroTitle")} subtitle={t("heroSubtitle")} buttons={[{ label: t("checklist"), href: "#" }]} />
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <div className="bg-bni-dark rounded-2xl p-12">
          <p className="text-bni-gray text-lg">{tp("comingSoon")}</p>
          <p className="text-bni-gray-dark mt-2">{tp("checkBack")}</p>
        </div>
      </section>
    </main>
  );
}
