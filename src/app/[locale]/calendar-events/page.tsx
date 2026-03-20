import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Hero from "@/components/Hero";
import ResourceButton from "@/components/ResourceButton";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function CalendarEventsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "CalendarEvents" });

  return (
    <main>
      <Hero
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        buttons={[]}
      />

      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <ResourceButton
          label={t("calendarButton")}
          href="#"
          variant="wide"
        />
      </section>
    </main>
  );
}
