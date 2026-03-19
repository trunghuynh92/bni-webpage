import Hero from "@/components/Hero";
import ResourceButton from "@/components/ResourceButton";

export default function CalendarEventsPage() {
  return (
    <main>
      <Hero
        title="CALENDAR & EVENTS"
        subtitle="Never miss an opportunity to connect"
        buttons={[]}
      />

      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <ResourceButton
          label="Event Calendar & National MSP Training Dates"
          href="#"
          variant="wide"
        />
      </section>
    </main>
  );
}
