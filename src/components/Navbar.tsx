"use client";

import { useState, useEffect } from "react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations("Nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const navigation = [
    { label: t("home"), href: "/" as const },
    { label: t("memberResources"), href: "/member-resources" as const },
    {
      label: t("leadershipTeams"),
      href: "/leadership-teams" as const,
      children: [
        { label: t("president"), href: "/leadership-teams/president" as const },
        { label: t("vicePresident"), href: "/leadership-teams/vice-president" as const },
        { label: t("treasurerSecretary"), href: "/leadership-teams/treasurer-secretary" as const },
        { label: t("mcEngagement"), href: "/leadership-teams/mc-engagement" as const },
        { label: t("go4green"), href: "/leadership-teams/go4green" as const },
        { label: t("mcCommunityBuilder"), href: "/leadership-teams/mc-community-builder" as const },
        { label: t("growthEvents"), href: "/leadership-teams/growth-events" as const },
        { label: t("mcQualityAssurance"), href: "/leadership-teams/mc-quality-assurance" as const },
        { label: t("mcRelations"), href: "/leadership-teams/mc-relations" as const },
        { label: t("mentorCoordinator"), href: "/leadership-teams/mentor-coordinator" as const },
        { label: t("visitorHosts"), href: "/leadership-teams/visitor-hosts" as const },
        { label: t("educationCoordinator"), href: "/leadership-teams/education-coordinator" as const },
      ],
    },
    { label: t("trafficLights"), href: "/traffic-lights" as const },
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
              {navigation.map((item) =>
                item.children ? (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <Link
                      href={item.href}
                      className="relative px-1 py-2 text-sm font-semibold text-white/70 hover:text-white transition-colors duration-300 group flex items-center gap-1.5 uppercase tracking-wider"
                    >
                      {item.label}
                      <svg
                        className={`h-3.5 w-3.5 transition-transform duration-300 ${
                          dropdownOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                      <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-bni-red to-bni-red-light transition-all duration-300 ease-out group-hover:w-full rounded-full" />
                    </Link>

                    {/* Dropdown */}
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 transition-all duration-300 ${
                        dropdownOpen
                          ? "opacity-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 -translate-y-3 pointer-events-none"
                      }`}
                    >
                      <div className="glass-card w-72 rounded-2xl py-2 shadow-2xl shadow-black/40 border border-white/10 overflow-hidden">
                        <div className="h-[2px] w-full bg-gradient-to-r from-bni-red via-bni-gold to-bni-red" />
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="group/item block px-6 py-3 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200 flex items-center gap-3"
                          >
                            <span className="w-1 h-1 rounded-full bg-bni-red/0 group-hover/item:bg-bni-red transition-all duration-200" />
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="relative px-1 py-2 text-sm font-semibold text-white/70 hover:text-white transition-colors duration-300 group uppercase tracking-wider"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-bni-red to-bni-red-light transition-all duration-300 ease-out group-hover:w-full rounded-full" />
                  </Link>
                )
              )}

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

        <div className="relative flex flex-col items-center justify-center h-full gap-8 px-8">
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
              {item.children && (
                <div className="mt-4 flex flex-col gap-2">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="text-base text-white/40 hover:text-bni-gold transition-colors duration-200 tracking-wide"
                      onClick={() => setMobileOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
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
            className={`absolute bottom-12 left-1/2 -translate-x-1/2 transition-all duration-700 delay-500 ${
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
    </>
  );
}
