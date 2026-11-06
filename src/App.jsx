import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Splash from './components/Splash.jsx'
import { scrollToHash } from './utils/scroll.js'
import { track } from './analytics.js'
import Marquee from './components/Marquee.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Fleet from './components/Fleet.jsx'
import WhyUs from './components/WhyUs.jsx'
import Offers from './components/Offers.jsx'
import Testimonials from './components/Testimonials.jsx'
import FAQ from './components/FAQ.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import WhatsAppFab from './components/WhatsAppFab.jsx'
import BookingModal from './components/BookingModal.jsx'

export default function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedCar, setSelectedCar] = useState('Any car')
  const [splash, setSplash] = useState(true)
  const { scrollYProgress } = useScroll()
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })
  useEffect(() => { document.body.style.overflow = splash ? 'hidden' : ''; }, [splash])
  // Every link that starts with # (menu, footer, strip) scrolls reliably, on phones too
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest && e.target.closest('a[href^="#"]')
      if (!a) return
      e.preventDefault()
      scrollToHash(a.getAttribute('href'))
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  function openBooking(carName) {
    setSelectedCar(carName)
    setModalOpen(true)
    track('booking_form_open', { car: carName })
  }

  return (
    <div className="min-h-screen bg-paper">
      {splash && <Splash done={() => setSplash(false)} />}
      <motion.div style={{ scaleX: bar }} className="fixed top-0 left-0 right-0 h-[3px] origin-left bg-gradient-to-r from-brand-orange via-gold to-brand-yellow z-[150]" />
      <Header onBook={openBooking} />
      <Hero onBook={openBooking} />
      <Marquee />
      <Fleet onBook={openBooking} />
      <WhyUs />
      <Offers />
      <Testimonials />
      <FAQ />
      <Contact onBook={openBooking} />
      <Footer />
      <WhatsAppFab />
      <BookingModal
        isOpen={modalOpen}
        initialCar={selectedCar}
        onClose={() => setModalOpen(false)}
      />
    </div>
  )
}
