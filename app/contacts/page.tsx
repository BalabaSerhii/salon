"use client";
import { useState, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  appointmentSchema,
  AppointmentFormValues,
} from "../lib/schemas/appointment";
import ToastNotification from "@/components/ToastNotification";
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
  FaChevronDown,
} from "react-icons/fa";
import MapSection from "@/components/MapSection";
interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  firstTimeOffer?: string;
}
interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  services: Service[];
}
interface TimeSlot {
  time: string;
  display: string;
  available: boolean;
}
interface DateSelection {
  date: string;
  display: string;
}
const serviceCategories: ServiceCategory[] = [
  {
    id: "lymphdrainage",
    name: "Apparative Lymphdrainage-Massage",
    description: "Apparative Lymphdrainage-Massage (Pressotherapie)",
    services: [
      {
        id: "lymph-1",
        name: "Arme, Bauch und Beine",
        description: "Apparative Lymphdrainage für Arme, Bauch und Beine",
        price: "35 Euro",
        duration: "45 Minuten",
        firstTimeOffer: "Erstmal nur 10 Euro",
      },
      {
        id: "lymph-2",
        name: "Beine und Bauch",
        description: "Apparative Lymphdrainage für Beine und Bauch",
        price: "25 Euro",
        duration: "30 Minuten",
        firstTimeOffer: "Erstmal nur 10 Euro",
      },
      {
        id: "lymph-3",
        name: "Beine",
        description: "Apparative Lymphdrainage für Beine",
        price: "20 Euro",
        duration: "25 Minuten",
        firstTimeOffer: "Erstmal nur 10 Euro",
      },
    ],
  },
  {
    id: "aroma-massage",
    name: "Entspannende Ganzkörpermassage",
    description: "Entspannende Ganzkörpermassage mit Aromaölen",
    services: [
      {
        id: "aroma-1",
        name: "Ganzkörpermassage 45 Minuten",
        description: "Entspannende Ganzkörpermassage mit Aromaölen",
        price: "50 Euro",
        duration: "45 Minuten",
      },
      {
        id: "aroma-2",
        name: "Ganzkörpermassage 60 Minuten",
        description: "Entspannende Ganzkörpermassage mit Aromaölen",
        price: "65 Euro",
        duration: "60 Minuten",
      },
      {
        id: "aroma-3",
        name: "Ganzkörpermassage 90 Minuten",
        description: "Entspannende Ganzkörpermassage mit Aromaölen",
        price: "90 Euro",
        duration: "90 Minuten",
      },
    ],
  },
  {
    id: "super-mix",
    name: "Super-Mix Pakete",
    description: "Super-Mix für das beste Ergebnis",
    services: [
      {
        id: "mix-1",
        name: "Klassische Rücken- und Nackenmassage + Pressotherapie",
        description:
          "Klassische Rücken- und Nackenmassage 30 Minuten + Pressotherapie für Beine, Bauch und Arme (45 Minuten)",
        price: "60 Euro",
        duration: "75 Minuten",
      },
      {
        id: "mix-2",
        name: "Klassische Massage + Bein-Pressotherapie",
        description:
          "Klassische Massage von Rücken, Nackenbereich und Armen + 25 Minuten Bein-Pressotherapie",
        price: "55 Euro",
        duration: "55 Minuten",
      },
      {
        id: "mix-3",
        name: "Klassische Ganzkörpermassage + Pressotherapie",
        description:
          "Klassische Ganzkörpermassage 60 Minuten + Pressotherapie für Beine, Bauch und Arme",
        price: "90 Euro",
        duration: "105 Minuten",
      },
      {
        id: "mix-4",
        name: "Aroma-Rückenmassage + Pressotherapie",
        description:
          "Aroma-Rückenmassage 30 Minuten + Pressotherapie für Beine, Bauch und Arme (45 Minuten)",
        price: "65 Euro",
        duration: "75 Minuten",
      },
      {
        id: "mix-5",
        name: "Aroma-Ganzkörpermassage + Pressotherapie",
        description:
          "Aroma-Ganzkörpermassage 60 Minuten + Pressotherapie für Beine, Bauch und Arme (45 Minuten)",
        price: "95 Euro",
        duration: "105 Minuten",
      },
    ],
  },
  {
    id: "classic-massage",
    name: "Klassische Massage",
    description: "Klassische Massage Ganzkörpermassage",
    services: [
      {
        id: "classic-1",
        name: "Ganzkörpermassage 45 Minuten",
        description: "Klassische Ganzkörpermassage",
        price: "45 Euro",
        duration: "45 Minuten",
      },
      {
        id: "classic-2",
        name: "Ganzkörpermassage 60 Minuten",
        description: "Klassische Ganzkörpermassage",
        price: "60 Euro",
        duration: "60 Minuten",
      },
      {
        id: "classic-3",
        name: "Ganzkörpermassage 90 Minuten",
        description: "Klassische Ganzkörpermassage",
        price: "90 Euro",
        duration: "90 Minuten",
      },
    ],
  },
  {
    id: "zone-massage",
    name: "Massage einzelner Zonen",
    description: "Massage einzelner Zonen",
    services: [
      {
        id: "zone-1",
        name: "Rücken und Nackenbereich",
        description: "Massage von Rücken und Nackenbereich",
        price: "30 Euro",
        duration: "30 Minuten",
      },
      {
        id: "zone-2",
        name: "Rücken, Nackenbereich und Arme",
        description: "Massage von Rücken, Nackenbereich und Armen",
        price: "30 Euro",
        duration: "30 Minuten",
      },
      {
        id: "zone-3",
        name: "Rücken, Nackenbereich und Arme",
        description: "Massage von Rücken, Nackenbereich und Armen",
        price: "45 Euro",
        duration: "45 Minuten",
      },
      {
        id: "zone-4",
        name: "Kopfmassage",
        description: "Entspannende Kopfmassage",
        price: "20 Euro",
        duration: "20 Minuten",
      },
      {
        id: "zone-5",
        name: "Gesichtsmassage",
        description: "Entspannende Gesichtsmassage",
        price: "30 Euro",
        duration: "20 Minuten",
      },
      {
        id: "zone-6",
        name: "Kopf und Gesicht",
        description: "Kombinierte Kopf- и Gesichtsmassage",
        price: "40 Euro",
        duration: "30 Minuten",
      },
    ],
  },
  {
    id: "anti-cellulite",
    name: "Anti-Cellulite-Massage",
    description: "Anti-Cellulite-Massage für straffere Haut",
    services: [
      {
        id: "cellulite-1",
        name: "Gesäß und Beine",
        description: "Anti-Cellulite-Massage für Gesäß und Beine",
        price: "50 Euro",
        duration: "40 Minuten",
      },
      {
        id: "cellulite-2",
        name: "Ganzkörper 60 Minuten",
        description: "Ganzkörper-Anti-Cellulite-Massage",
        price: "80 Euro",
        duration: "60 Minuten",
      },
      {
        id: "cellulite-3",
        name: "Ganzkörper 90 Minuten",
        description: "Ganzkörper-Anti-Cellulite-Massage",
        price: "99 Euro",
        duration: "90 Minuten",
      },
    ],
  },
];
interface ApiResponse {
  message?: string;
  previewUrl?: string;
}
export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<"form" | "contacts">("form");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [toastNotification, setToastNotification] = useState<{
    isVisible: boolean;
    message: string;
    type: "success" | "error";
  }>({
    isVisible: false,
    message: "",
    type: "success",
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      whatsapp: false,
      email: "",
      comment: "",
    },
  });
  const selectedServiceId = watch("serviceId");
  useState(() => {
    if (selectedServiceId) {
      for (const category of serviceCategories) {
        const service = category.services.find(
          (s) => s.id === selectedServiceId
        );
        if (service) {
          setSelectedService(service);
          break;
        }
      }
    } else {
      setSelectedService(null);
    }
  });
  const showToast = (message: string, type: "success" | "error") => {
    setToastNotification({
      isVisible: true,
      message,
      type,
    });
  };
  const hideToast = () => {
    setToastNotification((prev) => ({
      ...prev,
      isVisible: false,
    }));
  };
  const generateAvailableDates = (): DateSelection[] => {
    const dates: DateSelection[] = [];
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      if (date.getDay() !== 0) {
        dates.push({
          date: date.toISOString().split("T")[0],
          display: date.toLocaleDateString("de-DE", {
            weekday: "short",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
        });
      }
    }
    return dates;
  };
  const generateTimeSlots = useCallback((): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    for (let hour = 9; hour <= 20; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        const slotTime = hour * 60 + minute;
        const isToday = selectedDate === new Date().toISOString().split("T")[0];
        const available = !isToday || slotTime > currentTime;
        slots.push({
          time: timeString,
          display: timeString,
          available,
        });
      }
    }
    return slots;
  }, [selectedDate]);
  const availableDates = useMemo(() => generateAvailableDates(), []);
  const timeSlots = useMemo(() => generateTimeSlots(), [generateTimeSlots]);
  const handleServiceChange = (serviceId: string) => {
    setValue("serviceId", serviceId);
    for (const category of serviceCategories) {
      const service = category.services.find((s) => s.id === serviceId);
      if (service) {
        setSelectedService(service);
        break;
      }
    }
  };
  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime("");
    setValue("datetime", `${date}T${selectedTime}`, { shouldValidate: true });
    setShowDatePicker(false);
  };
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    if (selectedDate) {
      setValue("datetime", `${selectedDate}T${time}`, { shouldValidate: true });
    }
  };
  async function onSubmit(data: AppointmentFormValues) {
    try {
      let selectedServiceData = null;
      for (const category of serviceCategories) {
        const service = category.services.find((s) => s.id === data.serviceId);
        if (service) {
          selectedServiceData = service;
          break;
        }
      }
      const emailData = {
        ...data,
        serviceName: selectedServiceData?.name || "Unbekannter Service",
        serviceDuration: selectedServiceData?.duration || "Unbekannte Dauer",
        serviceDescription: selectedServiceData?.description || "",
        servicePrice: selectedServiceData?.price || "",
        formattedDatetime:
          selectedDate && selectedTime
            ? `${new Date(selectedDate).toLocaleDateString("de-DE", {
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric",
              })} um ${selectedTime} Uhr`
            : "Nicht angegeben",
      };
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailData),
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
      showToast(
        "Terminanfrage erfolgreich gesendet! Wir melden uns in Kürze bei Ihnen.",
        "success"
      );
      reset();
      setSelectedService(null);
      setSelectedDate("");
      setSelectedTime("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("Submit error:", err);
      let userFriendlyMessage = "Fehler beim Senden der Terminanfrage";
      if (msg.includes("Validierungsfehler")) {
        userFriendlyMessage = "Bitte überprüfen Sie Ihre Eingaben auf Fehler.";
      } else if (msg.includes("Email service") || msg.includes("SMTP")) {
        userFriendlyMessage =
          "Service vorübergehend nicht verfügbar. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt.";
      } else if (msg.includes("Network") || msg.includes("Fetch")) {
        userFriendlyMessage =
          "Netzwerkfehler. Bitte überprüfen Sie Ihre Internetverbindung.";
      }
      showToast(userFriendlyMessage, "error");
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-4 sm:py-8">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-8">
        {}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
            Kontakt & Terminvereinbarung
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Vereinbaren Sie Ihren Massagetermin im Balaba Studio - Wir freuen
            uns darauf, Ihnen zu mehr Entspannung zu verhelfen
          </p>
        </div>
        {}
        <div className="lg:hidden flex justify-center mb-6">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center gap-3 bg-white px-6 py-4 rounded-xl shadow-md border-2 border-green-100 font-semibold text-gray-800 hover:bg-green-50 hover:border-green-300 transition-all duration-300"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMobileMenuOpen ? (
              <FaTimes className="text-green-600 text-lg" />
            ) : (
              <FaBars className="text-green-600 text-lg" />
            )}
            <span className="text-green-700">
              {isMobileMenuOpen ? "Menü schließen" : "Schnellnavigation"}
            </span>
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {}
          <div className="lg:col-span-2">
            {}
            <div
              id="mobile-navigation"
              className={`lg:hidden transition-all duration-300 ${
                isMobileMenuOpen ? "block animate-fadeIn" : "hidden"
              } mb-6`}
            >
              <div className="bg-white rounded-xl p-2 shadow-lg border border-green-100">
                <button
                  onClick={() => {
                    setActiveTab("form");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full px-4 py-4 rounded-lg font-semibold transition-all text-base flex items-center justify-center ${
                    activeTab === "form"
                      ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md"
                      : "text-gray-700 hover:text-green-700 hover:bg-green-50"
                  }`}
                >
                  Termin anfragen
                </button>
                <button
                  onClick={() => {
                    setActiveTab("contacts");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full px-4 py-4 rounded-lg font-semibold transition-all text-base flex items-center justify-center ${
                    activeTab === "contacts"
                      ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md"
                      : "text-gray-700 hover:text-green-700 hover:bg-green-50"
                  }`}
                >
                  Kontakt & Anfahrt
                </button>
              </div>
            </div>
            {}
            <div className="hidden lg:flex justify-center mb-8">
              <div className="bg-white rounded-xl p-2 shadow-lg border border-green-100">
                <button
                  onClick={() => setActiveTab("form")}
                  className={`px-8 py-4 rounded-lg font-semibold transition-all text-lg ${
                    activeTab === "form"
                      ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md"
                      : "text-gray-700 hover:text-green-700 hover:bg-green-50"
                  }`}
                >
                  Termin anfragen
                </button>
                <button
                  onClick={() => setActiveTab("contacts")}
                  className={`px-8 py-4 rounded-lg font-semibold transition-all text-lg ${
                    activeTab === "contacts"
                      ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md"
                      : "text-gray-700 hover:text-green-700 hover:bg-green-50"
                  }`}
                >
                  Kontakt & Anfahrt
                </button>
              </div>
            </div>
            {activeTab === "form" ? (
              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  Termin anfragen
                </h2>
                <p className="text-base sm:text-lg text-gray-600 mb-8">
                  Füllen Sie das Formular aus und wir melden uns innerhalb von
                  24 Stunden bei Ihnen
                </p>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6 sm:space-y-8"
                >
                  {}
                  <div>
                    <label className="block text-lg font-semibold text-gray-800 mb-4">
                      Gewünschte Behandlung *
                    </label>
                    <div className="relative">
                      <select
                        {...register("serviceId")}
                        onChange={(e) => handleServiceChange(e.target.value)}
                        className="w-full px-4 py-4 text-base border-2 border-gray-200 rounded-xl focus:ring-3 focus:ring-green-500 focus:border-green-500 transition-all appearance-none bg-white cursor-pointer"
                      >
                        <option value="">
                          Bitte wählen Sie eine Behandlung
                        </option>
                        {serviceCategories.map((category) => (
                          <optgroup key={category.id} label={category.name}>
                            {category.services.map((service) => (
                              <option key={service.id} value={service.id}>
                                {service.name} - {service.price} (
                                {service.duration})
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                      <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                    {errors.serviceId && (
                      <p className="text-red-600 text-sm mt-2 font-medium">
                        {errors.serviceId.message}
                      </p>
                    )}
                    {selectedService && (
                      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                        <h4 className="font-semibold text-green-800 text-lg mb-2">
                          {selectedService.name}
                        </h4>
                        <p className="text-green-700 text-sm mb-2">
                          {selectedService.description}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <span className="bg-white px-3 py-1 rounded-full text-green-800 font-medium border border-green-200">
                            💶 {selectedService.price}
                          </span>
                          <span className="bg-white px-3 py-1 rounded-full text-green-800 font-medium border border-green-200">
                            ⏱️ {selectedService.duration}
                          </span>
                          {selectedService.firstTimeOffer && (
                            <span className="bg-green-100 px-3 py-1 rounded-full text-green-800 font-medium border border-green-300">
                              🎁 {selectedService.firstTimeOffer}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  {}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-lg font-semibold text-gray-800 mb-4">
                        Bevorzugtes Datum & Uhrzeit *
                      </label>
                      {}
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Datum auswählen *
                        </label>
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => setShowDatePicker(!showDatePicker)}
                            className={`w-full px-4 py-4 text-left text-base border-2 rounded-xl transition-all flex items-center justify-between ${
                              selectedDate
                                ? "border-green-500 bg-green-50 text-green-800"
                                : "border-gray-200 hover:border-gray-300 bg-white"
                            } ${
                              errors.datetime ? "border-red-500 bg-red-50" : ""
                            }`}
                          >
                            <span>
                              {selectedDate
                                ? new Date(selectedDate).toLocaleDateString(
                                    "de-DE",
                                    {
                                      weekday: "long",
                                      day: "2-digit",
                                      month: "long",
                                      year: "numeric",
                                    }
                                  )
                                : "Datum auswählen"}
                            </span>
                            <svg
                              className={`w-5 h-5 transition-transform ${
                                showDatePicker ? "rotate-180" : ""
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </button>
                          {}
                          {showDatePicker && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-2xl z-10 max-h-80 overflow-y-auto">
                              <div className="p-4">
                                <h4 className="font-semibold text-gray-800 mb-3 text-center">
                                  Verfügbare Termine
                                </h4>
                                <div className="grid grid-cols-1 gap-2">
                                  {availableDates.map((dateObj) => (
                                    <button
                                      key={dateObj.date}
                                      type="button"
                                      onClick={() =>
                                        handleDateSelect(dateObj.date)
                                      }
                                      className={`p-3 text-left rounded-lg transition-all ${
                                        selectedDate === dateObj.date
                                          ? "bg-green-500 text-white font-semibold"
                                          : "hover:bg-gray-100 text-gray-700"
                                      }`}
                                    >
                                      {dateObj.display}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      {}
                      {selectedDate && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            Uhrzeit auswählen *
                          </label>
                          {}
                          <div className="md:hidden">
                            <div className="flex space-x-3 pb-4 overflow-x-auto scrollbar-hide">
                              {timeSlots.map((slot) => (
                                <button
                                  key={slot.time}
                                  type="button"
                                  onClick={() =>
                                    slot.available &&
                                    handleTimeSelect(slot.time)
                                  }
                                  disabled={!slot.available}
                                  className={`flex-shrink-0 w-20 p-3 rounded-xl text-center transition-all font-medium ${
                                    selectedTime === slot.time
                                      ? "bg-green-500 text-white shadow-md transform scale-105"
                                      : slot.available
                                      ? "bg-white border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 text-gray-700"
                                      : "bg-gray-100 border-2 border-gray-200 text-gray-400 cursor-not-allowed"
                                  }`}
                                >
                                  <span className="text-sm font-medium">
                                    {slot.display}
                                  </span>
                                  {!slot.available && (
                                    <div className="text-xs text-gray-400 mt-1">
                                      Vergangen
                                    </div>
                                  )}
                                </button>
                              ))}
                            </div>
                            <p className="text-xs text-gray-500 mt-2 text-center">
                              ← scrollen Sie horizontal um mehr Zeiten zu sehen
                              →
                            </p>
                          </div>
                          {}
                          <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-3">
                            {timeSlots.map((slot) => (
                              <button
                                key={slot.time}
                                type="button"
                                onClick={() =>
                                  slot.available && handleTimeSelect(slot.time)
                                }
                                disabled={!slot.available}
                                className={`p-3 rounded-xl text-center transition-all font-medium ${
                                  selectedTime === slot.time
                                    ? "bg-green-500 text-white shadow-md transform scale-105"
                                    : slot.available
                                    ? "bg-white border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 text-gray-700"
                                    : "bg-gray-100 border-2 border-gray-200 text-gray-400 cursor-not-allowed"
                                }`}
                              >
                                {slot.display}
                                {!slot.available && (
                                  <div className="text-xs text-gray-400 mt-1">
                                    Vergangen
                                  </div>
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      <input type="hidden" {...register("datetime")} />
                      {errors.datetime && (
                        <p className="text-red-600 text-sm mt-3 font-medium bg-red-50 p-3 rounded-lg border border-red-200">
                          {errors.datetime.message}
                        </p>
                      )}
                      {selectedDate && selectedTime && (
                        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-blue-800 text-lg">
                                Ausgewählter Termin
                              </p>
                              <p className="text-blue-700">
                                {new Date(selectedDate).toLocaleDateString(
                                  "de-DE",
                                  {
                                    weekday: "long",
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric",
                                  }
                                )}{" "}
                                um {selectedTime} Uhr
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedDate("");
                                setSelectedTime("");
                                setValue("datetime", "", {
                                  shouldValidate: true,
                                });
                              }}
                              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                            >
                              Ändern
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-lg font-semibold text-gray-800 mb-3">
                        Ihr Name *
                      </label>
                      <input
                        {...register("name")}
                        type="text"
                        className="w-full px-4 py-4 text-base border-2 border-gray-200 rounded-xl focus:ring-3 focus:ring-green-500 focus:border-green-500 transition-all"
                        placeholder="Vor- und Nachname"
                      />
                      {errors.name && (
                        <p className="text-red-600 text-sm mt-2 font-medium">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-lg font-semibold text-gray-800 mb-3">
                        Telefonnummer *
                      </label>
                      <input
                        {...register("phone")}
                        type="tel"
                        placeholder="+49 151 1234567"
                        className="w-full px-4 py-4 text-base border-2 border-gray-200 rounded-xl focus:ring-3 focus:ring-green-500 focus:border-green-500 transition-all   "
                      />
                      {errors.phone && (
                        <p className="text-red-600 text-sm mt-2 font-medium">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>
                  {}
                  <div>
                    <label className="block text-lg font-semibold text-gray-800 mb-3">
                      E-Mail Adresse
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      className="w-full px-4 py-4 text-base border-2 border-gray-200 rounded-xl focus:ring-3 focus:ring-green-500 focus:border-green-500 transition-all"
                      placeholder="ihre@email.de"
                    />
                    {errors.email && (
                      <p className="text-red-600 text-sm mt-2 font-medium">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  {}
                  <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <input
                      id="whatsapp"
                      type="checkbox"
                      {...register("whatsapp")}
                      className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <label
                      htmlFor="whatsapp"
                      className="text-base text-gray-700 font-medium"
                    >
                      Ich bevorzuge Kommunikation per WhatsApp
                    </label>
                  </div>
                  {}
                  <div>
                    <label className="block text-lg font-semibold text-gray-800 mb-3">
                      Besondere Wünsche oder Anmerkungen
                    </label>
                    <textarea
                      {...register("comment")}
                      rows={4}
                      className="w-full px-4 py-4 text-base border-2 border-gray-200 rounded-xl focus:ring-3 focus:ring-green-500 focus:border-green-500 transition-all resize-none"
                      placeholder="Haben Sie besondere Wünsche oder gesundheitliche Hinweise, die wir beachten sollten?"
                    />
                    {errors.comment && (
                      <p className="text-red-600 text-sm mt-2 font-medium">
                        {errors.comment.message}
                      </p>
                    )}
                  </div>
                  {}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-green-600 hover:to-green-700 focus:ring-4 focus:ring-green-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-transform"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                        Wird gesendet...
                      </>
                    ) : (
                      "Termin anfragen"
                    )}
                  </button>
                  {}
                  <p className="text-center text-sm text-gray-600">
                    Alternativ:{" "}
                    <a
                      href="https://wa.me/4915124908000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-700 font-semibold underline transition-colors"
                    >
                      Direkt per WhatsApp buchen
                    </a>
                  </p>
                </form>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <FaMapMarkerAlt className="text-green-600 mr-4 text-2xl" />
                    Standort & Kontakt
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Unsere Adresse
                      </h3>
                      <address className="not-italic text-gray-700 space-y-4 text-base">
                        <p className="flex items-start">
                          <FaMapMarkerAlt className="text-green-500 mr-4 mt-1 flex-shrink-0 text-lg" />
                          <span className="font-medium">
                            Hermstrasse 37
                            <br />
                            63695 Glauburg-Stockheim
                          </span>
                        </p>
                        <a
                          href="https://www.google.com/maps/place/Balaba+Massage+Studio/@50.3249578,9.0123274,21z/data=!4m6!3m5!1s0x47bd1ff68239fc3d:0xacd5e4c867c97da6!8m2!3d50.3250513!4d9.0123212!16s%2Fg%2F11wxg0z523?entry=ttu&g_ep=EgoyMDI1MTAwOC4wIKXMDSoASAFQAw%3D%3DgoyMDI1MTAwOC4wIKXMDSoASAFQAw%3D%3D"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold transition-colors mt-2 text-lg"
                        >
                          Auf Google Maps anzeigen →
                        </a>
                      </address>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Kontakt
                      </h3>
                      <div className="space-y-4">
                        <a
                          href="tel:+4915124908000"
                          className="flex items-center text-gray-700 hover:text-green-600 transition-colors group text-lg font-medium"
                        >
                          <FaPhone className="text-green-500 mr-4 group-hover:scale-110 transition-transform text-xl" />
                          <span>+49 151 24908000</span>
                        </a>
                        <a
                          href="mailto:balabamassage@gmail.com"
                          className="flex items-center text-gray-700 hover:text-green-600 transition-colors group text-lg font-medium"
                        >
                          <FaEnvelope className="text-green-500 mr-4 group-hover:scale-110 transition-transform text-xl" />
                          <span>balabamassage@gmail.com</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      Öffnungszeiten
                    </h3>
                    <div className="flex items-start text-gray-700 text-lg">
                      <FaClock className="text-green-500 mr-4 mt-1 flex-shrink-0 text-xl" />
                      <div>
                        <p className="font-bold">Mo - Fr: 9:00 - 20:00 Uhr</p>
                        <p className="font-bold">Sa: 10:00 - 18:00 Uhr</p>
                        <p className="text-gray-600 mt-2 font-medium">
                          Termine nach Vereinbarung
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <FaBus className="text-blue-600 mr-4 text-2xl" />
                    Anfahrt & Parken
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3 flex items-center text-xl">
                        <FaBus className="text-blue-500 mr-3 text-lg" />
                        Öffentliche Verkehrsmittel
                      </h3>
                      <p className="text-gray-700 text-lg font-medium">
                        RB34, Bus: 374, FB-20, FB-21, FB-25, FB-45
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3 flex items-center text-xl">
                        <FaParking className="text-green-500 mr-3 text-lg" />
                        Parkplätze
                      </h3>
                      <p className="text-gray-700 text-lg font-medium">
                        3 kostenlose Parkplätze direkt vor dem Studio verfügbar
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {}
          <div
            className={`space-y-6 transition-all duration-300 ${
              isMobileMenuOpen ? "block animate-slideIn" : "hidden lg:block"
            }`}
          >
            {}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
                Schnellkontakt
              </h3>
              <div className="space-y-4">
                <a
                  href="tel:+4915124908000"
                  className="flex items-center justify-center w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <FaPhone className="mr-3" />
                  Direkt anrufen
                </a>
                <a
                  href="https://wa.me/4915124908000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <FaWhatsapp className="mr-3" />
                  WhatsApp
                </a>
              </div>
            </div>
            {}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
                Folgen Sie uns
              </h3>
              <div className="flex justify-center gap-6">
                <a
                  href="https://www.instagram.com/balabastudio_glauburg/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-110 shadow-lg hover:shadow-xl"
                  aria-label="Instagram"
                >
                  <FaInstagram size={24} />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61571893245558"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white p-4 rounded-full hover:bg-blue-700 transition-all transform hover:scale-110 shadow-lg hover:shadow-xl"
                  aria-label="Facebook"
                >
                  <FaFacebook size={24} />
                </a>
              </div>
            </div>
            {}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <MapSection />
            </div>
          </div>
        </div>
      </div>
      {}
      <ToastNotification
        message={toastNotification.message}
        type={toastNotification.type}
        isVisible={toastNotification.isVisible}
        onClose={hideToast}
        duration={4000}
      />
      {}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
