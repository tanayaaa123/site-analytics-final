import { motion } from 'framer-motion'

const TESTIMONIALS = [
  {
    quote: "Booked the Thar for a Lonavala trip — spotless car, delivered on time, and the team handled everything smoothly.",
    name: 'Rohit S.',
    role: 'Weekend rider',
    initial: 'R',
  },
  {
    quote: "Rented the Fortuner for a family wedding. Loved the transparent pricing and the car itself was in showroom condition.",
    name: 'Ananya M.',
    role: 'Frequent traveler',
    initial: 'A',
  },
  {
    quote: "Reliable, professional, and premium. We use Pune.CarRentals for every out-of-town office trip now.",
    name: 'Vikram P.',
    role: 'Corporate client',
    initial: 'V',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const cardVariant = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function Testimonials() {
  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="eyebrow">TESTIMONIALS</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-navy">
            Loved by drivers across Pune
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {TESTIMONIALS.map((t) => (
            <motion.div
              key={t.name}
              variants={cardVariant}
              whileHover={{ y: -5, boxShadow: "0 16px 40px rgba(0,0,0,0.08)" }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="bg-paper border border-gold/30 rounded-2xl p-7 relative"
            >
              {/* Big quote mark */}
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="absolute top-5 right-6 text-6xl font-display text-gold/40 leading-none select-none"
                aria-hidden="true"
              >
                "
              </motion.span>

              <p className="text-slate-600 text-[15px] mb-5 relative z-10 pr-6">"{t.quote}"</p>

              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-9 h-9 rounded-full bg-navy text-gold flex items-center justify-center font-bold text-sm"
                >
                  {t.initial}
                </motion.div>
                <div>
                  <b className="block text-sm text-navy">{t.name}</b>
                  <span className="text-xs text-slate-500">{t.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
