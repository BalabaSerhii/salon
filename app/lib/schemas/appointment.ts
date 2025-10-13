import { z } from "zod";

export const appointmentSchema = z.object({
  serviceId: z.string().min(1, "Bitte wählen Sie eine Behandlung aus"),
  datetime: z.string().min(1, "Bitte wählen Sie Datum und Uhrzeit aus"),
  name: z.string().min(2, "Name muss mindestens 2 Zeichen lang sein"),
  phone: z.string().min(5, "Bitte geben Sie eine gültige Telefonnummer ein"),
  email: z
    .string()
    .email("Bitte geben Sie eine gültige E-Mail-Adresse ein")
    .optional()
    .or(z.literal("")),
  whatsapp: z.boolean(), // УБРАТЬ .default(false)
  comment: z.string().optional(),
});

export type AppointmentFormValues = z.infer<typeof appointmentSchema>;
