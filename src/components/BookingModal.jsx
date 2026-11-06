import { track } from "../analytics.js";
import { useEffect, useState } from "react";
import { X, FileWarning } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fleet } from "../data/fleet.js";
import { WHATSAPP_NUMBER } from "../config.js";

const ANY_CAR = "Any car — will decide with the team";

export default function BookingModal({ isOpen, initialCar, onClose }) {
  const [car, setCar] = useState(ANY_CAR);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pickupTime, setPickupTime] = useState({ h: "", m: "00", p: "AM" });
  const [dropTime, setDropTime] = useState({ h: "", m: "00", p: "AM" });
  const [docsConfirmed, setDocsConfirmed] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setCar(initialCar && initialCar !== "Any car" ? initialCar : ANY_CAR);
      setError("");
    }
  }, [isOpen, initialCar]);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  function reset() {
    setName(""); setPhone(""); setStartDate(""); setEndDate("");
    setPickupTime({ h: "", m: "00", p: "AM" }); setDropTime({ h: "", m: "00", p: "AM" }); setDocsConfirmed(false); setError("");
  }

  function handleClose() { reset(); onClose(); }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) { setError("Please enter your name and phone number."); return; }
    if (phone.replace(/\D/g, "").length < 10) { setError("Please enter a valid 10-digit phone number."); return; }
    if (!startDate || !endDate || !pickupTime.h || !dropTime.h) {
      setError("Please select your start date, end date, pickup time, and drop-off time."); return;
    }
    if (endDate < startDate) { setError("End date cannot be before the start date."); return; }
    if (startDate === endDate && toMinutes(dropTime) <= toMinutes(pickupTime)) {
      setError("Drop-off time must be after pickup time on the same day."); return;
    }
    if (!docsConfirmed) { setError("Please confirm you have a valid Driving License and Aadhaar Card."); return; }

    const message = encodeURIComponent([
      "New Booking Request",
      `Car: ${car}`,
      `Name: ${name.trim()}`,
      `Phone: ${phone.trim()}`,
      `Start date: ${startDate}`,
      `End date: ${endDate}`,
      `Pickup time: ${fmtTime(pickupTime)}`,
      `Drop-off time: ${fmtTime(dropTime)}`,
      "Documents confirmed: Driving License and Aadhaar Card - Yes",
    ].join("\n"));

    track("booking_request", { car, start_date: startDate });
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
    handleClose();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-navy-deep/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-5 pointer-events-none"
          >
            <div
              className="bg-white w-full max-w-md rounded-3xl p-7 max-h-[90vh] overflow-y-auto relative pointer-events-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                onClick={handleClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                transition={{ duration: 0.2 }}
                className="absolute top-5 right-5 text-slate-400 hover:text-navy"
                aria-label="Close"
              >
                <X size={22} />
              </motion.button>

              <h3 className="font-display font-bold text-2xl text-navy">Book this car</h3>
              <p className="text-brand-orange font-bold text-sm mt-1 mb-6">
                {car === ANY_CAR ? "Choose a car below" : car}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Field label="Car">
                  <select value={car} onChange={(e) => setCar(e.target.value)}>
                    {fleet.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                    <option value={ANY_CAR}>{ANY_CAR}</option>
                  </select>
                </Field>

                <Field label="Your name">
                  <input type="text" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
                </Field>

                <Field label="Phone number">
                  <input type="tel" placeholder="10-digit mobile number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </Field>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Start date">
                    <input type="date" value={startDate} min={today()} onChange={(e) => setStartDate(e.target.value)} required />
                  </Field>
                  <Field label="End date">
                    <input type="date" value={endDate} min={startDate || today()} onChange={(e) => setEndDate(e.target.value)} required />
                  </Field>
                  <TimeField label="Pickup time" value={pickupTime} onChange={setPickupTime} />
                  <TimeField label="Drop-off time" value={dropTime} onChange={setDropTime} />
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-[13.5px] text-amber-800">
                  <FileWarning size={20} className="flex-shrink-0 mt-0.5" />
                  <p>
                    You'll need to carry your <b>original Driving License</b> and{" "}
                    <b>Aadhaar Card</b> at the time of pickup — these are required for every self-drive booking.
                  </p>
                </div>

                <label className="flex items-start gap-2.5 text-[13.5px] text-slate-600">
                  <input
                    type="checkbox"
                    checked={docsConfirmed}
                    onChange={(e) => setDocsConfirmed(e.target.checked)}
                    className="mt-0.5 accent-brand-orange w-4 h-4 flex-shrink-0"
                  />
                  I confirm I have a valid Driving License and Aadhaar Card, and will carry both at pickup.
                </label>

                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="text-sm text-red-600 font-medium"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                <div className="flex gap-3 pt-1">
                  <motion.button
                    type="button"
                    onClick={handleClose}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex-1 border border-black/10 text-slate-500 font-semibold rounded-full py-3 hover:border-slate-400 hover:text-navy transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex-[1.4] bg-brand-orange hover:bg-brand-orangedeep text-white font-bold rounded-full py-3 shadow-orange transition-colors"
                  >
                    Send on WhatsApp
                  </motion.button>
                </div>

                <p className="text-xs text-slate-400 text-center pt-1">
                  This opens WhatsApp with your details pre-filled. Nothing is booked until our team confirms with you there.
                </p>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

const toMinutes = ({ h, m, p }) => ((Number(h) % 12) + (p === "PM" ? 12 : 0)) * 60 + Number(m);
const fmtTime = ({ h, m, p }) => `${h}:${m} ${p}`;

const selCls = "w-full bg-paper border border-black/10 rounded-xl px-2 py-3 text-[15px] focus:outline-none focus:border-brand-orange";

function TimeField({ label, value, onChange }) {
  const set = (k, v) => onChange({ ...value, [k]: v });
  return (
    <div>
      <span className="block text-xs font-semibold text-slate-500 mb-1.5">{label}</span>
      <div className="grid grid-cols-[1.1fr_1.1fr_1fr] gap-2">
        <select aria-label={`${label} hour`} className={selCls} value={value.h} onChange={(e) => set("h", e.target.value)}>
          <option value="">Hr</option>
          {Array.from({ length: 12 }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
        </select>
        <select aria-label={`${label} minutes`} className={selCls} value={value.m} onChange={(e) => set("m", e.target.value)}>
          {["00", "15", "30", "45"].map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
        <select aria-label={`${label} AM or PM`} className={selCls + " font-bold"} value={value.p} onChange={(e) => set("p", e.target.value)}>
          <option>AM</option><option>PM</option>
        </select>
      </div>
    </div>
  );
}

function today() {
  return new Date().toISOString().split("T")[0];
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-slate-500 mb-1.5">{label}</span>
      <div className="[&>input]:w-full [&>select]:w-full [&>input]:bg-paper [&>select]:bg-paper [&>input]:border [&>select]:border [&>input]:border-black/10 [&>select]:border-black/10 [&>input]:rounded-xl [&>select]:rounded-xl [&>input]:px-4 [&>select]:px-4 [&>input]:py-3 [&>select]:py-3 [&>input]:text-[15px] [&>select]:text-[15px] [&>input:focus]:outline-none [&>select:focus]:outline-none [&>input:focus]:border-brand-orange [&>select:focus]:border-brand-orange">
        {children}
      </div>
    </label>
  );
}
