import Hero from "@/components/Hero";
import ResourceButton from "@/components/ResourceButton";

const regions = [
  { title: "District 1", label: "District 1 Traffic Lights", href: "#" },
  { title: "District 2", label: "District 2 Traffic Lights", href: "#" },
  { title: "District 7", label: "District 7 Traffic Lights", href: "#" },
];

export default function TrafficLightsPage() {
  return (
    <main>
      <Hero
        title="TRAFFIC LIGHTS"
        subtitle="Track your chapter's performance at a glance"
        buttons={[
          { label: "Leadership Team Forum Link", href: "#", variant: "outlined" },
          { label: "Traffic Lights explained", href: "#", variant: "outlined" },
        ]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {regions.map((region) => (
            <div
              key={region.title}
              className="bg-bni-dark rounded-2xl p-8 text-center"
            >
              <h3 className="text-lg font-extrabold text-white mb-6 uppercase tracking-wide">
                {region.title}
              </h3>
              <ResourceButton
                label={region.label}
                href={region.href}
                variant="outlined"
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
