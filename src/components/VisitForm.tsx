"use client";

import { useActionState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { submitBooking, type BookingState } from "@/app/actions/booking";

const inputClass =
  "w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-white placeholder-white/35 focus:outline-none focus:border-bni-gold/60 focus:bg-white/10 transition-colors duration-200";
const labelClass =
  "block mb-1.5 text-xs font-bold uppercase tracking-[0.15em] text-white/50";

export default function VisitForm() {
  const t = useTranslations("Visit");
  const locale = useLocale();
  const [state, action, pending] = useActionState<BookingState, FormData>(
    submitBooking,
    { status: "idle" }
  );

  if (state.status === "ok") {
    return (
      <div className="glass-card rounded-2xl p-10 text-center">
        <div className="mx-auto w-14 h-14 rounded-full bg-bni-gold/15 border border-bni-gold/40 flex items-center justify-center">
          <svg className="h-7 w-7 text-bni-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="mt-5 text-2xl font-black text-white uppercase tracking-wide">
          {t("thanksTitle")}
        </h2>
        <p className="mt-3 text-white/60 leading-relaxed max-w-md mx-auto">
          {t("thanksBody")}
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="glass-card rounded-2xl p-6 sm:p-10 space-y-5">
      <input type="hidden" name="locale" value={locale} />
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="fullName" className={labelClass}>
            {t("fullName")} *
          </label>
          <input id="fullName" name="fullName" required className={inputClass} placeholder={t("fullNamePh")} />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            {t("phone")} *
          </label>
          <input id="phone" name="phone" type="tel" required className={inputClass} placeholder="09xx xxx xxx" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className={labelClass}>
            {t("email")}
          </label>
          <input id="email" name="email" type="email" className={inputClass} placeholder="you@company.com" />
        </div>
        <div>
          <label htmlFor="company" className={labelClass}>
            {t("company")}
          </label>
          <input id="company" name="company" className={inputClass} placeholder={t("companyPh")} />
        </div>
      </div>

      <div>
        <label htmlFor="industry" className={labelClass}>
          {t("industry")}
        </label>
        <input id="industry" name="industry" className={inputClass} placeholder={t("industryPh")} />
      </div>

      <div>
        <label htmlFor="note" className={labelClass}>
          {t("note")}
        </label>
        <textarea id="note" name="note" rows={4} className={inputClass} placeholder={t("notePh")} />
      </div>

      {state.status === "error" && (
        <p className="text-sm text-bni-red-light font-semibold">{t("error")}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-bni-red hover:bg-bni-red-dark disabled:opacity-60 text-white font-bold uppercase tracking-[0.14em] text-sm px-8 py-4 rounded-xl transition-all duration-200 shadow-lg shadow-bni-red/25"
      >
        {pending ? t("sending") : t("submit")}
      </button>
    </form>
  );
}
