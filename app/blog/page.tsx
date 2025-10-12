"use client";

import { useState } from "react";
import BlogCard from "@/components/BlogCard";
import { blogPosts } from "../data/blogData";

export default function BlogPage() {
  const [visiblePosts, setVisiblePosts] = useState(6);

  const loadMore = () => {
    setVisiblePosts((prev) => prev + 3);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Balaba Studio Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Entdecken Sie Tipps für Entspannung, Wellness und einen gesunden
            Lebensstil
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="space-y-8 md:space-y-12">
          {blogPosts.slice(0, visiblePosts).map((post, index) => (
            <BlogCard
              key={post.id}
              post={post}
              layout={index % 2 === 0 ? "image-right" : "image-left"}
            />
          ))}
        </div>

        {/* Load More Button */}
        {visiblePosts < blogPosts.length && (
          <div className="text-center mt-12">
            <button
              onClick={loadMore}
              className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
            >
              Mehr Artikel laden
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
