import Image from "next/image";
import { notFound } from "next/navigation";
import { Archivo, Newsreader } from "next/font/google";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getMember, initials, localized, memberContentLocale, type LocalizedText } from "@/lib/members";

const newsreader = Newsreader({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
});

const archivo = Archivo({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-archivo",
});

const DEMO_SLUG = "clara-thu-nguyen";
// Short name for the CTA — Clara's name is Western-ordered, so the generic
// "last word of full name" heuristic would pick her surname instead.
const CONNECT_NAME = "Clara";

// Demo-only editorial extras (Clara). Numbers/quotes are drawn from her own
// profile content — a generic rollout would move these into the member schema.
const STATS: { v: string; l: LocalizedText }[] = [
  { v: "200+", l: { vi: "Học viên MBA & DBA", en: "MBA & DBA learners" } },
  { v: "50+", l: { vi: "Referral từ BNI", en: "Referrals from BNI" } },
  { v: "7.700+", l: { vi: "Học viên toàn cầu", en: "Students worldwide" } },
  { v: "160", l: { vi: "Quốc gia", en: "Countries" } },
];

const PULL_QUOTES: Record<string, { quote: LocalizedText; sourceKey: string }> = {
  business: {
    quote: {
      vi: "Ưu tiên đúng giá trị thay vì dễ bán — mọi mối quan hệ đều theo tinh thần Win–Win–Win.",
      en: "True value over easy to sell — every relationship built in a win–win–win spirit.",
    },
    sourceKey: "philosophy",
  },
  philosophy: {
    quote: {
      vi: "Một lời giới thiệu đúng tệp có giá trị hơn nhiều lượt giới thiệu đại trà.",
      en: "One right-fit referral is worth far more than many generic introductions.",
    },
    sourceKey: "referrals",
  },
};

const CAPTIONS: LocalizedText[] = [
  {
    vi: "SSBM Việt Nam — chương trình MBA & DBA chuẩn Thụy Sỹ",
    en: "SSBM Vietnam — Swiss-standard MBA & DBA programs",
  },
  {
    vi: "Cộng đồng Alumni SSBM Việt Nam — hơn 200 thành viên",
    en: "SSBM Vietnam alumni community — over 200 members",
  },
];

const serif = "font-[family-name:var(--font-newsreader)]";
const sans = "font-[family-name:var(--font-archivo)]";

const sectionHeader = "flex items-baseline gap-3.5 md:gap-[22px] border-t border-[rgba(212,168,67,.35)] pt-4 md:pt-5";
const sectionNumber = `${sans} flex-none text-xs md:text-[13px] font-bold tracking-[.16em] text-bni-gold`;
const sectionTitle = `${serif} text-[26px] leading-[1.08] md:text-4xl md:leading-[1.05] font-medium tracking-[-.01em] text-bni-warm-white`;
const bodyText = `${sans} text-base leading-[1.8] md:leading-[1.9] text-[rgba(250,250,249,.72)] text-justify whitespace-pre-line`;
const twoCol = "md:[column-count:2] md:[column-gap:52px] md:[column-rule:1px_solid_rgba(255,255,255,.09)]";
const captionText = `${sans} mt-3 md:mt-3.5 text-[10px] md:text-[11px] font-medium tracking-[.16em] uppercase text-[rgba(250,250,249,.4)]`;
const contactLabel = `${sans} text-[10px] font-semibold tracking-[.2em] uppercase text-bni-gold`;
const contactValue = `${sans} mt-1.5 md:mt-[7px] text-sm md:text-[15px] font-medium text-bni-warm-white`;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const member = getMember(DEMO_SLUG);
  if (!member) return {};
  return {
    title: `${member.name} (Demo) | BNI MASTER`,
    description: localized(member.tagline, locale),
  };
}

