import ScrollReveal from "../ui/ScrollReveal";

export default function Citations() {
  return (
    <ScrollReveal>
      <section className="px-6 max-w-5xl mx-auto space-y-6">

        <h3 className="text-2xl font-semibold text-center">
          Live AI Citation Examples
        </h3>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="apex-card hover-lift">
            <p className="text-black font-medium">
              “Best law firms in Houston”
            </p>
            <p className="text-sm text-gray-600 mt-2">
              AI cites: Firm A, Firm B
            </p>
          </div>

          <div className="apex-card hover-lift">
            <p className="text-black font-medium">
              “Top GEO and AI Search optimization agencies Houston”
            </p>
            <p className="text-sm text-gray-600 mt-2">
              AI cites: ApexWeb360
            </p>
          </div>

        </div>

      </section>
    </ScrollReveal>
  );
}