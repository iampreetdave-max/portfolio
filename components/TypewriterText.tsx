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

  useEffect(() => {
    const current = phrases[phraseIndex];
    const speed = isDeleting ? 30 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(current.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
        if (charIndex + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), 1500);
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
  }, [charIndex, isDeleting, phraseIndex]);

  return (
    <span className="font-mono text-lg md:text-xl text-gray-400">
      {text}
      <span className="animate-pulse">|</span>
    </span>
  );
}
