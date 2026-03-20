import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Hero from "@/components/Hero";
import ResourceGrid from "@/components/ResourceGrid";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function VicePresidentPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "VicePresident" });

  const vpResources = [
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
    { label: t("r15"), href: "#" },
    { label: t("r16"), href: "#" },
    { label: t("r17"), href: "#" },
    { label: t("r18"), href: "#" },
    { label: t("r19"), href: "#" },
    { label: t("r20"), href: "#" },
    { label: t("r21"), href: "#" },
  ];

  return (
    <main>
      <Hero
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        buttons={[
          { label: t("video"), href: "#", variant: "outlined" },
          { label: t("script"), href: "#", variant: "outlined" },
          { label: t("checklist"), href: "#", variant: "outlined" },
          { label: t("opsManual"), href: "#", variant: "outlined" },
        ]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <ResourceGrid columns={4} resources={vpResources} />
      </section>
    </main>
  );
}
