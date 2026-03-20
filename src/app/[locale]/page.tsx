import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import Hero from "@/components/Hero";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "HomePage" });

  const stats = [
    { value: "50+", label: t("statsActiveMembers") },
    { value: "1000+", label: t("statsReferrals") },
    { value: "$2M+", label: t("statsBusiness") },
    { value: "Weekly", label: t("statsMeetings") },
  ];

  const featureCards = [
    {
      icon: "\u{1F4CB}",
      title: t("featureMemberTitle"),
      description: t("featureMemberDesc"),
      href: "/member-resources" as const,
    },
    {
      icon: "\u{1F3C6}",
      title: t("featureLeaderTitle"),
      description: t("featureLeaderDesc"),
      href: "/leadership-teams" as const,
    },
    {
      icon: "\u{1F4C5}",
      title: t("featureEventsTitle"),
      description: t("featureEventsDesc"),
      href: "/calendar-events" as const,
    },
  ];

  const educationLinks = [
    t("edu1"), t("edu2"), t("edu3"), t("edu4"), t("edu5"),
    t("edu6"), t("edu7"), t("edu8"), t("edu9"),
  ];

  const socialLinks = [
    { name: "Facebook", cta: t("facebookCta"), href: "#" },
    { name: "LinkedIn", cta: t("linkedinCta"), href: "#" },
    { name: "YouTube", cta: t("youtubeCta"), href: "#" },
  ];

  return (
    <main>
      {/* Hero */}
      <Hero
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        buttons={[
          { label: t("joinMeeting"), href: "#", variant: "wide" },
        ]}
      />

      {/* Stats Bar */}
      <section className="w-full bg-bni-dark border-t border-bni-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl sm:text-5xl font-extrabold text-bni-gold mb-2 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base text-white uppercase tracking-widest font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unlock Your Potential */}
      <section className="w-full bg-bni-warm-white py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-bni-dark tracking-tight">
              {t("unlockTitle")}
            </h2>
            <p className="mt-4 text-lg text-bni-gray max-w-2xl mx-auto">
              {t("unlockSubtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featureCards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="group bg-bni-dark rounded-2xl p-8 hover:ring-2 hover:ring-bni-red transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="w-14 h-14 bg-bni-red rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">{card.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-bni-gold transition-colors">
                  {card.title}
                </h3>
                <p className="text-bni-gray text-sm leading-relaxed mb-4">
                  {card.description}
                </p>
                <span className="text-bni-red font-semibold text-sm group-hover:underline">
                  {t("explore")} &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sharpen Your Edge */}
      <section className="w-full bg-bni-gray-light py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-bni-dark tracking-tight">
              {t("sharpenTitle")}
            </h2>
            <p className="mt-4 text-lg text-bni-gray max-w-2xl mx-auto">
              {t("sharpenSubtitle")}
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {educationLinks.map((title) => (
              <a
                key={title}
                href="#"
                className="group bg-bni-dark rounded-xl p-5 border-l-4 border-l-transparent hover:border-l-bni-red transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <span className="text-white text-sm font-medium leading-snug group-hover:text-bni-gold transition-colors">
                  {title}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Connect With Us */}
      <section className="w-full bg-bni-warm-white py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-bni-dark tracking-tight">
              {t("connectTitle")}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-bni-dark rounded-2xl p-8 text-center hover:ring-2 hover:ring-bni-gold transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="w-14 h-14 bg-bni-red/20 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-bni-red/40 transition-colors">
                  <span className="text-bni-red font-bold text-xl">
                    {link.name[0]}
                  </span>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{link.name}</h3>
                <p className="text-bni-gray text-sm">{link.cta}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="w-full bg-bni-charcoal relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-bni-red/10 via-transparent to-bni-red/10" />
        <div className="absolute left-0 top-0 w-full h-1 bg-gradient-to-r from-bni-red via-bni-gold to-bni-red" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
            {t("ctaTitle")}
          </h2>
          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
            {t("ctaSubtitle")}
          </p>
          <a
            href="#"
            className="inline-flex items-center justify-center bg-bni-red hover:bg-bni-red-dark text-white font-bold text-lg px-12 py-4 rounded-xl transition-all duration-200 shadow-lg shadow-bni-red/25 hover:shadow-bni-red/40 hover:scale-105"
          >
            {t("ctaButton")}
          </a>
        </div>
      </section>
    </main>
  );
}
