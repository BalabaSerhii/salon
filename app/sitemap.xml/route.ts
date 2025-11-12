import { NextResponse } from "next/server";
import { blogPosts } from "../data/blogData";

export async function GET() {
  const baseUrl = "https://www.balabastudio.de";

  const pages = [
    { url: "/", changefreq: "weekly", priority: "1.0" },
    { url: "/about", changefreq: "monthly", priority: "0.8" },
    { url: "/blog", changefreq: "weekly", priority: "0.9" },
    { url: "/contacts", changefreq: "monthly", priority: "0.7" },
    { url: "/preisliste", changefreq: "monthly", priority: "0.8" },
    { url: "/datenschutz", changefreq: "yearly", priority: "0.3" },
    { url: "/impressum", changefreq: "yearly", priority: "0.3" },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join("")}
  
  ${blogPosts
    .map(
      (post) => `
  <url>
    <loc>${baseUrl}/blog/${post.id}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
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
