import Hero from "@/components/Hero";
import ResourceGrid from "@/components/ResourceGrid";
import ResourceButton from "@/components/ResourceButton";

const mainResources = [
  { label: "Chapter Assessment Form", href: "#" },
  { label: "Recognition Certificates", href: "#" },
  { label: "Chapter Operations Manual", href: "#" },
  { label: "CSM Resources", href: "#" },
  { label: "New QR Codes for Application", href: "#" },
  { label: "Generic Tradesheet", href: "#" },
  { label: "Team Roles Scripts", href: "#" },
];

const additionalResources = [
  { label: "Training Handout Sept 2024", href: "#" },
  { label: "Landing Pages Link", href: "#" },
  { label: "20-min Video – Tips and Tricks on the President role", href: "#" },
];

export default function PresidentPage() {
  return (
    <main>
      <Hero
        title="PRESIDENT"
        subtitle="Lead with vision, inspire with action"
        buttons={[
          { label: "LT Forum Zoom Link", href: "#", variant: "outlined" },
          { label: "Easy Checklist", href: "#", variant: "outlined" },
          { label: "President Script", href: "#", variant: "outlined" },
          { label: "Agenda PowerPoint Jul25–Jun26", href: "#", variant: "outlined" },
        ]}
      />

      {/* Monthly Event Slides */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <ResourceButton
          label="Monthly Event Slides"
          href="#"
          variant="wide"
        />
      </section>

      {/* Main Resources - 4 columns */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ResourceGrid columns={4} resources={mainResources} />
      </section>

      {/* Additional Resources - 3 columns */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ResourceGrid columns={3} resources={additionalResources} />
      </section>

      {/* Agenda Flow Video */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <ResourceButton
          label="The agenda flow and reasons why – a short video"
          href="#"
          variant="wide"
        />
      </section>
    </main>
  );
}
