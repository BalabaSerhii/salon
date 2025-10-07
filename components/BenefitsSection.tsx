import { benefits } from "../app/lib/benefists-data";
export default function BenefitsSection() {
  return (
    <section
      aria-labelledby="benefits-heading"
      className="py-16 md:py-20 bg-white"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Заголовок секции */}
        <header className="text-center mb-12">
          <h2
            id="benefits-heading"
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
          >
            Warum regelmäßige Massage?
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#62733f] to-green-600 mx-auto rounded-full mb-6" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Entdecken Sie die vielfältigen gesundheitlichen Vorteile
            professioneller Massagetherapie
          </p>
        </header>

        {/* Используем ul/li — семантика списка */}
        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 "
          aria-label="Vorteile regelmäßiger Massagen"
        >
          {benefits.map((benefit, index) => (
            <li key={index} className="h-full ">
              <article

                className="h-full flex flex-col gap-4 bg-gradient-to-br from-green-50 to-white rounded-xl p-6 border border-green-100 hover:shadow-lg transition-all duration-300 focus-within:shadow-lg items-center text-center"

              >
                {/* Эмодзи — визуальный элемент, скрыт от скринридеров (текст заголовка даёт смысл) */}
                <div className="text-3xl mb-1 " aria-hidden="true">
                  {benefit.icon}
                </div>

                <h3
                  id={`benefit-${index}-title`}
                  className="text-xl font-semibold text-gray-800"
                >
                  {benefit.title}
                </h3>

                <p className="text-gray-600 leading-relaxed mt-auto">
                  {benefit.description}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
