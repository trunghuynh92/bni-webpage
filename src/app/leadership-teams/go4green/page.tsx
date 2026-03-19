import Hero from "@/components/Hero";

export default function Go4GreenPage() {
  return (
    <main>
      <Hero title="GO4GREEN" subtitle="Growing membership through green-light results" buttons={[{ label: "Your Role – Easy Checklist", href: "#" }]} />
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <div className="bg-bni-dark rounded-2xl p-12">
          <p className="text-bni-gray text-lg">Resources coming soon.</p>
          <p className="text-bni-gray-dark mt-2">Check back for updates.</p>
        </div>
      </section>
    </main>
  );
}
