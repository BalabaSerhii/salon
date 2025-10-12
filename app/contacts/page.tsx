"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  appointmentSchema,
  AppointmentFormValues,
} from "../lib/schemas/appointment";
import { toast } from "sonner";
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaParking,
  FaBus,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import MapSection from "@/components/MapSection";

type Service = { id: string; name: string; durationMinutes: number };

const services: Service[] = [
  {
    id: "1",
    name: "Klassische Rücken- und Nackenmassage",
    durationMinutes: 30,
  },
  { id: "2", name: "Pressotherapie Beine", durationMinutes: 25 },
  { id: "3", name: "Pressotherapie Bauch, Beine", durationMinutes: 30 },
  { id: "4", name: "Pressotherapie Arme, Bauch, Beine", durationMinutes: 45 },
  {
    id: "5",
    name: "Anti-Cellulite-Massage Beine & Gesäß",
    durationMinutes: 40,
  },
  { id: "6", name: "Ganzkörpermassage", durationMinutes: 60 },
  { id: "7", name: "Ganzkörpermassage", durationMinutes: 90 },
  { id: "8", name: "Aroma-Entspannungsmassage", durationMinutes: 45 },
  { id: "9", name: "Aroma-Entspannungsmassage", durationMinutes: 60 },
  { id: "10", name: "Aroma-Entspannungsmassage", durationMinutes: 90 },
  { id: "11", name: "Massage Einzelner Zonen", durationMinutes: 30 },
  { id: "12", name: "Kombipaket Super-Mix", durationMinutes: 75 },
];

