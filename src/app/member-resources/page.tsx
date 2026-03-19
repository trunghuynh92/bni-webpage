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
        title="MEMBERS"
        buttons={[
          { label: "In person MSP participant guide", href: "#" },
          { label: "New Member Success Programs – BNI Academy", href: "#" },
        ]}
      />

      <section className="max-w-6xl mx-auto px-6 py-12">
        <ResourceGrid columns={4} resources={memberResources} />
      </section>
    </main>
  );
}
