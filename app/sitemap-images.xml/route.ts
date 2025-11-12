import { NextResponse } from "next/server";
import { blogPosts } from "../data/blogData";

export async function GET() {
  const baseUrl = "https://www.balabastudio.de";

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  
  ${blogPosts
    .map((post) =>
      post.imageUrl
        ? `
  <url>
    <loc>${baseUrl}/blog/${post.id}</loc>
    <image:image>
      <image:loc>${post.imageUrl}</image:loc>
      <image:title>${post.title}</image:title>
      <image:caption>${post.excerpt}</image:caption>
      <image:license>https://creativecommons.org/licenses/by/4.0/</image:license>
    </image:image>
  </url>`
        : ""
    )
    .join("")}
</urlset>`;

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
