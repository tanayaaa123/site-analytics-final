import { useRef } from "react";

// 3D tilt + moving light that follows the cursor
export default function Tilt({ children, className = "" }) {
  const ref = useRef(null);
  const move = (e) => {
    const el = ref.current, r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    el.style.transform = `perspective(900px) rotateY(${(x - 0.5) * 12}deg) rotateX(${(0.5 - y) * 10}deg) translateY(-6px)`;
    el.style.setProperty("--mx", `${x * 100}%`); el.style.setProperty("--my", `${y * 100}%`);
  };
  const leave = () => { ref.current.style.transform = ""; };
  return (
    <div ref={ref} onMouseMove={move} onMouseLeave={leave} className={`relative transition-transform duration-200 will-change-transform ${className}`}>
      {children}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity" style={{ background: "radial-gradient(260px circle at var(--mx) var(--my), rgba(212,175,55,.22), transparent 60%)" }} />
    </div>
  );
}
