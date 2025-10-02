"use client";

import { useState } from "react";
import Image from "next/image";
import ModalGallery from "./ModalGallery";

const images = [
  { src: "/client.jpg", alt: "Client relax" },
  { src: "/balabateam.jpg", alt: "Balaba Team" },
  { src: "/dark.jpg", alt: "Balaba Studio draußen am Abend" },
  { src: "/office.jpg", alt: "Massageraum in Glauburg" },
  { src: "/officedark.jpg", alt: "Massageraum in Glauburg Entspannung" },
  { src: "/ponorama.jpg", alt: "Allgemeine Ansicht des Wartezimmers Massage" },
  { src: "/press.jpg", alt: "Lymphdrainage-Hardware-Massage" },
  { src: "/presso.jpg", alt: "Lymphdrainage-Hardware-Massage" },
  { src: "/nagelpflege.jpg", alt: "Maniküre-Platz" },
  { src: "/viewstreet.jpg", alt: "Balaba Studio Massag am Nachmittag" },
  { src: "/warteraum.jpg", alt: "Warteraum-Platz" },
];
export default function Gallery() {
  const [index, setIndex] = useState<number | null>(null);

  const open = (i: number) => setIndex(i);
  const close = () => setIndex(null);
  const prev = () =>
    setIndex((i) =>
      i === null ? null : (i - 1 + images.length) % images.length
    );
  const next = () =>
    setIndex((i) => (i === null ? null : (i + 1) % images.length));

  return (
    <section>
      <div>
        {images.map((img, i) => (
          <button
            key={img.src}
            onClick={() => open(i)}
            className="block w-full"
          >
            {" "}
            <Image src={img.src} alt={img.alt} width={80} height={600} />
          </button>
        ))}
      </div>
      <ModalGallery
        index={index}
        images={images}
        close={close}
        next={next}
        prev={prev}
      />
    </section>
  );
}
