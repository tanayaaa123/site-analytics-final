import { fleet } from "../data/fleet.js";

export default function Marquee() {
  const items = [...fleet, ...fleet, ...fleet, ...fleet];
  return (
    <div className="bg-navy-deep border-y border-gold/40 py-4 overflow-hidden">
      <div className="marquee">
        {items.map((c, k) => (
          <a key={k} href="#fleet" tabIndex={-1} className="flex items-center font-display text-2xl text-paper whitespace-nowrap hover:text-gold transition-colors">
            <span className="px-8">{c.name}</span>
            <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 0l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#D4AF37" /></svg>
          </a>
        ))}
      </div>
    </div>
  );
}
