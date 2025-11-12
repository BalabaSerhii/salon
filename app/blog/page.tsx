"use client";

import { useState } from "react";
import BlogCard from "@/components/BlogCard";
import { blogPosts } from "../data/blogData";
import { motion, Variants } from "framer-motion";


// Варианты анимаций
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
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

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
    },
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 17,
    },
  },
};

export default function BlogPage() {
  const [visiblePosts, setVisiblePosts] = useState(6);

  const loadMore = () => {
    setVisiblePosts((prev) => prev + 3);
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header с анимацией */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            duration: 0.8,
          }}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Balaba Studio Blog
          </motion.h1>

          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Entdecken Sie Tipps für Entspannung, Wellness und einen gesunden
            Lebensstil
          </motion.p>

          {/* Декоративный элемент */}
          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-green-400 to-blue-400 mx-auto mt-6 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "8rem" }}
            transition={{ delay: 0.6, duration: 0.5 }}
          />
        </motion.div>

        {/* Blog Posts Grid с ступенчатой анимацией */}
        <motion.div
          className="space-y-8 md:space-y-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {blogPosts.slice(0, visiblePosts).map((post, index) => (
            <motion.div
              key={post.id}
              variants={cardVariants}
              whileHover="hover"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              custom={index}
            >
              <BlogCard
                post={post}
                layout={index % 2 === 0 ? "image-right" : "image-left"}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Load More Button с анимацией появления и загрузки */}
        {visiblePosts < blogPosts.length && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={loadMore}
              className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors relative overflow-hidden"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(34, 197, 94, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {/* Анимированный фон кнопки */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-400"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
                style={{ zIndex: -1 }}
              />

              <span className="relative z-10">Mehr Artikel laden</span>

              {/* Анимация иконки стрелки */}
              <motion.span
                className="ml-2 inline-block"
                animate={{ y: [0, -2, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                ↓
              </motion.span>
            </motion.button>

            {/* Индикатор прогресса */}
            <motion.div
              className="mt-4 text-sm text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Zeige {visiblePosts} von {blogPosts.length} Artikeln
            </motion.div>

            {/* Прогресс бар */}
            <motion.div
              className="mt-2 w-48 mx-auto bg-gray-200 rounded-full h-2 overflow-hidden"
              initial={{ opacity: 0, scaleX: 0.8 }}
              animate={{ opacity: 1, scaleX: 1 }}
            >
              <motion.div
                className="h-full bg-green-500 rounded-full"
                initial={{ width: 0 }}
                animate={{
                  width: `${(visiblePosts / blogPosts.length) * 100}%`,
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </motion.div>
          </motion.div>
        )}

        {/* Сообщение когда все статьи загружены */}
        {visiblePosts >= blogPosts.length && (
          <motion.div
            className="text-center mt-12 p-6 bg-white rounded-lg shadow-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <motion.div
              className="text-4xl mb-4"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            >
              🎉
            </motion.div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Alle Artikel geladen!
            </h3>
            <p className="text-gray-600">
              Sie haben alle {blogPosts.length} Artikel durchgesehen.
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
