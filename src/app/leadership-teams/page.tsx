import Hero from "@/components/Hero";
import ResourceButton from "@/components/ResourceButton";
import Link from "next/link";

const roleLinks = [
  { label: "President", href: "/leadership-teams/president" },
  { label: "Vice President", href: "/leadership-teams/vice-president" },
  { label: "Secretary", href: "/leadership-teams/treasurer-secretary" },
  { label: "Mentor Coordinator", href: "/leadership-teams/mentor-coordinator" },
  { label: "MC Engagement", href: "/leadership-teams/mc-engagement" },
  { label: "MC Quality Assurance", href: "/leadership-teams/mc-quality-assurance" },
  { label: "MC Relations", href: "/leadership-teams/mc-relations" },
  { label: "MC Community Builder", href: "/leadership-teams/mc-community-builder" },
  { label: "Education Coordinator", href: "/leadership-teams/education-coordinator" },
  { label: "Go4Green", href: "/leadership-teams/go4green" },
  { label: "Growth & Events", href: "/leadership-teams/growth-events" },
  { label: "Visitor Hosts", href: "/leadership-teams/visitor-hosts" },
];

export default function LeadershipTeamsPage() {
  return (
    <main>
      <Hero
        title="LEADERSHIP TEAMS"
        subtitle="Driving chapter excellence through dedicated leadership"
        buttons={[
          { label: "Leadership Forum", href: "#", variant: "outlined" },
          { label: "Operations Manual", href: "#", variant: "outlined" },
        ]}
      />

      {/* Leadership Introduction Scripts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <ResourceButton
          label="LEADERSHIP INTRODUCTION SCRIPTS"
          href="#"
          variant="wide"
        />
      </section>

      {/* Your Leadership Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-bni-dark mb-10 tracking-tight">
          Your Leadership Team
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {roleLinks.map((role) => (
            <Link
              key={role.label}
              href={role.href}
              className="bg-bni-dark text-white rounded-xl p-6 font-semibold text-sm text-center border-l-4 border-l-transparent hover:border-l-bni-red transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              {role.label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
