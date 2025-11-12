import AboutUs from "@/components/AboutUs";
import Gallery from "@/components/Gallery";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Über Uns - Balaba Studio Massage Glauburg",
  description:
    "Erfahren Sie mehr über Balaba Studio - professionelle Massage und Entspannung in Glauburg-Stockheim. Unser Team und Philosophie.",
  alternates: {
    canonical: "/about", 
  },
};
export default function About() {
  return (
    <>
      <AboutUs />

      {/* === GALLERY === */}
      <section
        className="py-16 md:py-20 bg-white"
        aria-labelledby="gallery-title"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2
              id="gallery-title"
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
            >
              Unsere Räumlichkeiten
            </h2>
            <div className="w-20 h-1 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Entdecken Sie unsere entspannende Atmosphäre – designed für Ihr
              Wohlbefinden.
            </p>
          </div>
          <Gallery />
        </div>
      </section>
    </>
  );
}
