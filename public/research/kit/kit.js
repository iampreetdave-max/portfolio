/* Research demo kit: theme toggle shared with the site, one tooltip, scroll reveal, number
   count-up, chart entrance animation and a frame tween for smooth updates. No dependencies.
   Each page also needs, in <head>, the same no-flash line the site uses:
   <script>try{var t=localStorage.getItem('theme');if(t)document.documentElement.setAttribute('data-theme',t)}catch(e){}</script> */
(function () {
  const root = document.documentElement;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ease = (t) => 1 - Math.pow(1 - t, 3); // easeOutCubic
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const css = (name) => getComputedStyle(root).getPropertyValue(name).trim();

  // ---- theme: same localStorage key and circle-reveal as iampreetdave.me
  const isDark = () => {
    const t = root.getAttribute("data-theme");
    return t ? t === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  };
  const ICON = {
    sun: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    moon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
  };
  function paintToggles() {
    document.querySelectorAll(".kit-theme").forEach((b) => {
      b.innerHTML = isDark() ? ICON.sun : ICON.moon;
      b.setAttribute("aria-label", isDark() ? "Switch to light theme" : "Switch to dark theme");
    });
  }
  function toggleTheme(e) {
    const next = isDark() ? "light" : "dark";
    const apply = () => {
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (_) {}
      paintToggles();
      document.dispatchEvent(new CustomEvent("kit:theme", { detail: next }));
    };
    if (!document.startViewTransition || reduced) return apply();
    const b = e.currentTarget.getBoundingClientRect();
    const x = b.left + b.width / 2, y = b.top + b.height / 2;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    document.startViewTransition(apply).ready.then(() => {
      root.animate({ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 550, easing: "cubic-bezier(.22,1,.36,1)", pseudoElement: "::view-transition-new(root)" });
    });
  }

  // ---- tooltip: any element with data-tip (HTML) shows it on hover, tap or keyboard focus
  let tipEl, tipFor = null;
  function tipNode() {
    if (!tipEl) { tipEl = document.createElement("div"); tipEl.className = "kit-tip"; tipEl.setAttribute("role", "tooltip"); document.body.appendChild(tipEl); }
    return tipEl;
  }
  function place(x, y) {
    const t = tipNode(), w = t.offsetWidth, h = t.offsetHeight, pad = 12;
    let left = x + pad, top = y - h - pad;
    if (left + w > innerWidth - 8) left = x - w - pad;
    if (left < 8) left = 8;
    if (top < 8) top = y + pad;
    t.style.left = left + "px"; t.style.top = top + "px";
  }
  const tip = {
    show(html, x, y) { const t = tipNode(); t.innerHTML = html; place(x, y); t.classList.add("on"); },
    move(x, y) { if (tipEl && tipEl.classList.contains("on")) place(x, y); },
    hide() { if (tipEl) tipEl.classList.remove("on"); tipFor = null; },
  };
  const tipTarget = (n) => n && n.closest && n.closest("[data-tip]");
  document.addEventListener("pointerover", (e) => {
    const el = tipTarget(e.target);
    if (!el) return;
    tipFor = el; tip.show(el.getAttribute("data-tip"), e.clientX, e.clientY);
    el.dispatchEvent(new CustomEvent("kit:hover", { bubbles: true, detail: true }));
  });
  document.addEventListener("pointermove", (e) => { if (tipFor) tip.move(e.clientX, e.clientY); });
  document.addEventListener("pointerout", (e) => {
    const el = tipTarget(e.target);
    if (!el || (e.relatedTarget && el.contains(e.relatedTarget))) return;
    tip.hide(); el.dispatchEvent(new CustomEvent("kit:hover", { bubbles: true, detail: false }));
  });
  document.addEventListener("focusin", (e) => {
    const el = tipTarget(e.target);
    if (!el) return;
    const r = el.getBoundingClientRect(); tipFor = el; tip.show(el.getAttribute("data-tip"), r.left + r.width / 2, r.top);
  });
  document.addEventListener("focusout", () => tip.hide());
  addEventListener("scroll", () => tip.hide(), { passive: true });

  // ---- scroll reveal for .kit-reveal blocks (call kit.reveal() again after adding new ones)
  let io;
  function reveal(scope) {
    const els = (scope || document).querySelectorAll(".kit-reveal:not(.in)");
    if (reduced || !("IntersectionObserver" in window)) return els.forEach((el) => el.classList.add("in"));
    io = io || new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    }), { rootMargin: "0px 0px -8% 0px" });
    els.forEach((el) => io.observe(el));
  }

  // ---- frame tween: fn(t) with eased t from 0 to 1; returns a cancel function
  function tween(ms, fn) {
    if (reduced || ms <= 0) { fn(1); return () => {}; }
    let raf, start;
    const step = (now) => {
      start = start || now;
      const p = Math.min(1, (now - start) / ms);
      fn(ease(p));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }
  const lerp = (a, b, t) => a + (b - a) * t;

  // ---- count-up: animates el's number from its last value to `to`, text via fmt(v)
  function count(el, to, fmt, ms) {
    if (!el) return;
    const from = typeof el._kv === "number" && isFinite(el._kv) ? el._kv : to;
    el._kv = to;
    if (el._kc) el._kc();
    if (!isFinite(to) || from === to) { el.textContent = fmt(to); return; }
    el._kc = tween(ms || 650, (t) => { el.textContent = fmt(lerp(from, to, t)); });
  }

  // ---- chart entrance: [data-draw] strokes draw in, [data-grow] bars grow from their baseline
  //      (data-grow="up|down|right|left"), [data-pop] marks scale in with a small stagger
  function draw(scope, opts) {
    if (reduced || !scope) return;
    const ms = (opts && opts.ms) || 900;
    scope.querySelectorAll("[data-draw]").forEach((p) => {
      if (!p.getTotalLength) return;
      const L = p.getTotalLength();
      p.animate([{ strokeDasharray: `${L} ${L}`, strokeDashoffset: L }, { strokeDasharray: `${L} ${L}`, strokeDashoffset: 0 }],
        { duration: ms, easing: "cubic-bezier(.22,1,.36,1)" });
    });
    const origin = { up: "50% 100%", down: "50% 0%", right: "0% 50%", left: "100% 50%" };
    scope.querySelectorAll("[data-grow]").forEach((b, i) => {
      const d = b.getAttribute("data-grow") || "up";
      const s = d === "right" || d === "left" ? "scaleX(0)" : "scaleY(0)";
      b.style.transformBox = "fill-box"; b.style.transformOrigin = origin[d] || origin.up;
      b.animate([{ transform: s }, { transform: "none" }], { duration: ms * 0.8, delay: Math.min(i, 12) * 28, easing: "cubic-bezier(.22,1,.36,1)", fill: "backwards" });
    });
    scope.querySelectorAll("[data-pop]").forEach((m, i) => {
      m.style.transformBox = "fill-box"; m.style.transformOrigin = "center";
      m.animate([{ transform: "scale(0)", opacity: 0 }, { transform: "none", opacity: 1 }], { duration: 420, delay: Math.min(i, 40) * 12, easing: "cubic-bezier(.34,1.56,.64,1)", fill: "backwards" });
    });
  }

  // Draw a chart's entrance once, when it first scrolls into view.
  function drawOnView(el, opts) {
    if (reduced || !("IntersectionObserver" in window)) return;
    const o = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { draw(el, opts); o.disconnect(); } }), { rootMargin: "0px 0px -10% 0px" });
    o.observe(el);
  }

  window.kit = { reduced, esc, css, tip, reveal, tween, lerp, count, draw, drawOnView, isDark };

  function init() {
    document.querySelectorAll(".kit-theme").forEach((b) => b.addEventListener("click", toggleTheme));
    paintToggles();
    reveal();
    // range inputs: keep the filled part of the track in sync
    const sync = (r) => r.style.setProperty("--p", ((r.value - (r.min || 0)) / ((r.max || 100) - (r.min || 0))) * 100 + "%");
    document.querySelectorAll(".kit-range").forEach((r) => { sync(r); r.addEventListener("input", () => sync(r)); });
    matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => { paintToggles(); document.dispatchEvent(new CustomEvent("kit:theme")); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
