import Hero from "@/components/Hero";
import ResourceButton from "@/components/ResourceButton";

export default function CalendarEventsPage() {
  return (
    <main>
      <Hero title="CALENDAR & EVENTS" buttons={[]} />

      <section className="max-w-6xl mx-auto px-6 py-12 text-center">
        <ResourceButton
          label="Event Calendar & National MSP training dates"
          href="#"
          variant="wide"
        />
      </section>
    </main>
  );
}
