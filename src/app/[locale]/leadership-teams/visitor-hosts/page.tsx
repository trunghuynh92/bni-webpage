import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Hero from "@/components/Hero";
import ResourceButton from "@/components/ResourceButton";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function VisitorHostsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "VisitorHosts" });

  const beforeMeeting = [
    { label: t("b1"), href: "#" },
    { label: t("b2"), href: "#" },
    { label: t("b3"), href: "#" },
    { label: t("b4"), href: "#" },
  ];

  const registration = [
    { label: t("reg1"), href: "#" },
    { label: t("reg2"), href: "#" },
    { label: t("reg3"), href: "#" },
    { label: t("reg4"), href: "#" },
  ];

  const afterMeeting = [
    { label: t("a1"), href: "#" },
    { label: t("a2"), href: "#" },
    { label: t("a3"), href: "#" },
  ];

  const sections = [
    { title: t("beforeTitle"), items: beforeMeeting },
    { title: t("registrationTitle"), items: registration },
    { title: t("afterTitle"), items: afterMeeting },
  ];

  return (
    <main>
      <Hero
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        buttons={[
          { label: t("checklist"), href: "#", variant: "outlined" },
          { label: t("symposium"), href: "#", variant: "outlined" },
          { label: t("portalTraining"), href: "#", variant: "outlined" },
        ]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="flex items-center justify-center gap-2 text-lg font-extrabold text-bni-dark mb-6 uppercase tracking-wide">
                <span className="w-2.5 h-2.5 bg-bni-red rounded-full inline-block" />
                {section.title}
              </h3>
              <div className="flex flex-col gap-3">
                {section.items.map((item) => (
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
