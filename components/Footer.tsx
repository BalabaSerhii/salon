"use client";

import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import {
  FaFacebook,
  FaInstagram,
  FaTelegram,
  FaWhatsapp,
} from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="">
      <Script
        id="footer-ld-json"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "DaySpa",
            name: "Balaba Studio Massage",
            image: "https://balabastudio.de/balabastudio.png",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Herrnstrasse 37",
              addressLocality: "Glauburg-Stockheim",
              postalCode: "63695",
              addressCountry: "DE",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 50.325,
              longitude: 9.012417,
            },
            telephone: "+4915124908000",
            email: "balabamassage@gmail.com",
            url: "https://balabastudio.de",
            sameAs: [
              "https://www.instagram.com/balabastudio_glauburg/",
              "https://www.facebook.com/profile.php?id=61571893245558",
              "https://t.me/BalabaStudio",
            ],
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ],
                opens: "09:00",
                closes: "20:00",
              },
            ],
          }),
        }}
      />
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Левая колонка: логотип + адрес */}
        <div>
          <Link href="/" aria-label="Zur Startseite">
            <Image
              src="/logo.png"
              alt="Logo von Balaba Studio Massage"
              width={80}
              height={40}
              className="mb-4"
              priority
            />
          </Link>

          <address className="not-italic text-sm mt-2">
            <strong>Balaba Studio Massage</strong>

            <a href="https://www.google.com/maps/place/Balaba+Massage+Studio/@50.325005,9.0119886,21z/data=!4m22!1m15!4m14!1m6!1m2!1s0x47bd1fd72ba2be4d:0x1e5e44f028e158d4!2zSGVycm5zdHJhw59lIDM3LCA2MzY5NSBHbGF1YnVyZywg0JPQtdGA0LzQsNC90LjRjw!2m2!1d9.0123212!2d50.3250513!1m6!1m2!1s0x47bd1ff68239fc3d:0xacd5e4c867c97da6!2sHerrnstra%C3%9Fe+37,+63695+Glauburg!2m2!1d9.0123212!2d50.3250513!3m5!1s0x47bd1ff68239fc3d:0xacd5e4c867c97da6!8m2!3d50.3250513!4d9.0123212!16s%2Fg%2F11wxg0z523?entry=ttu&g_ep=EgoyMDI1MTAwMS4wIKXMDSoASAFQAw%3D%3D">
              Herrnstrasse 37, 63695 Glauburg-Stockheim, Deutschland
            </a>
            <a
              href="mailto:balabamassage@gmail.com"
              className="hover:underline"
            >
              balabamassage@gmail.com
            </a>
            <br />
            <a href="tel:+4915124908000" className="hover:underline">
              +49 151 24908000
            </a>
          </address>
        </div>

        {/* Центр: навигация */}
        <nav aria-label="Footer Navigation">
          <ul className="flex flex-col space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/price" className="hover:text-white">
                Preisliste
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white">
                Über uns
              </Link>
            </li>
            <li>
              <Link href="/contacts" className="hover:text-white">
                Kontakt
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-white">
                Blog
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-semibold mb-3">Wir sind online</h3>
          <ul className="flex gap-3 mb-4">
            <li>
              <a
                href="https://wa.me/4915124908000"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={20} />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/balabastudio_glauburg/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/profile.php?id=61571893245558"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebook size={20} />
              </a>
            </li>
            <li>
              <a
                href="https://t.me/your-telegram"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
              >
                <FaTelegram size={20} />
              </a>
            </li>
          </ul>

          <h3 className="text-sm font-semibold mb-2">Öffnungszeiten</h3>
          <p className="text-sm">
            Mo – Sa: 09:00 – 20:00
            <br />
            So: geschlossen
          </p>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-xs text-gray-400">
        <p>© {year} Balaba Studio – Alle Rechte vorbehalten.</p>
        <p className="mt-2">
          <Link href="/impressum" className="hover:underline">
            Impressum
          </Link>{" "}
          |{" "}
          <Link href="/datenschutz" className="hover:underline">
            Datenschutz
          </Link>
        </p>
      </div>
    </footer>
  );
}
