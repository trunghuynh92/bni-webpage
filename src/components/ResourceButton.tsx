import Link from "next/link";

interface ResourceButtonProps {
  label: string;
  href: string;
  variant?: "filled" | "wide" | "outlined";
  icon?: React.ReactNode;
}

export default function ResourceButton({
  label,
  href,
  variant = "filled",
  icon,
}: ResourceButtonProps) {
  const base =
    "group relative inline-flex items-center justify-center font-semibold transition-all duration-300 cursor-pointer text-center overflow-hidden";

  const variants: Record<string, string> = {
    filled:
      "bg-bni-dark text-white px-6 py-4 text-sm rounded-xl shadow-lg hover:shadow-2xl hover:shadow-black/30 hover:scale-[1.02] border-l-0 hover:border-l-4 border-bni-red ring-1 ring-white/5 hover:ring-white/10",
    wide:
      "bg-gradient-to-r from-bni-red to-bni-red-dark text-white px-8 py-4.5 text-sm font-bold rounded-xl shadow-lg shadow-bni-red/20 hover:shadow-xl hover:shadow-bni-red/30 hover:brightness-110 w-full tracking-wide uppercase",
    outlined:
      "border-2 border-bni-red/80 text-bni-red px-7 py-3.5 text-sm rounded-xl hover:bg-bni-red hover:text-white hover:border-bni-red hover:shadow-lg hover:shadow-bni-red/20 backdrop-blur-sm",
  };

  return (
    <Link href={href} className={`${base} ${variants[variant]}`}>
      {/* Subtle shine effect on hover */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {icon && <span className="mr-2.5 relative z-10">{icon}</span>}
      <span className="relative z-10">{label}</span>
      <span className="relative z-10 ml-0 max-w-0 overflow-hidden transition-all duration-300 group-hover:ml-2.5 group-hover:max-w-[24px] opacity-0 group-hover:opacity-100">
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
      </span>
    </Link>
  );
}
