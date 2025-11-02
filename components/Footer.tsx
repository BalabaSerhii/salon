"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaTelegram,
  FaWhatsapp,
} from "react-icons/fa";

const socialLinks = [
  {
    href: "https://wa.me/4915124908000?text=Hallo,%20ich%20interessiere%20mich%20für%20Ihre%20Dienstleistungen",
    icon: FaWhatsapp,
    label: "WhatsApp",
  },
  {
    href: "https://instagram.com/balabastudio_glauburg",
    icon: FaInstagram,
    label: "Instagram",
  },
  {
    href: "https://facebook.com/profile.php?id=61571893245558",
    icon: FaFacebook,
    label: "Facebook",
  },
  {
    href: "https://t.me/balabastudio",
    icon: FaTelegram,
    label: "Telegram",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* === Верхняя сетка === */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* === Колонка 1: Логотип + контакты === */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
            <Link href="/" aria-label="Zur Startseite">
              <Image
                src="/logobeauty.webp"
                alt="Logo von Balaba Studio Massage"
                width={200}
                height={100}
                className="mx-auto md:mx-0"
                priority
                unoptimized
              />
            </Link>

            <address className="not-italic space-y-2 text-gray-700 leading-relaxed">
              <a
                href="https://www.google.com/maps/place/Balaba+Massage+Studio/"
                className="hover:text-green-600 transition-colors block"
                target="_blank"
                rel="noopener noreferrer"
              >
                Herrnstrasse 37, <br />
                63695 Glauburg-Stockheim, Deutschland
              </a>
              <a
                href="mailto:balabamassage@gmail.com"
                className="hover:text-green-600 transition-colors block"
              >
                balabamassage@gmail.com
              </a>
              <a
                href="tel:+4915124908000"
                className="hover:text-green-600 transition-colors block"
              >
                +49 151 24908000
              </a>
            </address>
          </div>

          {/* === Колонка 2: Навигация === */}
          <nav
            aria-label="Footer Navigation"
            className="flex flex-col items-center md:items-center text-center"
          >
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="hover:text-green-600 transition-colors font-medium"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/preisliste"
                  className="hover:text-green-600 transition-colors font-medium"
                >
                  Preisliste
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-green-600 transition-colors font-medium"
                >
                  Über uns
                </Link>
              </li>
              <li>
                <Link
                  href="/contacts"
                  className="hover:text-green-600 transition-colors font-medium"
                >
                  Kontakt
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-green-600 transition-colors font-medium"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </nav>

          {/* === Колонка 3: Соцсети + время работы === */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right space-y-5">
            <div>
              <h3 className="text-lg font-semibold mb-3">Wir sind online</h3>
              <ul className="flex justify-center md:justify-end gap-4">
                {socialLinks.map((s) => {
                  const Icon = s.icon;
                  return (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-green-600 transition-colors inline-flex items-center justify-center"
                        aria-label={s.label}
                      >
                        <Icon size={24} />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Öffnungszeiten</h3>
              <div className="text-gray-700 text-sm space-y-1 leading-relaxed">
                <p>Mo – Sa: 09:00 – 20:00</p>
                <p className="text-amber-800 font-medium">
                  NUR nach vorheriger Terminvereinbarung
                </p>
                <p>So: Ruhetag</p>
              </div>
            </div>
          </div>
        </div>

        {/* === Нижняя полоса === */}
        <div className="border-t border-gray-300 pt-6 text-center space-y-2">
          <p className="font-medium">
            © {year} Balaba Studio – Alle Rechte vorbehalten.
          </p>
          <p className="text-gray-600 text-sm">
            „Website erstellt von Balaba Digital“ ✅
          </p>
          <div className="flex justify-center gap-6 pt-2">
            <Link
              href="/impressum"
              className="hover:text-green-600 transition-colors font-medium"
            >
              Impressum
            </Link>
            <Link
              href="/datenschutz"
              className="hover:text-green-600 transition-colors font-medium"
            >
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
