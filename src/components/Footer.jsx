import { motion } from 'framer-motion'
import { PHONE_DISPLAY, PHONE_TEL, INSTAGRAM_HANDLE, INSTAGRAM_URL, LOCATION } from "../config.js";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-navy-deep text-slate-300"
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8 pt-14 pb-8">
        <div className="grid md:grid-cols-[2fr_1fr_1fr] gap-10 mb-10">
          <div>
            <img src="/logo.png" alt="Pune.CarRentals - self drive car rentals" className="w-36 h-36 rounded-full mb-4" loading="lazy" />
            <p className="text-sm max-w-xs">
              Premium self-drive car rentals in Pune. Drive your journey, your way.
            </p>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              {[["#fleet","Our Fleet"],["#offers","Special Offers"],["#why","Why Us"],["#faq","FAQ"]].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="hover:text-brand-yellow transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Contact</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href={PHONE_TEL} className="hover:text-brand-yellow transition-colors">{PHONE_DISPLAY}</a></li>
              <li>
                <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="hover:text-brand-yellow transition-colors">
                  {INSTAGRAM_HANDLE}
                </a>
              </li>
              <li>{LOCATION}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gold/30 pt-6 flex flex-wrap justify-between gap-3 text-xs">
          <span>© 2026 Pune.CarRentals. All rights reserved.</span>
          <span>Bookings confirmed on WhatsApp</span>
        </div>
      </div>
    </motion.footer>
  )
}
