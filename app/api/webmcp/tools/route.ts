import { NextResponse } from 'next/server';

export async function GET() {
  const tools = [
    {
      name: 'get_price_list',
      description: 'Ruft die aktuelle Preisliste für Massagen und Pressotherapie ab.',
      inputSchema: {
        type: 'object',
        properties: {
          category: {
            type: 'string',
            enum: ['kombipakete', 'einzelzonen', 'spezialmassagen', 'pressotherapie'],
            description: 'Optional – filtert nach Kategorie-ID',
          },
        },
        required: [],
      },
    },
    {
      name: 'book_appointment',
      description: 'Sendet eine Terminanfrage an das Studio.',
      inputSchema: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'Vollständiger Name' },
          phone: { type: 'string', description: 'Telefonnummer (inkl. Vorwahl)' },
          email: { type: 'string', format: 'email', description: 'E-Mail-Adresse (optional)' },
          serviceId: { type: 'string', description: 'ID der gewünschten Behandlung (z.B. "zone-1")' },
          datetime: { type: 'string', format: 'date-time', description: 'Wunschtermin im ISO-Format' },
          comment: { type: 'string', description: 'Besondere Wünsche (optional)' },
          whatsapp: { type: 'boolean', description: 'Bevorzugte Kommunikation per WhatsApp' },
        },
        required: ['name', 'phone', 'serviceId', 'datetime'],
      },
    },
    {
      name: 'get_contact_info',
      description: 'Liefert Kontaktdaten, Adresse, Öffnungszeiten und Social-Media-Links.',
      inputSchema: {
        type: 'object',
        properties: {},
        required: [],
      },
    },
    {
      name: 'get_blog_posts',
      description: 'Gibt eine Liste der Blog-Artikel zurück.',
      inputSchema: {
        type: 'object',
        properties: {
          limit: { type: 'integer', minimum: 1, maximum: 20, description: 'Anzahl der Einträge (Standard: 5)' },
        },
        required: [],
      },
    },
  ];

  return NextResponse.json({ tools });
}