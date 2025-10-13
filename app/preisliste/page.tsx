"use client";

import { useState, useCallback } from "react";
import { priceCategories } from "../data/prices";

// Единые стили для всех кнопок
const buttonClasses =
  "bg-[#f8f7f4] text-[#64615a] text-center py-2 px-4 rounded-lg font-semibold border-2 border-[#2d983f] transition-all duration-300 hover:bg-[#2d983f] hover:text-white hover:border-[#247a32] focus:outline-none focus:ring-2 focus:ring-[#2d983f] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px] text-sm";

// Компонент для плавной прокрутки
const ScrollToSection = ({
  targetId,
  children,
}: {
  targetId: string;
  children: React.ReactNode;
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // Обновляем URL без перезагрузки страницы
      window.history.pushState(null, "", `#${targetId}`);
    }
  };

  return (
    <a
      href={`#${targetId}`}
      onClick={handleClick}
      className="text-[#2d983f] hover:text-[#247a32] transition-colors duration-200 font-medium"
    >
      {children}
    </a>
  );
};

export default function PriceList() {
  const [loadingService, setLoadingService] = useState<string | null>(null);
  const whatsappNumber = "4915124908000";

  const getWhatsappLink = useCallback(
    (serviceName: string, duration?: string) => {
      const serviceText = duration
        ? `${serviceName} (${duration})`
        : serviceName;

      const text = encodeURIComponent(
        `Hallo! Ich möchte einen Termin für "${serviceText}" buchen. Können Sie mir bitte verfügbare Termine mitteilen?`
      );
      return `https://wa.me/${whatsappNumber}?text=${text}`;
    },
    [whatsappNumber]
  );

  const handleBookingClick = useCallback((serviceId: string) => {
    setLoadingService(serviceId);
    // Сброс состояния загрузки через 2 секунды на случай, если переход не произошел
    setTimeout(() => setLoadingService(null), 2000);
  }, []);

  const LoadingSpinner = () => (
    <svg
      className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  return (
    <section className="container mx-auto px-4 py-10">
      {/* SEO-заголовок */}
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-800">
        Preisliste - Professionelle Massagen in Glauburg
      </h1>

      {/* Навигация по разделам */}
      <nav className="mb-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 text-center">
          Schnellnavigation zu unseren Dienstleistungen
        </h2>
        <div className="flex flex-wrap md:justify-center lg:justify-center gap-4 md:gap-6">
          {priceCategories.map((category) => (
            <ScrollToSection key={category.id} targetId={category.id}>
              {category.title}
            </ScrollToSection>
          ))}
        </div>
      </nav>

      {/* Важное уведомление */}
      <div
        className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg"
        role="alert"
      >
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <span className="text-red-500 text-lg" aria-hidden="true">
              ⚠️
            </span>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-semibold text-red-800">
              Wichtiger Hinweis
            </h3>
            <p className="text-sm text-red-700 mt-1">
              Wir bieten ausschließlich professionelle entspannungstherapeutische Massagedienstleistungen und Pressotherapie an.{" "}
              <strong>
                Erotische Massagen oder Dienstleistungen erotischer Art werden
                in keiner Form angeboten oder toleriert.
              </strong>
               Wir behalten uns das Recht vor, unangemessene Anfragen abzulehnen.
            </p>
          </div>
        </div>
      </div>

      {/* Категории услуг */}
      {priceCategories.map((category) => (
        <section
          key={category.id}
          id={category.id}
          className="mb-16 scroll-mt-20" // scroll-mt для учета фиксированного хедера
        >
          <header className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-800">
              {category.title}
            </h2>
            {category.description && (
              <p className="text-gray-600 text-lg max-w-3xl">
                {category.description}
              </p>
            )}
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.services.map((service) => (
              <article
                key={service.id}
                className="flex flex-col justify-between p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300 bg-white group h-full"
              >
                <div className="flex-grow">
                  <h3 className="font-semibold text-gray-800 group-hover:text-gray-900 transition-colors leading-relaxed mb-3">
                    {service.name}
                  </h3>
                  {service.duration && (
                    <div className="flex items-center text-sm text-gray-600 font-medium mb-2">
                      <span className="mr-2" aria-hidden="true">
                        ⏱️
                      </span>
                      <span>Dauer: {service.duration}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                  <span className="font-bold text-lg text-gray-900">
                    {service.price}
                  </span>
                  <a
                    href={getWhatsappLink(service.name, service.duration)}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    onClick={() => handleBookingClick(service.id)}
                    className={`${buttonClasses} flex items-center justify-center`}
                    aria-label={`Termin buchen für ${service.name}`}
                  >
                    {loadingService === service.id ? (
                      <>
                        <LoadingSpinner />
                        Wird geladen...
                      </>
                    ) : (
                      "Termin buchen"
                    )}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}

      {/* Важная информация */}
      <aside className="mt-16 p-8 bg-gray-50 rounded-lg border border-gray-200">
        <h2 className="font-semibold text-xl mb-6 text-gray-800 flex items-center">
          <span className="mr-3 text-2xl" aria-hidden="true">
            ℹ️
          </span>
          Wichtige Informationen & Kontakt
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-medium text-gray-700 mb-4">
              Allgemeine Hinweise
            </h3>
            <ul className="text-gray-600 space-y-3 text-sm">
              <li className="flex items-start">
                <span className="mr-2 font-bold" aria-hidden="true">
                  •
                </span>
                <span>Alle Preise in Euro inklusive Mehrwertsteuer</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 font-bold" aria-hidden="true">
                  •
                </span>
                <span>Termine nur nach vorheriger Vereinbarung</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 font-bold" aria-hidden="true">
                  •
                </span>
                <span>Professionelle Massage in Glauburg-Stockheim</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 font-bold" aria-hidden="true">
                  •
                </span>
                <span>Privatzahlung - keine Krankenkassenabrechnung</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-gray-700 mb-4">
              Kontakt & Anfahrt
            </h3>
            <address className="text-gray-600 text-sm not-italic">
              <p className="mb-2">
                <strong>BalabaStudio</strong>
                <br />
                Hermstrasse 37
                <br />
                63695 Glauburg-Stockheim
              </p>
              <p className="mt-4">
                <span aria-hidden="true">📞</span> Telefon:{" "}
                <a
                  href="tel:+4915124908000"
                  className="text-[#2d983f] hover:text-[#247a32] font-medium transition-colors"
                >
                  +49 1512 4908000
                </a>
              </p>
              <p className="mt-2">
                <span aria-hidden="true">🌐</span> Website:{" "}
                <a
                  href="https://www.balabastudio.de"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-[#2d983f] hover:text-[#247a32] font-medium transition-colors"
                >
                  www.BalabaStudio.de
                </a>
              </p>
            </address>
          </div>
        </div>
      </aside>

      {/* SEO текст */}
      <div className="mt-12 text-gray-600 leading-relaxed max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
          Professionelle Massagebehandlungen in Glauburg
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="mb-4">
            Unser Massagestudio in <strong>Glauburg-Stockheim</strong> bietet
            Ihnen ein umfassendes Spektrum an professionellen
            Massagedienstleistungen. Von der klassischen
            <strong> Rücken- und Nackenmassage</strong> bis hin zur speziellen
            <strong> Anti-Cellulite-Behandlung</strong> finden Sie bei uns die
            passende Therapie für Ihre Bedürfnisse.
          </p>
          <p className="mb-4">
            Besonders beliebt sind unsere <strong>Kombipakete</strong>, die
            verschiedene Behandlungsmethoden optimal miteinander verbinden. Die
            <strong> Pressotherapie (apparative Lymphdrainage)</strong>{" "}
            unterstützt gezielt die Entschlackung und Straffung des Gewebes,
            während unsere
            <strong> Aroma-Entspannungsmassagen</strong> mit hochwertigen
            ätherischen Ölen für tiefe Entspannung sorgen.
          </p>
          <p>
            Alle Behandlungen werden von qualifizierten Fachkräften
            durchgeführt. Wir legen besonderen Wert auf{" "}
            <strong>
              Diskretion, Professionalität und individuelle Betreuung
            </strong>
            . Vereinbaren Sie noch heute Ihren Wunschtermin und überzeugen Sie
            sich selbst von unserer Kompetenz.
          </p>
        </div>
      </div>
    </section>
  );
}
