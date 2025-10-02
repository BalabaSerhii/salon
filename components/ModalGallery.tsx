"use client";

import Image from "next/image";

interface ModalGalleryProps {
  index: number | null;
  images: { src: string; alt: string }[];
  close: () => void;
  next: () => void;
  prev: () => void;
}

export default function ModalGallery({
  index,
  images,
  close,
  next,
  prev,
}: ModalGalleryProps) {
  if (index === null) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      {/* Кнопки закрытия и навигации */}
      <button
        onClick={close}
        className="absolute top-4 right-4 text-white text-2xl"
        aria-label="Close"
      >
        ✕
      </button>
      <button
        onClick={prev}
        className="absolute left-4 text-white text-3xl"
        aria-label="Previous"
      >
        ‹
      </button>

      {/* Изображение */}
      <div className="max-w-[90vw] max-h-[90vh]">
        <Image
          src={images[index].src}
          alt={images[index].alt}
          width={1200}
          height={900}
          className="object-contain max-h-[90vh]"
        />
      </div>

      <button
        onClick={next}
        className="absolute right-4 text-white text-3xl"
        aria-label="Next"
      >
        ›
      </button>
    </div>
  );
}
