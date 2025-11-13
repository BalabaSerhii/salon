"use client";

import Script from "next/script";

const allReviews = [
  {
    author: "Karin Thon",
    rating: 5,
    text: "Ich bin Sehr zufrieden und dankbar dass ich mich dort behandeln lassen kann, inzwischen kann ich meinen Arm wieder gut anheben ohne Schmerzen,ich bleibe dort und empfehle es weiter alles sehr gut ordentlich und sauber",
  },
  {
    author: "Natalia Dieterle",
    rating: 5,
    text: "Ich war schon mehrmals in diesem Massagestudio und bin jedes Mal sehr zufrieden. Die Atmosphäre ist sehr angenehm, man fühlt sich direkt gut aufgehoben. Die Massage selbst war absolut professionell — genau die richtige Mischung aus Entspannung und gezielter Behandlung von Problemzonen. Das Team ist sehr freundlich, aufmerksam und geht auf individuelle Wünsche ein. Preis-Leistungs-Verhältnis stimmt auch vollkommen. Ich komme auf jeden Fall wieder und kann das Studio nur weiterempfehlen!",
  },
  {
    author: "Rene Schlitt",
    rating: 5,
    text: "Die Zeit bei der Massage von Maryna konnte ich sehr gut genießen. Die Absprache was gemacht werden soll hat super funktioniert. Ich komme auf jeden Fall wieder. Vielen Dank für die schöne entspannte Zeit.",
  },
  {
    author: "Sandra Rockel",
    rating: 5,
    text: "Ein tolles Studio mit einer ausgezeichneten Masseurin. Professionell, hygienisch und super freundlich. Schnelle Termine easy zu bekommen. Absolut empfehlenswert",
  },
  {
    author: "Anna",
    rating: 5,
    text: "Sehr sehr freundlich! Schicke Atmosphäre.Regional, gut zu rreichen.",
  },
  {
    author: "Florian Zöll",
    rating: 5,
    text: "Wir freuen uns sehr, dass es Ihnen gefallen hat. Wir würden uns freuen, Sie bald wieder bei uns begrüßen zu dürfen",
  },
  {
    author: "Irina Geringer",
    rating: 5,
    text: "Nur zum empfehlen Wunderbar Relax pur Wird fast alle Muskeln Organe usw. Durc massiert. So entspannt,dass ich fast immer einschlafen kann. Besonders zum empfehlen nach der Arbeit 😊",
  },
  {
    author: "petra bartelsmeier",
    rating: 5,
    text: "Ich bin sehr zufrieden. Die ganze Atmosphäre ist liebevoll und freundlich. Die Masseurin versteht ihr Handwerk und geht immer auf meine Bedürfnisse ein. Ob Rücken/Nacken oder Ganzkörper, für mich jedesmal eine Oase für mein Wohlbefinden. Weitere Termine sind gebucht für pure Entspannung. Von Herzen, danke ❣️",
  },
  {
    author: "яна мухтова",
    rating: 5,
    text: "Vom ersten Moment an, als ich Marina Massagepraxis betrat, wusste ich sofort, dass dies ein ganz besonderer Ort ist. Die Atmosphäre war von wohliger Wärme und entspannter Ruhe erfüllt, und Marina geschickte Hände wirkten wie echte Magie. Jede Berührung war nicht nur Technik, sondern pure Kunst, die mich in einen Zustand tiefer Entspannung versetzte. Nach der Massage fühlte ich mich leicht, voller neuer Energie und innerer Harmonie. Herzlichen Dank für dieses außergewöhnliche Erlebnis – ich komme ganz sicher wieder!",
  },
  {
    author: "Alyona K.",
    rating: 5,
    text: "Ich besuchte den Massageraum und war begeistert! Die Atmosphäre ist gemütlich und die Masseurin ist ein echter Profi. Sehr aufmerksam, einfühlsam und Meister ihres Fachs. Nach der Sitzung spürte ich eine Entspannung und einen Energieschub. Ich werde auf jeden Fall wiederkommen und es jedem empfehlen!",
  },
];

