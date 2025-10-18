"use client";

import ButtonInsta from "@/components/ButtonInsta";
import ButtonWA from "@/components/ButtonWA";
import ServicesPreview from "@/components/ServicesPreview";
import BenefitsSection from "@/components/BenefitsSection";
import ReviewCarousel from "@/components/ReviewCarousel";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 80,
    },
  },
  hover: {
    y: -8,
    scale: 1.03,
    boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.1)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 17,
    },
  },
};

export default function HomePage() {
  return (
    <motion.main
      className="min-h-screen overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* === HERO SECTION === */}
      <motion.section
        className="relative text-[#64615a] text-center mt-1"
        role="banner"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-[#f8f7f4] pt-7 pb-10 text-center w-full">
          <div className="container mx-auto px-4 max-w-6xl">
            {/* Главный заголовок с анимацией */}
            <motion.h1
              className="text-3xl md:text-5xl lg:text-4xl font-bold leading-tight pb-5"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                duration: 0.8,
              }}
            >
              Professionelle Entspannungsmassage in <br />
              <motion.span
                className="font-semibold text-[#5c6d2f]"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                63695 Glauburg-Stockheim
              </motion.span>
            </motion.h1>

            {/* Подзаголовок с анимацией */}
            <motion.p
              className="text-xl md:text-2xl lg:text-3xl mx-auto leading-relaxed w-full md:w-4/5 pt-5 border-t pb-5 border-gray-300 px-4"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Apparative Lymphdrainage-Massage{" "}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.4 }}
              >
                (Pressotherapie)
              </motion.span>
            </motion.p>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-6xl">
          {/* Декоративная линия с анимацией */}
          <motion.div
            className="w-24 h-1 bg-green-300 mx-auto rounded-full mb-8"
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ delay: 0.7, duration: 0.5 }}
          />

          {/* USP (Уникальные преимущества) с ступенчатой анимацией */}
          <motion.section
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto px-4"
            aria-label="Unsere Vorteile"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
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
              <motion.article
                key={i}
                className="bg-[var(--background)] rounded-2xl p-6 text-center cursor-pointer"
                variants={cardVariants}
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
                custom={i}
              >
                <motion.div
                  className="text-2xl mb-2"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {item.icon}
                </motion.div>
                <h2 className="font-semibold mb-2 text-lg">{item.title}</h2>
                <p className="text-sm text-gray-600">{item.text}</p>
              </motion.article>
            ))}
          </motion.section>

          {/* CTA блок с анимацией */}
          <motion.div
            className="bg-white rounded-2xl p-6 md:p-8 shadow-xl max-w-2xl mx-auto px-4 md:px-8"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              delay: 0.3,
            }}
            viewport={{ once: true }}
            whileHover={{
              y: -5,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
            }}
          >
            <motion.h2
              className="text-2xl md:text-3xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              Jetzt Termin vereinbaren
            </motion.h2>

            <motion.p
              className="text-gray-600 mb-6 text-base md:text-lg"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
            >
              Einfach und unverbindlich per WhatsApp oder Instagram
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="w-full sm:w-auto"
              >
                <ButtonWA />
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="w-full sm:w-auto"
              >
                <ButtonInsta />
              </motion.div>
            </motion.div>

            <motion.p
              className="text-sm text-gray-500 mt-4 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              viewport={{ once: true }}
            >
              <motion.span
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ⚡
              </motion.span>
              Meist Termine innerhalb von 24–48 Stunden verfügbar
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* === BENEFITS === */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <BenefitsSection />
      </motion.section>

      {/* === SERVICES PREVIEW === */}
      <motion.section
        className="py-16 md:py-20 bg-white"
        aria-labelledby="services-title"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <ServicesPreview />
        </div>
      </motion.section>

      {/* === REVIEWS === */}
      <motion.section
        className="py-16 md:py-20 bg-white"
        aria-labelledby="reviews"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.h2
            id="reviews"
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Kundenbewertungen
          </motion.h2>
        </div>

        <motion.div
          className="container mx-auto px-4 max-w-6xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <ReviewCarousel />
        </motion.div>
      </motion.section>
    </motion.main>
  );
}
