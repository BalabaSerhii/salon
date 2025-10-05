import React from "react";
import Impressum from "../../components/Impressum";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum - Balaba Studio Massage",
  description:
    "Impressum und rechtliche Informationen für Balaba Studio Massage",
};

export default function ImpressumPage() {
  return <Impressum />;
}
