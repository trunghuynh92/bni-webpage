import Hero from "@/components/Hero";
import ResourceButton from "@/components/ResourceButton";

const podcasts = [
  { label: "BNI Official Podcast", href: "#" },
  { label: "Australian Podcast – BNI Members", href: "#" },
  { label: "The BNI Podcast with Ivan Misner", href: "#" },
];

const educationCampaigns = [
  { label: "Member Success Program", href: "#" },
  { label: "Weekly Education Moments", href: "#" },
  { label: "Monthly Education Focus", href: "#" },
];

const websites = [
  { label: "BNI Business Builder", href: "#" },
  { label: "BNI University", href: "#" },
  { label: "BNI Academy", href: "#" },
];

const powerPoints = [
  { label: "Education Slide Deck 2024", href: "#" },
  { label: "Presentation Templates", href: "#" },
  { label: "Training Materials", href: "#" },
];

export default function EducationCoordinatorPage() {
  return (
    <main>
      <Hero
        title="EDUCATION COORDINATOR"
        buttons={[
          { label: "Your Role – Easy Checklist", href: "#" },
          { label: "Education Slide deck 2024", href: "#" },
        ]}
      />

      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Podcasts */}
          <div>
            <h3 className="text-lg font-bold text-bni-dark mb-4 text-center">
              Podcasts
            </h3>
            <div className="flex flex-col gap-3">
              {podcasts.map((item) => (
                <ResourceButton
                  key={item.label}
                  label={item.label}
                  href={item.href}
                  variant="filled"
                />
              ))}
            </div>
          </div>

          {/* Education Campaigns */}
          <div>
            <h3 className="text-lg font-bold text-bni-dark mb-4 text-center">
              Education Campaigns
            </h3>
            <div className="flex flex-col gap-3">
              {educationCampaigns.map((item) => (
                <ResourceButton
                  key={item.label}
                  label={item.label}
                  href={item.href}
                  variant="filled"
                />
              ))}
            </div>
          </div>

          {/* Websites */}
          <div>
            <h3 className="text-lg font-bold text-bni-dark mb-4 text-center">
              Websites
            </h3>
            <div className="flex flex-col gap-3">
              {websites.map((item) => (
                <ResourceButton
                  key={item.label}
                  label={item.label}
                  href={item.href}
                  variant="filled"
                />
              ))}
            </div>
          </div>

          {/* Power Points */}
          <div>
            <h3 className="text-lg font-bold text-bni-dark mb-4 text-center">
              Power Points
            </h3>
            <div className="flex flex-col gap-3">
              {powerPoints.map((item) => (
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
