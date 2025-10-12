"use client";

import { useState } from "react";
import Image from "next/image";
import ModalGallery from "./ModalGallery";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeftIcon, ChevronRightIcon, } from '@heroicons/react/24/solid';

const images = [
  { src: "/client.jpg", alt: "Client relax" },
  { src: "/office.jpg", alt: "Massageraum in Glauburg" },
  { src: "/officedark.jpg", alt: "Massageraum in Glauburg Entspannung" },
  { src: "/ponorama.jpg", alt: "Allgemeine Ansicht des Wartezimmers Massage" },
  { src: "/presso.jpg", alt: "Lymphdrainage-Hardware-Massage" },
  { src: "/nagelpflege.jpg", alt: "Maniküre-Platz" },
  { src: "/viewstreet.jpg", alt: "Balaba Studio Massag am Nachmittag" },
  { src: "/warteraum.jpg", alt: "Warteraum-Platz" },
];

export default function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const [emblaRef, embla] = useEmblaCarousel({ containScroll: "trimSnaps", dragFree: true });

  const open = (i: number) => setIndex(i);
  const close = () => setIndex(null);
  const prev = () => embla?.scrollPrev();
  const next = () => embla?.scrollNext();

  return (
    <section className="px-4 md:px-16 py-8">
      {/* Мобильный и планшет */}
      <div className="relative md:hidden">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {images.map((img, i) => (
              <button
                key={img.src}
                onClick={() => open(i)}
                className="relative flex-shrink-0 w-64 h-64 rounded-lg overflow-hidden shadow-md"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={256}
                  height={256}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-black bg-opacity-30 text-white px-2 py-1 rounded text-sm">
                    Vergrößern
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Стрелочки */}
        <button
          onClick={prev}
          className="absolute top-1/2 left-2 -translate-y-1/2 bg-black bg-opacity-30 p-2 rounded-full text-white"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-black bg-opacity-30 p-2 rounded-full text-white"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Десктоп */}
      <div className="hidden md:grid grid-cols-3 lg:grid-cols-5 gap-4">
        {images.map((img, i) => (
          <button
            key={img.src}
            onClick={() => open(i)}
            className="relative w-full aspect-square overflow-hidden rounded-lg shadow-md"
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={400}
              height={400}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-black bg-opacity-30 text-white px-2 py-1 rounded text-sm">
                Vergrößern
              </span>
            </div>
          </button>
        ))}
      </div>

      <ModalGallery index={index} images={images} close={close} next={next} prev={prev} />
    </section>
  );
}
