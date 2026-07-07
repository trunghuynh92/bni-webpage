import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import VisitForm from "@/components/VisitForm";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Visit" });
  return { title: `${t("title")} | BNI MASTER` };
}

export default async function VisitPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Visit" });

  return (
    <main className="relative w-full overflow-hidden bg-bni-charcoal min-h-[80vh]">
      <div className="absolute inset-0 bg-gradient-to-b from-bni-charcoal via-bni-dark to-bni-charcoal" />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-bni-red/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-bni-gold/5 rounded-full blur-[120px]" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-10">
          <p className="text-bni-gold text-sm font-bold uppercase tracking-[0.3em] mb-4">
            BNI MASTER
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-wide">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-white/60 max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <VisitForm />

        <p className="mt-8 text-center text-sm text-white/40">{t("meetingInfo")}</p>
      </div>
    </main>
  );
}
