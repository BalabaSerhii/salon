"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import ModalGallery from "./ModalGallery";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

interface GalleryImage {
  src: string;
  alt: string;
}

const images: GalleryImage[] = [
  { src: "/client.jpg", alt: "Entspannter Kunde während der Massage" },
  {
    src: "/office.jpg",
    alt: "Heller Massageraum in Glauburg mit moderner Einrichtung",
  },
  {
    src: "/officedark.jpg",
    alt: "Gemütlicher Massageraum in Glauburg bei gedimmtem Licht",
  },
  {
    src: "/ponorama.jpg",
    alt: "Weitwinkelansicht des Wartezimmers mit bequemen Sitzgelegenheiten",
  },
  {
    src: "/presso.jpg",
    alt: "Professionelle Lymphdrainage-Geräte für medizinische Behandlungen",
  },
  {
    src: "/nagelpflege.jpg",
    alt: "Sauberer Maniküre-Arbeitsplatz mit professionellen Werkzeugen",
  },
  {
    src: "/viewstreet.jpg",
    alt: "Balaba Studio Massage am sonnigen Nachmittag in Glauburg",
  },
  {
    src: "/warteraum.jpg",
    alt: "Einladender Warteraum mit angenehmer Atmosphäre",
  },
];

export default function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const [emblaRef, embla] = useEmblaCarousel({
    containScroll: "trimSnaps",
    dragFree: true,
    align: "start",
    loop: false,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState(0);

  // Обновление состояния навигации карусели
  const updateScrollState = useCallback(() => {
    if (embla) {
      setCanScrollPrev(embla.canScrollPrev());
      setCanScrollNext(embla.canScrollNext());
      setSelectedSlide(embla.selectedScrollSnap());
    }
  }, [embla]);

  useEffect(() => {
    if (embla) {
      embla.on("select", updateScrollState);
      embla.on("init", updateScrollState);
      updateScrollState();
    }
  }, [embla, updateScrollState]);

  const open = useCallback((i: number) => setIndex(i), []);
  const close = useCallback(() => setIndex(null), []);

  const prev = useCallback(() => {
    embla?.scrollPrev();
  }, [embla]);

  const next = useCallback(() => {
    embla?.scrollNext();
  }, [embla]);

  // Навигация по модальной галерее
  const modalNext = useCallback(() => {
    if (index !== null && index < images.length - 1) {
      setIndex(index + 1);
    }
  }, [index]);

  const modalPrev = useCallback(() => {
    if (index !== null && index > 0) {
      setIndex(index - 1);
    }
  }, [index]);

  // Обработка ошибок загрузки изображений
  const handleImageError = useCallback(
    (event: React.SyntheticEvent<HTMLImageElement>) => {
      const target = event.target as HTMLImageElement;
      target.style.display = "none";
      console.error(`Failed to load image: ${target.src}`);
    },
    []
  );

  return (
    <section
      aria-labelledby="gallery-heading"
      className="px-4 md:px-16 py-12 bg-white"
    >
  

      {/* Мобильный и планшет */}
      <div
        className="relative md:hidden"
        role="region"
        aria-label="Bildergalerie"
      >
        <div className="overflow-hidden" ref={emblaRef}>
          <div
            className="flex gap-4 touch-pan-y"
            role="list"
            aria-label="Galeriebilder"
          >
            {images.map((img, i) => (
              <div
                key={img.src}
                className="relative flex-shrink-0 w-64 h-64 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
                role="listitem"
              >
                <button
                  onClick={() => open(i)}
                  className="w-full h-full focus:outline-none focus:ring-2 focus:ring-[#5e723a] focus:ring-offset-2 rounded-lg"
                  aria-label={`${img.alt} vergrößern`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={256}
                    height={256}
                    className="w-full h-full object-cover object-center transition-opacity duration-300"
                    onError={handleImageError}
                    loading={i < 3 ? "eager" : "lazy"}
                    priority={i < 2}
                    unoptimized={true} 
                  />
                  <div className="absolute inset-0 flex items-center justify-center  bg-opacity-50 hover:bg-opacity-20 transition-all duration-300">
                    <span className="bg-[#f9f8f5] bg-opacity-90 text-[#5e723a] px-3 py-2 rounded-lg text-sm font-medium shadow-md">
                      Vergrößern
                    </span>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Стрелочки навигации */}
        <button
          onClick={prev}
          disabled={!canScrollPrev}
          className={`absolute top-1/2 left-2 -translate-y-1/2 bg-[#f9f8f5] bg-opacity-90 p-3 rounded-full text-[#5e723a] shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#5e723a] ${
            !canScrollPrev
              ? "opacity-30 cursor-not-allowed"
              : "hover:bg-opacity-100 hover:scale-110"
          }`}
          aria-label="Vorheriges Bild"
          aria-disabled={!canScrollPrev}
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <button
          onClick={next}
          disabled={!canScrollNext}
          className={`absolute top-1/2 right-2 -translate-y-1/2 bg-[#f9f8f5] bg-opacity-90 p-3 rounded-full text-[#5e723a] shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#5e723a] ${
            !canScrollNext
              ? "opacity-30 cursor-not-allowed"
              : "hover:bg-opacity-100 hover:scale-110"
          }`}
          aria-label="Nächstes Bild"
          aria-disabled={!canScrollNext}
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>

        {/* Индикатор прогресса */}
        <div
          className="flex justify-center mt-4 space-x-2"
          role="status"
          aria-live="polite"
        >
          <span className="text-sm text-gray-600">
            Bild {selectedSlide + 1} von {images.length}
          </span>
        </div>
      </div>

      {/* Десктоп */}
      <div
        className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6"
        role="grid"
        aria-label="Galeriebilder für Desktop"
      >
        {images.map((img, i) => (
          <figure
            key={img.src}
            className="relative w-full aspect-square overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
            role="gridcell"
          >
            <button
              onClick={() => open(i)}
              className="w-full h-full focus:outline-none focus:ring-2 focus:ring-[#5e723a] focus:ring-offset-2 rounded-xl"
              aria-label={`${img.alt} vergrößern`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={400}
                height={400}
                className="w-full h-full object-cover object-center transition-opacity duration-300"
                onError={handleImageError}
                loading={i < 4 ? "eager" : "lazy"}
                priority={i < 3}
                sizes="(max-width: 768px) 256px, (max-width: 1024px) 400px, 300px"
                unoptimized={true} // ← ФИКС: Добавлено для отображения изображений
              />
              <div className="absolute inset-0 flex items-center justify-center bg-opacity-0 hover:bg-opacity-20 transition-all duration-300">
                <span className="bg-[#f9f8f5] bg-opacity-90 text-[#5e723a] px-4 py-2 rounded-lg font-medium shadow-md transform translate-y-4 opacity-0 hover:translate-y-0 hover:opacity-100 transition-all duration-300">
                  Vergrößern
                </span>
              </div>
            </button>
            <figcaption className="sr-only">{img.alt}</figcaption>
          </figure>
        ))}
      </div>

      <ModalGallery
        index={index}
        images={images}
        close={close}
        next={modalNext}
        prev={modalPrev}
      />
    </section>
  );
}