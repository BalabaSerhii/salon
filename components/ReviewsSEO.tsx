// app/components/ReviewsSEO.tsx
import Script from "next/script";
import { allReviews } from "../app/lib/reviews";

export default function ReviewsSEO() {
  const seoReviews = allReviews.slice(0, 10);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Balaba Studio Massage",
    image: "https://balabastudio.de/balabastudio.png",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Herrnstrasse 37",
      addressLocality: "Glauburg-Stockheim",
      postalCode: "63695",
      addressCountry: "DE",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: allReviews.length,
    },
    review: seoReviews.map((r) => ({
      "@type": "Review",
      author: r.author,
      reviewRating: {
        "@type": "Rating",
        ratingValue: Number(r.rating),
      },
      reviewBody: r.text,
    })),
  };

  return (
    <Script
      id="reviews-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
