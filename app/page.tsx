import ContactSection from "@/components/ContactSection";

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
        <button className="mt-6 rounded-lg  px-6 py-2 text-black hover:bg-green-600 cursor-pointer transition bg-green-500 target-blank">
          <a
            target="_blank"
            href="https://wa.me/4915124908000?text=Hallo,%20ich%20interessiere%20mich%20für%20Ihre%20Dienstleistungen"
          >
            WhatsApp
          </a>
        </button>
      </div>

      <ContactSection />
    </main>
  );
}
