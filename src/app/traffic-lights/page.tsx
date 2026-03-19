import Hero from "@/components/Hero";
import ResourceButton from "@/components/ResourceButton";

const perthNorth = [
  { label: "Perth North Traffic Lights", href: "#" },
];

const perthSouth = [
  { label: "Perth South Traffic Lights", href: "#" },
];

const perthSouthSouthWest = [
  { label: "Perth South and South West Traffic Lights", href: "#" },
];

export default function TrafficLightsPage() {
  return (
    <main>
      <Hero
        title="TRAFFIC LIGHTS"
        buttons={[
          { label: "Leadership Team Forum Link", href: "#" },
          { label: "Traffic Lights explained", href: "#" },
        ]}
      />

      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Perth North */}
          <div>
            <h3 className="text-lg font-bold text-bni-dark mb-4 text-center">
              Perth North
            </h3>
            <div className="flex flex-col gap-3">
              {perthNorth.map((item) => (
                <ResourceButton
                  key={item.label}
                  label={item.label}
                  href={item.href}
                  variant="filled"
                />
              ))}
            </div>
          </div>

          {/* Perth South */}
          <div>
            <h3 className="text-lg font-bold text-bni-dark mb-4 text-center">
              Perth South
            </h3>
            <div className="flex flex-col gap-3">
              {perthSouth.map((item) => (
                <ResourceButton
                  key={item.label}
                  label={item.label}
                  href={item.href}
                  variant="filled"
                />
              ))}
            </div>
          </div>

          {/* Perth South and South West */}
          <div>
            <h3 className="text-lg font-bold text-bni-dark mb-4 text-center">
              Perth South and South West
            </h3>
            <div className="flex flex-col gap-3">
              {perthSouthSouthWest.map((item) => (
                <ResourceButton
                  key={item.label}
                  label={item.label}
                  href={item.href}
                  variant="filled"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
