import Hero from "../components/hero/Hero";
import SearchShift from "../components/sections/SearchShift";
import VisibilityScore from "../components/sections/VisibilityScore";
import Citations from "../components/Sections/LiveCitations";
import HowItWorks from "../components/sections/HowItWorks";
import Results from "../components/sections/Results";
import CTA from "../components/sections/CTA";

export default function Home() {
  return (
    <main className="bg-[#0A0A0A] text-white overflow-x-hidden">

      <Hero />

      <div className="space-y-32 md:space-y-40 py-20">

        <SearchShift />
        <VisibilityScore />
        <Citations />
        <HowItWorks />
        <Results />
        <CTA />

      </div>

    </main>
  );
}