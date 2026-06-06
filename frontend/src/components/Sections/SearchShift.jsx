import ScrollReveal from "../ui/ScrollReveal";

export default function SearchShift() {
  return (
    <ScrollReveal>
      <section className="text-center px-6">

        <p className="text-gray-500 mb-4">
          The search paradigm is shifting in real time
        </p>

        <h2 className="text-3xl md:text-5xl font-semibold leading-tight">
          Google Search →{" "}
          <span className="text-[#007FFF]">AI Answers</span> → Citations
        </h2>

      </section>
    </ScrollReveal>
  );
}