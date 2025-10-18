"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import BlogArticle from "@/components/BlogArticle";
import { blogPosts } from "../../data/blogData";
import { motion } from "framer-motion";
import { use } from "react";

interface BlogPostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  // Используем хук use() для работы с Promise
  const { id } = use(params);
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    notFound();
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Анимированный компонент статьи */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <BlogArticle post={post} />
        </motion.div>

        {/* Анимированная кнопка возврата */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold px-4 py-2 rounded-lg transition-colors group"
          >
            <motion.span
              className="inline-block"
              whileHover={{ x: -3 }}
              transition={{ type: "spring", stiffness: 500 }}
            >
              ←
            </motion.span>
            <span className="group-hover:underline">Zurück zum Blog</span>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
