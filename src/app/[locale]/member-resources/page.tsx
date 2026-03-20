import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Hero from "@/components/Hero";
import ResourceGrid from "@/components/ResourceGrid";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function MemberResourcesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "MemberResources" });

  const memberResources = [
    { label: t("r1"), href: "#" },
    { label: t("r2"), href: "#" },
    { label: t("r3"), href: "#" },
    { label: t("r4"), href: "#" },
    { label: t("r5"), href: "#" },
    { label: t("r6"), href: "#" },
    { label: t("r7"), href: "#" },
    { label: t("r8"), href: "#" },
    { label: t("r9"), href: "#" },
    { label: t("r10"), href: "#" },
    { label: t("r11"), href: "#" },
    { label: t("r12"), href: "#" },
    { label: t("r13"), href: "#" },
    { label: t("r14"), href: "#" },
  ];

  return (
    <main>
      <Hero
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        buttons={[
          { label: t("mspGuide"), href: "#", variant: "outlined" },
          { label: t("bniAcademy"), href: "#", variant: "outlined" },
        ]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-bni-dark mb-10 tracking-tight">
          {t("sectionTitle")}
        </h2>
        <ResourceGrid columns={4} resources={memberResources} />
      </section>
    </main>
  );
}
