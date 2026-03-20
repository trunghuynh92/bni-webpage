"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/lib/site-data";

export default function Footer() {
  const t = useTranslations("Footer");

  const quickLinks = [
    { label: t("home"), href: "/" as const },
    { label: t("memberResources"), href: "/member-resources" as const },
    { label: t("leadershipTeams"), href: "/leadership-teams" as const },
    { label: t("trafficLights"), href: "/traffic-lights" as const },
    { label: t("calendar"), href: "/calendar-events" as const },
  ];

  return (
    <footer className="relative w-full bg-bni-charcoal overflow-hidden">
      {/* Subtle background accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-bni-red/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-bni-gold/3 rounded-full blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        {/* Top section - Branding */}
        <div className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl font-black tracking-widest uppercase gradient-text leading-tight">
            BNI MASTER
          </h2>
          <p className="mt-4 text-bni-gray text-sm tracking-[0.2em] uppercase">
            {t("tagline")}
          </p>
          <div className="mt-6 mx-auto h-[2px] w-20 bg-gradient-to-r from-transparent via-bni-red to-transparent rounded-full" />
        </div>

        {/* Quick links */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-10 mb-14">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-sm text-white/50 hover:text-white transition-colors duration-300 group py-1"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-bni-red transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Contact */}
        <div className="text-center mb-14">
          <p className="text-sm text-white/40">
            {t("getInTouch")}
          </p>
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="inline-block mt-2 text-bni-gold hover:text-bni-gold-light transition-colors duration-300 font-medium tracking-wide"
          >
            {siteConfig.contactEmail}
          </a>
        </div>

        {/* Social icons */}
        <div className="flex items-center justify-center gap-5 mb-14">
          {[
            {
              name: "Facebook",
              path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
            },
            {
              name: "LinkedIn",
              path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
            },
            {
              name: "YouTube",
              path: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
            },
          ].map(({ name, path }) => (
            <a
              key={name}
              href="#"
              aria-label={name}
              className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:border-bni-red hover:bg-bni-red/10 hover:shadow-lg hover:shadow-bni-red/10 transition-all duration-300 hover:scale-110"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d={path} />
              </svg>
            </a>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/25 tracking-wide">
              {t("copyright")}
            </p>
            <div className="flex items-center gap-1.5">
              <span className="text-bni-red text-xs font-black tracking-widest">BNI</span>
              <span className="text-white/20 text-xs font-bold tracking-widest">MASTER</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
