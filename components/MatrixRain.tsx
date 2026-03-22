"use client";

import { useEffect, useRef } from "react";

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノ∞∑∏∂∇";
    const fontSize = 18;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = new Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const y = drops[i] * fontSize;

        // Leading character is a dim white, rest are dark green
        if (drops[i] * fontSize < canvas.height) {
          ctx.fillStyle = "rgba(200, 220, 200, 0.5)";
          ctx.fillText(text, i * fontSize, y);

          // Draw a fading green trail behind the leading char
          if (drops[i] > 1) {
            const trailChar = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillStyle = "rgba(0, 160, 50, 0.35)";
            ctx.fillText(trailChar, i * fontSize, y - fontSize);
          }
        } else {
          ctx.fillStyle = "rgba(0, 120, 40, 0.3)";
          ctx.fillText(text, i * fontSize, y);
        }

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 100);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[1] pointer-events-none"
      style={{ opacity: 0.35 }}
    />
  );
}
