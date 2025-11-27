import type { Metadata } from "next";
import ClientAbout from "./ClientAbout";

export const metadata: Metadata = {
  title: "Über Uns - Balaba Studio Massage Glauburg",
  description:
    "Erfahren Sie mehr über Balaba Studio - professionelle Massage und Entspannung in Glauburg-Stockheim. Unser Team und Philosophie.",
  alternates: {
    canonical: "/about",
  },
};

export default function About() {
  return <ClientAbout />;
}
