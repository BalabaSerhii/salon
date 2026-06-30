import { NextResponse } from 'next/server';
import { priceCategories, priceListMetadata } from '@/app/data/priceData'; // ваш шлях до даних

export async function GET() {
  const baseUrl = 'https://www.balabastudio.de';

  const lines: string[] = [];

  // H1 – обов'язково
  lines.push('# BalabaStudio – Massagen & Pressotherapie in Glauburg');
  lines.push(`> ${priceListMetadata.description}`);
  lines.push('');

  // Навігація
  lines.push('## Navigation');
  lines.push(`- Startseite: ${baseUrl}/`);
  lines.push(`- Preisliste: ${baseUrl}/preisliste`);
  lines.push(`- Kontakt & Termin: ${baseUrl}/contacts`);
  lines.push(`- Blog: ${baseUrl}/blog`);
  lines.push(`- Über uns: ${baseUrl}/about`);
  lines.push(`- Impressum: ${baseUrl}/impressum`);
  lines.push(`- Datenschutz: ${baseUrl}/datenschutz`);
  lines.push('');

  // Прайс
  lines.push('## Preisliste (Services & Preise)');
  for (const category of priceCategories) {
    lines.push(`### ${category.title}`);
    if (category.description) lines.push(`> ${category.description}`);
    for (const service of category.services) {
      const duration = service.duration ? ` (${service.duration})` : '';
      lines.push(`- ${service.name}${duration}: ${service.price}`);
    }
    lines.push('');
  }

  // Контакти
  lines.push('## Kontakt');
  lines.push(`- Telefon: +49 151 24908000`);
  lines.push(`- E-Mail: balabamassage@gmail.com`);
  lines.push(`- Adresse: Hermstrasse 37, 63695 Glauburg-Stockheim`);
  lines.push(`- WhatsApp: https://wa.me/4915124908000`);
  lines.push(`- Instagram: https://www.instagram.com/balabastudio_glauburg/`);
  lines.push(`- Facebook: https://www.facebook.com/profile.php?id=61571893245558`);
  lines.push('');

  // Години роботи
  lines.push('## Öffnungszeiten');
  lines.push('- Mo–Sa: 09:00 – 20:00 Uhr');
  lines.push('- So: Ruhetag');
  lines.push('- Termine nach Vereinbarung');
  lines.push('');

  // Додатково
  lines.push('## Zusätzliche Informationen');
  lines.push('- Parkplätze: 3 kostenlose Plätze direkt vor dem Studio');
  lines.push('- ÖPNV: RB34, Bus 374, FB-20, FB-21, FB-25, FB-45');
  lines.push('- Sprache: Deutsch');

  const content = lines.join('\n');

  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}