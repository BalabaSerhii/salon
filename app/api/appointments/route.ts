import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { appointmentSchema } from "../../lib/schemas/appointment";
import { ZodError } from "zod";

// Отключаем кэширование для API routes
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = appointmentSchema.parse(body);

    // Проверяем обязательные environment variables в продакшене
    const requiredEnvVars = ["SMTP_HOST", "SMTP_USER", "SMTP_PASS"];
    const missingVars = requiredEnvVars.filter(
      (varName) => !process.env[varName]
    );

    if (missingVars.length > 0 && process.env.NODE_ENV === "production") {
      console.error("Missing required environment variables:", missingVars);
      return NextResponse.json(
        {
          message: "Email service is not properly configured",
          error: "Missing environment variables",
        },
        { status: 500 }
      );
    }

    let transporter;
    let isTestAccount = false;

    // В продакшене используем реальный SMTP, в development - тестовый
    if (
      process.env.NODE_ENV === "production" ||
      (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)
    ) {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        // Добавляем таймауты для надежности
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 10000,
      });

      // Проверяем соединение с SMTP
      try {
        await transporter.verify();
        console.log("SMTP connection verified");
      } catch (verifyError) {
        console.error("SMTP connection failed:", verifyError);
        return NextResponse.json(
          {
            message: "Email service connection failed",
            error: "SMTP verification failed",
          },
          { status: 500 }
        );
      }
    } else {
      // Development: используем Ethereal Email
      console.log("Using Ethereal test account for development");
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      isTestAccount = true;
    }

    // Форматируем дату для немецкого формата
    const formatGermanDateTime = (dateString: string) => {
      try {
        const date = new Date(dateString);
        return date.toLocaleString("de-DE", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      } catch {
        return dateString;
      }
    };

    const formattedDate = formatGermanDateTime(data.datetime);

    const mailOptions = {
      from: process.env.SMTP_FROM || `BalabaStudio <${process.env.SMTP_USER}>`,
      to: process.env.NOTIFY_EMAIL_TO || process.env.SMTP_USER,
      subject: `Neue Terminanfrage: ${data.serviceId} - ${formattedDate}`,
      text: [
        `Neue Terminanfrage eingegangen:`,
        `===============================`,
        `Service: ${data.serviceId}`,
        `Dauer: ${data.duration} Minuten`,
        `Datum/Zeit: ${formattedDate}`,
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Telefon: ${data.phone}`,
        `WhatsApp bevorzugt: ${data.whatsapp ? "Ja" : "Nein"}`,
        `Kommentar: ${data.comment || "Keine"}`,
        ``,
        `Gesendet am: ${new Date().toLocaleString("de-DE")}`,
      ].join("\n"),

      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
              .header { background: #2d983f; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 8px 8px; }
              .field { margin-bottom: 12px; padding: 8px 0; border-bottom: 1px solid #eee; }
              .label { font-weight: bold; color: #2d983f; min-width: 150px; display: inline-block; }
              .footer { margin-top: 20px; padding-top: 20px; border-top: 2px solid #2d983f; font-size: 12px; color: #666; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Neue Terminanfrage</h1>
              <p>BalabaStudio Website</p>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">Service:</span> ${data.serviceId}
              </div>
              <div class="field">
                <span class="label">Dauer:</span> ${data.duration} Minuten
              </div>
              <div class="field">
                <span class="label">Datum/Zeit:</span> ${formattedDate}
              </div>
              <div class="field">
                <span class="label">Name:</span> ${data.name}
              </div>
              <div class="field">
                <span class="label">Email:</span> ${data.email}
              </div>
              <div class="field">
                <span class="label">Telefon:</span> ${data.phone}
              </div>
              <div class="field">
                <span class="label">WhatsApp:</span> ${
                  data.whatsapp ? "Ja" : "Nein"
                }
              </div>
              <div class="field">
                <span class="label">Kommentar:</span> ${data.comment || "Keine"}
              </div>
              <div class="footer">
                <p>Gesendet am: ${new Date().toLocaleString("de-DE")}</p>
                <p>BalabaStudio • Hermstrasse 37, 63695 Glauburg-Stockheim</p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    let previewUrl = null;
    if (isTestAccount) {
      previewUrl = nodemailer.getTestMessageUrl(info);
      console.log("Development email sent. Preview URL:", previewUrl);
    } else {
      console.log("Production email sent. Message ID:", info.messageId);
    }

    return NextResponse.json({
      success: true,
      message: "Appointment request sent successfully",
      previewUrl,
      messageId: info.messageId,
    });
  } catch (err: unknown) {
    console.error("API error:", err);

    if (err instanceof ZodError) {
      // ИСПРАВЛЕННАЯ ЧАСТЬ: правильное обращение к errors
      return NextResponse.json(
        {
          message: "Validierungsfehler",
          errors: err.issues.map((error) => ({
            // ← ИСПРАВЛЕНО: err.issues вместо err.errors
            field: error.path?.join(".") || "unknown",
            message: error.message,
          })),
        },
        { status: 400 }
      );
    }

    const errorMessage =
      err instanceof Error ? err.message : "Unknown error occurred";

    return NextResponse.json(
      {
        message: "Fehler beim Senden der Terminanfrage",
        error:
          process.env.NODE_ENV === "development" ? errorMessage : undefined,
      },
      { status: 500 }
    );
  }
}
