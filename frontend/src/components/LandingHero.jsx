import { motion } from "framer-motion";

const LandingHero = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-6">
      {/* Cinematic Main Title */}
      <motion.h1 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} // Smooth "Cubic-Bezier" easing
        className="text-8xl font-bold uppercase tracking-tighter"
        style={{ fontFamily: 'Bebas Neue, sans-serif' }}
      >
        ApexWeb360
      </motion.h1>
      
      {/* Editorial Sub-header */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1.5 }}
        className="mt-6 text-xl max-w-2xl text-center text-gray-400"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        Cinematic digital experiences. Precision engineered in Houston.
      </motion.p>
    </div>
  );
};

export default LandingHero;