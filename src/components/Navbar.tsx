"use client";

import { useState, useEffect } from "react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations("Nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const navigation = [
    { label: t("home"), href: "/" as const },
    { label: t("members"), href: "/members" as const },
    { label: t("leadershipTeams"), href: "/leadership-teams" as const },
    { label: t("calendarEvents"), href: "/calendar-events" as const },
  ];

  const switchLocale = () => {
    const newLocale = locale === "en" ? "vi" : "en";
    router.replace(pathname, { locale: newLocale });
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-bni-charcoal shadow-2xl shadow-black/30 border-b border-white/5"
            : "bg-bni-charcoal/90 backdrop-blur-lg"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-1.5 shrink-0 group">
              <span className="text-bni-red text-2xl font-black tracking-widest uppercase transition-all duration-300 group-hover:text-bni-red-light">
                BNI
              </span>
              <span className="text-white text-2xl font-bold tracking-widest uppercase">
                MASTER
              </span>
              <span className="block w-1.5 h-1.5 rounded-full bg-bni-gold ml-0.5 animate-pulse-glow" />
            </Link>

            {/* Desktop navigation */}
            <div className="hidden lg:flex items-center gap-10">
              {navigation.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="relative px-1 py-2 text-sm font-semibold text-white/70 hover:text-white transition-colors duration-300 group uppercase tracking-wider"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-bni-red to-bni-red-light transition-all duration-300 ease-out group-hover:w-full rounded-full" />
                </Link>
              ))}

              {/* Language Switcher */}
              <button
                onClick={switchLocale}
                className="flex items-center rounded-full border border-white/20 overflow-hidden text-xs font-bold uppercase tracking-wider"
              >
                <span
                  className={`px-3 py-1.5 transition-colors duration-200 ${
                    locale === "en"
                      ? "bg-bni-red text-white"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  EN
                </span>
                <span
                  className={`px-3 py-1.5 transition-colors duration-200 ${
                    locale === "vi"
                      ? "bg-bni-red text-white"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  VI
                </span>
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              aria-label="Toggle menu"
              className="lg:hidden relative w-10 h-10 flex items-center justify-center z-50 rounded-lg hover:bg-white/5 transition-colors duration-200"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <div className="relative w-6 h-5 flex flex-col justify-between">
                <span
                  className={`block h-0.5 rounded-full transition-all duration-300 origin-center ${
                    mobileOpen
                      ? "w-6 bg-bni-red translate-y-[9px] rotate-45"
                      : "w-6 bg-white"
                  }`}
                />
                <span
                  className={`block h-0.5 bg-white rounded-full transition-all duration-300 ${
                    mobileOpen ? "opacity-0 scale-x-0" : "w-4"
                  }`}
                />
                <span
                  className={`block h-0.5 rounded-full transition-all duration-300 origin-center ${
                    mobileOpen
                      ? "w-6 bg-bni-red -translate-y-[9px] -rotate-45"
                      : "w-6 bg-white"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 lg:hidden ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Background with gradient */}
        <div className="absolute inset-0 bg-bni-charcoal" />
        <div className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-bni-red/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-bni-gold/5 rounded-full blur-[100px]" />

        <div className="relative h-full overflow-y-auto overscroll-contain flex">
          <div className="m-auto flex flex-col items-center gap-8 px-8 pt-28 pb-24 w-full">
          {navigation.map((item, i) => (
            <div
              key={item.label}
              className={`text-center transition-all duration-700 ${
                mobileOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: mobileOpen ? `${150 + i * 100}ms` : "0ms" }}
            >
              <Link
                href={item.href}
                className="text-4xl font-black text-white hover:text-bni-red transition-colors duration-300 uppercase tracking-wider"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            </div>
          ))}

          {/* Mobile language switcher */}
          <div
            className={`transition-all duration-700 ${
              mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: mobileOpen ? `${150 + navigation.length * 100}ms` : "0ms" }}
          >
            <button
              onClick={switchLocale}
              className="flex items-center rounded-full border border-white/20 overflow-hidden text-sm font-bold uppercase tracking-wider"
            >
              <span
                className={`px-4 py-2 transition-colors duration-200 ${
                  locale === "en"
                    ? "bg-bni-red text-white"
                    : "text-white/50 hover:text-white"
                }`}
              >
                EN
              </span>
              <span
                className={`px-4 py-2 transition-colors duration-200 ${
                  locale === "vi"
                    ? "bg-bni-red text-white"
                    : "text-white/50 hover:text-white"
                }`}
              >
                VI
              </span>
            </button>
          </div>

          {/* Mobile menu footer accent */}
          <div
            className={`transition-all duration-700 delay-500 ${
              mobileOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-bni-red text-sm font-black tracking-widest">BNI</span>
              <span className="text-white/30 text-sm font-bold tracking-widest">MASTER</span>
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
