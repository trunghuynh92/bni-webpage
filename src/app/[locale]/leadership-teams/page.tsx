import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import Hero from "@/components/Hero";
import ResourceButton from "@/components/ResourceButton";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LeadershipTeamsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "LeadershipTeams" });
  const tn = await getTranslations({ locale, namespace: "Nav" });

  const roleLinks = [
    { label: tn("president"), href: "/leadership-teams/president" },
    { label: tn("vicePresident"), href: "/leadership-teams/vice-president" },
    { label: tn("treasurerSecretary"), href: "/leadership-teams/treasurer-secretary" },
    { label: tn("mentorCoordinator"), href: "/leadership-teams/mentor-coordinator" },
    { label: tn("mcEngagement"), href: "/leadership-teams/mc-engagement" },
    { label: tn("mcQualityAssurance"), href: "/leadership-teams/mc-quality-assurance" },
    { label: tn("mcRelations"), href: "/leadership-teams/mc-relations" },
    { label: tn("mcCommunityBuilder"), href: "/leadership-teams/mc-community-builder" },
    { label: tn("educationCoordinator"), href: "/leadership-teams/education-coordinator" },
    { label: tn("go4green"), href: "/leadership-teams/go4green" },
    { label: tn("growthEvents"), href: "/leadership-teams/growth-events" },
    { label: tn("visitorHosts"), href: "/leadership-teams/visitor-hosts" },
  ];

  return (
    <main>
      <Hero
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        buttons={[
          { label: t("forumLink"), href: "#", variant: "outlined" },
          { label: t("opsManual"), href: "#", variant: "outlined" },
        ]}
      />

      {/* Leadership Introduction Scripts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <ResourceButton
          label={t("introScripts")}
          href="#"
          variant="wide"
        />
      </section>

      {/* Your Leadership Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-bni-dark mb-10 tracking-tight">
          {t("sectionTitle")}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {roleLinks.map((role) => (
            <Link
              key={role.label}
              href={role.href}
              className="bg-bni-dark text-white rounded-xl p-6 font-semibold text-sm text-center border-l-4 border-l-transparent hover:border-l-bni-red transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              {role.label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
