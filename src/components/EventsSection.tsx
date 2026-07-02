"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, ExternalLink } from "lucide-react";
import { events } from "@/data/events";

function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const target = new Date(targetDate).getTime();
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        mins: Math.floor((diff / (1000 * 60)) % 60),
        secs: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return (
    <div className="flex gap-3">
      {[
        { val: timeLeft.days, label: "Tage" },
        { val: timeLeft.hours, label: "Std" },
        { val: timeLeft.mins, label: "Min" },
        { val: timeLeft.secs, label: "Sek" },
      ].map(({ val, label }) => (
        <div key={label} className="text-center">
          <div className="w-14 h-14 rounded-xl bg-black/50 border border-kasongo-lime/20 flex items-center justify-center">
            <span className="text-xl font-display text-kasongo-lime">
              {String(val).padStart(2, "0")}
            </span>
          </div>
          <span className="text-[10px] text-white/30 mt-1 block uppercase tracking-wider">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function EventsSection() {
  const featured = events.filter((e) => e.featured);
  const upcoming = events.filter((e) => e.status === "upcoming");
  const live = events.filter((e) => e.status === "live");

  return (
    <section id="events" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-12">
          <span className="text-xs font-bold tracking-[0.3em] text-kasongo-lime uppercase">
            Termine
          </span>
          <h2 className="section-title text-white mt-2">
            EVENT <span className="text-gradient">RADAR</span>
          </h2>
        </div>

        {/* Featured: Oktoberfest */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden mb-10 border border-kasongo-lime/20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-kasongo-lime/5 to-blue-900/30" />
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #fff 0, #fff 10px, #0066cc 10px, #0066cc 20px)",
            }}
          />
          <div className="relative p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-block rounded-full bg-blue-600/30 border border-blue-400/30 px-3 py-1 text-xs font-bold text-blue-300 uppercase tracking-wider mb-4">
                🍺 Featured Event
              </span>
              <h3 className="text-3xl md:text-4xl font-display text-white tracking-wide mb-2">
                POTSDAMER OKTOBERFEST 2026
              </h3>
              <p className="text-white/50 mb-2">Vier Tage Wiesn-Gaudi</p>
              <div className="flex flex-wrap gap-4 text-sm text-white/40 mb-6">
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-kasongo-lime" />
                  Metropolis Halle, Potsdam
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-kasongo-lime" />
                  18.–26. Sept 2026
                </span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Kasongo bringt Street Food Power ins Oktoberfest! Après Ski Wies&apos;n,
                Wies&apos;n Gaudi, Almrausch & Wies&apos;n Wahnsinn – wir cateren alle vier Tage.
              </p>
              <a
                href="https://www.potsdamer-oktoberfest.de"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-kasongo-lime hover:underline"
              >
                potsdamer-oktoberfest.de
                <ExternalLink size={14} />
              </a>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-xs font-bold tracking-widest text-white/30 uppercase mb-4">
                Countdown
              </p>
              <Countdown targetDate="2026-09-18T18:00:00" />
            </div>
          </div>
        </motion.div>

        {/* Live events */}
        {live.length > 0 && (
          <div className="mb-8">
            <h3 className="flex items-center gap-2 text-sm font-bold text-kasongo-green uppercase tracking-wider mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-kasongo-green opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-kasongo-green" />
              </span>
              Jetzt Live
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {live.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}

        {/* Upcoming */}
        <div>
          <h3 className="text-sm font-bold text-white/40 uppercase tracking-wider mb-4">
            Demnächst
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcoming.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <EventCard event={event} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function EventCard({ event }: { event: (typeof events)[0] }) {
  return (
    <div className="glass rounded-2xl p-5 hover:border-kasongo-lime/20 border border-transparent transition-all group">
      <div className="flex items-center justify-between mb-3">
        <span
          className={`text-xs font-bold uppercase tracking-wider ${
            event.city === "potsdam" ? "text-blue-400" : "text-kasongo-red"
          }`}
        >
          {event.city}
        </span>
        {event.status === "live" && (
          <span className="text-xs font-bold text-kasongo-green animate-pulse">
            ● LIVE
          </span>
        )}
      </div>
      <h4 className="font-bold text-white group-hover:text-kasongo-lime transition-colors">
        {event.title}
      </h4>
      <p className="text-sm text-white/40 mt-1 line-clamp-2">{event.description}</p>
      <div className="flex items-center gap-4 mt-3 text-xs text-white/30">
        <span className="flex items-center gap-1">
          <Calendar size={12} /> {event.date}
        </span>
        <span className="flex items-center gap-1">
          <Clock size={12} /> {event.time}
        </span>
      </div>
    </div>
  );
}
