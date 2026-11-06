import { motion } from 'framer-motion'

const OFFERS = [
  {
    tag: 'Weekend Escape',
    title: 'Flat 15% off',
    body: 'On all bookings from Friday to Monday.',
    gradient: 'from-[#0E8A5B] to-[#4FC59A]',
  },
  {
    tag: 'Long Drive',
    title: 'Weekly special',
    body: 'Book 7+ days and save up to ₹5,000.',
    gradient: 'from-[#04241B] to-[#1F6F54]',
  },
  {
    tag: 'First Ride',
    title: '₹500 off',
    body: 'New user gift — mention code WELCOME500 on WhatsApp.',
    gradient: 'from-[#B8921F] to-[#F2D77A]',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const cardVariant = {
  hidden: { opacity: 0, scale: 0.92, y: 24 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function Offers() {
  return (
    <section id="offers" className="max-w-6xl mx-auto px-5 md:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <p className="eyebrow">SPECIAL OFFERS</p>
        <h2 className="font-display font-bold text-4xl md:text-5xl text-navy">
          Save more on every drive
        </h2>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {OFFERS.map((offer) => (
          <motion.div
            key={offer.tag}
            variants={cardVariant}
            whileHover={{ scale: 1.03, y: -4 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className={`bg-gradient-to-br ${offer.gradient} text-white rounded-2xl p-7 relative overflow-hidden`}
          >
            {/* Subtle shimmer layer */}
            <motion.div
              className="absolute inset-0 bg-white/5 rounded-2xl"
              initial={{ x: "-100%", skewX: "-15deg" }}
              whileHover={{ x: "200%", skewX: "-15deg" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
            <p className="text-xs font-bold uppercase tracking-wide opacity-85 relative z-10">{offer.tag}</p>
            <h3 className="font-display font-bold text-2xl mt-2.5 mb-2 relative z-10">{offer.title}</h3>
            <p className="text-sm opacity-90 relative z-10">{offer.body}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
