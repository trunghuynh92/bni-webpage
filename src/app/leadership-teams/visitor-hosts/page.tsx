import Hero from "@/components/Hero";
import ResourceButton from "@/components/ResourceButton";

const beforeMeeting = [
  { label: "Welcome Letter Example", href: "#" },
  { label: "Invite for Visitor Template", href: "#" },
  { label: "Visitor Reg. and Att. Process", href: "#" },
  { label: "Referral Slips Template", href: "#" },
];

const registration = [
  { label: "Template for Visitor and Sub name tag", href: "#" },
  { label: "Trade Sheet Template", href: "#" },
  { label: "Registration Sign in Sheet", href: "#" },
  { label: "QR Codes for all chapters", href: "#" },
];

const afterMeeting = [
  { label: "Adding Visitors to Portal", href: "#" },
  { label: "2025 Visitor Tracking Form from Symposium", href: "#" },
  { label: "VH Orientation by Wendy Lloyd Curley", href: "#" },
];

const sections = [
  { title: "Before the Meeting", items: beforeMeeting },
  { title: "Registration", items: registration },
  { title: "After the Meeting", items: afterMeeting },
];

export default function VisitorHostsPage() {
  return (
    <main>
      <Hero
        title="VISITOR HOSTS"
        subtitle="Creating exceptional first impressions"
        buttons={[
          { label: "Your role easy checklist", href: "#", variant: "outlined" },
          { label: "Visitor Symposium 2025 Documents", href: "#", variant: "outlined" },
          { label: "Visitor Portal training from 28 minutes", href: "#", variant: "outlined" },
        ]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="flex items-center justify-center gap-2 text-lg font-extrabold text-bni-dark mb-6 uppercase tracking-wide">
                <span className="w-2.5 h-2.5 bg-bni-red rounded-full inline-block" />
                {section.title}
              </h3>
              <div className="flex flex-col gap-3">
                {section.items.map((item) => (
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
