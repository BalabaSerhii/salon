import type { Metadata } from "next";
import { blogPosts } from "@/data/blogData";


export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: post.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = params;
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return {
      title: "Artikel nicht gefunden - Balaba Studio",
      description: "Der angeforderte Blogartikel konnte nicht gefunden werden.",
    };
  }

  return {
    title: `${post.title} | Balaba Studio Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.id}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://www.balabastudio.de/blog/${post.id}`,
      type: "article",
      publishedTime: post.publishDate,
      images: post.imageUrl
        ? [
            {
              url: post.imageUrl,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : undefined,
      tags: post.tags,
    },
    keywords: post.tags?.join(", "),
    authors: [{ name: post.author }],
    category: post.category,
  };
}
