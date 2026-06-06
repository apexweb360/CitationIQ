import ScrollReveal from "../ui/ScrollReveal";

export default function Results() {
  return (
    <ScrollReveal>
      <section className="px-6 max-w-5xl mx-auto">

        <h3 className="text-center text-2xl font-semibold mb-10">
          Results & Visibility Growth
        </h3>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="apex-card-dark p-6 text-center">
            <p className="text-3xl text-accent font-semibold">+312%</p>
            <p className="text-gray-400 text-sm">AI citations increase</p>
          </div>

          <div className="apex-card-dark p-6 text-center">
            <p className="text-3xl text-accent font-semibold">Top 3</p>
            <p className="text-gray-400 text-sm">GEO visibility ranking</p>
          </div>

          <div className="apex-card-dark p-6 text-center">
            <p className="text-3xl text-accent font-semibold">48h</p>
            <p className="text-gray-400 text-sm">Average visibility lift</p>
          </div>

        </div>

      </section>
    </ScrollReveal>
  );
}