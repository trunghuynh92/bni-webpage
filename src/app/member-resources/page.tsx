import Hero from "@/components/Hero";
import ResourceGrid from "@/components/ResourceGrid";

const memberResources = [
  { label: "New Member Guide 2024", href: "#" },
  { label: "The Power of Giving Testimonials", href: "#" },
  { label: "Networking Etiquette", href: "#" },
  { label: "Traffic Lights Explained", href: "#" },
  { label: "Do the Fives", href: "#" },
  { label: "Australian Podcast – BNI Members", href: "#" },
  { label: "Presentations that Lead to Referrals", href: "#" },
  { label: "Perfect Presentations", href: "#" },
  { label: "Perfect One to Ones", href: "#" },
  { label: "Handling objections when inviting", href: "#" },
  { label: "Inviting Visitors", href: "#" },
  { label: "Giving Referrals", href: "#" },
  { label: "Grow your Power Team", href: "#" },
  { label: "Life events = Visitors", href: "#" },
];

export default function MemberResourcesPage() {
  return (
    <main>
      <Hero
        title="MEMBER RESOURCES"
        subtitle="Everything you need to maximize your BNI membership"
        buttons={[
          { label: "MSP Participant Guide", href: "#", variant: "outlined" },
          { label: "BNI Academy", href: "#", variant: "outlined" },
        ]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-bni-dark mb-10 tracking-tight">
          Essential Tools for Members
        </h2>
        <ResourceGrid columns={4} resources={memberResources} />
      </section>
    </main>
  );
}
