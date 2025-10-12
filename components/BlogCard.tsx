import Image from "next/image";
import Link from "next/link";
import { BlogCardProps } from "../app/lib/blog";

export default function BlogCard({ post, layout }: BlogCardProps) {
  const isImageRight = layout === "image-right";

  return (
    <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      <div
        className={`flex flex-col lg:flex-row ${
          isImageRight ? "lg:flex-row-reverse" : ""
        }`}
      >
        {/* Image */}
        <div className="lg:w-1/2 relative h-64 lg:h-auto">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                {post.category}
              </span>
              <span>{post.readTime}</span>
              <span>{post.publishDate}</span>
            </div>

            <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 line-clamp-2">
              {post.title}
            </h2>

            <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Von {post.author}</span>
            <Link
              href={`/blog/${post.id}`}
              className="text-green-600 hover:text-green-700 font-semibold text-sm flex items-center gap-1"
            >
              Weiterlesen
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
