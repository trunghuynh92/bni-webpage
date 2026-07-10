import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getMembersLive } from "@/lib/members";
import { siteConfig } from "@/lib/site-data";

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
  const t = await getTranslations({ locale, namespace: "About" });
  return { title: `${t("metaTitle")} | BNI MASTER` };
}

function SectionMark({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-bni-red font-black text-sm tracking-widest">
        {number}
      </span>
      <span className="h-px w-10 bg-bni-red" />
      <span className="text-xs font-bold uppercase tracking-[0.3em] text-bni-gray">
        {label}
      </span>
    </div>
  );
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "About" });
  const members = await getMembersLive();

  const facts = [
    { value: t("fact1Value"), label: t("fact1Label") },
    { value: t("fact2Value"), label: t("fact2Label") },
    { value: `${members.length}`, label: t("fact3Label") },
    { value: t("fact4Value"), label: t("fact4Label") },
  ];

  const values = [
    { title: t("value1Title"), native: t("value1Native"), desc: t("value1Desc") },
    { title: t("value2Title"), native: t("value2Native"), desc: t("value2Desc") },
    { title: t("value3Title"), native: t("value3Native"), desc: t("value3Desc") },
  ];

  const powerItems = [
    { value: t("power1Value"), label: t("power1Label") },
    { value: t("power2Value"), label: t("power2Label") },
    { value: t("power3Value"), label: t("power3Label") },
    { value: t("power4Value"), label: t("power4Label") },
    { value: t("power5Value"), label: t("power5Label") },
  ];

  const standards = [t("std1"), t("std2"), t("std3"), t("std4")];

  return (
    <main>
      {/* Magazine cover hero */}
      <section className="relative w-full overflow-hidden bg-bni-charcoal">
        <div className="absolute inset-0 bg-gradient-to-b from-bni-charcoal via-bni-dark to-bni-charcoal" />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-bni-red/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] bg-bni-gold/5 rounded-full blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36 text-center">
          <div className="flex items-center justify-center gap-4 animate-fade-in-up">
            <span className="h-px w-12 bg-bni-gold/60" />
            <p className="text-bni-gold text-xs sm:text-sm font-bold uppercase tracking-[0.35em]">
              {t("kicker")}
            </p>
            <span className="h-px w-12 bg-bni-gold/60" />
          </div>

          <h1 className="mt-8 text-5xl sm:text-7xl lg:text-8xl font-black text-white uppercase tracking-tight animate-fade-in-up">
            {t("heroTitle")}
          </h1>

          <p
            className="mt-8 font-serif italic text-xl sm:text-2xl text-white/70 animate-fade-in-up"
            style={{ animationDelay: "150ms" }}
          >
            “{t("heroTagline")}”
          </p>

          <div
            className="mt-12 inline-flex items-center gap-3 border-y border-white/15 py-3 px-2 animate-fade-in-up"
            style={{ animationDelay: "300ms" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-bni-red" />
            <p className="text-white/50 text-xs sm:text-sm uppercase tracking-[0.25em]">
              {t("heroIssue")}
            </p>
            <span className="w-1.5 h-1.5 rounded-full bg-bni-red" />
          </div>
        </div>
      </section>

      {/* Facts strip */}
      <section className="w-full bg-bni-dark border-t border-bni-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:divide-x lg:divide-white/10">
            {facts.map((fact) => (
              <div key={fact.label} className="text-center lg:px-4">
                <div className="text-3xl sm:text-4xl font-extrabold text-bni-gold tracking-tight">
                  {fact.value}
                </div>
                <div className="mt-2 text-xs sm:text-sm text-white/70 uppercase tracking-widest font-medium">
                  {fact.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 01 — Editorial story */}
      <section className="w-full bg-bni-warm-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionMark number={t("storyNumber")} label={t("storyLabel")} />

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h2 className="text-3xl sm:text-5xl font-black text-bni-charcoal tracking-tight">
                {t("storyTitle")}
              </h2>
              <p className="mt-8 text-lg text-bni-gray-dark leading-relaxed first-letter:float-left first-letter:mr-3 first-letter:text-7xl first-letter:font-black first-letter:leading-[0.8] first-letter:text-bni-red">
                {t("storyP1")}
              </p>
              <p className="mt-6 text-lg text-bni-gray-dark leading-relaxed">
                {t("storyP2")}
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-10 lg:pt-4">
              {/* Pull quote */}
              <blockquote className="border-l-4 border-bni-red pl-6 py-2">
                <p className="font-serif italic text-2xl sm:text-[1.7rem] leading-snug text-bni-charcoal">
                  {t("pullQuote")}
                </p>
              </blockquote>

              {/* Slogan card */}
              <div className="bg-bni-charcoal rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-bni-red/15 rounded-full blur-[60px]" />
                <p className="relative text-xs font-bold uppercase tracking-[0.3em] text-bni-gold">
                  {t("sloganLabel")}
                </p>
                <p className="relative mt-4 text-2xl font-black text-white tracking-tight">
                  Be Happy,
                  <br />
                  <span className="gradient-text">think Master.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission band */}
      <section className="w-full bg-bni-charcoal relative overflow-hidden">
        <div className="absolute left-0 top-0 w-full h-1 bg-gradient-to-r from-bni-red via-bni-gold to-bni-red" />
        <div className="absolute inset-0 bg-gradient-to-r from-bni-red/10 via-transparent to-bni-red/10" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 text-center">
          <p className="text-bni-gold text-xs font-bold uppercase tracking-[0.35em]">
            {t("missionLabel")}
          </p>
          <p className="mt-6 font-serif italic text-2xl sm:text-3xl lg:text-4xl leading-snug text-white">
            “{t("missionText")}”
          </p>
        </div>
      </section>

      {/* 02 — Core values */}
      <section className="w-full bg-bni-warm-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionMark number={t("valuesNumber")} label={t("valuesLabel")} />
          <h2 className="mt-8 text-3xl sm:text-5xl font-black text-bni-charcoal tracking-tight">
            {t("valuesTitle")}
          </h2>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
            {values.map((value, i) => (
              <div
                key={value.title}
                className="relative border-t-2 border-bni-charcoal pt-8"
              >
                <span
                  aria-hidden
                  className="absolute -top-7 right-0 text-8xl font-black text-bni-charcoal/[0.06] select-none leading-none"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-bni-red">
                  {value.native}
                </p>
                <h3 className="mt-3 text-2xl font-black text-bni-charcoal uppercase tracking-wide">
                  {value.title}
                </h3>
                <p className="mt-4 text-bni-gray-dark leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — Power of One */}
      <section className="w-full bg-bni-gray-light py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionMark number={t("powerNumber")} label={t("powerLabel")} />
          <div className="mt-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className="text-3xl sm:text-5xl font-black text-bni-charcoal tracking-tight">
              {t("powerTitle")}
            </h2>
            <p className="text-bni-gray max-w-md lg:text-right">
              {t("powerSubtitle")}
            </p>
          </div>

          <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {powerItems.map((item) => (
              <div
                key={item.label}
                className="group bg-bni-dark rounded-2xl p-6 text-center hover:ring-2 hover:ring-bni-red transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="text-4xl font-extrabold text-bni-gold tracking-tight group-hover:scale-110 transition-transform">
                  {item.value}
                </div>
                <div className="mt-3 text-xs sm:text-sm text-white/70 uppercase tracking-wider font-medium leading-snug">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision band */}
      <section className="w-full bg-bni-charcoal relative overflow-hidden">
        <div className="absolute -top-32 right-0 w-[500px] h-[500px] bg-bni-gold/10 rounded-full blur-[150px]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <p className="text-bni-gold text-xs font-bold uppercase tracking-[0.35em]">
            {t("visionLabel")}
          </p>
          <p className="mt-8 text-2xl sm:text-4xl lg:text-[2.75rem] font-black leading-tight tracking-tight text-white">
            {t("visionText")}
          </p>
          <div className="mt-10 mx-auto h-[2px] w-24 bg-gradient-to-r from-transparent via-bni-gold to-transparent rounded-full" />
        </div>
      </section>

      {/* 04 — The Master standard */}
      <section className="w-full bg-bni-warm-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionMark number={t("standardNumber")} label={t("standardLabel")} />

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <h2 className="text-3xl sm:text-5xl font-black text-bni-charcoal tracking-tight">
                {t("standardTitle")}
              </h2>
              <p className="mt-8 text-lg text-bni-gray-dark leading-relaxed">
                {t("cultureText")}
              </p>
            </div>

            <div className="lg:pt-4">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-bni-gray">
                {t("standardIntro")}
              </p>
              <ul className="mt-6 space-y-4">
                {standards.map((std) => (
                  <li
                    key={std}
                    className="flex items-start gap-4 bg-white rounded-xl p-5 border border-bni-gray-light shadow-sm"
                  >
                    <span className="mt-0.5 w-6 h-6 shrink-0 rounded-full bg-bni-red/10 flex items-center justify-center">
                      <svg
                        className="w-3.5 h-3.5 text-bni-red"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    <span className="text-bni-charcoal font-medium leading-relaxed">
                      {std}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="w-full bg-bni-charcoal relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-bni-red/10 via-transparent to-bni-red/10" />
        <div className="absolute left-0 top-0 w-full h-1 bg-gradient-to-r from-bni-red via-bni-gold to-bni-red" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 text-center">
          <p className="text-bni-gold text-xs font-bold uppercase tracking-[0.35em]">
            {t("ctaLabel")}
          </p>
          <h2 className="mt-6 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t("ctaTitle")}
          </h2>
          <p className="mt-4 text-lg text-bni-gold font-semibold tracking-wide">
            {t("ctaTime")}
          </p>
          <p className="mt-4 text-gray-300 max-w-xl mx-auto">{t("ctaText")}</p>
          <Link
            href="/visit"
            className="mt-10 inline-flex items-center justify-center bg-bni-red hover:bg-bni-red-dark text-white font-bold text-lg px-12 py-4 rounded-xl transition-all duration-200 shadow-lg shadow-bni-red/25 hover:shadow-bni-red/40 hover:scale-105"
          >
            {t("ctaButton")}
          </Link>
          <p className="mt-8 text-sm text-white/40">
            {t("ctaEmailLabel")}{" "}
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="text-bni-gold hover:text-bni-gold-light transition-colors"
            >
              {siteConfig.contactEmail}
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
