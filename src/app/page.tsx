import Hero from "@/components/Hero";
import ResourceButton from "@/components/ResourceButton";

const educationLinks = [
  { label: "One to Ones", href: "#" },
  { label: "The Power of Giving Testimonials", href: "#" },
  { label: "Networking Etiquette", href: "#" },
  { label: "Traffic Lights Explained", href: "#" },
  { label: "Do the Fives", href: "#" },
  { label: "Australian Podcast – BNI Members", href: "#" },
  { label: "Presentations that Lead to Referrals", href: "#" },
  { label: "Perfect Presentations", href: "#" },
  { label: "Perfect One to Ones", href: "#" },
];

export default function HomePage() {
  return (
    <main>
      <Hero
        title="Welcome to BNIWA Information Hub"
        buttons={[
          { label: "LEADERSHIP TEAM FORUM LINK", href: "#", variant: "wide" },
        ]}
      />

      {/* Weekly Education Moments */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-bni-dark text-center mb-8">
          Weekly Education Moments – Get more from your membership!
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {educationLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-bni-blue-accent hover:text-bni-navy underline text-center py-1 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </section>

      {/* Social Media Links */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-bni-dark text-center mb-8">
          Social Media Links
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <ResourceButton label="Facebook" href="#" variant="filled" />
          <ResourceButton label="LinkedIn" href="#" variant="filled" />
          <ResourceButton label="YouTube" href="#" variant="filled" />
        </div>
      </section>

      {/* DNA Resources */}
      <section className="max-w-6xl mx-auto px-6 py-12 text-center">
        <ResourceButton label="DNA Resources" href="#" variant="wide" />
      </section>
    </main>
  );
}
