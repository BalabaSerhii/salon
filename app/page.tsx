import AboutUs from "@/components/AboutUs";
import ButtonWA from "@/components/ButtonWA";
import ContactSection from "@/components/ContactSection";
import Gallery from "@/components/Gallery";
import ReviewsSEO from "@/components/ReviewsSEO";

export default function HomePage() {
  return (
    <main className="flex p-30 flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold text-primary">
        Apparative Lymphdrainage-Massage (Pressotherapie)
      </h1>
      <p className="mt-4 text-4xl text-red-700">
        Professionelle Entspannungsmassage in 63695 Glauburg-Stockheim
      </p>
      <div className="pt-10">
        <h2>Termin vereinbaren</h2>
        <ButtonWA />
      </div>

      <ContactSection />
      <Gallery />
      <AboutUs />
      <ReviewsSEO />
    </main>
  );
}
