"use client";

import { useEffect, useState } from "react";
import ResourceButton from "@/components/ResourceButton";

interface HeroButtonDef {
  label: string;
  href: string;
  variant?: "outlined" | "wide";
}

interface HeroProps {
  title: string;
  subtitle?: string;
  buttons?: HeroButtonDef[];
  showImage?: boolean;
}

export default function Hero({
  title,
  subtitle,
  buttons = [],
  showImage = false,
}: HeroProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const sideButtons = buttons.filter(
    (b) => b.variant === "outlined" || !b.variant
  );
  const wideButtons = buttons.filter((b) => b.variant === "wide");

  return (
    <section className="relative w-full overflow-hidden bg-bni-charcoal min-h-[60vh]">
      {/* Layered background */}
      <div className="absolute inset-0 bg-gradient-to-b from-bni-charcoal via-bni-dark to-bni-charcoal" />

      {/* Red radial glow - top right */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-bni-red/10 rounded-full blur-[150px]" />

      {/* Secondary gold accent glow */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-bni-gold/5 rounded-full blur-[120px]" />

      {/* Tertiary red glow */}
      <div className="absolute top-1/2 left-1/3 w-[250px] h-[250px] bg-bni-red/5 rounded-full blur-[100px]" />

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Optional image overlay */}
      {showImage && (
        <div className="absolute inset-0 bg-gradient-to-br from-bni-charcoal via-bni-dark/60 to-bni-charcoal opacity-60" />
      )}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-16">
          {/* Left: title + accent line + subtitle + wide CTAs */}
          <div className="flex-1 max-w-2xl">
            {/* Small pre-title badge */}
            <div
              className={`inline-flex items-center gap-2 mb-6 transition-all duration-500 ${
                loaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <span className="w-8 h-[2px] bg-bni-red rounded-full" />
              <span className="text-xs font-bold text-bni-red uppercase tracking-[0.2em]">
                BNI Master Chapter
              </span>
            </div>

            <h1
              className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white uppercase tracking-tight leading-[1.05] transition-all duration-700 ${
                loaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              {title}
            </h1>

            {/* Animated red-to-gold accent line */}
            <div
              className={`mt-8 h-1 rounded-full bg-gradient-to-r from-bni-red via-bni-red-light to-bni-gold transition-all duration-1000 ease-out ${
                loaded ? "w-24" : "w-0"
              }`}
            />

            {subtitle && (
              <p
                className={`mt-6 text-lg lg:text-xl text-bni-gray leading-relaxed max-w-lg transition-all duration-700 delay-200 ${
                  loaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                {subtitle}
              </p>
            )}

            {wideButtons.length > 0 && (
              <div
                className={`mt-10 flex flex-col gap-3 max-w-md transition-all duration-700 delay-300 ${
                  loaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                {wideButtons.map((btn) => (
                  <ResourceButton
                    key={btn.label}
                    label={btn.label}
                    href={btn.href}
                    variant="wide"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right: outlined quick-link buttons */}
          {sideButtons.length > 0 && (
            <div
              className={`flex flex-col gap-4 lg:items-end transition-all duration-700 delay-400 ${
                loaded
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
            >
              <span className="text-xs font-bold text-white/30 uppercase tracking-[0.15em] mb-2 lg:text-right">
                Quick Links
              </span>
              {sideButtons.map((btn, i) => (
                <div
                  key={btn.label}
                  className="transition-all duration-500"
                  style={{ transitionDelay: `${500 + i * 100}ms` }}
                >
                  <ResourceButton
                    label={btn.label}
                    href={btn.href}
                    variant="outlined"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom edge fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bni-charcoal to-transparent" />
    </section>
  );
}
