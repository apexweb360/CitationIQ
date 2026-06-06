import ScrollReveal from "../ui/ScrollReveal";

export default function HowItWorks() {
  return (
    <ScrollReveal>
      <section className="text-center px-6">

        <h3 className="text-2xl font-semibold mb-10">
          How ApexLaunch Works
        </h3>

        <div className="grid md:grid-cols-3 gap-6 text-left">

          {["Scan", "Analyze", "Dominate"].map((step, i) => (
            <div key={i} className="apex-card-dark p-6">
              <p className="text-accent font-semibold">{step}</p>
              <p className="text-gray-400 text-sm mt-2">
                AI visibility pipeline stage {i + 1}
              </p>
            </div>
          ))}

        </div>

      </section>
    </ScrollReveal>
  );
}