import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Hero from "@/components/Hero";
import ResourceGrid from "@/components/ResourceGrid";
import ResourceButton from "@/components/ResourceButton";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function PresidentPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "President" });

  const mainResources = [
    { label: t("r1"), href: "#" },
    { label: t("r2"), href: "#" },
    { label: t("r3"), href: "#" },
    { label: t("r4"), href: "#" },
    { label: t("r5"), href: "#" },
    { label: t("r6"), href: "#" },
    { label: t("r7"), href: "#" },
  ];

  const additionalResources = [
    { label: t("r8"), href: "#" },
    { label: t("r9"), href: "#" },
    { label: t("r10"), href: "#" },
  ];

  return (
    <main>
      <Hero
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        buttons={[
          { label: t("forumLink"), href: "#", variant: "outlined" },
          { label: t("checklist"), href: "#", variant: "outlined" },
          { label: t("script"), href: "#", variant: "outlined" },
          { label: t("agenda"), href: "#", variant: "outlined" },
        ]}
      />

      {/* Monthly Event Slides */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <ResourceButton
          label={t("monthlySlides")}
          href="#"
          variant="wide"
        />
      </section>

      {/* Main Resources - 4 columns */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ResourceGrid columns={4} resources={mainResources} />
      </section>

      {/* Additional Resources - 3 columns */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ResourceGrid columns={3} resources={additionalResources} />
      </section>

      {/* Agenda Flow Video */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <ResourceButton
          label={t("agendaVideo")}
          href="#"
          variant="wide"
        />
      </section>
    </main>
  );
}
