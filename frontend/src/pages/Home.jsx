import Hero from "../components/Hero/Hero";
import SearchShift from "../components/Sections/SearchShift";
import VisibilityScore from "../components/Sections/VisibilityScore";
import LiveCitations from "../components/Sections/LiveCitations";
import HowItWorks from "../components/Sections/HowItWorks";
import Results from "../components/Sections/Results";
import CTA from "../components/Sections/CTA";

export default function Home() {
  return (
    <main className="bg-[#0A0A0A] text-white overflow-x-hidden">

      <Hero />

      <div className="space-y-32 md:space-y-40 py-20">

        <SearchShift />
        <VisibilityScore />
        <LiveCitations />
        <HowItWorks />
        <Results />
        <CTA />

      </div>

    </main>
  );
}