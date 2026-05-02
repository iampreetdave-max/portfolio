"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(scrollY > 300);
      setScrollPct(total > 0 ? (scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const circumference = 2 * Math.PI * 16;
  const strokeDashoffset = circumference * (1 - scrollPct / 100);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 w-11 h-11 flex items-center justify-center bg-white/[0.025] border border-white/[0.07] rounded-full hover:border-[#C9A86A]/45 hover:bg-[#C9A86A]/[0.06] transition-all duration-300"
          aria-label="Back to top"
        >
          <svg
            className="absolute inset-0"
            width="44"
            height="44"
            viewBox="0 0 44 44"
          >
            <circle cx="22" cy="22" r="16" fill="none" stroke="rgba(201,168,106,0.12)" strokeWidth="1.5" />
            <circle
              cx="22" cy="22" r="16"
              fill="none"
              stroke="#C9A86A"
              strokeWidth="1.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{
                transform: "rotate(-90deg)",
                transformOrigin: "center",
                transition: "stroke-dashoffset 0.1s linear",
              }}
            />
          </svg>
          <ChevronUp size={14} className="text-white/55 relative z-10" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
