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
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Левая колонка: логотип + адрес */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
            <Link
              href="/"
              aria-label="Zur Startseite"
              className="flex-shrink-0"
            >
              <Image
                src="/logobeauty.webp"
                alt="Logo von Balaba Studio Massage"
                width={220}
                height={110}
                className=""
                priority={true}
                unoptimized={true}
              />
            </Link>

            <address className="not-italic text-gray-800 flex flex-col space-y-2">
              <a
                href="https://www.google.com/maps/place/Balaba+Massage+Studio/@50.325005,9.0119886,21z/data=!4m22!1m15!4m14!1m6!1m2!1s0x47bd1fd72ba2be4d:0x1e5e44f028e158d4!2zSGVycm5zdHJhw59lIDM3LCA2MzY5NSBHbGF1YnVyZywg0JPQtdGA0LzQsNC90LjRjw!2m2!1d9.0123212!2d50.3250513!1m6!1m2!1s0x47bd1ff68239fc3d:0xacd5e4c867c97da6!2sHerrnstra%C3%9Fe+37,+63695+Glauburg!2m2!1d9.0123212!2d50.3250513!3m5!1s0x47bd1ff68239fc3d:0xacd5e4c867c97da6!8m2!3d50.3250513!4d9.0123212!16s%2Fg%2F11wxg0z523?entry=ttu&g_ep=EgoyMDI1MTAwMS4wIKXMDSoASAFQAw%3D%3D"
                className="hover:text-green-600 transition-colors min-h-[44px] inline-flex items-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                Herrnstrasse 37, <br />
                63695 Glauburg-Stockheim, <br />
                Deutschland
              </a>
              <a
                href="mailto:balabamassage@gmail.com"
                className="hover:text-green-600 transition-colors min-h-[44px] inline-flex items-center"
              >
                balabamassage@gmail.com
              </a>
              <a
                href="tel:+4915124908000"
                className="hover:text-green-600 transition-colors min-h-[44px] inline-flex items-center"
              >
                +49 151 24908000
              </a>
            </address>
          </div>

          {/* Правая колонка: навигация + соцсети */}
          <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-12">
            <nav aria-label="Footer Navigation">
              <ul className="">
                <li>
                  <Link
                    href="/"
                    className="text-gray-800 hover:text-green-600 transition-colors min-h-[44px] inline-flex items-center font-medium"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/preisliste"
                    className="text-gray-800 hover:text-green-600 transition-colors min-h-[44px] inline-flex items-center font-medium"
                  >
                    Preisliste
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-gray-800 hover:text-green-600 transition-colors min-h-[44px] inline-flex items-center font-medium"
                  >
                    Über uns
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contacts"
                    className="text-gray-800 hover:text-green-600 transition-colors min-h-[44px] inline-flex items-center font-medium"
                  >
                    Kontakt
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-gray-800 hover:text-green-600 transition-colors min-h-[44px] inline-flex items-center font-medium"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="space-y-4">
              <div>
                <h3 className="text-gray-800 font-semibold mb-3">
                  Wir sind online
                </h3>
                <ul className="flex gap-4">
                  {socialLinks.map((s) => {
                    const Icon = s.icon;
                    return (
                      <li key={s.label}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-700 hover:text-green-600 transition-colors min-h-[44px] min-w-[44px] inline-flex items-center justify-center"
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
                <h3 className="text-gray-800 font-semibold mb-2">
                  Öffnungszeiten
                </h3>
                <div className="text-gray-700 space-y-1">
                  <p>Mo – Sa: 09:00 – 20:00</p>
                  <p className="text-amber-800 text-sm font-medium">
                    NUR nach vorheriger Terminvereinbarung
                  </p>
                  <p>So: geschlossen</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Нижняя часть футера */}
        <div className="border-t border-gray-300 mt-8 pt-6 text-center">
          <p className="text-gray-800 font-medium mb-2">
            © {year} Balaba Studio – Alle Rechte vorbehalten.
          </p>
          <p className="text-gray-600 text-sm mb-3">
            „Website erstellt von Balaba Digital“ ✅
          </p>
          <div className="flex justify-center gap-6">
            <Link
              href="/impressum"
              className="text-gray-700 hover:text-green-600 transition-colors min-h-[44px] inline-flex items-center font-medium"
            >
              Impressum
            </Link>
            <Link
              href="/datenschutz"
              className="text-gray-700 hover:text-green-600 transition-colors min-h-[44px] inline-flex items-center font-medium"
            >
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
