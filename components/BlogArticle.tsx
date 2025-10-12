import Image from "next/image";
import { BlogPost } from "../app/lib/blog";

interface BlogArticleProps {
  post: BlogPost;
}

export default function BlogArticle({ post }: BlogArticleProps) {
  return (
    <article className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Hero Image */}
      <div className="relative h-64 md:h-96">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          priority
        />
      </div>

      {/* Article Content */}
      <div className="p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
            {post.category}
          </span>
          <span>{post.readTime}</span>
          <span>{post.publishDate}</span>
          <span>Von {post.author}</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          {post.title}
        </h1>

        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed whitespace-pre-line">
            {post.content}
          </div>
        </div>

        {/* Tags */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
