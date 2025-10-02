"use client";

import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";

export default function ContactSection() {
  return (
    <section aria-labelledby="contact-title" className="max-w-3xl mx-auto p-6">
      <h2 id="contact-title" className="text-2xl font-bold mb-4">
        Standort & Kontakt
      </h2>

      {/* Адрес */}
      <article aria-labelledby="address-title" className="mb-6">
        <h3 id="address-title" className="text-lg font-medium">
          Standort
        </h3>
        <address className="not-italic mt-2">
          <p>Herrnstrasse 37</p>
          <p>63695 Glauburg-Stockheim</p>
          <p className="mt-2">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Herrnstrasse%2037%2C%2063695%20Glauburg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:underline"
            >
              Auf Karte anzeigen
            </a>
          </p>
        </address>
      </article>

      {/* Проезд */}
      <article aria-labelledby="directions-title" className="mb-6">
        <h3 id="directions-title" className="text-lg font-medium">
          Anfahrt zu Balaba Studio Massage
        </h3>

        <dl className="mt-2 space-y-2">
          <div>
            <dt className="font-semibold">Öffentliche Verkehrsmittel:</dt>
            <dd>RB34, Bus: 374, FB-20, FB-21, FB-25, FB-45</dd>
          </div>
          <div>
            <dt className="font-semibold">Parkplätze:</dt>
            <dd>3 verfügbar</dd>
          </div>
        </dl>
      </article>

      {/* Контакты */}
      <article aria-labelledby="contact-info-title" className="mb-6">
        <h3 id="contact-info-title" className="text-lg font-medium">
          Kontakt
        </h3>

        <address className="not-italic mt-2 space-y-2">
          <p>
            📞{" "}
            <a
              href="tel:+4915124908000"
              className="text-green-600 hover:underline"
            >
              +49 151 24908000
            </a>
          </p>
          <p>
            ✉️{" "}
            <a
              href="mailto:balabamassage@gmail.com"
              className="text-green-600 hover:underline"
            >
              balabamassage@gmail.com
            </a>
          </p>
        </address>
      </article>

      {/* Соцсети */}
      <nav aria-labelledby="social-title">
        <h3 id="social-title" className="text-lg font-medium">
          Wir sind online
        </h3>
        <ul className="flex gap-4 mt-3 text-2xl text-gray-600">
          <li>
            <a
              href="https://wa.me/4915124908000"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="hover:text-green-500 transition-colors"
            >
              <FaWhatsapp />
            </a>
          </li>
          <li>
            <a
              href="https://instagram.com/serhii"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-pink-500 transition-colors"
            >
              <FaInstagram />
            </a>
          </li>
          <li>
            <a
              href="https://facebook.com/serhii"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-blue-600 transition-colors"
            >
              <FaFacebook />
            </a>
          </li>
        </ul>
      </nav>
    </section>
  );
}
