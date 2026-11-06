import { Phone, Instagram, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { PHONE_DISPLAY, PHONE_TEL, INSTAGRAM_HANDLE, INSTAGRAM_URL, LOCATION } from "../config.js";

export default function Contact({ onBook }) {
  return (
    <section id="contact" className="max-w-6xl mx-auto px-5 md:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10 flex flex-wrap items-end justify-between gap-5"
      >
        <div>
          <p className="eyebrow">GET IN TOUCH</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-navy">
            Ready to drive? Let's make it happen.
          </h2>
        </div>
        <p className="text-slate-500 max-w-sm">
          Questions about a car, a custom rental period, or a corporate booking? We'll respond within an hour.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white border border-gold/30 rounded-2xl p-7"
        >
          <Row icon={Phone} label="Call us" value={PHONE_DISPLAY} href={PHONE_TEL} />
          <Row icon={Instagram} label="Instagram" value={INSTAGRAM_HANDLE} href={INSTAGRAM_URL} />
          <Row icon={MapPin} label="Location" value={LOCATION} last />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white border border-gold/30 rounded-2xl p-7 flex flex-col justify-center items-start"
        >
          <h3 className="font-display font-bold text-xl text-navy mb-2">Skip the form filling.</h3>
          <p className="text-slate-500 mb-6 text-[15px]">
            Tap below and we'll take your booking details straight on WhatsApp.
          </p>
          <motion.button
            onClick={() => onBook("Any car")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="bg-brand-orange hover:bg-brand-orangedeep text-white font-bold px-7 py-4 rounded-full shadow-orange transition-colors"
          >
            Book a car now
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

function Row({ icon: Icon, label, value, href, last }) {
  const content = (
    <motion.div
      whileHover={{ x: 4 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`flex gap-4 items-start ${last ? "" : "mb-5"}`}
    >
      <div className="w-10 h-10 rounded-xl bg-navy flex items-center justify-center flex-shrink-0">
        <Icon size={17} className="text-gold" />
      </div>
      <div>
        <b className="block text-sm text-navy">{label}</b>
        <span className="text-sm text-slate-500">{value}</span>
      </div>
    </motion.div>
  );
  return href ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{content}</a>
  ) : content;
}
