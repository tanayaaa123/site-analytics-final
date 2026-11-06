import { motion } from "framer-motion";

export default function Splash({ done }) {
  return (
    <motion.div
      className="fixed inset-0 z-[300] grid place-items-center bg-navy-deep"
      initial={{ clipPath: "circle(150% at 50% 50%)" }}
      animate={{ clipPath: "circle(0% at 50% 50%)" }}
      transition={{ delay: 1.3, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={done}
    >
      <div className="relative">
        <div className="absolute -inset-3 rounded-full" style={{ border: "1.5px solid transparent", borderTopColor: "#D4AF37", animation: "spin 1.6s linear infinite" }} />
        <motion.img src="/logo.png" alt="Pune.CarRentals" className="w-56 h-56 sm:w-72 sm:h-72 rounded-full shadow-[0_0_80px_rgba(212,175,55,0.25)]" initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }} />
      </div>
    </motion.div>
  );
}
