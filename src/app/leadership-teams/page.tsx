import Hero from "@/components/Hero";
import ResourceButton from "@/components/ResourceButton";

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
        buttons={[
          { label: "Leadership Forum Link", href: "#" },
          { label: "CHAPTER OPERATIONS MANUAL", href: "#" },
        ]}
      />

      {/* Leadership Introduction Scripts */}
      <section className="max-w-6xl mx-auto px-6 py-8 text-center">
        <ResourceButton
          label="LEADERSHIP INTRODUCTION SCRIPTS"
          href="#"
          variant="wide"
        />
      </section>

      {/* Role Navigation Grid */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {roleLinks.map((role) => (
            <ResourceButton
              key={role.label}
              label={role.label}
              href={role.href}
              variant="filled"
            />
          ))}
        </div>
      </section>
    </main>
  );
}
