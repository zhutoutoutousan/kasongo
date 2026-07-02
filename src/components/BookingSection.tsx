"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, Send, CheckCircle, Calendar, Users } from "lucide-react";
import { CONTACT } from "@/data/locations";

const EVENT_TYPES = [
  "Geburtstag",
  "Hochzeit",
  "Firmenevent",
  "Festival",
  "Private Party",
  "Sonstiges",
];

const GUEST_COUNTS = ["< 50", "50–100", "100–200", "200–500", "500+"];

export default function BookingSection() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    guests: "",
    date: "",
    city: "potsdam",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="book" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: CTA */}
          <div>
            <span className="text-xs font-bold tracking-[0.3em] text-kasongo-lime uppercase">
              Catering buchen
            </span>
            <h2 className="section-title text-white mt-2 mb-6">
              BOOK US FOR
              <br />
              <span className="text-gradient">YOUR EVENT</span>
            </h2>
            <p className="text-white/50 leading-relaxed mb-8 max-w-md">
              Von intimen Geburtstagen bis zu großen Festivals – unser Food Truck
              bringt frisches Street Food direkt zu euch. Burger, Wraps, Pizza &
              Bowls – auch vegan!
            </p>

            <div className="space-y-4 mb-8">
              <a
                href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-4 glass rounded-2xl p-5 hover:border-kasongo-lime/30 border border-transparent transition-all group"
              >
                <div className="w-12 h-12 rounded-xl lime-gradient flex items-center justify-center">
                  <Phone size={20} className="text-black" />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider">
                    Direkt anrufen
                  </p>
                  <p className="text-xl font-display text-kasongo-lime tracking-wider group-hover:text-kasongo-yellow transition-colors">
                    {CONTACT.phoneDisplay}
                  </p>
                </div>
              </a>

              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 glass rounded-2xl p-5 hover:border-kasongo-lime/30 border border-transparent transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                  IG
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider">
                    Instagram DM
                  </p>
                  <p className="text-sm font-medium text-white/70">
                    {CONTACT.instagramHandle}
                  </p>
                </div>
              </a>
            </div>

            <div className="flex gap-6 text-center">
              {[
                { icon: Calendar, label: "Flexible Termine" },
                { icon: Users, label: "20–500+ Gäste" },
                { icon: CheckCircle, label: "Full Service" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex-1">
                  <Icon size={20} className="mx-auto text-kasongo-lime mb-2" />
                  <p className="text-xs text-white/40">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-8 border border-white/10"
          >
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle size={48} className="mx-auto text-kasongo-green mb-4" />
                <h3 className="font-display text-2xl text-kasongo-lime mb-2">
                  ANFRAGE GESENDET!
                </h3>
                <p className="text-white/50 text-sm">
                  Wir melden uns innerhalb von 24h bei dir.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-display text-xl text-white tracking-wider mb-6">
                  EVENT ANFRAGE
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    required
                    placeholder="Name *"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-kasongo-lime/50 focus:outline-none transition-colors"
                  />
                  <input
                    required
                    type="email"
                    placeholder="E-Mail *"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-kasongo-lime/50 focus:outline-none transition-colors"
                  />
                </div>

                <input
                  placeholder="Telefon"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-kasongo-lime/50 focus:outline-none transition-colors"
                />

                <div className="grid sm:grid-cols-2 gap-4">
                  <select
                    required
                    value={form.eventType}
                    onChange={(e) => setForm({ ...form, eventType: e.target.value })}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:border-kasongo-lime/50 focus:outline-none transition-colors appearance-none"
                  >
                    <option value="" className="bg-black">
                      Event-Typ *
                    </option>
                    {EVENT_TYPES.map((t) => (
                      <option key={t} value={t} className="bg-black">
                        {t}
                      </option>
                    ))}
                  </select>
                  <select
                    value={form.guests}
                    onChange={(e) => setForm({ ...form, guests: e.target.value })}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:border-kasongo-lime/50 focus:outline-none transition-colors appearance-none"
                  >
                    <option value="" className="bg-black">
                      Gästeanzahl
                    </option>
                    {GUEST_COUNTS.map((g) => (
                      <option key={g} value={g} className="bg-black">
                        {g}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:border-kasongo-lime/50 focus:outline-none transition-colors"
                  />
                  <div className="flex gap-2">
                    {(["potsdam", "berlin"] as const).map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setForm({ ...form, city: c })}
                        className={`flex-1 rounded-xl py-3 text-xs font-bold uppercase tracking-wider transition-all ${
                          form.city === c
                            ? "bg-kasongo-lime text-black"
                            : "bg-white/5 text-white/50"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  placeholder="Erzähl uns von deinem Event..."
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-kasongo-lime/50 focus:outline-none transition-colors resize-none"
                />

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-xl lime-gradient py-4 font-bold text-black text-sm tracking-wide hover:scale-[1.02] transition-transform"
                >
                  <Send size={16} />
                  ANFRAGE SENDEN
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
