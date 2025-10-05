import React from "react";
import Datenschutz from "../../components/Datenschutz";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz - Balaba Studio Massage",
  description: "Datenschutzerklärung für Balaba Studio Massage",
};

export default function DatenschutzPage() {
  return <Datenschutz />;
}