// Интерфейс для ответа сервера
interface ApiResponse {
  message?: string;
  previewUrl?: string;
}

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<"form" | "contacts">("form");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: { whatsapp: false },
  });

  const selectedServiceId = watch("serviceId");
  // Убрали неиспользуемую переменную selectedService

  async function onSubmit(data: AppointmentFormValues) {
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const contentType = res.headers.get("content-type") || "";
      let body: ApiResponse | string;

      if (contentType.includes("application/json")) {
        body = (await res.json()) as ApiResponse;
      } else {
        body = await res.text();
        throw new Error(
          "Server returned non-JSON response: " + body.slice(0, 300)
        );
      }

      if (!res.ok)
        throw new Error((body as ApiResponse)?.message || "Server error");

      if ((body as ApiResponse).previewUrl) {
        toast.success("Terminanfrage erfolgreich gesendet!");
      } else {
        toast.success("Terminanfrage erfolgreich gesendet!");
      }
      reset();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("Submit error:", err);
      toast.error("Fehler beim Senden: " + msg);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-4 sm:py-8">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
            Kontakt & Terminvereinbarung
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Vereinbaren Sie Ihren Massagetermin im Balaba Studio - Wir freuen
            uns darauf, Ihnen zu mehr Entspannung zu verhelfen
          </p>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex justify-center mb-6">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center gap-2 bg-white px-4 py-3 rounded-lg shadow-sm border font-medium text-gray-700"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            {isMobileMenuOpen ? "Menü schließen" : "Schnellnavigation"}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Mobile Tab Navigation */}
            <div
              className={`lg:hidden ${
                isMobileMenuOpen ? "block" : "hidden"
              } mb-6`}
            >
              <div className="bg-white rounded-lg p-1 shadow-sm border">
                <button
                  onClick={() => {
                    setActiveTab("form");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full px-4 py-3 rounded-md font-medium transition-all text-sm ${
                    activeTab === "form"
                      ? "bg-green-500 text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Termin anfragen
                </button>
                <button
                  onClick={() => {
                    setActiveTab("contacts");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full px-4 py-3 rounded-md font-medium transition-all text-sm ${
                    activeTab === "contacts"
                      ? "bg-green-500 text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Kontakt & Anfahrt
                </button>
              </div>
            </div>

            {/* Desktop Tab Navigation */}
            <div className="hidden lg:flex justify-center mb-8">
              <div className="bg-white rounded-lg p-1 shadow-sm border">
                <button
                  onClick={() => setActiveTab("form")}
                  className={`px-6 py-3 rounded-md font-medium transition-all ${
                    activeTab === "form"
                      ? "bg-green-500 text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Termin anfragen
                </button>
                <button
                  onClick={() => setActiveTab("contacts")}
                  className={`px-6 py-3 rounded-md font-medium transition-all ${
                    activeTab === "contacts"
                      ? "bg-green-500 text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Kontakt & Anfahrt
                </button>
              </div>
            </div>

            {activeTab === "form" ? (
              /* Appointment Form - Mobile Optimized */
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  Termin anfragen
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
                  Füllen Sie das Formular aus und wir melden uns innerhalb von
                  24 Stunden bei Ihnen
                </p>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4 sm:space-y-6"
                >
                  <div className="grid grid-cols-1 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gewünschte Behandlung *
                      </label>
                      <select
                        {...register("serviceId")}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      >
                        <option value="">Bitte wählen</option>
                        {services.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name} — {s.durationMinutes} min
                          </option>
                        ))}
                      </select>
                      {errors.serviceId && (
                        <p className="text-red-600 text-xs sm:text-sm mt-1">
                          {errors.serviceId.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Dauer (Minuten) *
                      </label>
                      <select
                        {...register("duration")}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      >
                        <option value="">Bitte wählen</option>
                        <option value="30">30 Minuten</option>
                        <option value="45">45 Minuten</option>
                        <option value="60">60 Minuten</option>
                        <option value="75">75 Minuten</option>
                        <option value="90">90 Minuten</option>
                      </select>
                      {errors.duration && (
                        <p className="text-red-600 text-xs sm:text-sm mt-1">
                          {errors.duration.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bevorzugtes Datum & Uhrzeit *
                    </label>
                    <input
                      {...register("datetime")}
                      type="datetime-local"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    />
                    {errors.datetime && (
                      <p className="text-red-600 text-xs sm:text-sm mt-1">
                        {errors.datetime.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ihr Name *
                      </label>
                      <input
                        {...register("name")}
                        type="text"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        placeholder="Vor- und Nachname"
                      />
                      {errors.name && (
                        <p className="text-red-600 text-xs sm:text-sm mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefonnummer *
                      </label>
                      <input
                        {...register("phone")}
                        type="tel"
                        placeholder="+49 151 1234567"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      />
                      {errors.phone && (
                        <p className="text-red-600 text-xs sm:text-sm mt-1">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      E-Mail Adresse
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="ihre@email.de"
                    />
                    {errors.email && (
                      <p className="text-red-600 text-xs sm:text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      id="whatsapp"
                      type="checkbox"
                      {...register("whatsapp")}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <label htmlFor="whatsapp" className="text-sm text-gray-700">
                      Ich bevorzuge Kommunikation per WhatsApp
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Besondere Wünsche oder Anmerkungen
                    </label>
                    <textarea
                      {...register("comment")}
                      rows={3}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                      placeholder="Haben Sie besondere Wünsche oder gesundheitliche Hinweise, die wir beachten sollten?"
                    />
                    {errors.comment && (
                      <p className="text-red-600 text-xs sm:text-sm mt-1">
                        {errors.comment.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 focus:ring-4 focus:ring-green-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm sm:text-base"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2 sm:mr-3"></div>
                        Wird gesendet...
                      </>
                    ) : (
                      "Termin anfragen"
                    )}
                  </button>

                  <p className="text-center text-xs sm:text-sm text-gray-500">
                    Alternativ:{" "}
                    <a
                      href="https://wa.me/4915124908000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-700 font-medium underline"
                    >
                      Direkt per WhatsApp buchen
                    </a>
                  </p>
                </form>
              </div>
            ) : (
              /* Contact Information - Mobile Optimized */
              <div className="space-y-4 sm:space-y-6">
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
                    <FaMapMarkerAlt className="text-green-600 mr-3 text-lg sm:text-xl" />
                    Standort & Kontakt
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3">
                        Unsere Adresse
                      </h3>
                      <address className="not-italic text-gray-600 space-y-2 text-sm sm:text-base">
                        <p className="flex items-start">
                          <FaMapMarkerAlt className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                          <span>
                            Hermstrasse 37
                            <br />
                            63695 Glauburg-Stockheim
                          </span>
                        </p>
                        <a
                          href="https://www.google.com/maps/place/Balaba+Massage+Studio/@50.3249578,9.0123274,21z/data=!4m6!3m5!1s0x47bd1ff68239fc3d:0xacd5e4c867c97da6!8m2!3d50.3250513!4d9.0123212!16s%2Fg%2F11wxg0z523?entry=ttu&g_ep=EgoyMDI1MTAwOC4wIKXMDSoASAFQAw%3D%3DgoyMDI1MTAwOC4wIKXMDSoASAFQAw%3D%3D"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-green-600 hover:text-green-700 font-medium transition-colors mt-2 text-sm sm:text-base"
                        >
                          Auf Google Maps anzeigen →
                        </a>
                      </address>
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3">
                        Kontakt
                      </h3>
                      <div className="space-y-3">
                        <a
                          href="tel:+4915124908000"
                          className="flex items-center text-gray-600 hover:text-green-600 transition-colors group text-sm sm:text-base"
                        >
                          <FaPhone className="text-green-500 mr-3 group-hover:scale-110 transition-transform flex-shrink-0" />
                          <span className="font-medium">+49 151 24908000</span>
                        </a>
                        <a
                          href="mailto:balabamassage@gmail.com"
                          className="flex items-center text-gray-600 hover:text-green-600 transition-colors group text-sm sm:text-base"
                        >
                          <FaEnvelope className="text-green-500 mr-3 group-hover:scale-110 transition-transform flex-shrink-0" />
                          <span className="font-medium">
                            balabamassage@gmail.com
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3">
                      Öffnungszeiten
                    </h3>
                    <div className="flex items-start text-gray-600 text-sm sm:text-base">
                      <FaClock className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Mo - Fr: 9:00 - 20:00 Uhr</p>
                        <p className="font-medium">Sa: 10:00 - 18:00 Uhr</p>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">
                          Termine nach Vereinbarung
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
                    <FaBus className="text-blue-600 mr-3 text-lg sm:text-xl" />
                    Anfahrt & Parken
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2 flex items-center text-sm sm:text-base">
                        <FaBus className="text-blue-500 mr-2 flex-shrink-0" />
                        Öffentliche Verkehrsmittel
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        RB34, Bus: 374, FB-20, FB-21, FB-25, FB-45
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2 flex items-center text-sm sm:text-base">
                        <FaParking className="text-green-500 mr-2 flex-shrink-0" />
                        Parkplätze
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        3 kostenlose Parkplätze direkt vor dem Studio verfügbar
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Hidden on mobile when menu is closed */}
          <div
            className={`space-y-4 sm:space-y-6 ${
              isMobileMenuOpen ? "block" : "hidden lg:block"
            }`}
          >
            {/* Contact Card */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
                Schnellkontakt
              </h3>
              <div className="space-y-2 sm:space-y-3">
                <a
                  href="tel:+4915124908000"
                  className="flex items-center justify-center w-full bg-green-500 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-semibold hover:bg-green-600 transition-colors text-sm sm:text-base"
                >
                  <FaPhone className="mr-2" />
                  Anrufen
                </a>
                <a
                  href="https://wa.me/4915124908000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full bg-green-500 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-semibold hover:bg-green-600 transition-colors text-sm sm:text-base"
                >
                  <FaWhatsapp className="mr-2" />
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
                Folgen Sie uns
              </h3>
              <div className="flex justify-center gap-3 sm:gap-4">
                <a
                  href="https://wa.me/4915124908000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white p-2 sm:p-3 rounded-full hover:bg-green-600 transition-colors transform hover:scale-110"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp size={18} className="sm:w-5 sm:h-5" />
                </a>
                <a
                  href="https://instagram.com/balabastudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-pink-500 text-white p-2 sm:p-3 rounded-full hover:bg-pink-600 transition-colors transform hover:scale-110"
                  aria-label="Instagram"
                >
                  <FaInstagram size={18} className="sm:w-5 sm:h-5" />
                </a>
                <a
                  href="https://facebook.com/balabastudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white p-2 sm:p-3 rounded-full hover:bg-blue-700 transition-colors transform hover:scale-110"
                  aria-label="Facebook"
                >
                  <FaFacebook size={18} className="sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
              <MapSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
