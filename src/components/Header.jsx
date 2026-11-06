import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { href: "#", label: "Home" },
  { href: "#fleet", label: "Fleet" },
  { href: "#offers", label: "Offers" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export default function Header({ onBook }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 border-b border-gold/30 transition-all duration-300 ${
        scrolled ? "bg-navy-deep/95 backdrop-blur-md shadow-lg" : "bg-navy-deep"
      }`}
    >
      <div className="max-w-6xl mx-auto flex justify-between md:grid md:grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 md:px-8 py-2">
        <a href="#" className="flex items-center gap-2.5 sm:gap-3 min-w-0 justify-self-start text-white">
          <motion.img
            whileHover={{ scale: 1.08, rotate: 3 }}
            transition={{ type: "spring", stiffness: 300 }}
            src="/logo.png"
            alt="Pune.CarRentals logo"
            className="w-14 h-14 sm:w-[4.5rem] sm:h-[4.5rem] shrink-0 rounded-full object-cover drop-shadow-[0_4px_10px_rgba(0,0,0,0.45)]"
          />
          <span className="leading-none">
            <span className="block font-display font-bold text-[1.35rem] sm:text-2xl tracking-tight whitespace-nowrap">Pune<span className="text-gold">.</span>CarRentals</span>
            <span className="block mt-1 text-[7.5px] sm:text-[9px] font-bold tracking-[0.14em] sm:tracking-[0.2em] whitespace-nowrap text-slate-300">
              SELF DRIVE CAR RENTALS
            </span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8 justify-self-center">
          {LINKS.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07 }}
              className="text-sm font-semibold text-slate-200 hover:text-white relative group transition-colors"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-200 rounded-full" />
            </motion.a>
          ))}
        </nav>

        <div className="hidden md:flex items-center justify-self-end">
          <motion.button
            onClick={() => onBook("Any car")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="bg-brand-orange hover:bg-brand-orangedeep text-white font-bold text-sm px-5 py-2.5 rounded-full shadow-orange transition-colors shine"
          >
            Book Now
          </motion.button>
        </div>

        <button
          className="md:hidden shrink-0 justify-self-end text-white p-1"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={menuOpen ? "close" : "open"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </motion.div>
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: -12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden absolute top-full left-0 right-0 border-t border-white/10 bg-navy-deep shadow-xl"
          >
            <div className="px-5 pb-5 pt-3 flex flex-col gap-4">
              {LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ x: -16, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-semibold text-slate-200"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                onClick={() => { setMenuOpen(false); onBook("Any car"); }}
                className="bg-brand-orange text-white font-bold text-sm px-5 py-3 rounded-full text-center"
              >
                Book Now
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
