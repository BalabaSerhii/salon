import type { ReactElement } from "react";
import Image from "next/image";
import { Icons } from "./Icons";

// Типы (сохранены)
interface Service {
  name: string;
  duration: string;
  price: string;
  description: string;
}

interface Section {
  id: string;
  title: string;
  description: string;
  image: string;
  layout: "image-left" | "image-right";
  services: Service[];
}

interface PreislisteData {
  sections: Section[];
  notice: string;
}

import preislisteData from "../app/data/preisliste-data.json";

// Утилита для преобразования длительности
function durationToDatetime(duration: string): string | undefined {
  if (!duration) return undefined;
  const m = duration.match(/(\d+)\s*min/i);
  if (m) return `PT${m[1]}M`;
  const h = duration.match(/(\d+)\s*h(?:ours?|r|Std)?/i);
  if (h) return `PT${h[1]}H`;
  const hm = duration.match(/(\d+)\s*h(?:ours?|Std)?\s*(\d+)\s*min/i);
  if (hm) return `PT${hm[1]}H${hm[2]}M`;
  const digits = duration.match(/^\s*(\d+)\s*$/);
  if (digits) return `PT${digits[1]}M`;
  return undefined;
}

export default function Preisliste(): ReactElement {
  function renderPriceSection(section: Section, index: number): ReactElement {
    const isImageLeft = section.layout === "image-left";
    const sectionHeadingId = `${section.id}-title`;

    return (
      <article
        key={section.id}
        id={section.id}
        aria-labelledby={sectionHeadingId}
        className="bg-white rounded-2xl shadow-lg overflow-hidden border border-green-100 mb-8 md:mb-12 lg:mb-16"
      >
        <div
          className={`flex flex-col ${
            isImageLeft ? "lg:flex-row" : "lg:flex-row-reverse"
          } lg:items-stretch`}
        >
          {/* Image Section */}
          <figure className="lg:w-2/5 relative m-0">
            <div className="aspect-video lg:aspect-auto lg:h-full relative">
              <Image
                src={section.image}
                alt={section.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/..."
                priority={index === 0} // Приоритетная загрузка для первого изображения
              />
              <figcaption className="sr-only">{section.title}</figcaption>

              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-6 pointer-events-none">
                <span className="text-white font-semibold text-lg">
                  {section.title}
                </span>
              </div>
            </div>
          </figure>

          {/* Content Section */}
          <div className="lg:w-3/5 p-6 md:p-8">
            <header className="mb-6 md:mb-8">
              <h2
                id={sectionHeadingId}
                className="text-2xl md:text-3xl font-bold text-gray-800 mb-3"
              >
                {section.title}
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-[#62733f] to-green-600 rounded-full mb-4" />
              <p className="text-gray-600 leading-relaxed">
                {section.description}
              </p>
            </header>

            {/* Services List */}
            <ul
              className="space-y-4 md:space-y-6"
              aria-label={`${section.title} — Dienstleistungen`}
            >
              {section.services.map((service, serviceIndex) => {
                const dt = durationToDatetime(service.duration);
                return (
                  <li
                    key={serviceIndex}
                    className="border border-green-100 rounded-xl p-4 md:p-6 hover:shadow-md transition-all duration-300 bg-gradient-to-r from-green-50 to-white"
                  >
                    <article
                      aria-labelledby={`${section.id}-svc-${serviceIndex}-name`}
                      className="flex flex-col md:flex-row md:items-center md:justify-between gap-3"
                    >
                      <div className="flex-1">
                        <div className="flex items-start gap-3">
                          <Icons.Scale
                            aria-hidden="true"
                            focusable={false}
                            className="w-5 h-5 text-[#62733f] mt-1 flex-shrink-0"
                          />
                          <div>
                            <h3
                              id={`${section.id}-svc-${serviceIndex}-name`}
                              // className="text-lg md:text-xl font-semibold text-gray-800 mb-1"
                            >
                              {service.name}
                            </h3>
                            <p className="text-gray-600 text-sm md:text-base mb-2">
                              {service.description}
                            </p>

                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Icons.Clock
                                  aria-hidden="true"
                                  focusable={false}
                                  className="w-4 h-4"
                                />
                                {dt ? (
                                  <time dateTime={dt} title={service.duration}>
                                    {service.duration}
                                  </time>
                                ) : (
                                  <span>{service.duration}</span>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="text-right mt-3 md:mt-0">
                        <div
                          className="text-2xl md:text-3xl font-bold text-[#62733f] mb-1"
                          aria-label={`Preis: ${service.price}`}
                        >
                          {service.price}
                        </div>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </article>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-8 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header Section */}
          <header className="text-center mb-8 md:mb-12 lg:mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 lg:p-12 border border-green-100 mx-auto max-w-4xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 md:mb-6">
                Preisliste
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-[#62733f] to-green-600 mx-auto rounded-full mb-6 md:mb-8" />
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                Entdecken Sie unsere vielfältigen Massage-Angebote und
                Pressotherapie-Behandlungen. Professionelle Anwendungen zu
                fairen Preisen in 63695 Glauburg-Stockheim.
              </p>
            </div>
          </header>

          {/* Price Sections */}
          <div className="space-y-8 md:space-y-12 lg:space-y-16">
            {(preislisteData as PreislisteData).sections.map((section, index) =>
              renderPriceSection(section, index)
            )}
          </div>

          {/* Notice Section */}
          <footer
            className="mt-12 md:mt-16"
            aria-labelledby="wichtige-hinweise"
          >
            <div className="bg-gradient-to-r from-[#62733f]/10 to-green-100 rounded-2xl p-6 md:p-8 border border-[#62733f]/20">
              <div className="flex items-start gap-4">
                <Icons.Info
                  aria-hidden="true"
                  focusable={false}
                  className="w-6 h-6 text-[#62733f] mt-1 flex-shrink-0"
                />
                <div>
                  <h3
                    id="wichtige-hinweise"
                    className="text-lg font-semibold text-gray-800 mb-2"
                  >
                    Wichtige Hinweise
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {(preislisteData as PreislisteData).notice}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="bg-white px-3 py-1 rounded-full text-sm text-gray-600 border border-green-200">
                      📞 Terminvereinbarung erforderlich
                    </span>
                    <span className="bg-white px-3 py-1 rounded-full text-sm text-gray-600 border border-green-200">
                      💰 Не предоставляем интимные услуги
                    </span>
                    <span className="bg-white px-3 py-1 rounded-full text-sm text-gray-600 border border-green-200">
                      ⏰ Stornierung bis 24h vorher
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}
