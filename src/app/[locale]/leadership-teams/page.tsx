import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { leadershipTeams } from "@/lib/leadership";
import { getMembersLive, initials } from "@/lib/members";

// Must be a literal for Next.js static analysis (= CONTENT_REVALIDATE_SECONDS)
export const revalidate = 300;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "LeadershipTeams" });
  return { title: `${t("heroTitle")} | BNI MASTER` };
}

export default async function LeadershipTeamsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "LeadershipTeams" });
  const pick = (text: { vi: string; en: string }) =>
    locale === "vi" ? text.vi : text.en;

  const members = await getMembersLive();
  const photoBySlug = new Map(members.map((m) => [m.slug, m.images.profile]));

  return (
    <main>
      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-bni-charcoal">
        <div className="absolute inset-0 bg-gradient-to-b from-bni-charcoal via-bni-dark to-bni-charcoal" />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-bni-red/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-bni-gold/5 rounded-full blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center">
          <p className="text-bni-gold text-sm font-bold uppercase tracking-[0.3em] mb-4 animate-fade-in-up">
            BNI MASTER
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-wide animate-fade-in-up">
            {t("heroTitle")}
          </h1>
          <p
            className="mt-5 text-lg text-white/60 max-w-2xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "150ms" }}
          >
            {t("heroSubtitle")}
          </p>
        </div>
      </section>

      {/* Teams */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 space-y-16 lg:space-y-20">
        {leadershipTeams.map((team) => (
          <section key={team.id} id={team.id}>
            <h2 className="text-2xl lg:text-3xl font-black text-bni-charcoal uppercase tracking-wide">
              {pick(team.title)}
            </h2>
            <div className="mt-2 h-1 w-12 rounded-full bg-gradient-to-r from-bni-red to-bni-gold" />

            <div
              className={`mt-8 grid gap-6 lg:gap-8 ${
                team.roles.length > 1 ? "md:grid-cols-2" : ""
              }`}
            >
              {team.roles.map((role) => (
                <article
                  key={role.title.vi}
                  className="rounded-2xl bg-white border border-black/5 shadow-md shadow-black/5 p-6 lg:p-8"
                >
                  <h3 className="text-lg lg:text-xl font-bold text-bni-charcoal">
                    {pick(role.title)}
                  </h3>

                  {/* People */}
                  <div className="mt-5 flex flex-wrap gap-x-6 gap-y-4">
                    {role.people.map((person) => {
                      const photo = person.slug
                        ? photoBySlug.get(person.slug)
                        : null;
                      const avatar = (
                        <span className="flex items-center gap-3">
                          <span className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-bni-dark to-bni-charcoal shrink-0 ring-2 ring-bni-gold/30">
                            {photo ? (
                              <Image
                                src={photo}
                                alt={person.name}
                                fill
                                sizes="48px"
                                className="object-cover object-top"
                              />
                            ) : (
                              <span className="absolute inset-0 flex items-center justify-center text-xs font-black text-white/60">
                                {initials(person.name)}
                              </span>
                            )}
                          </span>
                          <span className="text-sm font-semibold text-bni-charcoal group-hover:text-bni-red transition-colors duration-300">
                            {person.name}
                          </span>
                        </span>
                      );
                      return person.slug ? (
                        <Link
                          key={person.name}
                          href={`/members/${person.slug}`}
                          className="group"
                        >
                          {avatar}
                        </Link>
                      ) : (
                        <span key={person.name}>{avatar}</span>
                      );
                    })}
                  </div>

                  {/* Duties */}
                  <ul className="mt-5 space-y-2 border-t border-black/5 pt-5">
                    {role.duties.map((duty) => (
                      <li
                        key={duty.vi}
                        className="flex gap-2.5 text-sm text-bni-gray-dark leading-relaxed"
                      >
                        <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-bni-red shrink-0" />
                        {pick(duty)}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
