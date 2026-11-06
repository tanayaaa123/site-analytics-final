// Tiny wrapper around Google Analytics 4. Does nothing until GA_MEASUREMENT_ID is set in config.js.
import { GA_MEASUREMENT_ID } from "./config.js";

const on = () => Boolean(GA_MEASUREMENT_ID);

export function track(name, params = {}) {
  if (!on()) return;
  if (typeof window.gtag === "function") window.gtag("event", name, params);
}

export function initAnalytics() {
  if (!on() || window.__gaStarted) return;
  window.__gaStarted = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID); // page views are tracked automatically

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(s);

  // One listener covers every WhatsApp, call and Instagram link on the site
  document.addEventListener("click", (e) => {
    const a = e.target.closest && e.target.closest("a[href]");
    if (!a) return;
    const href = a.getAttribute("href") || "";
    if (href.includes("wa.me")) track("whatsapp_click", { link_text: a.innerText.trim().slice(0, 40) || "whatsapp" });
    else if (href.startsWith("tel:")) track("call_click");
    else if (href.includes("instagram.com")) track("instagram_click");
  });
}
