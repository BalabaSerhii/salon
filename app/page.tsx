"use client";

import ButtonInsta from "@/components/ButtonInsta";
import ButtonWA from "@/components/ButtonWA";
import ContactSection from "@/components/ContactSection";
import ReviewsSEO from "@/components/ReviewsSEO";
import ServicesPreview from "@/components/ServicesPreview";
import BenefitsSection from "@/components/BenefitsSection";
import CTASection from "@/components/CTASection";
import Script from "next/script";
import AppointmentForm from "@/components/AppointmentForm";
import ReviewCarousel from "@/components/ReviewCarousel";

const services = [
  { id: "massage-relax", name: "Расслабляющий массаж", durationMinutes: 60 },
  {
    id: "back-therapy",
    name: "Терапевтический массаж спины",
    durationMinutes: 45,
  },
];

export default function HomePage() {
  return (
    <main
      className="min-h-screen "
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
      {/* <AppointmentForm services={services} /> */}
      <section className="relative  text-[#64615a]  text-center " role="banner">
        <div className="bg-[#f8f7f4] pt-7 pb-10 text-center">
          <h1
            className="text-3xl md:text-5xl lg:text-4xl font-bold leading-tight pb-5 "
            itemProp="name"
          >
            Professionelle Entspannungsmassage in <br />
            <span className="font-semibold text-[#5c6d2f] ">
              63695 Glauburg-Stockheim
            </span>
          </h1>

          <p
            className="text-xl sm:w-1/2 md:text-2xl lg:text-3xl mx-auto leading-relaxed w-4/5 pt-5 border-t pb-5 border-gray-300"
            itemProp="description"
          >
            Apparative Lymphdrainage-Massage <span>(Pressotherapie)</span>
          </p>
        </div>

        <div className="container mx-auto px-4 max-w-6xl">
          <div className="w-24 h-1 bg-green-300 mx-auto rounded-full mb-8"></div>

          {/* USP (Уникальные преимущества) */}
          <section
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto"
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
                className="bg-[var(--background)] rounded-2xl p-3"
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <h2 className="font-semibold mb-2">{item.title}</h2>
                <p className=" text-sm">{item.text}</p>
              </article>
            ))}
          </section>

          {/* CTA */}
          <div className="bg-white rounded-2xl p-8 shadow-xl max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Jetzt Termin vereinbaren
            </h2>
            <p className="text-gray-600 mb-6">
              Einfach und unverbindlich per WhatsApp oder Instagram
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="transform hover:scale-105 transition-transform duration-300">
                <ButtonWA />
              </div>
              <div className="transform hover:scale-105 transition-transform duration-300">
                <ButtonInsta />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">
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
          <h2
            id="services-title"
            className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10"
          >
            Unsere Massage-Angebote
          </h2>
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
        <ReviewCarousel />
      </section>

      {/* === CONTACT === */}
      <section
        className="py-16 md:py-20  text-white"
        aria-labelledby="contact-title"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <h2
            id="contact-title"
            className="text-3xl md:text-4xl font-bold mb-8 text-center"
          >
            Kontakt & Anfahrt
          </h2>
          <ContactSection />
        </div>
      </section>
    </main>
  );
}
