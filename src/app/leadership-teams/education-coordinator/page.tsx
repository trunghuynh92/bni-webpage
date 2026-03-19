import Hero from "@/components/Hero";
import ResourceButton from "@/components/ResourceButton";

const podcasts = [
  { label: "The Australian Story", href: "#" },
  { label: "The Power of One Podcasts", href: "#" },
  { label: "BNI Official Podcasts", href: "#" },
];

const educationCampaigns = [
  { label: "12 Weeks of Fundamentals", href: "#" },
  { label: "Chapter Good to Great", href: "#" },
  { label: "Success Mechanisms CSM", href: "#" },
];

const websites = [
  { label: "BNI WA YouTube", href: "#" },
  { label: "BNI NZ Education Library", href: "#" },
  { label: "From the Founder", href: "#" },
];

const powerPoints = [
  { label: "Specific is Terrific", href: "#" },
  { label: "FROGS", href: "#" },
  { label: "The Best 60 Seconds", href: "#" },
];

const categories = [
  { title: "Podcasts", items: podcasts },
  { title: "Education Campaigns", items: educationCampaigns },
  { title: "Websites", items: websites },
  { title: "Power Points", items: powerPoints },
];

export default function EducationCoordinatorPage() {
  return (
    <main>
      <Hero
        title="EDUCATION COORDINATOR"
        subtitle="Empowering members through continuous learning"
        buttons={[
          { label: "Your Role – Easy Checklist", href: "#", variant: "outlined" },
          { label: "Education Slide deck 2024", href: "#", variant: "outlined" },
        ]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {categories.map((category) => (
            <div key={category.title}>
              <h3 className="flex items-center justify-center gap-2 text-lg font-extrabold text-bni-dark mb-6 uppercase tracking-wide">
                <span className="w-2.5 h-2.5 bg-bni-red rounded-full inline-block" />
                {category.title}
              </h3>
              <div className="flex flex-col gap-3">
                {category.items.map((item) => (
                  <ResourceButton
                    key={item.label}
                    label={item.label}
                    href={item.href}
                    variant="filled"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
