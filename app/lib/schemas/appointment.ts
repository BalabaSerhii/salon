import { z } from "zod";

export const appointmentSchema = z.object({
  serviceId: z.string().min(1, "Bitte wählen Sie eine Behandlung aus"),
  datetime: z.string().min(1, "Bitte wählen Sie Datum und Uhrzeit aus"),
  name: z.string().min(2, "Name muss mindestens 2 Zeichen lang sein"),
  phone: z.string()
    .min(10, "Telefonnummer muss mindestens 10 Ziffern haben") 
    .regex(/^[0-9+\-\s()]+$/, "Telefonnummer darf nur Zahlen, +, -, Leerzeichen und Klammern enthalten"), 
  email: z
    .string()
    .email("Bitte geben Sie eine gültige E-Mail-Adresse ein")
    .optional()
    .or(z.literal("")),
  whatsapp: z.boolean(),
  comment: z.string().optional(),
});

export type AppointmentFormValues = z.infer<typeof appointmentSchema>;