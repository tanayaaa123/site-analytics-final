// Smooth-scrolls to a section and leaves room for the fixed header,
// so the section title is never hidden underneath it.
export function scrollToHash(hash) {
  const id = (hash || "").replace("#", "");
  if (!id || id === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return true;
  }
  const el = document.getElementById(id);
  if (!el) return false;
  const header = document.querySelector("header");
  const offset = (header ? header.offsetHeight : 72) - 1;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  return true;
}