export const StructuredData = () => {
  // Берем первые 5 отзывов для structured data (чтобы не перегружать)
  const seoReviews = allReviews.slice(0, 5);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["HealthAndBeautyBusiness", "LocalBusiness", "DaySpa"],
    "@id": "https://www.balabastudio.de/#organization",

    // Basic Business Information (REQUIRED)
    name: "Balaba Studio Massage",
    description:
      "Professionelle Massagen und Pressotherapie in Glauburg-Stockheim - Entspannungsmassagen, Lymphdrainage und Wellness-Behandlungen",
    url: "https://www.balabastudio.de",

    // Contact Information (REQUIRED for LocalBusiness)
    telephone: "+49-151-24908000",
    email: "balabamassage@gmail.com",

    // Location Data (REQUIRED for LocalBusiness)
    address: {
      "@type": "PostalAddress",
      streetAddress: "Herrnstrasse 37",
      addressLocality: "Glauburg-Stockheim",
      postalCode: "63695",
      addressCountry: "DE",
      addressRegion: "Hessen",
    },

    // Geo Coordinates (IMPROVED accuracy)
    geo: {
      "@type": "GeoCoordinates",
      latitude: 50.3250513,
      longitude: 9.0123212,
    },

    // Media Assets (REQUIRED - multiple images)
    image: [
      "https://www.balabastudio.de/balabastudio.png",
      "https://www.balabastudio.de/logobeauty.webp",
      "https://www.balabastudio.de/logo.png",
    ],
    logo: "https://www.balabastudio.de/logobeauty.webp",

    // Business Hours (FIXED - consistent schedule)
    openingHours: "Mo-Sa 10:00-20:00",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "https://schema.org/Monday",
          "https://schema.org/Tuesday",
          "https://schema.org/Wednesday",
          "https://schema.org/Thursday",
          "https://schema.org/Friday",
          "https://schema.org/Saturday",
        ],
        opens: "10:00",
        closes: "20:00",
      },
    ],

    // Price Information (REQUIRED - fixed format)
    priceRange: "€€",
    currenciesAccepted: "EUR",
    paymentAccepted: "Cash, EC Card",

    // Business Details
    foundingDate: "2025",
    founder: {
      "@type": "Person",
      name: "Serhii Balaba",
      jobTitle: "Certified Massage Therapist",
    },
    employee: {
      "@type": "Person",
      name: "Serhii Balaba",
      jobTitle: "Massage Therapist",
    },

    // Services & Offers (IMPROVED structure)
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Pressotherapie",
          description:
            "Apparative Lymphdrainage-Massage zur Entschlackung und Entwässerung",
          provider: {
            "@type": "Organization",
            name: "Balaba Studio Massage",
          },
        },
        price: "10",
        priceCurrency: "EUR",
        priceSpecification: {
          "@type": "PriceSpecification",
          price: "10",
          priceCurrency: "EUR",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Ganzkörpermassage",
          description: "Umfassende Entspannungsmassage des gesamten Körpers",
          provider: {
            "@type": "Organization",
            name: "Balaba Studio Massage",
          },
        },
        price: "50",
        priceCurrency: "EUR",
        priceSpecification: {
          "@type": "PriceSpecification",
          price: "50",
          priceCurrency: "EUR",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Zonen-Massage",
          description: "Gezielte Massage spezifischer Körperbereiche",
          provider: {
            "@type": "Organization",
            name: "Balaba Studio Massage",
          },
        },
        price: "20",
        priceCurrency: "EUR",
        priceSpecification: {
          "@type": "PriceSpecification",
          price: "20",
          priceCurrency: "EUR",
        },
      },
    ],

    // Professional Credentials
    hasCredential: [
      "Zertifizierte Massagetherapeutin",
      "Geprüfte Massagefachkraft",
    ],

    // Social Media & Reviews
    sameAs: [
      "https://www.instagram.com/balabastudio_glauburg/",
      "https://www.facebook.com/profile.php?id=61571893245558",
      "https://wa.me/4915124908000",
      "https://t.me/BalabaStudio",
    ],

    // Aggregate Rating (ОБНОВЛЕНО с реальными данными из отзывов)
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      ratingCount: allReviews.length.toString(),
      bestRating: "5",
      worstRating: "1",
      reviewCount: allReviews.length.toString(),
    },

    // Reviews (ДОБАВЛЕНО - реальные отзывы клиентов)
    review: seoReviews.map((review) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: review.author,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating.toString(),
        bestRating: "5",
        worstRating: "1",
      },
      reviewBody: review.text,
      datePublished: "2025-01-15", // Можно заменить на реальные даты если есть
      publisher: {
        "@type": "Organization",
        name: "Balaba Studio Massage",
      },
    })),

    // Service Area
    areaServed: {
      "@type": "State",
      name: "Hessen",
    },

    // Additional Business Info
    slogan: "Professionelle Entspannungsmassage in Glauburg-Stockheim",
  };

  // Service-specific structured data (ИСПРАВЛЕННЫЙ - добавлены недостающие поля)
  const serviceStructuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Massage Therapy Services",
    description: "Professionelle Massagetherapie und Wellness-Behandlungen",

    // Provider with complete LocalBusiness data
    provider: {
      "@type": "LocalBusiness",
      name: "Balaba Studio Massage",
      telephone: "+4915124908000", // ✅ ДОБАВЛЕНО
      priceRange: "€€", // ✅ ДОБАВЛЕНО
      image: [
        // ✅ ДОБАВЛЕНО
        "https://www.balabastudio.de/logo.png",
        "https://www.balabastudio.de/logobeauty.webp",
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Herrnstrasse 37",
        addressLocality: "Glauburg-Stockheim",
        postalCode: "63695",
        addressCountry: "DE",
        addressRegion: "Hessen", // ✅ ДОБАВЛЕНО
      },
      geo: {
        // ✅ ДОБАВЛЕНО
        "@type": "GeoCoordinates",
        latitude: 50.3250513,
        longitude: 9.0123212,
      },
      openingHours: "Mo-Sa 10:00-20:00", // ✅ ДОБАВЛЕНО
      url: "https://www.balabastudio.de", // ✅ ДОБАВЛЕНО
    },

    // Service details
    serviceType: "Massage Therapy",
    category: "Health & Beauty",

    // Service area
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Glauburg-Stockheim, Hessen, Deutschland",
    },

    // Offers and pricing
    offers: {
      "@type": "Offer",
      priceSpecification: {
        "@type": "PriceSpecification",
        price: "50",
        priceCurrency: "EUR",
        minPrice: "10",
        maxPrice: "50",
      },
    },

    // Additional service information
    termsOfService: "https://www.balabastudio.de/agb",
  };

  return (
    <>
      <Script
        id="unified-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <Script
        id="service-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceStructuredData),
        }}
      />
    </>
  );
};
