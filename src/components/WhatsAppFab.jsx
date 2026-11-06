import { MessageCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { WHATSAPP_NUMBER } from '../config.js'

export default function WhatsAppFab() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const f = () => setShow(window.scrollY > window.innerHeight * 0.7)
    f(); window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  return (
    <AnimatePresence>{show && <motion.a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noreferrer"
      title="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.93 }}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg"
    >
      {/* Pulse ring */}
      <motion.span
        className="absolute inset-0 rounded-full bg-[#25D366]"
        animate={{ scale: [1, 1.5, 1.5], opacity: [0.6, 0, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeOut" }}
      />
      <MessageCircle size={26} fill="white" strokeWidth={0} className="relative z-10" />
    </motion.a>}</AnimatePresence>
  )
}
