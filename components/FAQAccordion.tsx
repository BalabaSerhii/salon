// components/FAQAccordion.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqItems = [
  {
    question: "Wie bereite ich mich auf eine Massage vor?",
    answer:
      "Für die optimale Massagevorbereitung empfehlen wir: Duschen Sie vor der Behandlung, vermeiden Sie schwere Mahlzeiten 2 Stunden davor und tragen Sie bequeme Kleidung. Informieren Sie unseren Masseur über medizinische Kontraindikationen oder spezielle Problemzonen. Diese Vorbereitung gewährleistet maximale Entspannung und Wirksamkeit Ihrer Massage in unserem Studio in Glauburg",
    icon: "🛁",
    keywords: ["Massage Vorbereitung", "Vor Massage duschen", "Massage Tipps"],
  },
  {
    question: "Was soll ich zur Pressotherapie mitbringen?",
    answer:
      "Für Ihre Pressotherapie im Balaba Studio Glauburg benötigen Sie absolut nichts mitzubringen! Wir stellen Ihnen komplett hygienische Einweg-Anzüge zur Verfügung, die nach jeder Behandlung fachgerecht entsorgt werden. Alle Geräte und Kontaktflächen werden nach jedem Kunden professionell desinfiziert. Unsere hohen Hygienestandards garantieren Ihnen eine sichere und keimfreie Pressotherapie-Behandlung. Genießen Sie Ihre Lymphdrainage in Glauburg ohne jegliche Vorbereitung - wir kümmern uns um alles!",
    icon: "🎒",
    keywords: [
      "Pressotherapie Hygiene",
      "Einweg-Anzüge Pressotherapie",
      "Lymphdrainage Glauburg",
    ],
  },
  {
    question: "Was soll ich zur Massage mitbringen?",
    answer:
      "Für Ihren Massagetermin im Balaba Studio Glauburg benötigen Sie nur bequeme Kleidung und gute Laune. Wir stellen alle notwendigen Utensilien wie Handtücher, Öle und eine hygienische Liege bereit",
    icon: "💼",
    keywords: [
      "Massage Utensilien",
      "Was zur Massage nehmen",
      "Massage Vorbereitung",
    ],
  },
  {
    question: "Was ist Pressotherapie?",
    answer:
      "Pressotherapie ist eine apparative Lymphdrainage mit komprimierter Luft - eine Spezialität unseres Studios in Glauburg. Ein spezieller Anzug füllt sich mit Luft und erzeugt wellenförmigen Druck, der den Lymphfluss verbessert, Schwellungen reduziert und die Entgiftung fördert. Ideal bei Cellulite, Ödemen und zur Entspannung. Wir bieten professionelle Pressotherapie in der Wetterau Region",
    icon: "🌀",
    keywords: [
      "Pressotherapie erklärt",
      "Lymphdrainage Massage",
      "Apparative Massage",
    ],
  },
  {
    question: "Gegenanzeigen zur Pressotherapie",
    answer:
      "Pressotherapie ist nicht geeignet bei: Akuten Entzündungen, Herzinsuffizienz, Thrombosen, Krebserkrankungen, Nierenproblemen oder während der Schwangerschaft. Bei chronischen Erkrankungen konsultieren Sie bitte Ihren Arzt. Unser qualifiziertes Team in Glauburg berät Sie gerne zu alternativen Behandlungen wie klassischer Massage oder Aromaölmassage.",
    icon: "⚠️",
    keywords: [
      "Pressotherapie Risiken",
      "Massage Gegenanzeigen",
      "Nicht geeignet für",
    ],
  },
  {
    question: "Welche Massage passt zu mir?",
    answer:
      "Im Balaba Studio Glauburg bieten wir individuelle Beratung: Bei Verspannungen - klassische Massage oder Rückenmassage. Zur Entspannung - Aromaölmassage oder Ganzkörpermassage. Bei Stress - Kopfmassage mit ätherischen Ölen. Vereinbaren Sie einen Beratungstermin - wir finden die perfekte Massage für Ihre Bedürfnisse in der Wetterau Region",
    icon: "🎯",
    keywords: [
      "Massage Auswahl",
      "Welche Massage bei",
      "Massage Beratung Glauburg",
    ],
  },
  {
    question: "Gibt es kostenlose Parkplätze in der Nähe?",
    answer:
      "Ja! Unser Balaba Studio in Glauburg-Stockheim bietet ausreichend kostenlose Parkplätze direkt vor dem Studio in der Hermstrasse 37. Sie müssen keine Parkgebühren zahlen oder nach Parkplätzen suchen. Perfekte Erreichbarkeit für Kunden aus Büdingen, Nidda, Ortenberg und der gesamten Wetterau Region.",
    icon: "🅿️",
    keywords: [
      "Parkplätze Massage Studio",
      "Kostenlos parken Glauburg",
      "Anfahrt Balaba Studio",
    ],
  },
  {
    question: "Kann ich mit Karte bezahlen?",
    answer:
      "Im Balaba Studio Glauburg akzeptieren wir derzeit Zahlungen per Barzahlung. Als Kleinunternehmer nach §19 UStG sind wir von der Umsatzsteuer befreit, was Ihnen transparente Preise ohne versteckte Kosten garantiert. Diese Regelung ermöglicht es uns, qualitativ hochwertige Massagen und Pressotherapie in der Wetterau Region zu fairen Konditionen anzubieten. Bereiten Sie sich einfach auf Ihren Besuch in Glauburg mit Bargeld vor und profitieren Sie von unseren Direktpreisen!",
    icon: "💳",
    keywords: [
      "Barzahlung Massage",
      "§19 UStG Kleinunternehmer",
      "Umsatzsteuerbefreit Glauburg",
    ],
  },
  {
    question: "Wie oft kann man Massage machen?",
    answer:
      "Empfohlene Massage-Frequenz im Balaba Studio Glauburg: Zur Entspannung - 1-2x pro Monat. Bei spezifischen Problemen wie Rückenschmerzen - 2-3x pro Woche als 8-10 wöchiger Kurs. Zur Prävention - 1x pro Woche. Wir erstellen individuelle Pläne basierend auf Ihren Bedürfnissen. Regelmäßige Massagen verbessern nachweislich Lebensqualität und Wohlbefinden.",
    icon: "📅",
    keywords: ["Massage Häufigkeit", "Wie oft Massage", "Massage Rhythmus"],
  },
  
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Исправленные variants с правильными типами
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      y: 30,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94], // Исправлено: массив вместо строки
      },
    },
  };

  return (
    <motion.section
      className="py-16 md:py-20 bg-gray-50"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="max-w-4xl mx-auto px-4">
        {/* SEO-optimierte Überschrift */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Häufige Fragen zu Massage & Pressotherapie
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Umfassende Informationen zu Massagebehandlungen, Pressotherapie und
            allen Services im Balaba Studio Glauburg. Professionelle Beratung
            für Kunden aus der Wetterau Region.
          </p>
        </motion.div>

        {/* Structured Data für Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqItems.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.answer,
                },
              })),
            }),
          }}
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-4"
        >
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <motion.button
                onClick={() => toggleItem(index)}
                className={`w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-2xl transition-colors duration-200 ${
                  openIndex === index ? "bg-green-50" : "hover:bg-gray-50"
                }`}
                whileTap={{ scale: 0.995 }}
              >
                <div className="flex items-center gap-4 flex-1">
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <span className="text-lg font-semibold text-gray-900 text-left">
                    {item.question}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex-shrink-0"
                >
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{
                      height: 0,
                      opacity: 0,
                    }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.4,
                      ease: [0.04, 0.62, 0.23, 0.98],
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 ml-14 border-t border-gray-100 pt-4">
                      <motion.div
                        className="w-12 h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full mb-4"
                        initial={{ width: 0 }}
                        animate={{ width: 48 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                      />
                      <motion.p
                        className="text-gray-700 leading-relaxed text-lg"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.3 }}
                      >
                        {item.answer}
                      </motion.p>
                      {/* SEO Keywords - unsichtbar für Google */}
                      <div className="hidden">
                        {item.keywords.join(", ")} | Massage Glauburg | Balaba
                        Studio | Wetterau Massage
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* SEO-optimierte CTA Section */}
        <motion.div
          className="text-center mt-16 p-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border border-green-200"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Persönliche Beratung im Balaba Studio Glauburg
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto text-lg">
            Wir beraten Sie individuell zu Massage, Pressotherapie und allen
            Wellness-Behandlungen. Perfekte Entspannung für Kunden aus Büdingen,
            Nidda, Ortenberg und der gesamten Wetterau.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="tel:+4915124908000"
              className="bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>📞</span>
              +49 151 24908000
            </motion.a>
            <motion.a
              href="/contacts"
              className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-green-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>📧</span>
              Termin anfragen
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
