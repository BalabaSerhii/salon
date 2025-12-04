"use client";

import { benefits } from "../app/lib/benefists-data";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

// Анимация для контейнера
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Анимация для элементов
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

// Анимация для ховера карточек
const cardHoverVariants: Variants = {
  hover: {
    y: -8,
    scale: 1.02,
    boxShadow: "0 20px 40px -12px rgba(98, 115, 63, 0.2)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
    },
  },
};

// Анимация для иконок
const iconVariants: Variants = {
  hidden: { rotate: -90, opacity: 0, scale: 0.5 },
  visible: {
    rotate: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 12,
    },
  },
};

export default function BenefitsSection() {
  return (
    <section
      aria-labelledby="benefits-heading"
      className="py-16 md:py-20 bg-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Заголовок секции с анимацией */}
        <motion.header
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            id="benefits-heading"
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            Warum regelmäßige Massage?
          </motion.h2>

          <motion.div
            className="w-20 h-1 bg-linear-to-r from-[#62733f] to-green-600 mx-auto rounded-full mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          />

          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            Entdecken Sie die vielfältigen gesundheitlichen Vorteile
            professioneller Massagetherapie
          </motion.p>
        </motion.header>

        {/* Сетка преимуществ */}
        <motion.ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          aria-label="Vorteile regelmäßiger Massagen"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {benefits.map((benefit, index) => (
            <motion.li
              key={index}
              className="h-full"
              variants={itemVariants}
              whileHover="hover"
            >
              <motion.article
                className="relative h-full flex flex-col gap-4 bg-linear-to-r from-green-50 to-white rounded-xl p-6 border border-green-100 hover:shadow-lg transition-all duration-300 focus-within:shadow-lg items-center text-center"
                variants={cardHoverVariants}
                whileHover="hover"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {/* Анимированная иконка */}
                <motion.div
                  className="text-3xl mb-1"
                  aria-hidden="true"
                  variants={iconVariants}
                  whileHover={{
                    rotate: [0, -10, 10, -10, 0],
                    scale: 1.1,
                    transition: { duration: 0.5 },
                  }}
                >
                  {benefit.icon}
                </motion.div>

                {/* Заголовок */}
                <motion.h3
                  id={`benefit-${index}-title`}
                  className="text-xl font-semibold text-gray-800"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  {benefit.title}
                </motion.h3>

                {/* Описание */}
                <motion.p
                  className="text-gray-600 leading-relaxed mt-auto"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  {benefit.description}
                </motion.p>

                {/* Декоративный элемент при ховере */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-[#62733f] to-green-600 rounded-b-xl opacity-0"
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileHover={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.article>
            </motion.li>
          ))}
        </motion.ul>

        {/* Декоративный фоновый элемент */}
        <motion.div
          className="absolute -z-10 top-0 right-0 w-64 h-64 bg-green-100 rounded-full blur-3xl opacity-30"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 0.3 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        />
      </div>
    </section>
  );
}
