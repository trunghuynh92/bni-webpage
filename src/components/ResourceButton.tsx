import Link from "next/link";

interface ResourceButtonProps {
  label: string;
  href: string;
  variant?: "filled" | "wide" | "outlined";
}

export default function ResourceButton({
  label,
  href,
  variant = "filled",
}: ResourceButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-semibold transition-colors duration-200 text-center";

  const variantClasses: Record<string, string> = {
    filled:
      "bg-bni-slate text-white px-6 py-3 text-sm hover:bg-bni-navy",
    wide: "bg-bni-slate text-white px-6 py-3 text-sm hover:bg-bni-navy w-full",
    outlined:
      "border-2 border-white text-white px-5 py-2.5 text-sm hover:bg-white/10",
  };

  return (
    <Link
      href={href}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {label}
    </Link>
  );
}
