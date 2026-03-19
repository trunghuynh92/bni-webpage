import Hero from "@/components/Hero";

export default function Go4GreenPage() {
  return (
    <main>
      <Hero title="GO4GREEN" buttons={[{ label: "Your Role – Easy Checklist", href: "#" }]} />
      <section className="max-w-6xl mx-auto px-6 py-12">
        <p className="text-gray-500 text-center">Resources coming soon. Check back for updates.</p>
      </section>
    </main>
  );
}
