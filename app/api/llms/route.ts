import { NextResponse } from 'next/server';
import { priceCategories, priceListMetadata } from '@/app/data/prices';

export async function GET() {
  const baseUrl = 'https://www.balabastudio.de';

  const lines: string[] = [];

  // H1
  lines.push('# BalabaStudio – Massagen & Pressotherapie in Glauburg');
  lines.push('');
  lines.push(`> ${priceListMetadata?.description || 'Professionelle Massagen und Pressotherapie in Glauburg'}`);
  lines.push('');

  // Navigation з Markdown-посиланнями
  lines.push('## Navigation');
  lines.push('');
  lines.push(`- [Startseite](${baseUrl}/)`);
  lines.push(`- [Preisliste](${baseUrl}/preisliste)`);
  lines.push(`- [Kontakt & Termin](${baseUrl}/contacts)`);
  lines.push(`- [Blog](${baseUrl}/blog)`);
  lines.push(`- [Über uns](${baseUrl}/about)`);
  lines.push(`- [Impressum](${baseUrl}/impressum)`);
  lines.push(`- [Datenschutz](${baseUrl}/datenschutz)`);
  lines.push('');

  // Preisliste
  lines.push('## Preisliste (Services & Preise)');
  lines.push('');
  
  if (priceCategories && priceCategories.length > 0) {
    for (const category of priceCategories) {
      lines.push(`### ${category.title}`);
      if (category.description) {
        lines.push(`> ${category.description}`);
      }
      lines.push('');
      for (const service of category.services) {
        const duration = service.duration ? ` (${service.duration})` : '';
        lines.push(`- ${service.name}${duration}: ${service.price}`);
      }
      lines.push('');
    }
  }

  // Kontakt з Markdown-посиланнями
  lines.push('## Kontakt');
  lines.push('');
  lines.push(`- **Telefon:** [+49 151 24908000](tel:+4915124908000)`);
  lines.push(`- **E-Mail:** [balabamassage@gmail.com](mailto:balabamassage@gmail.com)`);
  lines.push(`- **Adresse:** Hermstrasse 37, 63695 Glauburg-Stockheim`);
  lines.push(`- **WhatsApp:** [Jetzt schreiben](https://wa.me/4915124908000)`);
  lines.push(`- **Instagram:** [@balabastudio_glauburg](https://www.instagram.com/balabastudio_glauburg/)`);
  lines.push(`- **Facebook:** [BalabaStudio](https://www.facebook.com/profile.php?id=61571893245558)`);
  lines.push('');

  // Öffnungszeiten
  lines.push('## Öffnungszeiten');
  lines.push('');
  lines.push('- **Montag – Samstag:** 09:00 – 20:00 Uhr');
  lines.push('- **Sonntag:** Ruhetag');
  lines.push('- **Termine nach Vereinbarung');
  lines.push('');

  // Zusätzliche Informationen
  lines.push('## Zusätzliche Informationen');
  lines.push('');
  lines.push('- **Parkplätze:** 3 kostenlose Plätze direkt vor dem Studio');
  lines.push('- **ÖPNV:** RB34, Bus 374, FB-20, FB-21, FB-25, FB-45');
  lines.push('- **Sprache:** Deutsch');
  lines.push('');

  // Weitere Ressourcen
  lines.push('## Weitere Ressourcen');
  lines.push('');
  lines.push(`- [Sitemap](${baseUrl}/sitemap.xml)`);
  lines.push(`- [Robots.txt](${baseUrl}/robots.txt)`);
  lines.push(`- [WebMCP Tools](${baseUrl}/api/webmcp/tools)`);
  lines.push('');

  // Footer
  lines.push('---');
  lines.push('');
  lines.push('*Diese Seite wurde automatisch für AI-Agenten generiert.*');

  const content = lines.join('\n');

  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}