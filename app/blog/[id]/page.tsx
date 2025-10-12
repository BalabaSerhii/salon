import { notFound } from 'next/navigation';
import BlogArticle from '@/components/BlogArticle';
import { blogPosts } from '../../data/blogData';

interface BlogPostPageProps {
  params: {
    id: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find(p => p.id === params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <BlogArticle post={post} />
        
        {/* Back to Blog Link */}
        <div className="text-center mt-8">
          <a
            href="/blog"
            className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold"
          >
            ← Zurück zum Blog
          </a>
        </div>
      </div>
    </div>
  );
}