export default async function MemberProfileDemoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const member = getMember(DEMO_SLUG);
  if (!member) notFound();

  const contentLocale = memberContentLocale(locale);
  const t = await getTranslations({ locale: contentLocale, namespace: "Members" });
  const pick = (text: LocalizedText) => localized(text, locale);
  const phoneHref = member.phone
    ? `tel:+84${member.phone.replace(/\D/g, "").replace(/^0/, "")}`
    : null;

  const sections = member.sections;
  const lastIdx = sections.length - 1;
  const [spread1, twoUpA, twoUpB, spread2] = member.images.business;

  const num = (i: number) => String(i + 1).padStart(2, "0");
  const firstName = CONNECT_NAME;

  return (
    <div className={`${newsreader.variable} ${archivo.variable} bg-bni-charcoal text-bni-warm-white`}>
      <div className="max-w-[1200px] mx-auto">
        {/* Top utility bar */}
        <div className="flex items-center justify-between px-[22px] pt-1.5 pb-[15px] md:px-14 md:py-[22px] border-b border-[rgba(255,255,255,.08)]">
          <Link
            href="/members"
            className={`${sans} text-[22px] leading-none font-normal text-[rgba(250,250,249,.55)] hover:text-bni-warm-white md:text-xs md:font-semibold md:tracking-[.16em] md:uppercase transition-colors duration-300`}
          >
            <span className="md:hidden">←</span>
            <span className="hidden md:inline">← {t("backToMembers")}</span>
          </Link>
          <span className={`${sans} text-xs md:text-[13px] font-bold tracking-[.28em] md:tracking-[.3em] text-bni-warm-white`}>
            BNI MASTER
          </span>
          <span className={`${sans} text-[10px] md:text-[11px] font-semibold tracking-[.2em] md:tracking-[.24em] uppercase text-[rgba(250,250,249,.4)]`}>
            {locale}
          </span>
        </div>

        {/* Split cover */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:min-h-[680px]">
          <div className="relative aspect-[4/5] md:aspect-auto overflow-hidden bg-[#111114]">
            {member.images.profile ? (
              <Image
                src={member.images.profile}
                alt={member.name}
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                priority
                className="object-cover [object-position:50%_12%] md:[object-position:50%_16%]"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`${serif} text-7xl font-medium text-[rgba(250,250,249,.25)]`}>
                  {initials(member.name)}
                </span>
              </div>
            )}
          </div>

          <div className="bg-bni-charcoal px-6 pt-[26px] pb-7 md:p-14 md:pl-14 flex flex-col md:justify-between md:border-l md:border-[rgba(212,168,67,.28)] border-b border-[rgba(255,255,255,.1)] md:border-b-0">
            <div className="hidden md:flex items-center justify-between">
              <span className={`${sans} text-[11px] font-semibold tracking-[.26em] uppercase text-[rgba(250,250,249,.45)]`}>
                {t("memberProfile")}
              </span>
              <span className={`${serif} italic text-[15px] font-medium text-bni-gold`}>
                N°01
              </span>
            </div>

            <div>
              <div className={`${sans} text-[11px] md:text-xs font-semibold tracking-[.3em] uppercase text-bni-gold`}>
                {pick(member.industry)}
              </div>
              <h1 className={`${serif} mt-3.5 md:mt-5 text-4xl leading-[1.02] md:text-[62px] md:leading-none font-medium tracking-[-.015em] text-bni-warm-white`}>
                {member.name}
              </h1>
              <p className={`${sans} mt-3.5 md:mt-5 text-[15px] md:text-base leading-[1.45] font-semibold text-bni-gold-light`}>
                {pick(member.jobTitle)}
                <span className="text-[rgba(250,250,249,.35)] font-normal"> / </span>
                <span className="text-bni-warm-white">{member.company}</span>
              </p>
              <p className={`${serif} italic mt-[18px] md:mt-7 text-[19px] leading-[1.45] md:text-[25px] md:leading-[1.42] font-normal text-[rgba(250,250,249,.85)] md:max-w-[30ch]`}>
                “{pick(member.tagline)}”
              </p>
            </div>

            <div>
              <div className="h-px bg-[rgba(212,168,67,.3)] my-[22px] md:mt-0 md:mb-6" />
              <div className="flex flex-wrap gap-[22px] md:gap-9">
                {member.phone && phoneHref && (
                  <a href={phoneHref} className="group">
                    <div className={contactLabel}>{t("phone")}</div>
                    <div className={`${contactValue} group-hover:text-bni-gold-light transition-colors duration-300`}>
                      {member.phone}
                    </div>
                  </a>
                )}
                {member.email && (
                  <a href={`mailto:${member.email}`} className="group">
                    <div className={contactLabel}>{t("email")}</div>
                    <div className={`${contactValue} group-hover:text-bni-gold-light transition-colors duration-300`}>
                      {member.email}
                    </div>
                  </a>
                )}
                {member.founded && (
                  <div>
                    <div className={contactLabel}>{t("founded")}</div>
                    <div className={contactValue}>{member.founded}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Contents ribbon */}
        <div className="flex items-stretch border-y border-[rgba(255,255,255,.12)] bg-[#111114] overflow-x-auto">
          <div className={`${sans} flex-none flex items-center px-4 py-3.5 md:px-[26px] md:py-5 text-[10px] md:text-[11px] font-bold tracking-[.22em] md:tracking-[.24em] uppercase text-bni-gold border-r border-[rgba(255,255,255,.12)] whitespace-nowrap`}>
            {t("contents")}
          </div>
          <div className="flex md:flex-1 md:flex-wrap gap-[22px] md:gap-x-[30px] md:gap-y-2.5 px-[18px] py-3.5 md:px-[26px] md:py-4">
            {sections.map((s, i) => (
              <span
                key={s.key}
                className={`${sans} whitespace-nowrap text-xs md:text-[13px] font-medium text-[rgba(250,250,249,.6)] md:text-[rgba(250,250,249,.62)]`}
              >
                <span className="text-bni-gold font-bold mr-1.5 md:mr-2">{num(i)}</span>
                {t(`sections.${s.key}`)}
              </span>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="px-6 pt-[26px] pb-2 md:px-16 md:pt-16 md:pb-14">
          {sections.map((section, i) => {
            const body = contentLocale === "vi" ? section.vi : section.en;
            const isLast = i === lastIdx;
            const pull = PULL_QUOTES[section.key];

            return (
              <div key={section.key}>
                {/* Closing referrals block */}
                {section.key === "referrals" && isLast ? (
                  <section className="mt-9 md:mt-14 border border-[rgba(212,168,67,.4)] bg-[#111114] px-6 py-7 md:px-[52px] md:py-12">
                    <header className="flex items-baseline gap-3.5 md:gap-[22px] mb-4 md:mb-6">
                      <span className={sectionNumber}>{num(i)}</span>
                      <h2 className={`${serif} text-[26px] leading-[1.08] md:text-4xl md:leading-[1.05] font-medium tracking-[-.01em] text-bni-gold-light`}>
                        {t(`sections.${section.key}`)}
                      </h2>
                    </header>
                    <p className={`${sans} text-base md:text-[17px] leading-[1.85] md:leading-[1.9] text-[rgba(250,250,249,.8)] text-justify whitespace-pre-line md:max-w-[64ch]`}>
                      {body}
                    </p>
                  </section>
                ) : section.key === "achievements" ? (
                  <>
                    <header className={`${sectionHeader} ${i === 0 ? "mb-[18px] md:mb-7" : "mt-9 mb-[18px] md:mt-[52px] md:mb-7"}`}>
                      <span className={sectionNumber}>{num(i)}</span>
                      <h2 className={sectionTitle}>{t(`sections.${section.key}`)}</h2>
                    </header>
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-6 md:gap-14 items-start">
                      <p className={bodyText}>{body}</p>
                      {/* Stats rail (desktop) / 2x2 grid (mobile) */}
                      <div className="grid grid-cols-2 gap-px bg-[rgba(255,255,255,.12)] border border-[rgba(255,255,255,.12)] md:block md:bg-transparent md:border-0 md:border-t md:border-[rgba(255,255,255,.14)]">
                        {STATS.map((st) => (
                          <div
                            key={st.v}
                            className="bg-bni-charcoal px-4 py-[18px] md:px-0 md:py-5 md:border-b md:border-[rgba(255,255,255,.14)]"
                          >
                            <div className={`${serif} text-[30px] leading-none md:text-[40px] font-medium text-bni-gold`}>
                              {st.v}
                            </div>
                            <div className={`${sans} mt-[7px] md:mt-2 text-[11px] md:text-xs leading-[1.3] font-medium md:tracking-[.06em] text-[rgba(250,250,249,.55)]`}>
                              {pick(st.l)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <header className={`${sectionHeader} ${i === 0 ? "mb-[18px] md:mb-7" : "mt-9 mb-[18px] md:mt-[52px] md:mb-7"}`}>
                      <span className={sectionNumber}>{num(i)}</span>
                      <h2 className={sectionTitle}>{t(`sections.${section.key}`)}</h2>
                    </header>
                    <div className={twoCol}>
                      <p className={bodyText}>
                        {i === 0 ? (
                          <>
                            <span className={`${serif} float-left text-[52px] leading-[.78] md:text-[66px] font-medium text-bni-gold mt-[7px] mr-3 md:mt-2 md:mr-3.5`}>
                              {body.charAt(0)}
                            </span>
                            {body.slice(1)}
                          </>
                        ) : (
                          body
                        )}
                      </p>
                    </div>
                  </>
                )}

                {/* Full-bleed spread after the first section */}
                {i === 0 && spread1 && (
                  <figure className="mt-8 md:mt-14 md:mb-3">
                    <div className="aspect-[4/3] md:aspect-[16/7] overflow-hidden bg-[#111114] relative group">
                      <Image
                        src={spread1}
                        alt={pick(CAPTIONS[0])}
                        fill
                        sizes="(max-width: 768px) 100vw, 1072px"
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      />
                    </div>
                    <figcaption className={captionText}>{pick(CAPTIONS[0])}</figcaption>
                  </figure>
                )}

                {/* Two-up photos after achievements */}
                {section.key === "achievements" && twoUpA && twoUpB && (
                  <div className="grid grid-cols-2 gap-2.5 md:gap-4 my-8 md:my-14">
                    {[twoUpA, twoUpB].map((src) => (
                      <div key={src} className="aspect-square md:aspect-[4/3] overflow-hidden bg-[#111114] relative group">
                        <Image
                          src={src}
                          alt={member.company}
                          fill
                          sizes="(max-width: 768px) 50vw, 528px"
                          className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Full-bleed spread before the closing section */}
                {i === lastIdx - 1 && spread2 && (
                  <figure className="mt-8 md:mt-14 md:mb-3">
                    <div className="aspect-[4/3] md:aspect-[16/7] overflow-hidden bg-[#111114] relative group">
                      <Image
                        src={spread2}
                        alt={pick(CAPTIONS[1])}
                        fill
                        sizes="(max-width: 768px) 100vw, 1072px"
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      />
                    </div>
                    <figcaption className={captionText}>{pick(CAPTIONS[1])}</figcaption>
                  </figure>
                )}

                {/* Pull-quote callout */}
                {pull && (
                  <figure className="my-9 px-1.5 py-7 md:my-[60px] md:px-[60px] md:py-10 text-center border-y border-[rgba(212,168,67,.3)]">
                    <blockquote className={`${serif} italic mx-auto text-[23px] leading-[1.4] md:text-[32px] font-medium text-bni-gold-light md:max-w-[26ch]`}>
                      “{pick(pull.quote)}”
                    </blockquote>
                    <div className={`${sans} mt-3.5 md:mt-[18px] text-[10px] md:text-[11px] font-semibold tracking-[.24em] uppercase text-[rgba(250,250,249,.4)]`}>
                      {t(`sections.${pull.sourceKey}`)}
                    </div>
                  </figure>
                )}
              </div>
            );
          })}

          {/* Connect CTA */}
          {member.email && (
            <div className="mt-7 md:mt-9 border border-[rgba(255,255,255,.14)] px-[22px] py-[26px] md:px-11 md:py-9 md:flex md:items-center md:justify-between md:gap-7">
              <div>
                <div className={`${sans} text-[10px] md:text-[11px] font-semibold tracking-[.26em] uppercase text-bni-gold`}>
                  {t("connectLabel")}
                </div>
                <h3 className={`${serif} mt-2.5 mb-1.5 md:mt-3 text-[22px] md:text-[28px] leading-[1.1] font-medium text-bni-warm-white`}>
                  {t("connectCta", { name: firstName })}
                </h3>
                <p className={`${sans} m-0 mb-[18px] md:mb-0 text-sm md:text-[15px] leading-[1.5] text-[rgba(250,250,249,.5)]`}>
                  {t("connectSubtitle")}
                </p>
              </div>
              <a
                href={`mailto:${member.email}`}
                className={`${sans} block text-center md:inline-block md:flex-none bg-bni-red hover:bg-bni-red-dark text-white px-4 py-[15px] md:px-[30px] md:py-4 text-[13px] leading-none font-bold tracking-[.14em] uppercase rounded-[2px] transition-colors duration-300`}
              >
                {t("sendEmail")}
              </a>
            </div>
          )}

          {/* Footer meta */}
          <div className={`${sans} mt-[30px] pt-[18px] md:mt-11 md:pt-[22px] border-t border-[rgba(255,255,255,.1)] md:flex md:justify-between text-[10px] md:text-[11px] leading-[1.7] md:leading-none font-medium tracking-[.2em] uppercase text-[rgba(250,250,249,.32)]`}>
            <div>BNI Master · Chapter Member Profile</div>
            <div>
              {member.company}
              {member.founded ? ` · Est. ${member.founded}` : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
