import Link from "next/link";

export default function ServicesPreview() {
  const services = [
    {
      name: "Pressotherapie",
      description: "Apparative Lymphdrainage zur Entschlackung",
      price: "ab 10€",
      link: "/preisliste#pressotherapie",
    },
    {
      name: "Ganzkörpermassage",
      description: "Umfassende Entspannung von Kopf bis Fuß",
      price: "ab 50€",
      link: "/preisliste#ganzkoerper-massage",
    },
    {
      name: "Zonen-Massage",
      description: "Gezielte Behandlung spezifischer Bereiche",
      price: "ab 20€",
      link: "/preisliste#zonen-massage",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-[var(--background)] rounded-2xl p-3">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Unsere Services
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#62733f] to-green-600 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professionelle Behandlungen für Ihr Wohlbefinden
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 border border-green-100 hover:shadow-xl transition-all duration-300 text-center"
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                {service.name}
              </h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <div className="text-2xl font-bold text-[#62733f] mb-6">
                {service.price}
              </div>
              <Link
                href={service.link}
                className="block w-full bg-gradient-to-r from-[#62733f] to-green-600 text-white text-center py-3 rounded-lg font-semibold hover:from-[#62733f]/90 hover:to-green-600/90 transition-all duration-300"
              >
                Mehr erfahren
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/preisliste"
            className="inline-flex items-center gap-2 bg-white text-[#62733f] border border-[#62733f] px-8 py-4 rounded-lg font-semibold hover:bg-[#62733f] hover:text-white transition-all duration-300"
          >
            Komplette Preisliste ansehen
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
