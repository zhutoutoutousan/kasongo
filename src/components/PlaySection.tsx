"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Trophy, Sparkles } from "lucide-react";

const FLAVORS = [
  { id: "burger", label: "Smoky Burger", emoji: "🍔", match: "classic-burger" },
  { id: "wrap", label: "BBQ Wrap", emoji: "🌯", match: "bbq-wrap" },
  { id: "pizza", label: "Stone Oven Pizza", emoji: "🍕", match: "margherita" },
  { id: "bowl", label: "Power Bowl", emoji: "🥣", match: "power-bowl" },
  { id: "curry", label: "Currywurst", emoji: "🌭", match: "currywurst" },
  { id: "vegan", label: "Green Power", emoji: "🌱", match: "veggie-burger" },
];

const VIBES = [
  { id: "party", label: "Party 🎉", weight: { burger: 2, wrap: 2, curry: 3 } },
  { id: "chill", label: "Chill 😎", weight: { bowl: 3, pizza: 2, vegan: 2 } },
  { id: "hungry", label: "Mega Hunger 🤤", weight: { burger: 3, wrap: 3, pizza: 2 } },
  { id: "healthy", label: "Gesund 💪", weight: { vegan: 3, bowl: 3 } },
];

export default function PlaySection() {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<typeof FLAVORS[0] | null>(null);
  const [rotation, setRotation] = useState(0);
  const [vibe, setVibe] = useState<string | null>(null);
  const [warthogScore, setWarthogScore] = useState(0);
  const [warthogClicks, setWarthogClicks] = useState(0);
  const [showWarthog, setShowWarthog] = useState(false);

  const spin = useCallback(() => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);
    const extra = 1440 + Math.random() * 1440;
    const newRot = rotation + extra;
    setRotation(newRot);
    const index = Math.floor((newRot % 360) / (360 / FLAVORS.length));
    setTimeout(() => {
      setSpinning(false);
      setResult(FLAVORS[index % FLAVORS.length]);
    }, 3000);
  }, [spinning, rotation]);

  const handleVibe = (vibeId: string) => {
    setVibe(vibeId);
    const v = VIBES.find((v) => v.id === vibeId);
    if (!v) return;
    const scores = FLAVORS.map((f) => ({
      ...f,
      score: (v.weight as Record<string, number | undefined>)[f.id] ?? 0,
    }));
    scores.sort((a, b) => b.score - a.score);
    setTimeout(() => setResult(scores[0]), 500);
  };

  const catchWarthog = () => {
    setWarthogClicks((c) => c + 1);
    setWarthogScore((s) => s + 10);
    setShowWarthog(false);
    setTimeout(() => setShowWarthog(true), Math.random() * 3000 + 1000);
  };

  useEffect(() => {
    const id = setInterval(() => {
      if (Math.random() > 0.5) setShowWarthog(true);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="play" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(223,255,0,0.04)_0%,_transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold tracking-[0.3em] text-kasongo-lime uppercase">
            Interactive
          </span>
          <h2 className="section-title text-white mt-2">
            PLAY <span className="text-gradient">& WIN</span>
          </h2>
          <p className="text-white/50 mt-3 max-w-lg mx-auto">
            Dreh das Flavor Wheel, finde dein perfektes Gericht oder fang den Warthog!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Flavor Wheel */}
          <div className="glass rounded-3xl p-8 flex flex-col items-center">
            <h3 className="font-display text-xl text-kasongo-lime tracking-wider mb-6">
              FLAVOR WHEEL
            </h3>
            <div className="relative w-56 h-56 mb-6">
              <motion.div
                animate={{ rotate: rotation }}
                transition={{ duration: 3, ease: [0.2, 0.8, 0.2, 1] }}
                className="w-full h-full rounded-full relative overflow-hidden border-4 border-kasongo-lime/30"
              >
                {FLAVORS.map((flavor, i) => {
                  const angle = (360 / FLAVORS.length) * i;
                  return (
                    <div
                      key={flavor.id}
                      className="absolute inset-0 flex items-start justify-center pt-4"
                      style={{
                        transform: `rotate(${angle}deg)`,
                        background: `hsl(${(i * 60) % 360}, 60%, 15%)`,
                        clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos(((360 / FLAVORS.length) * Math.PI) / 180 - Math.PI / 2)}% ${50 + 50 * Math.sin(((360 / FLAVORS.length) * Math.PI) / 180 - Math.PI / 2)}%, ${50 + 50 * Math.cos(0 - Math.PI / 2)}% ${50 + 50 * Math.sin(0 - Math.PI / 2)}%)`,
                      }}
                    >
                      <span
                        className="text-lg"
                        style={{ transform: `rotate(${-angle}deg)` }}
                      >
                        {flavor.emoji}
                      </span>
                    </div>
                  );
                })}
              </motion.div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 z-10 text-kasongo-lime text-2xl">
                ▼
              </div>
            </div>
            <button
              onClick={spin}
              disabled={spinning}
              className="rounded-full lime-gradient px-8 py-3 font-bold text-black text-sm disabled:opacity-50 hover:scale-105 transition-transform"
            >
              {spinning ? "Dreht sich..." : "SPIN!"}
            </button>
          </div>

          {/* Vibe Matcher */}
          <div className="glass rounded-3xl p-8">
            <h3 className="font-display text-xl text-kasongo-lime tracking-wider mb-6 text-center">
              VIBE CHECK
            </h3>
            <p className="text-sm text-white/40 text-center mb-6">
              Wie fühlst du dich heute?
            </p>
            <div className="grid grid-cols-2 gap-3">
              {VIBES.map((v) => (
                <button
                  key={v.id}
                  onClick={() => handleVibe(v.id)}
                  className={`rounded-2xl p-4 text-sm font-bold transition-all ${
                    vibe === v.id
                      ? "bg-kasongo-lime/20 border border-kasongo-lime/40 text-kasongo-lime"
                      : "bg-white/5 text-white/60 hover:bg-white/10"
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          {/* Warthog Hunt */}
          <div className="glass rounded-3xl p-8 relative overflow-hidden min-h-[320px]">
            <h3 className="font-display text-xl text-kasongo-lime tracking-wider mb-2 text-center">
              WARTHOG HUNT
            </h3>
            <p className="text-sm text-white/40 text-center mb-4">
              Klick den flüchtigen Warthog!
            </p>
            <div className="flex items-center justify-center gap-4 mb-4">
              <Trophy size={16} className="text-kasongo-yellow" />
              <span className="font-display text-2xl text-kasongo-yellow">
                {warthogScore}
              </span>
              <span className="text-xs text-white/30">
                {warthogClicks} gefangen
              </span>
            </div>

            <div className="relative h-40 bg-black/30 rounded-2xl border border-white/5">
              <AnimatePresence>
                {showWarthog && (
                  <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                      x: Math.random() * 120,
                      y: Math.random() * 60,
                    }}
                    exit={{ scale: 0, opacity: 0 }}
                    onClick={catchWarthog}
                    className="absolute text-4xl cursor-pointer hover:scale-125 transition-transform"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 40}%`,
                    }}
                  >
                    🐗
                  </motion.button>
                )}
              </AnimatePresence>
              {!showWarthog && (
                <p className="absolute inset-0 flex items-center justify-center text-xs text-white/20">
                  Warthog versteckt sich...
                </p>
              )}
            </div>
            <button
              onClick={() => setShowWarthog(true)}
              className="mt-4 w-full flex items-center justify-center gap-2 text-xs text-white/40 hover:text-kasongo-lime transition-colors"
            >
              <RotateCcw size={12} />
              Spawn Warthog
            </button>
          </div>
        </div>

        {/* Result */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-10 mx-auto max-w-md glass rounded-2xl p-6 text-center border border-kasongo-lime/30"
            >
              <Sparkles className="mx-auto text-kasongo-lime mb-3" size={24} />
              <p className="text-sm text-white/40 mb-2">Dein Match:</p>
              <p className="text-4xl mb-2">{result.emoji}</p>
              <h4 className="font-display text-2xl text-kasongo-lime tracking-wider">
                {result.label}
              </h4>
              <a
                href="#menu"
                className="mt-4 inline-block text-sm font-bold text-white/50 hover:text-kasongo-lime transition-colors"
              >
                Zur Karte →
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
