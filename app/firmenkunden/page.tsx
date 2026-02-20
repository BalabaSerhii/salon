"use client";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaUsers, FaInfoCircle } from "react-icons/fa";

export default function FirmenkundenPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Hero Section */}
      <section className="py-20 bg-[#f8f7f4] flex flex-col items-center text-center border-b border-gray-100">
        <motion.div className="max-w-4xl px-4" {...fadeInUp}>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Mobiler Massageservice für Unternehmen
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Ein gezieltes Massageangebot in Ihren Räumlichkeiten kann die
            gesundheitsorientierte Gestaltung Ihrer Arbeitsumgebung sinnvoll
            unterstützen.
          </p>
        </motion.div>
      </section>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* Leistungsbeschreibung */}
        <motion.div className="text-center mb-20 space-y-6" {...fadeInUp}>
          <h2 className="text-2xl font-semibold text-gray-900">
            Unser Service vor Ort
          </h2>
          <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Wir bieten einen mobilen Massageservice an, bei dem die gesamte
            benötigte Ausrüstung bereitgestellt werden kann. Dazu gehören eine
            professionelle Massageliege sowie alle erforderlichen
            Verbrauchsmaterialien.
          </p>
          <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Sofern in Ihrem Unternehmen ein ruhiger и trockener Raum zur
            Verfügung steht, kann dieser für die Aufstellung der Massageliege
            genutzt werden.
          </p>
        </motion.div>

        {/* Info Block */}
        <motion.div
          className="bg-gray-50 p-8 rounded-xl border border-gray-200 text-center mb-24"
          {...fadeInUp}
        >
          <FaInfoCircle className="text-green-800 text-3xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-gray-900">
            Informationen für Arbeitgeber
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Bei Interesse an einer Kooperation kann ein detailliertes
            kommerzielles Angebot erstellt werden, das auf die Bedürfnisse Ihres
            Teams zugeschnitten ist.
          </p>
        </motion.div>

        {/* Vorteile Sektion */}
        <div className="grid md:grid-cols-2 gap-10 mb-24">
          {/* Arbeitgeber */}
          <motion.div
            className="border border-gray-200 p-10 rounded-xl text-center flex flex-col items-center"
            {...fadeInUp}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6 underline decoration-green-800 underline-offset-8">
              Potenzielle Aspekte für das Unternehmen
            </h3>
            <ul className="space-y-4 text-gray-700">
              <li>Kann die betriebliche Gesundheitsförderung ergänzen</li>
              <li>Kann zur Stärkung der Mitarbeiterbindung beitragen</li>
              <li>Kann die allgemeine Zufriedenheit am Arbeitsplatz fördern</li>
              <li>
                Kann als Betriebsausgabe steuerlich geltend gemacht werden
              </li>
            </ul>
          </motion.div>

          {/* Mitarbeiter */}
          <motion.div
            className="border border-gray-200 p-10 rounded-xl text-center flex flex-col items-center"
            {...fadeInUp}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6 underline decoration-green-800 underline-offset-8">
              Potenzielle Aspekte für Mitarbeiter
            </h3>
            <ul className="space-y-4 text-gray-700">
              <li>Kann als Ausgleich zur sitzenden Tätigkeit dienen</li>
              <li>Kann helfen, die körperliche Entspannung zu erhalten</li>
              <li>Kann durch den Wegfall von Anfahrtswegen Zeit sparen</li>
              <li>Kann die persönliche Regeneration direkt unterstützen</li>
            </ul>
          </motion.div>
        </div>

        {/* Rahmenbedingungen */}
        <motion.div
          className="bg-[#faf9f5] text-white rounded-2xl p-10 md:p-16 text-center shadow-2xl"
          {...fadeInUp}
        >
          <h2 className="text-2xl font-bold mb-12 text-green-500 uppercase tracking-widest">
            Konditionen und Voraussetzungen
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="flex flex-col items-center">
              <FaMapMarkerAlt className="text-3xl text-green-500 mb-4" />
              <h4 className="text-lg font-bold mb-2 text-black">
                Einsatzradius
              </h4>
              <p className="text-gray-400 max-w-xs">
                Der Service kann für Standorte im Umkreis von ca. 20 km um die
                Herrnstrasse 37, 63695 Glauburg-Stockheim angefragt werden.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <FaUsers className="text-3xl text-green-500 mb-4" />
              <h4 className="text-lg font-bold mb-2 text-black">
                Teilnehmerzahl
              </h4>
              <p className="text-gray-400 max-w-xs">
                Ein Einsatztermin kann ab einer Mindestanzahl von 4 Personen
                realisiert werden.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Kontakt CTA */}
        <motion.div className="mt-24 text-center pb-10" {...fadeInUp}>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Kontakt für Firmenanfragen
          </h2>
          <p className="text-gray-600 mb-10 max-w-xl mx-auto">
            Sollten Sie weitere Informationen benötigen, kann über unsere
            Kontaktwege eine Anfrage gestellt werden.
          </p>
          <motion.a
            href="/contacts"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="items-center justify-center w-full max-w-100  bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Angebot anfordern
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}
