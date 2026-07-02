import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getMember, getMembers, initials, localized } from "@/lib/members";

export function generateStaticParams() {
  const members = getMembers();
  return routing.locales.flatMap((locale) =>
    members.map((m) => ({ locale, slug: m.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const member = getMember(slug);
  if (!member) return {};
  return {
    title: `${member.name} | BNI MASTER`,
    description: localized(member.tagline, locale),
  };
}

export default async function MemberProfilePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const member = getMember(slug);
  if (!member) notFound();

  const t = await getTranslations({ locale, namespace: "Members" });
  const phoneHref = member.phone ? `tel:+84${member.phone.replace(/\D/g, "").replace(/^0/, "")}` : null;

  return (
    <main>
      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-bni-charcoal">
        <div className="absolute inset-0 bg-gradient-to-b from-bni-charcoal via-bni-dark to-bni-charcoal" />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-bni-red/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-bni-gold/5 rounded-full blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14 lg:pt-14 lg:pb-20">
          <Link
            href="/members"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/50 hover:text-white uppercase tracking-wider transition-colors duration-300"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            {t("backToMembers")}
          </Link>

          <div className="mt-8 flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
            {/* Portrait */}
            <div className="relative w-44 h-56 sm:w-52 sm:h-64 lg:w-60 lg:h-[19rem] shrink-0 rounded-3xl overflow-hidden ring-1 ring-white/15 shadow-2xl shadow-black/40 animate-fade-in-up">
              {member.images.profile ? (
                <Image
                  src={member.images.profile}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 176px, 240px"
                  priority
                  className="object-cover object-top"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-bni-dark to-bni-charcoal">
                  <span className="text-6xl font-black text-white/25 tracking-wider">
                    {initials(member.name)}
                  </span>
                </div>
              )}
            </div>

            {/* Identity */}
            <div className="flex-1 animate-fade-in-up" style={{ animationDelay: "120ms" }}>
              <p className="inline-block rounded-full border border-bni-gold/40 px-4 py-1.5 text-bni-gold text-xs font-bold uppercase tracking-[0.2em]">
                {localized(member.industry, locale)}
              </p>
              <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-wide">
                {member.name}
              </h1>
              <p className="mt-3 text-lg text-white/70 font-semibold">
                {localized(member.jobTitle, locale)}
                <span className="text-white/40 font-normal"> · </span>
                <span className="text-bni-gold-light">{member.company}</span>
              </p>
              <p className="mt-5 text-white/60 text-base lg:text-lg leading-relaxed max-w-2xl">
                “{localized(member.tagline, locale)}”
              </p>

              {/* Contact chips */}
              <div className="mt-7 flex flex-wrap gap-3">
                {member.phone && phoneHref && (
                  <a
                    href={phoneHref}
                    className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/15 px-4 py-2 text-sm text-white/80 hover:bg-bni-red hover:border-bni-red hover:text-white transition-all duration-300"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {member.phone}
                  </a>
                )}
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/15 px-4 py-2 text-sm text-white/80 hover:bg-bni-red hover:border-bni-red hover:text-white transition-all duration-300"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {member.email}
                  </a>
                )}
                {member.founded && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/15 px-4 py-2 text-sm text-white/60">
                    {t("foundedIn", { year: member.founded })}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">
          {/* Sections */}
          <div className="lg:col-span-2 space-y-10">
            {member.sections.map((section) => (
              <article key={section.key}>
                <h2 className="text-xl lg:text-2xl font-black text-bni-charcoal uppercase tracking-wide">
                  {t(`sections.${section.key}`)}
                </h2>
                <div className="mt-2 h-1 w-12 rounded-full bg-gradient-to-r from-bni-red to-bni-gold" />
                <p className="mt-4 text-bni-gray-dark leading-relaxed whitespace-pre-line">
                  {locale === "vi" ? section.vi : section.en}
                </p>
              </article>
            ))}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-28 self-start">
            <div className="rounded-2xl bg-white border border-black/5 shadow-md shadow-black/5 p-6">
              {member.images.logo && (
                <div className="relative h-24 mb-6">
                  <Image
                    src={member.images.logo}
                    alt={`${member.company} logo`}
                    fill
                    sizes="300px"
                    className="object-contain object-left"
                  />
                </div>
              )}
              <h3 className="text-sm font-bold uppercase tracking-widest text-bni-gray">
                {t("quickFacts")}
              </h3>
              <dl className="mt-4 space-y-4 text-sm">
                <div>
                  <dt className="font-semibold text-bni-gray">{t("company")}</dt>
                  <dd className="mt-0.5 text-bni-charcoal font-semibold">{member.company}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-bni-gray">{t("industry")}</dt>
                  <dd className="mt-0.5 text-bni-charcoal">{localized(member.industry, locale)}</dd>
                </div>
                {member.founded && (
                  <div>
                    <dt className="font-semibold text-bni-gray">{t("founded")}</dt>
                    <dd className="mt-0.5 text-bni-charcoal">{member.founded}</dd>
                  </div>
                )}
                {member.phone && (
                  <div>
                    <dt className="font-semibold text-bni-gray">{t("phone")}</dt>
                    <dd className="mt-0.5 text-bni-charcoal">{member.phone}</dd>
                  </div>
                )}
                {member.email && (
                  <div>
                    <dt className="font-semibold text-bni-gray">{t("email")}</dt>
                    <dd className="mt-0.5 text-bni-charcoal break-all">{member.email}</dd>
                  </div>
                )}
              </dl>
            </div>

            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="block rounded-2xl bg-bni-charcoal p-6 text-center hover:bg-bni-red transition-colors duration-300 group"
              >
                <p className="text-white font-black uppercase tracking-wider">
                  {t("connectCta", { name: member.name.split(" ").pop() ?? member.name })}
                </p>
                <p className="mt-1 text-white/50 text-sm group-hover:text-white/80 transition-colors duration-300">
                  {t("connectSubtitle")}
                </p>
              </a>
            )}
          </aside>
        </div>

        {/* Business gallery */}
        {member.images.business.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl lg:text-2xl font-black text-bni-charcoal uppercase tracking-wide">
              {t("gallery")}
            </h2>
            <div className="mt-2 h-1 w-12 rounded-full bg-gradient-to-r from-bni-red to-bni-gold" />
            <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
              {member.images.business.map((src, i) => (
                <div
                  key={src}
                  className="relative aspect-square rounded-2xl overflow-hidden bg-bni-gray-light group"
                >
                  <Image
                    src={src}
                    alt={`${member.company} ${i + 1}`}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
