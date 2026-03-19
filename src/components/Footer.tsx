import { siteConfig } from "@/lib/site-data";

export default function Footer() {
  return (
    <footer className="w-full bg-bni-dark py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm text-white/80">
          Get in touch with us at{" "}
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="text-bni-blue-accent underline hover:text-white transition-colors"
          >
            {siteConfig.contactEmail}
          </a>
        </p>
      </div>
    </footer>
  );
}
