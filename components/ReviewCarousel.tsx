"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { reviewImages } from "@/app/data/reviewImages";
export default function ReviewCarousel() {
  const [emblaRef] = useEmblaCarousel();
  return (
    <>
      <div className="embla" ref={emblaRef}>
        <ul className="embla__container">
          {reviewImages.map((r) => (
            <li className="embla__slide" key={r.key}>
              <Image src={r.src} alt={r.alt} width={200} height={300} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
