"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  appointmentSchema,
  AppointmentFormValues,
} from "../app/lib/schemas/appointment";
import { toast } from "sonner";

type Service = { id: string; name: string; durationMinutes: number };

interface Props {
  services: Service[];
}

export default function AppointmentForm({ services }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: { whatsapp: false },
  });

  async function onSubmit(data: AppointmentFormValues) {
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const contentType = res.headers.get("content-type") || "";
      let body: any;
      if (contentType.includes("application/json")) {
        body = await res.json();
      } else {
        body = await res.text();
        throw new Error(
          "Server returned non-JSON response: " + body.slice(0, 300)
        );
      }

      if (!res.ok) throw new Error(body?.message || "Ошибка сервера");

      if (body.previewUrl) {
        // если используется Ethereal — покажем ссылку для просмотра письма
        toast("Проверка отправки");
      } else {
        toast("Проверка отправки");
      }
      reset();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("Submit error:", err);
      alert("Ошибка при отправке: " + msg);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg space-y-4">
      <div>
        <label className="block text-sm font-medium">Услуга</label>
        <select
          {...register("serviceId")}
          className="mt-1 w-full rounded border px-3 py-2"
        >
          <option value="">Выберите услугу</option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} — {s.durationMinutes} мин
            </option>
          ))}
        </select>
        {errors.serviceId && (
          <p className="text-red-600 text-sm">{errors.serviceId.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Длительность (мин)</label>
        <select
          {...register("duration")}
          className="mt-1 w-full rounded border px-3 py-2"
        >
          <option value="">Выберите</option>
          <option value="30">30</option>
          <option value="45">45</option>
          <option value="60">60</option>
        </select>
        {errors.duration && (
          <p className="text-red-600 text-sm">{errors.duration.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Дата и время</label>
        <input
          {...register("datetime")}
          type="datetime-local"
          className="mt-1 w-full rounded border px-3 py-2"
        />
        {errors.datetime && (
          <p className="text-red-600 text-sm">{errors.datetime.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Телефон</label>
        <input
          {...register("phone")}
          type="tel"
          placeholder="+49..."
          className="mt-1 w-full rounded border px-3 py-2"
        />
        {errors.phone && (
          <p className="text-red-600 text-sm">{errors.phone.message}</p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <input id="wa" type="checkbox" {...register("whatsapp")} />
        <label htmlFor="wa" className="text-sm">
          WhatsApp
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium">Комментарий</label>
        <textarea
          {...register("comment")}
          rows={3}
          className="mt-1 w-full rounded border px-3 py-2"
        />
        {errors.comment && (
          <p className="text-red-600 text-sm">{errors.comment.message}</p>
        )}
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-60"
        >
          {isSubmitting ? "Отправка..." : "Записаться"}
        </button>
      </div>
    </form>
  );
}
