import ScrollReveal from "../ui/ScrollReveal";

export default function VisibilityScore() {
  return (
    <ScrollReveal>
      <section className="max-w-4xl mx-auto px-6">

        <div className="apex-card-dark p-10 text-center">

          <p className="text-gray-400 text-sm mb-6">
            AI Visibility Score
          </p>

          <div className="text-6xl font-semibold text-accent">
            72
          </div>

          <p className="text-gray-500 mt-4">
            Your brand is partially visible in generative engines
          </p>

          {/* animated bar */}
          <div className="mt-8 h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-[72%] bg-[#007FFF] transition-all duration-700"></div>
          </div>

        </div>

      </section>
    </ScrollReveal>
  );
}