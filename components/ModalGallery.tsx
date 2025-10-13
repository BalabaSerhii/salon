"use client";

import Image from "next/image";
import { useEffect, useCallback, useRef, useState } from "react";

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
  const modalRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);

  // Минимальное расстояние свайпа для активации навигации
  const minSwipeDistance = 50;

  // Обработчик начала касания
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  }, []);

  // Обработчик движения касания
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  }, []);

  // Обработчик окончания касания и определение свайпа
  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;

    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const isLeftSwipe = distanceX > minSwipeDistance;
    const isRightSwipe = distanceX < -minSwipeDistance;

    // Проверяем, что это горизонтальный свайп (не вертикальный)
    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);

    if (isHorizontalSwipe) {
      if (isLeftSwipe) {
        next(); // Свайп влево -> следующее изображение
      } else if (isRightSwipe) {
        prev(); // Свайп вправо -> предыдущее изображение
      }
    }

    // Сбрасываем состояние касания
    setTouchStart(null);
    setTouchEnd(null);
  }, [touchStart, touchEnd, next, prev]);

  // Обработчик клавиатуры
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case "Escape":
          close();
          break;
        case "ArrowLeft":
          prev();
          break;
        case "ArrowRight":
          next();
          break;
      }
    },
    [close, prev, next]
  );

  // Ловушка фокуса внутри модального окна
  const handleTabKey = useCallback((event: KeyboardEvent) => {
    if (event.key === "Tab") {
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements && focusableElements.length > 0) {
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement;

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            event.preventDefault();
          }
        }
      }
    }
  }, []);

  useEffect(() => {
    if (index === null) return;

    // Добавляем обработчики клавиатуры
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keydown", handleTabKey);

    // Блокируем скролл body
    document.body.style.overflow = "hidden";

    // Фокус на модальном окне для доступности
    const modal = document.getElementById("modal-gallery");
    modal?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keydown", handleTabKey);
      document.body.style.overflow = "unset";
    };
  }, [index, handleKeyDown, handleTabKey]);

  if (index === null) return null;

  // Проверка границ массива
  const currentImage = images[index];
  if (!currentImage) {
    console.error("Invalid image index:", index);
    return null;
  }

  const hasPrevious = index > 0;
  const hasNext = index < images.length - 1;

  return (
    <div
      id="modal-gallery"
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery"
      tabIndex={-1}
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 outline-none touch-pan-y"
      // ← ДОБАВЛЕНО: Обработчики жестов для всего модального окна
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Overlay для закрытия по клику */}
      <div 
        className="absolute inset-0" 
        onClick={close} 
        aria-hidden="true" 
      />

      {/* Контент модального окна */}
      <div className="relative z-10 max-w-[95vw] max-h-[95vh] flex items-center justify-center w-full">
        {/* Кнопка закрытия */}
        <button
          onClick={close}
          className="absolute -top-12 right-0 text-white text-2xl p-2 hover:bg-white/20 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black z-20"
          aria-label="Galerie schließen (Close gallery)"
        >
          ✕
        </button>

        {/* Кнопка предыдущего изображения */}
        {hasPrevious && (
          <button
            onClick={prev}
            className="absolute left-2 md:left-4 text-white text-3xl p-3 hover:bg-white/20 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black disabled:opacity-30 disabled:cursor-not-allowed z-20"
            aria-label="Vorheriges Bild (Previous image)"
            disabled={!hasPrevious}
          >
            ‹
          </button>
        )}

        {/* Изображение с информацией и жестами */}
        <figure 
          className="flex flex-col items-center w-full"
          // ← ДОБАВЛЕНО: Дублируем жесты на область изображения для лучшего UX
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="max-w-[90vw] max-h-[80vh] bg-white/5 rounded-lg touch-pan-y">
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              width={1200}
              height={800}
              className="object-contain max-h-[80vh] w-auto rounded-lg select-none"
              sizes="(max-width: 768px) 95vw, (max-width: 1200px) 85vw, 80vw"
              priority
              quality={85}
              unoptimized={true}
              // ← ДОБАВЛЕНО: Предотвращаем стандартное поведение браузера для изображений
              onDragStart={(e) => e.preventDefault()}
            />
          </div>
          <figcaption className="text-white text-sm mt-4 text-center px-4">
            {currentImage.alt} ({index + 1} von {images.length})
          </figcaption>
        </figure>

        {/* Кнопка следующего изображения */}
        {hasNext && (
          <button
            onClick={next}
            className="absolute right-2 md:right-4 text-white text-3xl p-3 hover:bg-white/20 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black disabled:opacity-30 disabled:cursor-not-allowed z-20"
            aria-label="Nächstes Bild (Next image)"
            disabled={!hasNext}
          >
            ›
          </button>
        )}
      </div>

     
    </div>
  );
}