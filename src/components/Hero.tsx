import ResourceButton from "@/components/ResourceButton";

interface HeroButtonDef {
  label: string;
  href: string;
  variant?: "outlined" | "wide";
}

interface HeroProps {
  title: string;
  buttons?: HeroButtonDef[];
  showImage?: boolean;
}

export default function Hero({ title, buttons = [], showImage = false }: HeroProps) {
  const sideButtons = buttons.filter((b) => b.variant === "outlined" || !b.variant);
  const wideButtons = buttons.filter((b) => b.variant === "wide");

  return (
    <section className="relative w-full bg-bni-dark">
      {/* Optional background image overlay */}
      {showImage && (
        <div className="absolute inset-0 bg-gradient-to-br from-bni-dark via-bni-navy/60 to-bni-dark opacity-60" />
      )}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
          {/* Left: title + accent line + wide CTA */}
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-wide leading-tight">
              {title}
            </h1>
            <div className="mt-4 h-1 w-20 bg-bni-blue-accent rounded-full" />

            {wideButtons.length > 0 && (
              <div className="mt-8 flex flex-col gap-3 max-w-md">
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
            <div className="flex flex-col gap-3 lg:items-end">
              {sideButtons.map((btn) => (
                <ResourceButton
                  key={btn.label}
                  label={btn.label}
                  href={btn.href}
                  variant="outlined"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
