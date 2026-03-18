"use client";

import { useState, useEffect } from "react";

const phrases = [
  "AI-ML Engineer",
  "Automation Developer",
  "Deep Learning Researcher",
  "B.Tech CS (AI-ML)",
];

export default function TypewriterText() {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const current = phrases[phraseIndex];
    const speed = isDeleting ? 40 : 70;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(current.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
        if (charIndex + 1 === current.length) {
          setIsPaused(true);
          setTimeout(() => {
            setIsPaused(false);
            setIsDeleting(true);
          }, 2000);
        }
      } else {
        setText(current.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setPhraseIndex((p) => (p + 1) % phrases.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex, isPaused]);

  return (
    <div className="inline-flex items-center gap-1">
      <span className="font-mono text-lg md:text-2xl text-gray-400 tracking-wide">
        {">"} {text}
      </span>
      <span className="font-mono text-lg md:text-2xl text-white animate-pulse">
        _
      </span>
    </div>
  );
}
