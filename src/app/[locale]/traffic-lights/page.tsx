import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Hero from "@/components/Hero";
import ResourceButton from "@/components/ResourceButton";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function TrafficLightsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "TrafficLights" });

  const regions = [
    { title: t("district1"), label: t("district1Label"), href: "#" },
    { title: t("district2"), label: t("district2Label"), href: "#" },
    { title: t("district7"), label: t("district7Label"), href: "#" },
  ];

  return (
    <main>
      <Hero
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        buttons={[
          { label: t("forumLink"), href: "#", variant: "outlined" },
          { label: t("explained"), href: "#", variant: "outlined" },
        ]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {regions.map((region) => (
            <div
              key={region.title}
              className="bg-bni-dark rounded-2xl p-8 text-center"
            >
              <h3 className="text-lg font-extrabold text-white mb-6 uppercase tracking-wide">
                {region.title}
              </h3>
              <ResourceButton
                label={region.label}
                href={region.href}
                variant="outlined"
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
