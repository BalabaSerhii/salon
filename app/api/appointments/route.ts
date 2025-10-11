// app/api/appointments/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { appointmentSchema } from "../../lib/schemas/appointment";
import { ZodError } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = appointmentSchema.parse(body);

    // Создаём transporter: если нет env — используем Ethereal (для dev)
    let transporter;
    if (
      process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS
    ) {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === "true",
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      });
    } else {
      // dev: ethereal
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: { user: testAccount.user, pass: testAccount.pass },
      });
    }

    const mailOptions = {
      from: process.env.SMTP_FROM || `${process.env.SMTP_USER}`,
      to: process.env.NOTIFY_EMAIL_TO || process.env.SMTP_USER,
      subject: `Новая запись: ${data.serviceId} — ${data.datetime}`,
      text: [
        `Услуга: ${data.serviceId}`,
        `Длительность: ${data.duration}`,
        `Дата: ${data.datetime}`,
        `Телефон: ${data.phone}`,
        `WhatsApp: ${data.whatsapp ? "Да" : "Нет"}`,
        `Комментарий: ${data.comment || "-"}`,
      ].join("\n"),
    };

    const info = await transporter.sendMail(mailOptions);
    // если ethereal — preview url будет
    const previewUrl = nodemailer.getTestMessageUrl(info) || null;

    console.log("Mail sent:", info.messageId, previewUrl);

    return NextResponse.json({ ok: true, previewUrl });
  } catch (err: unknown) {
    console.error("API error:", err);
    if (err instanceof ZodError) {
      return NextResponse.json(
        { message: "Validation error", issues: err.issues },
        { status: 400 }
      );
    }
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ message }, { status: 500 });
  }
}
