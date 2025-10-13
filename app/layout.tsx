import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Script from "next/script";
import ButtonWA from "@/components/ButtonWA";
import { Toaster } from "@/components/ui/sonner";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Balaba Studio Massage – Glauburg",
  description:
    "Professionelle Massage in Glauburg-Stockheim. Entspannung für Körper und Geist. Jetzt Termin buchen!",
  openGraph: {
    title: "Balaba Studio Massage",
    description:
      "Massage in Glauburg-Stockheim – Entspannung für Körper und Geist.",
    url: "https://balabastudio.de",
    siteName: "Balaba Studio",
    images: [
      {
        url: "https://balabastudio.de/balabastudio.png",
        width: 1200,
        height: 630,
        alt: "Balaba Studio Massage – Glauburg, professionelle Massage",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        <Script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="08322d39-bbda-4e0c-925a-4e08a8067212"
          data-blockingmode="auto"
          strategy="afterInteractive"
          type="text/javascript"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased mx-auto min-h-screen flex flex-col`}
      >
        <div className="mt-3">
          <Header />
        </div>
        <main className="flex-grow">{children}</main>
        {/* === Floating WhatsApp Button === */}
        <div className="fixed bottom-6 right-6 z-50 ">
          <div className="transform hover:scale-110 transition-transform duration-300">
            <ButtonWA />
          </div>
        </div>
        <Footer />
        <Script
          id="ld-json"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
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
              geo: {
                "@type": "GeoCoordinates",
                latitude: 50.325,
                longitude: 9.012417,
              },
              telephone: "+4915124908000",
              email: "balabamassage@gmail.com",
              url: "https://balabastudio.de",
              sameAs: [
                "https://www.instagram.com/balabastudio_glauburg/",
                "https://www.facebook.com/profile.php?id=61571893245558",
              ],
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ],
                  opens: "09:00",
                  closes: "20:00",
                },
              ],
            }),
          }}
        />
        <Toaster position="top-right" duration={4000} />
      </body>
    </html>
  );
}
