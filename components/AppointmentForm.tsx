"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  appointmentSchema,
  AppointmentFormValues,
} from "../app/lib/schemas/appointment";
import ToastNotification from "../components/ToastNotification";

type Service = { id: string; name: string; durationMinutes: number };

interface Props {
  services: Service[];
}

// Интерфейс для ответа API
interface ApiResponse {
  message?: string;
  previewUrl?: string;
}

export default function AppointmentForm({ services }: Props) {
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
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      whatsapp: false,
      email: "",
      comment: "",
    },
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

      if (!res.ok) {
        throw new Error(
          typeof body === "object"
            ? body?.message || "Server error"
            : "Server error"
        );
      }

      // Показываем центрированное уведомление об успехе
      showToast(
        "Terminanfrage erfolgreich gesendet! Wir melden uns in Kürze bei Ihnen.",
        "success"
      );

      reset();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("Submit error:", err);

      // Определяем понятное сообщение об ошибке
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

      // Показываем центрированное уведомление об ошибке
      showToast(userFriendlyMessage, "error");
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Gewünschte Behandlung *
          </label>
          <select
            {...register("serviceId")}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Bitte wählen</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} — {s.durationMinutes} Min
              </option>
            ))}
          </select>
          {errors.serviceId && (
            <p className="text-red-600 text-sm mt-1">
              {errors.serviceId.message}
            </p>
          )}
        </div>

               <div>
          <label className="block text-sm font-medium text-gray-700">
            Datum & Uhrzeit *
          </label>
          <input
            {...register("datetime")}
            type="datetime-local"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          {errors.datetime && (
            <p className="text-red-600 text-sm mt-1">
              {errors.datetime.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name *
          </label>
          <input
            {...register("name")}
            type="text"
            placeholder="Vor- und Nachname"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Telefonnummer *
          </label>
          <input
            {...register("phone")}
            type="tel"
            placeholder="+49..."
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          {errors.phone && (
            <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            E-Mail
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="ihre@email.de"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="flex items-center space-x-2">
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
          <label className="block text-sm font-medium text-gray-700">
            Kommentar oder besondere Wünsche
          </label>
          <textarea
            {...register("comment")}
            rows={3}
            placeholder="Besondere Wünsche oder gesundheitliche Hinweise..."
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          {errors.comment && (
            <p className="text-red-600 text-sm mt-1">
              {errors.comment.message}
            </p>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Wird gesendet..." : "Termin anfragen"}
          </button>
        </div>
      </form>

      {/* Центрированное уведомление */}
      <ToastNotification
        message={toastNotification.message}
        type={toastNotification.type}
        isVisible={toastNotification.isVisible}
        onClose={hideToast}
        duration={2000}
      />
    </>
  );
}
