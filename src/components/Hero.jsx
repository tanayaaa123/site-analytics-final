import { motion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";
import { fleet } from "../data/fleet.js";
import { WHATSAPP_NUMBER, PHONE_TEL, TOTAL_CARS } from "../config.js";
import "./hero.css";

const ease = [0.22, 1, 0.36, 1];
const T = 1.3; // start after the logo splash
const WA = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Pune.CarRentals, I want to book a self-drive car.")}`;

export default function Hero({ onBook }) {
  const cars = [...fleet, ...fleet]; // doubled for a seamless loop

  return (
    <section className="hero" id="home">
      <div className="copy">
        <motion.p className="eyebrow" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: T, duration: 0.8 }}>
          SELF DRIVE CAR RENTALS · PUNE
        </motion.p>
        <h1>
          <span className="mask"><motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: T + 0.15, duration: 1, ease }}>Drive Pune,</motion.span></span>
          <span className="mask"><motion.span className="tan" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: T + 0.3, duration: 1, ease }}>your way.</motion.span></span>
        </h1>
        <motion.p className="sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: T + 0.9, duration: 0.8 }}>
          Clean, insured cars ready 24×7. Tap a car, send your dates on WhatsApp, and we confirm within the hour.
        </motion.p>
      </div>

      <div className="lower">
        <div className="stage">
          <div className="bgwrap" aria-hidden="true"><div className="bgtext"><span>SELF DRIVE</span></div></div>
          {/* cars rush in from the right with motion blur, then cruise left forever */}
          <motion.div
            className="belt"
            initial={{ x: "60%", opacity: 0 }} animate={{ x: 0, opacity: 1 }}
            transition={{ delay: T + 0.4, duration: 1.6, ease }}
          >
            <div className="track">
              {cars.map((c, k) => (
                <button key={k} className="slot" onClick={() => onBook(c.name)} aria-label={`Book ${c.name}`} tabIndex={k < fleet.length ? 0 : -1} aria-hidden={k >= fleet.length}>
                  <img src={c.cut} alt={k < fleet.length ? c.name : ""} loading="eager" decoding="async" draggable="false" />
                  <b>{c.name}</b>
                  <small>{c.fuel} · ₹{c.price.toLocaleString("en-IN")} / day</small>
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div className="cta" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: T + 1.2, duration: 0.9, ease }}>
          <a href={WA} target="_blank" rel="noreferrer" className="btn-gold"><MessageCircle size={19} /> Book on WhatsApp</a>
          <button onClick={() => onBook("Any car")} className="btn-glass">Choose a car &amp; dates</button>
          <a href={PHONE_TEL} className="btn-glass"><Phone size={17} /> Call us</a>
        </motion.div>

        <motion.p className="facts" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: T + 1.6 }}>
          <span><b>{TOTAL_CARS}</b> cars</span><span><b>24×7</b> support</span><span><b>₹0</b> hidden fees</span>
        </motion.p>
      </div>
    </section>
  );
}
