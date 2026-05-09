"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

/* ─── TYPES ─── */

interface MarketRound {
  scenario: string;
  asset: string;
  asset_class: string;
}

interface MarketResult {
  correct_direction: string;
  is_correct: boolean;
  confidence: number;
  explanation: string;
}

interface CountryRound {
  country: string;
  region: string;
  risk_score: number;
  clues: string[];
  risk_analysis: {
    level: string;
    key_tensions: string[];
    market_sectors: string[];
  };
}

interface TensionRound {
  event: string;
  category: string;
  region: string;
  gti_score: number;
  gti_level: string;
  reasoning: string;
}

type GameTab = "market" | "country" | "tension";

/* ─── API HELPER ─── */

async function callAPI(game: string, payload: Record<string, unknown>) {
  const res = await fetch("/api/fun", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ game, payload }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(err.error || `API error ${res.status}`);
  }
  return res.json();
}

/* ─── SHARED COMPONENTS ─── */

function LoadingPulse() {
  return (
    <div className="flex items-center gap-3 py-8 justify-center">
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-white rounded-full"
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
      <span className="font-mono text-[11px] text-white/45 tracking-wider">
        CLAUDE IS THINKING...
      </span>
    </div>
  );
}

function ErrorBanner({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="border border-red-900/50 bg-red-950/20 p-4 text-center rounded-md">
      <p className="font-mono text-xs text-red-300/90 mb-3">{message}</p>
      <button
        onClick={onRetry}
        className="font-mono text-[10px] tracking-wider border border-red-800/70 px-4 py-1.5 text-red-300/90 hover:bg-red-900/30 transition-colors rounded-md"
      >
        RETRY
      </button>
    </div>
  );
}

function ScoreDisplay({ label, value, color }: { label: string; value: string | number; color?: string }) {
  return (
    <div className="border border-white/[0.07] rounded-md px-4 py-3 text-center bg-white/[0.015]">
      <div
        className="font-mono text-2xl font-black tabular"
        style={{ color: color || "#FAFAFA" }}
      >
        {value}
      </div>
      <div className="font-mono text-[9px] text-white/40 tracking-widest uppercase mt-1">
        {label}
      </div>
    </div>
  );
}

function GTIBar({ score, showLabel = true }: { score: number; showLabel?: boolean }) {
  const getColor = (s: number) => {
    if (s <= 25) return "#FAFAFA";
    if (s <= 50) return "#D4D4D4";
    if (s <= 70) return "#E0A040";
    if (s <= 85) return "#E55A4A";
    return "#D63A3A";
  };
  const getLevel = (s: number) => {
    if (s <= 20) return "LOW";
    if (s <= 40) return "MEDIUM";
    if (s <= 60) return "HIGH";
    if (s <= 80) return "ELEVATED";
    return "CRITICAL";
  };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="font-mono text-[10px] text-white/45 tracking-wider">GTI SCORE</span>
          <span
            className="font-mono text-[10px] font-bold tracking-wider"
            style={{ color: getColor(score) }}
          >
            {getLevel(score)} — {score}
          </span>
        </div>
      )}
      <div className="w-full h-2 bg-white/[0.05] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ background: getColor(score) }}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between mt-1">
          <span className="font-mono text-[8px] text-white/30">0</span>
          <span className="font-mono text-[8px] text-white/30">100</span>
        </div>
      )}
    </div>
  );
}

/* ─── GAME 1: PREDICT THE MARKET ─── */

