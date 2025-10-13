export interface Service {
  id: string;
  name: string;
  duration?: string;
  price: string;
  description?: string;
}

export interface PriceCategory {
  id: string;
  title: string;
  description?: string;
  services: Service[];
}

export const priceCategories: PriceCategory[] = [
  {
    id: "kombipakete",
    title: "Kombipakete (Super-Mix)",
    description: "Kombinierte Behandlungen für maximale Entspannung und Wirkung",
    services: [
      {
        id: "kombi-1",
        name: "Klassische Rücken- und Nackenmassage + Pressotherapie für Beine, Bauch und Arme",
        duration: "30 + 45 Min",
        price: "60 €",
      },
      {
        id: "kombi-2",
        name: "Klassische Massage (Rücken, Nacken, Arme) + Bein-Pressotherapie",
        duration: "25 Min",
        price: "55 €",
      },
      {
        id: "kombi-3",
        name: "Klassische Ganzkörpermassage + Pressotherapie für Beine, Bauch und Arme",
        duration: "60 + 45 Min",
        price: "90 €",
      },
      {
        id: "kombi-4",
        name: "Aroma-Ganzkörpermassage + Pressotherapie für Beine, Bauch und Arme",
        duration: "60 + 45 Min",
        price: "95 €",
      },
    ],
  },
  {
    id: "einzelzonen",
    title: "Massage Einzelner Zonen",
    description: "Gezielte Behandlungen für spezifische Körperbereiche",
    services: [
      { id: "zone-1", name: "Rücken & Nacken", duration: "30 Min", price: "30 €" },
      { id: "zone-2", name: "Arme & Nacken", duration: "30 Min", price: "30 €" },
      { id: "zone-3", name: "Rücken, Nacken & Arme", duration: "30 Min", price: "30 €" },
      { id: "zone-4", name: "Beine ohne Füße", duration: "30 Min", price: "30 €" },
      { id: "zone-5", name: "Kopf", duration: "20 Min", price: "20 €" },
      { id: "zone-6", name: "Gesicht", duration: "20 Min", price: "30 €" },
      { id: "zone-7", name: "Kopf & Gesicht", duration: "30 Min", price: "40 €" },
    ],
  },
  {
    id: "spezialmassagen",
    title: "Spezialmassagen",
    description: "Besondere Massagearten für individuelle Bedürfnisse",
    services: [
      {
        id: "special-1",
        name: "Anti-Cellulite-Massage Beine & Gesäß",
        duration: "40 Min",
        price: "50 €",
      },
      { id: "special-2", name: "Ganzkörpermassage", duration: "60 Min", price: "80 €" },
      { id: "special-3", name: "Ganzkörpermassage", duration: "90 Min", price: "99 €" },
      {
        id: "special-4",
        name: "Aroma-Entspannungsmassage (Ganzkörper)",
        duration: "45 Min",
        price: "50 €",
      },
      {
        id: "special-5",
        name: "Aroma-Entspannungsmassage (Ganzkörper)",
        duration: "60 Min",
        price: "65 €",
      },
      {
        id: "special-6",
        name: "Aroma-Entspannungsmassage (Ganzkörper)",
        duration: "90 Min",
        price: "85 €",
      },
      {
        id: "special-7",
        name: "Klassische Ganzkörpermassage",
        duration: "40 Min",
        price: "45 €",
      },
      {
        id: "special-8",
        name: "Klassische Ganzkörpermassage",
        duration: "60 Min",
        price: "60 €",
      },
      {
        id: "special-9",
        name: "Klassische Ganzkörpermassage",
        duration: "90 Min",
        price: "90 €",
      },
    ],
  },
  {
    id: "pressotherapie",
    title: "Pressotherapie (Apparative Lymphdrainage)",
    description: "Moderne Gerätetherapie für optimale Entwässerung und Straffung",
    services: [
      { id: "presso-1", name: "Arme, Bauch, Beine", duration: "45 Min", price: "35 €" },
      { id: "presso-2", name: "Bauch, Beine", duration: "30 Min", price: "25 €" },
      { id: "presso-3", name: "Beine", duration: "25 Min", price: "20 €" },
      { id: "presso-4", name: "Probebehandlung", price: "10 €" },
    ],
  },
];

// SEO метаданные
export const priceListMetadata = {
  title: "Preisliste - Professionelle Massagen in Glauburg | BalabaStudio",
  description: "Übersicht unserer Preise für Massagen, Pressotherapie und Spezialbehandlungen. Transparente Preise für klassische Massagen, Aroma-Massagen und Lymphdrainage.",
  keywords: "Massage Preise, Preisliste, Glauburg Massage, Pressotherapie Kosten, Aroma-Massage Preise",
};