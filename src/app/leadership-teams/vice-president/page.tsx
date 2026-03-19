import Hero from "@/components/Hero";
import ResourceGrid from "@/components/ResourceGrid";

const vpResources = [
  { label: "Payment Plan – 3rd Party Finance Request Form", href: "#" },
  { label: "Medical Guidelines", href: "#" },
  { label: "Medical Approval Letter", href: "#" },
  { label: "Substitute Guidelines", href: "#" },
  { label: "NFP or Charity Guideline", href: "#" },
  { label: "New Member Guideline", href: "#" },
  { label: "Change of Category/Member Form", href: "#" },
  { label: "Complaint Process", href: "#" },
  { label: "7 Month Review Process", href: "#" },
  { label: "Renewal Process", href: "#" },
  { label: "Control Letters", href: "#" },
  { label: "Online App Process", href: "#" },
  { label: "Traffic Lights Explanation", href: "#" },
  { label: "Chap. Traffic Lights Explained", href: "#" },
  { label: "CSM Agenda", href: "#" },
  { label: "Selecting a Chapter Venue", href: "#" },
  { label: "Notable Networker Certs.", href: "#" },
  { label: "Category List", href: "#" },
  { label: "Goal Setting", href: "#" },
  { label: "Referral Slip Template", href: "#" },
  { label: "Graphics for presenter slides", href: "#" },
];

export default function VicePresidentPage() {
  return (
    <main>
      <Hero
        title="VICE PRESIDENT"
        buttons={[
          { label: "20 Minute video – VP role Tips & Tricks", href: "#" },
          { label: "Vice President Script", href: "#" },
          { label: "Easy Checklist VP Role", href: "#" },
          { label: "CHAPTER OPERATIONS MANUAL", href: "#" },
        ]}
      />

      <section className="max-w-6xl mx-auto px-6 py-12">
        <ResourceGrid columns={4} resources={vpResources} />
      </section>
    </main>
  );
}