function MarketGame() {
  const [round, setRound] = useState<MarketRound | null>(null);
  const [result, setResult] = useState<MarketResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const newRound = useCallback(async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await callAPI("market", { action: "generate" });
      setRound(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to generate round");
    }
    setLoading(false);
  }, []);

  const predict = async (direction: "BULL" | "BEAR") => {
    if (!round) return;
    setLoading(true);
    setError(null);
    try {
      const data = await callAPI("market", {
        action: "evaluate",
        scenario: round.scenario,
        asset: round.asset,
        prediction: direction,
      });
      setResult(data);
      setScore((s) => ({
        correct: s.correct + (data.is_correct ? 1 : 0),
        total: s.total + 1,
      }));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to evaluate");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-3">
        <ScoreDisplay label="Correct" value={score.correct} />
        <ScoreDisplay label="Total" value={score.total} />
        <ScoreDisplay
          label="Win Rate"
          value={score.total > 0 ? `${Math.round((score.correct / score.total) * 100)}%` : "—"}
          color={score.total > 0 && score.correct / score.total >= 0.5 ? "#FAFAFA" : "#E55A4A"}
        />
      </div>

      {!round && !loading && (
        <div className="border border-white/[0.07] rounded-xl py-16 text-center bg-white/[0.015]">
          <p className="text-white/55 font-mono text-xs mb-6 tracking-wide">
            CLAUDE GENERATES A GEOPOLITICAL SCENARIO.
            <br />
            YOU PREDICT THE MARKET DIRECTION.
          </p>
          <button
            onClick={newRound}
            className="font-mono text-[11px] tracking-wider border border-white/80 text-white px-6 py-2.5 hover:bg-[#C9A86A] hover:text-black hover:border-[#C9A86A] transition-colors rounded-md"
          >
            START GAME
          </button>
        </div>
      )}

      {loading && <LoadingPulse />}
      {error && <ErrorBanner message={error} onRetry={newRound} />}

      {round && !loading && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="border border-white/[0.10] rounded-xl p-6 bg-black/30">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-[#E0A040] rounded-full animate-pulse" />
              <span className="font-mono text-[10px] text-[#E0A040] tracking-widest uppercase">
                BREAKING EVENT
              </span>
            </div>
            <p className="text-white/80 text-sm leading-relaxed mb-4">
              {round.scenario}
            </p>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] border border-white/[0.12] px-2.5 py-1 text-white/55 tracking-wider rounded-md">
                {round.asset_class}
              </span>
              <span className="font-mono text-sm font-bold text-white">
                {round.asset}
              </span>
            </div>
          </div>

          {!result ? (
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => predict("BULL")}
                className="border border-white/[0.10] rounded-xl p-5 text-center hover:bg-white/[0.04] hover:border-white/[0.30] transition-all group"
              >
                <div className="text-2xl mb-1 text-white group-hover:scale-110 transition-transform">↑</div>
                <div className="font-mono text-sm font-bold text-white">BULL</div>
                <div className="font-mono text-[9px] text-white/45 mt-1">Price goes UP</div>
              </button>
              <button
                onClick={() => predict("BEAR")}
                className="border border-[#3a1a1a] rounded-xl p-5 text-center hover:bg-[#E55A4A]/8 hover:border-[#E55A4A]/45 transition-all group"
              >
                <div className="text-2xl mb-1 text-[#E55A4A] group-hover:scale-110 transition-transform">↓</div>
                <div className="font-mono text-sm font-bold text-[#E55A4A]">BEAR</div>
                <div className="font-mono text-[9px] text-white/45 mt-1">Price goes DOWN</div>
              </button>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <div
                className="border rounded-xl p-5 text-center"
                style={{
                  borderColor: result.is_correct ? "rgba(255,255,255,0.30)" : "rgba(229,90,74,0.40)",
                  background: result.is_correct ? "rgba(255,255,255,0.04)" : "rgba(229,90,74,0.05)",
                }}
              >
                <div
                  className="font-mono text-lg font-bold mb-1"
                  style={{ color: result.is_correct ? "#FAFAFA" : "#E55A4A" }}
                >
                  {result.is_correct ? "CORRECT" : "WRONG"}
                </div>
                <div className="font-mono text-[11px] text-white/55">
                  Correct direction:{" "}
                  <span className={result.correct_direction === "BULL" ? "text-white" : "text-[#E55A4A]"}>
                    {result.correct_direction === "BULL" ? "↑ BULL" : "↓ BEAR"}
                  </span>
                  {" · "}Confidence: {result.confidence}%
                </div>
              </div>

              <div className="border border-white/[0.07] rounded-xl p-5 bg-white/[0.015]">
                <div className="font-mono text-[10px] text-white/40 tracking-widest mb-3 uppercase">
                  AI ANALYSIS
                </div>
                <p className="text-white/65 text-sm leading-relaxed">
                  {result.explanation}
                </p>
              </div>

              <button
                onClick={newRound}
                className="w-full font-mono text-[11px] tracking-wider border border-white/[0.12] py-3 text-white/60 hover:border-white/40 hover:text-white transition-colors rounded-md"
              >
                NEW ROUND →
              </button>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}

/* ─── GAME 2: COUNTRY RISK GUESSER ─── */

function CountryGame() {
  const [round, setRound] = useState<CountryRound | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [hints, setHints] = useState<string[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [cluesShown, setCluesShown] = useState(1);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const newRound = useCallback(async () => {
    setLoading(true);
    setError(null);
    setRevealed(false);
    setGuess("");
    setAttempts(0);
    setHints([]);
    setCluesShown(1);
    try {
      const data = await callAPI("country", { action: "generate" });
      setRound(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to generate round");
    }
    setLoading(false);
  }, []);

  const submitGuess = async () => {
    if (!round || !guess.trim()) return;
    setLoading(true);
    try {
      const data = await callAPI("country", {
        action: "check",
        answer: round.country,
        guess: guess.trim(),
      });
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setHints((h) => [...h, `${guess.trim()}: ${data.hint}`]);
      setGuess("");

      if (data.is_correct) {
        setRevealed(true);
        setScore((s) => ({ correct: s.correct + 1, total: s.total + 1 }));
      } else if (newAttempts >= 3) {
        setRevealed(true);
        setScore((s) => ({ ...s, total: s.total + 1 }));
      } else {
        setCluesShown(Math.min(cluesShown + 2, 5));
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to check guess");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-3">
        <ScoreDisplay label="Identified" value={score.correct} />
        <ScoreDisplay label="Total" value={score.total} />
        <ScoreDisplay
          label="Accuracy"
          value={score.total > 0 ? `${Math.round((score.correct / score.total) * 100)}%` : "—"}
        />
      </div>

      {!round && !loading && (
        <div className="border border-white/[0.07] rounded-xl py-16 text-center bg-white/[0.015]">
          <p className="text-white/55 font-mono text-xs mb-6 tracking-wide">
            CLAUDE DESCRIBES A COUNTRY&apos;S GEOPOLITICAL RISKS.
            <br />
            YOU GUESS WHICH COUNTRY. 3 ATTEMPTS.
          </p>
          <button
            onClick={newRound}
            className="font-mono text-[11px] tracking-wider border border-white/80 text-white px-6 py-2.5 hover:bg-[#C9A86A] hover:text-black hover:border-[#C9A86A] transition-colors rounded-md"
          >
            START GAME
          </button>
        </div>
      )}

      {loading && <LoadingPulse />}
      {error && <ErrorBanner message={error} onRetry={newRound} />}

      {round && !loading && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="border border-white/[0.10] rounded-xl p-6 bg-black/30">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-white/60 rounded-full" />
              <span className="font-mono text-[10px] text-white/65 tracking-widest uppercase">
                INTELLIGENCE BRIEFING
              </span>
              <span className="ml-auto font-mono text-[10px] text-white/40">
                {cluesShown}/5 CLUES
              </span>
            </div>
            <div className="space-y-3">
              {round.clues.slice(0, cluesShown).map((clue, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-3 items-start"
                >
                  <span className="font-mono text-[10px] text-[#C9A86A]/70 mt-0.5 shrink-0 tabular">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-white/65 text-sm leading-relaxed">{clue}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {hints.length > 0 && (
            <div className="space-y-2">
              {hints.map((h, i) => (
                <div key={i} className="border border-white/[0.07] rounded-md px-4 py-2 font-mono text-[11px] text-white/55">
                  {h}
                </div>
              ))}
            </div>
          )}

          {!revealed ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submitGuess()}
                placeholder="Enter country name..."
                className="flex-1 bg-white/[0.025] border border-white/[0.10] rounded-md px-4 py-3 text-white text-sm font-mono placeholder-white/25 transition-colors duration-300"
              />
              <button
                onClick={submitGuess}
                disabled={!guess.trim()}
                className="font-mono text-[11px] tracking-wider border border-white/[0.12] px-6 py-3 text-white/65 hover:border-[#C9A86A]/45 hover:text-[#C9A86A] transition-colors disabled:opacity-30 disabled:cursor-not-allowed rounded-md"
              >
                GUESS ({3 - attempts} left)
              </button>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div
                className="border rounded-xl p-5 text-center"
                style={{
                  borderColor: score.correct === score.total ? "rgba(201,168,106,0.45)" : "rgba(224,160,64,0.35)",
                  background: score.correct === score.total ? "rgba(201,168,106,0.06)" : "rgba(224,160,64,0.05)",
                }}
              >
                <div className="font-mono text-[10px] text-white/40 tracking-widest mb-2 uppercase">THE COUNTRY IS</div>
                <div className="font-mono text-xl font-bold text-white mb-2">{round.country}</div>
                <span className="font-mono text-[10px] border border-white/[0.12] rounded-md px-2 py-0.5 text-white/55">{round.region}</span>
              </div>

              <div className="border border-white/[0.10] rounded-xl p-5 bg-white/[0.015]">
                <div className="font-mono text-[10px] text-white/40 tracking-widest mb-4 uppercase">
                  GEOPOLITICAL RISK ANALYSIS
                </div>
                <div className="mb-4">
                  <GTIBar score={round.risk_score} />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <div className="font-mono text-[9px] text-white/40 tracking-wider mb-2 uppercase">KEY TENSIONS</div>
                    {round.risk_analysis.key_tensions.map((t) => (
                      <div key={t} className="flex items-center gap-2 mb-1.5">
                        <div className="w-1 h-1 bg-[#E55A4A] rounded-full" />
                        <span className="text-white/65 text-xs">{t}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="font-mono text-[9px] text-white/40 tracking-wider mb-2 uppercase">MARKET SECTORS</div>
                    {round.risk_analysis.market_sectors.map((s) => (
                      <div key={s} className="flex items-center gap-2 mb-1.5">
                        <div className="w-1 h-1 bg-[#E0A040] rounded-full" />
                        <span className="text-white/65 text-xs">{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={newRound}
                className="w-full font-mono text-[11px] tracking-wider border border-white/[0.12] py-3 text-white/60 hover:border-white/40 hover:text-white transition-colors rounded-md"
              >
                NEW ROUND →
              </button>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}

/* ─── GAME 3: TENSION INDEX SIMULATOR ─── */

function TensionGame() {
  const [round, setRound] = useState<TensionRound | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userScore, setUserScore] = useState(50);
  const [submitted, setSubmitted] = useState(false);
  const [history, setHistory] = useState<{ diff: number }[]>([]);

  const newRound = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSubmitted(false);
    setUserScore(50);
    try {
      const data = await callAPI("tension", { action: "generate" });
      setRound(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to generate event");
    }
    setLoading(false);
  }, []);

  const submit = () => {
    if (!round) return;
    setSubmitted(true);
    const diff = Math.abs(userScore - round.gti_score);
    setHistory((h) => [...h, { diff }]);
  };

  const avgAccuracy =
    history.length > 0
      ? Math.round(
          history.reduce((sum, h) => sum + Math.max(0, 100 - h.diff), 0) /
            history.length
        )
      : 0;

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "Military":     return "#E55A4A";
      case "Economic":     return "#E0A040";
      case "Diplomatic":   return "#A89DC9";
      case "Cyber":        return "#A89DC9";
      case "Humanitarian": return "#D4D4D4";
      default:             return "#A3A3A3";
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-3">
        <ScoreDisplay label="Rounds" value={history.length} />
        <ScoreDisplay
          label="Avg Accuracy"
          value={history.length > 0 ? `${avgAccuracy}%` : "—"}
          color={avgAccuracy >= 70 ? "#FAFAFA" : avgAccuracy >= 40 ? "#E0A040" : "#E55A4A"}
        />
        <ScoreDisplay
          label="Last Diff"
          value={history.length > 0 ? `±${history[history.length - 1].diff}` : "—"}
        />
      </div>

      {!round && !loading && (
        <div className="border border-white/[0.07] rounded-xl py-16 text-center bg-white/[0.015]">
          <p className="text-white/55 font-mono text-xs mb-6 tracking-wide">
            CLAUDE PRESENTS A GEOPOLITICAL EVENT.
            <br />
            YOU ESTIMATE THE GLOBAL TENSION INDEX IMPACT.
          </p>
          <button
            onClick={newRound}
            className="font-mono text-[11px] tracking-wider border border-white/80 text-white px-6 py-2.5 hover:bg-[#C9A86A] hover:text-black hover:border-[#C9A86A] transition-colors rounded-md"
          >
            START GAME
          </button>
        </div>
      )}

      {loading && <LoadingPulse />}
      {error && <ErrorBanner message={error} onRetry={newRound} />}

      {round && !loading && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="border border-white/[0.10] rounded-xl p-6 bg-black/30">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: getCategoryColor(round.category) }}
              />
              <span
                className="font-mono text-[10px] tracking-widest uppercase"
                style={{ color: getCategoryColor(round.category) }}
              >
                {round.category}
              </span>
              <span className="ml-auto font-mono text-[10px] text-white/40">{round.region}</span>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">{round.event}</p>
          </div>

          {!submitted ? (
            <div className="border border-white/[0.07] rounded-xl p-6 space-y-5 bg-white/[0.015]">
              <div className="font-mono text-[10px] text-white/40 tracking-widest uppercase">
                YOUR GTI ESTIMATE
              </div>
              <div className="text-center">
                <span className="font-mono text-4xl font-black text-white tabular">{userScore}</span>
                <span className="font-mono text-sm text-white/40 ml-1">/100</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={userScore}
                onChange={(e) => setUserScore(parseInt(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #FAFAFA 0%, #D4D4D4 25%, #E0A040 50%, #E55A4A 75%, #D63A3A 100%)`,
                }}
              />
              <div className="flex justify-between">
                <span className="font-mono text-[9px] text-white/30">LOW</span>
                <span className="font-mono text-[9px] text-white/30">MEDIUM</span>
                <span className="font-mono text-[9px] text-white/30">HIGH</span>
                <span className="font-mono text-[9px] text-white/30">ELEVATED</span>
                <span className="font-mono text-[9px] text-white/30">CRITICAL</span>
              </div>
              <button
                onClick={submit}
                className="w-full font-mono text-[11px] tracking-wider border border-white py-3 hover:bg-[#C9A86A] hover:text-black hover:border-[#C9A86A] transition-colors rounded-md"
              >
                SUBMIT ESTIMATE
              </button>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="border border-white/[0.10] rounded-xl p-5 bg-white/[0.015]">
                <div className="font-mono text-[10px] text-white/40 tracking-widest mb-4 uppercase">
                  SCORE COMPARISON
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="font-mono text-[9px] text-white/40 tracking-wider mb-1">YOUR ESTIMATE</div>
                    <div className="font-mono text-2xl font-bold text-white tabular">{userScore}</div>
                  </div>
                  <div className="text-center">
                    <div className="font-mono text-[9px] text-white/40 tracking-wider mb-1">AI ESTIMATE</div>
                    <div className="font-mono text-2xl font-bold text-white tabular">{round.gti_score}</div>
                  </div>
                </div>
                <div className="text-center mb-4">
                  <span
                    className="font-mono text-sm font-bold"
                    style={{
                      color:
                        Math.abs(userScore - round.gti_score) <= 10
                          ? "#FAFAFA"
                          : Math.abs(userScore - round.gti_score) <= 25
                          ? "#E0A040"
                          : "#E55A4A",
                    }}
                  >
                    {Math.abs(userScore - round.gti_score) <= 10
                      ? "EXCELLENT"
                      : Math.abs(userScore - round.gti_score) <= 25
                      ? "CLOSE"
                      : "OFF TARGET"}
                    {" "}(±{Math.abs(userScore - round.gti_score)} points)
                  </span>
                </div>
                <GTIBar score={round.gti_score} />
              </div>

              <div className="border border-white/[0.07] rounded-xl p-5 bg-white/[0.015]">
                <div className="font-mono text-[10px] text-white/40 tracking-widest mb-3 uppercase">
                  AI REASONING
                </div>
                <p className="text-white/65 text-sm leading-relaxed">
                  {round.reasoning}
                </p>
              </div>

              <button
                onClick={newRound}
                className="w-full font-mono text-[11px] tracking-wider border border-white/[0.12] py-3 text-white/60 hover:border-white/40 hover:text-white transition-colors rounded-md"
              >
                NEW ROUND →
              </button>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}

/* ─── MAIN PAGE ─── */

const tabs: { id: GameTab; label: string; icon: string }[] = [
  { id: "market",  label: "PREDICT THE MARKET",   icon: "↕" },
  { id: "country", label: "COUNTRY RISK GUESSER", icon: "◎" },
  { id: "tension", label: "TENSION INDEX",        icon: "◈" },
];

export default function FunZone() {
  const [activeTab, setActiveTab] = useState<GameTab>("market");

  return (
    <div className="min-h-screen bg-ink text-paper">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-[#0a0a0a]/90 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 font-mono text-base font-bold tracking-tight hover:opacity-85 transition-opacity">
            <span className="text-white">PD</span>
            <span className="text-white/30 font-light">/</span>
            <span className="text-[#C9A86A] text-xs font-normal tracking-[0.3em] uppercase">Fun Zone</span>
          </a>
          <div className="flex items-center gap-4">
            <Link
              href="/projects"
              className="font-mono text-[11px] tracking-wider text-white/45 hover:text-white transition-colors uppercase"
            >
              Projects
            </Link>
            <span className="text-white/15">|</span>
            <a
              href="/"
              className="font-mono text-[11px] tracking-wider text-white/45 hover:text-white transition-colors uppercase"
            >
              ← Portfolio
            </a>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-16 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-[1px] bg-gradient-to-r from-[#C9A86A]/65 to-transparent" />
              <span className="font-mono text-[11px] text-white/65 tracking-[0.2em] uppercase">
                <span className="text-[#C9A86A] mr-2 font-bold">—</span>Interactive
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              Fun Zone
            </h1>
            <p className="text-white/55 text-sm max-w-md">
              AI-powered geopolitical trading games. Test your market instincts against Claude&apos;s analysis.
            </p>
          </motion.div>

          <div className="flex gap-1 mb-8 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`font-mono text-[10px] tracking-wider px-4 py-2.5 border whitespace-nowrap rounded-md transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-[#C9A86A] text-black border-[#C9A86A]"
                    : "border-white/[0.10] text-white/45 hover:border-white/[0.25] hover:text-white/85"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "market"  && <MarketGame />}
              {activeTab === "country" && <CountryGame />}
              {activeTab === "tension" && <TensionGame />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <footer className="border-t border-white/[0.06] py-8 px-6">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] text-white/30 tracking-wider">
            POWERED BY CLAUDE AI · FOR ENTERTAINMENT ONLY
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/iampreetdave-max/ai-race-news"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] text-white/30 hover:text-[#C9A86A] transition-colors tracking-wider"
            >
              AI Race News →
            </a>
            <Link href="/projects" className="font-mono text-[10px] text-white/30 hover:text-[#C9A86A] transition-colors tracking-wider">
              All Projects →
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
