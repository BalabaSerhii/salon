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
    <footer className=" ">
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
      <div className="container grid grid-cols-1 md:grid-cols-2 justify-items-center items-center ">
        {/* Левая колонка: логотип + адрес */}
        <div className=" items-center flex gap-10 ">
          <Link href="/" aria-label="Zur Startseite" >
            <Image
              src="/balabastudio.png"
              alt="Logo von Balaba Studio Massage"
              width={80}
              height={40}
              className="mb-4 "
              priority
            />
          </Link>

          <address className="not-italic text-sm flex flex-col">
            <a href="https://www.google.com/maps/place/Balaba+Massage+Studio/@50.325005,9.0119886,21z/data=!4m22!1m15!4m14!1m6!1m2!1s0x47bd1fd72ba2be4d:0x1e5e44f028e158d4!2zSGVycm5zdHJhw59lIDM3LCA2MzY5NSBHbGF1YnVyZywg0JPQtdGA0LzQsNC90LjRjw!2m2!1d9.0123212!2d50.3250513!1m6!1m2!1s0x47bd1ff68239fc3d:0xacd5e4c867c97da6!2sHerrnstra%C3%9Fe+37,+63695+Glauburg!2m2!1d9.0123212!2d50.3250513!3m5!1s0x47bd1ff68239fc3d:0xacd5e4c867c97da6!8m2!3d50.3250513!4d9.0123212!16s%2Fg%2F11wxg0z523?entry=ttu&g_ep=EgoyMDI1MTAwMS4wIKXMDSoASAFQAw%3D%3D">
              Herrnstrasse 37, <br />63695 Glauburg-Stockheim, <br />Deutschland
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
        <div
          className="flex justify-between gap-20 mt-4
"
        >
          <nav aria-label="Footer Navigation">
            <ul className="">
              <li>
                <Link href="/" className="hover:text-[#00a63e]">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/price" className="hover:text-[#00a63e]">
                  Preisliste
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#00a63e]">
                  Über uns
                </Link>
              </li>
              <li>
                <Link href="/contacts" className="hover:text-[#00a63e]">
                  Kontakt
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#00a63e]">
                  Blog
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h3 className="text-sm font-semibold pb-2">Wir sind online</h3>
            <ul className="flex justify-center gap-4">
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-green-500 transition-colors"
                      aria-label={s.label}
                    >
                      <Icon size={20} />
                    </a>
                  </li>
                );
              })}
            </ul>

            <h3 className="text-sm font-semibold mt-2">Öffnungszeiten</h3>
            <p className="text-sm">
              Mo – Sa: 09:00 – 20:00
              <br />
              <span className="text-amber-700 text-[0.625rem]">NUR nach vorheriger Terminvereinbarung
</span>
              <br />
              So: geschlossen
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-xs text-gray-400 mb-2">
        <p>© {year} Balaba Studio – Alle Rechte vorbehalten.</p>
        <Link href="/datenschutz" className="hover:underline">
          Сайт создан в Balaba Digital
        </Link>
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
