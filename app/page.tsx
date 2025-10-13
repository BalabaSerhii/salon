"use client";

import ButtonInsta from "@/components/ButtonInsta";
import ButtonWA from "@/components/ButtonWA";
import ReviewsSEO from "@/components/ReviewsSEO";
import ServicesPreview from "@/components/ServicesPreview";
import BenefitsSection from "@/components/BenefitsSection";
import Script from "next/script";
import ReviewCarousel from "@/components/ReviewCarousel";

export default function HomePage() {
  return (
    <main
      className="min-h-screen overflow-x-hidden" // ← ДОБАВЛЕНО: предотвращает горизонтальный скролл
      itemScope
      itemType="https://schema.org/LocalBusiness"
    >
      {/* ✅ Structured Data for SEO */}
      <Script
        id="ld-json-home"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Balaba Studio Massage",
            image: "https://balabastudio.de/BalabaStudio.png",
            telephone: "+4915124908000",
            email: "balabamassage@gmail.com",
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
            sameAs: [
              "https://www.instagram.com/balabastudio_glauburg/",
              "https://www.facebook.com/profile.php?id=61571893245558",
            ],
            url: "https://balabastudio.de",
            openingHours: "Mo-Sa 09:00-20:00",
          }),
        }}
      />

      {/* === HERO SECTION === */}
      <section
        className="relative text-[#64615a] text-center mt-1"
        role="banner"
      >
        <div className="bg-[#f8f7f4] pt-7 pb-10 text-center w-full">
          {/* ДОБАВЛЕН КОНТЕЙНЕР ДЛЯ ОГРАНИЧЕНИЯ ШИРИНЫ */}
          <div className="container mx-auto px-4 max-w-6xl">
            <h1
              className="text-3xl md:text-5xl lg:text-4xl font-bold leading-tight pb-5"
              itemProp="name"
            >
              Professionelle Entspannungsmassage in <br />
              <span className="font-semibold text-[#5c6d2f]">
                63695 Glauburg-Stockheim
              </span>
            </h1>

            <p
              className="text-xl md:text-2xl lg:text-3xl mx-auto leading-relaxed w-full md:w-4/5 pt-5 border-t pb-5 border-gray-300 px-4" // ← ИСПРАВЛЕНО: добавлены отступы
              itemProp="description"
            >
              Apparative Lymphdrainage-Massage <span>(Pressotherapie)</span>
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-6xl">
          <div className="w-24 h-1 bg-green-300 mx-auto rounded-full mb-8"></div>

          {/* USP (Уникальные преимущества) */}
          <section
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto px-4" // ← ДОБАВЛЕНО: px-4 для мобильных
            aria-label="Unsere Vorteile"
          >
            {[
              {
                icon: "🎯",
                title: "Gezielte Entspannung",
                text: "Maßgeschneiderte Behandlungen für Ihre Bedürfnisse",
              },
              {
                icon: "⚡",
                title: "Schnelle Termine",
                text: "Flexible Buchung, oft kurzfristige Verfügbarkeit",
              },
              {
                icon: "🌟",
                title: "Professionell & Hygienisch",
                text: "Höchste Qualitätsstandards und Sauberkeit",
              },
            ].map((item, i) => (
              <article
                key={i}
                className="bg-[var(--background)] rounded-2xl p-6 text-center" // ← ИСПРАВЛЕНО: добавлены отступы
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <h2 className="font-semibold mb-2 text-lg">{item.title}</h2>
                <p className="text-sm text-gray-600">{item.text}</p>
              </article>
            ))}
          </section>

          {/* CTA */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl max-w-2xl mx-auto px-4 md:px-8"> {/* ← ИСПРАВЛЕНО: добавлены отступы */}
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Jetzt Termin vereinbaren
            </h2>
            <p className="text-gray-600 mb-6 text-base md:text-lg">
              Einfach und unverbindlich per WhatsApp oder Instagram
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="transform hover:scale-105 transition-transform duration-300 w-full sm:w-auto">
                <ButtonWA />
              </div>
              <div className="transform hover:scale-105 transition-transform duration-300 w-full sm:w-auto">
                <ButtonInsta />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4 text-center">
              ⚡ Meist Termine innerhalb von 24–48 Stunden verfügbar
            </p>
          </div>
        </div>
      </section>

      {/* === BENEFITS === */}
      <BenefitsSection />

      {/* === SERVICES PREVIEW === */}
      <section
        className="py-16 md:py-20 bg-white"
        aria-labelledby="services-title"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <ServicesPreview />
        </div>
      </section>

      {/* === REVIEWS === */}
      <section className="py-16 md:py-20 bg-white" aria-labelledby="reviews">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2
            id="reviews"
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center"
          >
            Kundenbewertungen
          </h2>
          <ReviewsSEO />
        </div>
        <div className="container mx-auto px-4 max-w-6xl"> {/* ← ДОБАВЛЕН КОНТЕЙНЕР */}
          <ReviewCarousel />
        </div>
      </section>
    </main>
  );
}