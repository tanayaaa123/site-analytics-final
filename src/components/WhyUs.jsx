import { ShieldCheck, IndianRupee, Clock, Sparkles, Truck, Star } from 'lucide-react'
import { motion } from 'framer-motion'

const REASONS = [
  { icon: ShieldCheck, title: 'Fully Insured', body: 'Comprehensive insurance on every ride, no surprises.' },
  { icon: IndianRupee, title: 'Transparent Pricing', body: 'No hidden fees. What you see is what you pay.' },
  { icon: Clock, title: '24/7 Availability', body: 'Pick up and drop any time, on your schedule.' },
  { icon: Sparkles, title: 'Premium Fleet', body: 'Well-maintained cars, sanitized before every trip.' },
  { icon: Truck, title: 'Doorstep Delivery', body: 'We deliver to your door anywhere in Pune.' },
  { icon: Star, title: 'Friendly Support', body: 'Clear communication, and your car ready on time.' },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const cardVariant = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function WhyUs() {
  return (
    <section id="why" className="bg-white">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="eyebrow">WHY CHOOSE US</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-navy">
            Built for drivers who expect more
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {REASONS.map(({ icon: Icon, title, body }) => (
            <motion.div
              key={title}
              variants={cardVariant}
              whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(0,0,0,0.08)" }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="bg-paper border border-gold/30 rounded-2xl p-6 group"
            >
              <motion.div
                className="w-11 h-11 rounded-xl bg-navy text-gold flex items-center justify-center mb-4"
                whileHover={{ scale: 1.2, rotate: 8 }}
                transition={{ type: "spring", stiffness: 300, damping: 14 }}
              >
                <Icon size={20} strokeWidth={2} />
              </motion.div>
              <h3 className="font-display font-bold text-navy mb-1.5">{title}</h3>
              <p className="text-sm text-slate-500">{body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
