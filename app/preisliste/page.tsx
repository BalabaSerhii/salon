"use client";

import AppointmentForm from "@/components/AppointmentForm";
import { useState } from "react";

interface Service {
  name: string;
  duration?: string;
  price: string;
}

interface Category {
  title: string;
  color: "green" | "blue" | "yellow" | "pink";
  services: Service[];
}

const categories: Category[] = [
  {
    title: "Kombipakete (Super-Mix)",
    color: "green",
    services: [
      {
        name: "Klassische Rücken- und Nackenmassage + Pressotherapie für Beine, Bauch und Arme",
        duration: "30 + 45 Min",
        price: "60 €",
      },
      {
        name: "Klassische Massage (Rücken, Nacken, Arme) + Bein-Pressotherapie",
        duration: "25 Min",
        price: "55 €",
      },
      {
        name: "Klassische Ganzkörpermassage + Pressotherapie für Beine, Bauch und Arme",
        duration: "60 + 45 Min",
        price: "90 €",
      },
      {
        name: "Aroma-Ganzkörpermassage + Pressotherapie für Beine, Bauch und Arme",
        duration: "60 + 45 Min",
        price: "95 €",
      },
    ],
  },
  {
    title: "Massage Einzelner Zonen",
    color: "blue",
    services: [
      { name: "Rücken & Nacken", duration: "30 Min", price: "30 €" },
      { name: "Arme & Nacken", duration: "30 Min", price: "30 €" },
      { name: "Rücken, Nacken & Arme", duration: "30 Min", price: "30 €" },
      { name: "Beine ohne Füße", duration: "30 Min", price: "30 €" },
      { name: "Kopf", duration: "20 Min", price: "20 €" },
      { name: "Gesicht", duration: "20 Min", price: "30 €" },
      { name: "Kopf & Gesicht", duration: "30 Min", price: "40 €" },
    ],
  },
  {
    title: "Spezialmassagen",
    color: "yellow",
    services: [
      {
        name: "Anti-Cellulite-Massage Beine & Gesäß",
        duration: "40 Min",
        price: "50 €",
      },
      { name: "Ganzkörpermassage", duration: "60 Min", price: "80 €" },
      { name: "Ganzkörpermassage", duration: "90 Min", price: "99 €" },
      {
        name: "Aroma-Entspannungsmassage (Ganzkörper)",
        duration: "45 Min",
        price: "50 €",
      },
      {
        name: "Aroma-Entspannungsmassage (Ganzkörper)",
        duration: "60 Min",
        price: "65 €",
      },
      {
        name: "Aroma-Entspannungsmassage (Ganzkörper)",
        duration: "90 Min",
        price: "85 €",
      },
      {
        name: "Klassische Ganzkörpermassage",
        duration: "40 Min",
        price: "45 €",
      },
      {
        name: "Klassische Ganzkörpermassage",
        duration: "60 Min",
        price: "60 €",
      },
      {
        name: "Klassische Ganzkörpermassage",
        duration: "90 Min",
        price: "90 €",
      },
    ],
  },
  {
    title: "Pressotherapie (Apparative Lymphdrainage-Massage)",
    color: "pink",
    services: [
      { name: "Arme, Bauch, Beine", duration: "45 Min", price: "35 €" },
      { name: "Bauch, Beine", duration: "30 Min", price: "25 €" },
      { name: "Beine", duration: "25 Min", price: "20 €" },
      { name: "Probebehandlung", price: "10 €" },
    ],
  },
];

const getColorClasses = (color: string, type: "bg" | "border" | "text" = "bg") => {
  const baseClasses = {
    green: {
      bg: "bg-green-500 hover:bg-green-600 focus:bg-green-600",
      border: "border-green-500",
      text: "text-green-600"
    },
    blue: {
      bg: "bg-blue-500 hover:bg-blue-600 focus:bg-blue-600", 
      border: "border-blue-500",
      text: "text-blue-600"
    },
    yellow: {
      bg: "bg-yellow-500 hover:bg-yellow-600 focus:bg-yellow-600",
      border: "border-yellow-500", 
      text: "text-yellow-600"
    },
    pink: {
      bg: "bg-pink-500 hover:bg-pink-600 focus:bg-pink-600",
      border: "border-pink-500",
      text: "text-pink-600"
    }
  };

  return baseClasses[color as keyof typeof baseClasses]?.[type] || baseClasses.green[type];
};

