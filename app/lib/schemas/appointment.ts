import { z } from "zod";

export const appointmentSchema = z.object({
  serviceId: z.string().min(1, "Выберите услугу"),
  duration: z.string().min(1, "Укажите длительность"),
  datetime: z.string().min(1, "Выберите дату и время"),
  phone: z.string().min(5, "Введите корректный телефон"),
  whatsapp: z.boolean().optional(),
  comment: z.string().max(1000).optional(),
});

export type AppointmentFormValues = z.infer<typeof appointmentSchema>;
