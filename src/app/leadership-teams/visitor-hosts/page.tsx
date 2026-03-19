import Hero from "@/components/Hero";
import ResourceButton from "@/components/ResourceButton";

const beforeMeeting = [
  { label: "Prepare visitor packs", href: "#" },
  { label: "Review visitor list", href: "#" },
  { label: "Coordinate with members", href: "#" },
];

const registration = [
  { label: "Welcome visitors", href: "#" },
  { label: "Visitor registration form", href: "#" },
  { label: "Name badges and seating", href: "#" },
];

const afterMeeting = [
  { label: "Follow up with visitors", href: "#" },
  { label: "Send thank you emails", href: "#" },
  { label: "Update visitor tracking", href: "#" },
];

export default function VisitorHostsPage() {
  return (
    <main>
      <Hero
        title="VISITOR HOST"
        buttons={[
          { label: "Your role easy checklist", href: "#" },
          { label: "Visitor Symposium 2025 Documents", href: "#" },
          { label: "Visitor Portal training from 28 minutes", href: "#" },
        ]}
      />

      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Before the Meeting */}
          <div>
            <h3 className="text-lg font-bold text-bni-dark mb-4 text-center">
              Before the Meeting
            </h3>
            <div className="flex flex-col gap-3">
              {beforeMeeting.map((item) => (
                <ResourceButton
                  key={item.label}
                  label={item.label}
                  href={item.href}
                  variant="filled"
                />
              ))}
            </div>
          </div>

          {/* Registration */}
          <div>
            <h3 className="text-lg font-bold text-bni-dark mb-4 text-center">
              Registration
            </h3>
            <div className="flex flex-col gap-3">
              {registration.map((item) => (
                <ResourceButton
                  key={item.label}
                  label={item.label}
                  href={item.href}
                  variant="filled"
                />
              ))}
            </div>
          </div>

          {/* After the Meeting */}
          <div>
            <h3 className="text-lg font-bold text-bni-dark mb-4 text-center">
              After the Meeting
            </h3>
            <div className="flex flex-col gap-3">
              {afterMeeting.map((item) => (
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
