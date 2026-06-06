import ScrollReveal from "../ui/ScrollReveal";

export default function CTA() {
  return (
    <ScrollReveal>
      <section className="text-center py-32 px-6">

        <h2 className="text-4xl font-semibold">
          Own Your AI Visibility
        </h2>

        <p className="text-gray-400 mt-4">
          Before your competitors become the citation instead of you.
        </p>

        <button className="mt-8 bg-[#007FFF] px-8 py-4 rounded-xl hover:opacity-90 transition hover-lift">
          Get Started
        </button>

      </section>
    </ScrollReveal>
  );
}