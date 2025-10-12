export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  readTime: string;
  category: string;
  publishDate: string;
  author: string;
  tags: string[];
}

export interface BlogCardProps {
  post: BlogPost;
  layout: "image-right" | "image-left";
}

export const blogPosts: BlogPost[] = [];