export default function PriceList() {
  const [loadingService, setLoadingService] = useState<string | null>(null);
  const whatsappNumber = "4915124908000";

  const getWhatsappLink = (serviceName: string, duration?: string) => {
    const serviceText = duration 
      ? `${serviceName} (${duration})`
      : serviceName;
    
    const text = encodeURIComponent(
      `Hallo! Ich möchte einen Termin für "${serviceText}" buchen. Können Sie mir bitte verfügbare Termine mitteilen?`
    );
    return `https://wa.me/${whatsappNumber}?text=${text}`;
  };

  const handleBookingClick = (serviceName: string, duration?: string) => {
    setLoadingService(serviceName);
    // Сброс состояния загрузки через 2 секунды на случай, если переход не произошел
    setTimeout(() => setLoadingService(null), 2000);
  };

  return (
    <section className="container mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">
        Unsere Preise
      </h1>

      {categories.map((category) => (
        <div key={category.title} className="mb-12">
          <h2 className={`text-xl md:text-2xl font-semibold mb-6 border-l-4 pl-4 ${getColorClasses(category.color, "border")} ${getColorClasses(category.color, "text")}`}>
            {category.title}
          </h2>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.services.map((service, index) => (
              <li
                key={`${service.name}-${service.duration}-${index}`}
                className="flex flex-col justify-between p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300 bg-white group"
              >
                <div className="flex-grow">
                  <p className="font-medium text-gray-800 group-hover:text-gray-900 transition-colors leading-relaxed">
                    {service.name}
                  </p>
                  {service.duration && (
                    <p className="text-sm text-gray-600 mt-2 font-medium flex items-center">
                      <span className="mr-2">⏱️</span>
                      {service.duration}
                    </p>
                  )}
                </div>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                  <span className="font-bold text-lg text-gray-900">
                    {service.price}
                  </span>
                  <a
                    href={getWhatsappLink(service.name, service.duration)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleBookingClick(service.name, service.duration)}
                    className={`${getColorClasses(category.color, "bg")} text-white py-2 px-4 rounded-lg transition-all duration-300 text-sm font-medium shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50 min-w-[120px] text-center flex items-center justify-center`}
                  >
                    {loadingService === service.name ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Wird geladen...
                      </>
                    ) : (
                      "Termin buchen"
                    )}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Важная информация */}
      <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="font-semibold text-lg mb-4 text-gray-800 flex items-center">
          <span className="mr-2">ℹ️</span>
          Wichtige Informationen:
        </h3>
        <ul className="text-sm text-gray-600 space-y-2">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Alle Preise in Euro</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Termine nur nach vorheriger Vereinbarung</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Professionelle Massage in Glauburg-Stockheim</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Privatzahlung - keine Krankenkassenabrechnung</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Hermstrasse 37, 63695 Glauburg-Stockheim</span>
          </li>
        </ul>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            📞 Telefon:{" "}
            <a href="tel:+4915124908000" className="text-blue-600 hover:text-blue-800 font-medium">
              +49 1512 4908000
            </a>
          </p>
          <p className="text-sm text-gray-600 mt-1">
            🌐 Website:{" "}
            <a href="https://www.balabastudio.de" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium">
              www.BalabaStudio.de
            </a>
          </p>
        </div>
      </div>

      {/* SEO текст */}
      <p className="mt-8 text-gray-600 text-sm text-center leading-relaxed">
        Professionelle Massage in Glauburg-Stockheim. Wir bieten klassische Massagen, 
        Aroma-Entspannungsmassagen, Anti-Cellulite-Behandlungen und Pressotherapie 
        für Arme, Beine, Rücken, Nacken und Gesicht. Ideal zur Entspannung nach 
        einem langen Arbeitstag oder zur aktiven Regeneration. Jetzt Termin buchen!
      </p>
    </section>
  );
}