import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getMembers, initials, localized } from "@/lib/members";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Members" });
  return { title: `${t("title")} | BNI MASTER` };
}

export default async function MembersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Members" });
  const members = getMembers();

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
            {t("title")}
          </h1>
          <p
            className="mt-5 text-lg text-white/60 max-w-2xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "150ms" }}
          >
            {t("subtitle")}
          </p>
          <p
            className="mt-6 inline-block rounded-full border border-bni-gold/40 px-5 py-2 text-bni-gold text-sm font-semibold tracking-wider animate-fade-in-up"
            style={{ animationDelay: "300ms" }}
          >
            {t("count", { count: members.length })}
          </p>
        </div>
      </section>

      {/* Member grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-7">
          {members.map((m, i) => (
            <Link
              key={m.slug}
              href={`/members/${m.slug}`}
              className="group rounded-2xl bg-white shadow-md shadow-black/5 border border-black/5 overflow-hidden hover:shadow-2xl hover:shadow-black/15 hover:-translate-y-1.5 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${Math.min(i * 40, 400)}ms` }}
            >
              <div className="relative aspect-[3/4] bg-bni-gray-light overflow-hidden">
                {m.images.profile ? (
                  <Image
                    src={m.images.profile}
                    alt={m.name}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-bni-dark to-bni-charcoal">
                    <span className="text-5xl font-black text-white/25 tracking-wider">
                      {initials(m.name)}
                    </span>
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-bni-red to-bni-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400" />
              </div>
              <div className="p-4 lg:p-5">
                <h2 className="text-base lg:text-lg font-bold text-bni-charcoal leading-snug group-hover:text-bni-red transition-colors duration-300">
                  {m.name}
                </h2>
                <p className="mt-1 text-xs lg:text-sm text-bni-gray line-clamp-1">
                  {localized(m.jobTitle, locale)} · {m.company}
                </p>
                <p className="mt-3 inline-block rounded-full bg-bni-gray-light px-3 py-1 text-[11px] lg:text-xs font-semibold text-bni-gray-dark line-clamp-1">
                  {localized(m.industry, locale)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
