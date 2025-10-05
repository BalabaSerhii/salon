import ButtonWA from "./ButtonWA";
import ButtonInsta from "./ButtonInsta";

export default function CTASection() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-[#62733f] to-green-700 text-white">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Bereit für Entspannung?
        </h2>
        <p className="text-xl mb-8 text-green-100 max-w-2xl mx-auto">
          Vereinbaren Sie noch heute Ihren Wohlfühl-Termin und gönnen Sie sich
          eine Auszeit vom Alltag.
        </p>

        <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Einfach und schnell buchen
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
            <div className="transform hover:scale-105 transition-transform duration-300">
              <ButtonWA />
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300">
              <ButtonInsta />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-center justify-center gap-2">
              <span>⚡</span>
              <span>Schnelle Antwort</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span>💬</span>
              <span>Unverbindlich</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span>📅</span>
              <span>Flexible Termine</span>
            </div>
          </div>
        </div>

        <div className="mt-8 text-green-200">
          <p>📍 Herrnstrasse 37, 63695 Glauburg-Stockheim</p>
          <p className="mt-2">⏰ Individuelle Termine nach Vereinbarung</p>
        </div>
      </div>
    </section>
  );
}
