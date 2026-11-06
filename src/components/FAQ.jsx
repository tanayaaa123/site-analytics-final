import { useState } from "react";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    q: "What documents do I need?",
    a: "You'll need a valid Driving License and your Aadhaar Card at the time of pickup. Please carry the originals — a booking cannot be handed over without them.",
  },
  {
    q: "Is there a security deposit?",
    a: "Yes, a refundable security deposit is collected at pickup. The amount depends on the car and is confirmed with you on WhatsApp before the booking is finalised.",
  },
  {
    q: "Do you offer doorstep delivery?",
    a: "Yes, we deliver the car within 25 km radius from our pickup location. This will cost an additional fee.",
  },
  {
    q: "What happens in case of a breakdown?",
    a: "Call our 24/7 support number and we'll arrange roadside assistance or a replacement vehicle as quickly as possible.",
  },
  {
    q: "Are the cars sanitized?",
    a: "Every car is cleaned and sanitized before it's handed over to you.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="bg-white">
      <div className="max-w-3xl mx-auto px-5 md:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <p className="eyebrow">FAQ</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-navy">
            Everything you need to know
          </h2>
        </motion.div>

        <div>
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="border-b border-black/10"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left group"
                >
                  <span className="font-display font-bold text-navy group-hover:text-brand-orange transition-colors duration-200">
                    {item.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.22, ease: "easeInOut" }}
                    className="flex-shrink-0 text-brand-orange"
                  >
                    <Plus size={20} />
                  </motion.div>
                </button>

                <div
                  className="grid transition-[grid-template-rows,opacity] duration-300 ease-in-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", opacity: isOpen ? 1 : 0 }}
                  aria-hidden={!isOpen}
                >
                  <div className="overflow-hidden">
                    <p className="text-slate-500 text-[14.5px] pb-5 pr-8">{item.a}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
