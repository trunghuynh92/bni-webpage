import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Hero from "@/components/Hero";
import ResourceButton from "@/components/ResourceButton";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function EducationCoordinatorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "EducationCoordinator" });

  const podcasts = [
    { label: t("p1"), href: "#" },
    { label: t("p2"), href: "#" },
    { label: t("p3"), href: "#" },
  ];

  const educationCampaigns = [
    { label: t("c1"), href: "#" },
    { label: t("c2"), href: "#" },
    { label: t("c3"), href: "#" },
  ];

  const websites = [
    { label: t("w1"), href: "#" },
    { label: t("w2"), href: "#" },
    { label: t("w3"), href: "#" },
  ];

  const powerPoints = [
    { label: t("pp1"), href: "#" },
    { label: t("pp2"), href: "#" },
    { label: t("pp3"), href: "#" },
  ];

  const categories = [
    { title: t("podcastsTitle"), items: podcasts },
    { title: t("campaignsTitle"), items: educationCampaigns },
    { title: t("websitesTitle"), items: websites },
    { title: t("powerPointsTitle"), items: powerPoints },
  ];

  return (
    <main>
      <Hero
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        buttons={[
          { label: t("checklist"), href: "#", variant: "outlined" },
          { label: t("slideDeck"), href: "#", variant: "outlined" },
        ]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {categories.map((category) => (
            <div key={category.title}>
              <h3 className="flex items-center justify-center gap-2 text-lg font-extrabold text-bni-dark mb-6 uppercase tracking-wide">
                <span className="w-2.5 h-2.5 bg-bni-red rounded-full inline-block" />
                {category.title}
              </h3>
              <div className="flex flex-col gap-3">
                {category.items.map((item) => (
                  <ResourceButton
                    key={item.label}
                    label={item.label}
                    href={item.href}
                    variant="filled"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
