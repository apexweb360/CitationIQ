export default function AIChatMock({ phase }) {
  return (
    <div className="apex-card relative overflow-hidden">

      {/* HEADER */}
      <div className="text-xs text-gray-500 mb-4 tracking-wide">
        Search Behavior Shift → AI Answer Engines
      </div>

      {/* USER */}
      <div className="mb-5">
        <p className="text-xs text-gray-500 mb-1">User</p>

        <div className="bg-black text-white p-3 rounded-lg text-sm">
          Can you recommend a good law firm in Houston?
        </div>
      </div>

      {/* AI */}
      <div>
        <p className="text-xs text-gray-500 mb-2">AI</p>

        <div className="space-y-3 text-sm text-black">

          <p className="opacity-70 transition-all duration-500">
            Analyzing generative search patterns...
          </p>

          {/* STEP 1 */}
          <p
            className={`
              transition-all duration-700 ease-out hover-lift
              ${phase >= 1 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-3"}
            `}
          >
            • <span className="text-accent font-medium">Firm A</span> — frequently surfaced in AI answers
          </p>

          {/* STEP 2 */}
          <p
            className={`
              transition-all duration-700 ease-out hover-lift
              ${phase >= 2 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-3"}
            `}
          >
            • <span className="text-accent font-medium">Firm B</span> — strong GEO visibility signals
          </p>

          {/* STEP 3 (INSIGHT REVEAL) */}
          <p
            className={`
              transition-all duration-700 ease-out text-gray-600
              ${phase >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
            `}
          >
            Citation pattern detected → AI visibility advantage increasing
          </p>

        </div>

        {/* subtle “system scanning bar” */}
        <div className="mt-5 h-[2px] w-full bg-black/10 overflow-hidden rounded">
          <div className="h-full w-1/2 bg-[#007FFF] animate-pulse"></div>
        </div>
      </div>

    </div>
  );
}