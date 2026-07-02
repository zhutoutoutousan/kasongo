import Image from "next/image";
import { Phone, MapPin, Mail } from "lucide-react";
import { CONTACT } from "@/data/locations";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/50">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo.png"
                alt="Kasongo"
                width={56}
                height={56}
                className="rounded-full"
              />
              <div>
                <span className="font-display text-2xl text-kasongo-lime tracking-widest">
                  KASONGO
                </span>
                <p className="text-[10px] tracking-[0.3em] text-white/40 uppercase">
                  Street Food & Catering
                </p>
              </div>
            </div>
            <p className="text-sm text-white/40 max-w-sm leading-relaxed">
              Premium Street Food Catering aus Potsdam & Berlin. Burger, Wraps,
              Pizza, Bowls & Currywurst – frisch, lokal, mit Liebe gemacht.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-widest text-white/30 uppercase mb-4">
              Kontakt
            </h4>
            <ul className="space-y-3 text-sm text-white/50">
              <li className="flex items-center gap-2">
                <MapPin size={14} className="text-kasongo-lime shrink-0" />
                {CONTACT.address}
              </li>
              <li>
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 hover:text-kasongo-lime transition-colors"
                >
                  <Phone size={14} className="text-kasongo-lime shrink-0" />
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-kasongo-lime shrink-0" />
                {CONTACT.email}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-widest text-white/30 uppercase mb-4">
              Links
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: "#live", label: "Live Map" },
                { href: "#menu", label: "Menu" },
                { href: "#events", label: "Events" },
                { href: "#book", label: "Catering buchen" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/50 hover:text-kasongo-lime transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={CONTACT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-kasongo-lime transition-colors"
                >
                  Instagram →
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/20">
          <p>&copy; {new Date().getFullYear()} Kasongo Street Food & Catering. Alle Rechte vorbehalten.</p>
          <p>
            Made with 🔥 in Potsdam & Berlin
          </p>
        </div>
      </div>
    </footer>
  );
}
