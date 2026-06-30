import { NextRequest, NextResponse } from 'next/server';
import { priceCategories } from '@/app/data/prices';

// Визначте тип BlogPost, якщо він не експортується з blogData
interface BlogPost {
  id: string;
  title: string;
  excerpt?: string;
  date?: string;
  content?: string;
}

// Імпортуйте blogPosts з перевіркою на існування
let blogPosts: BlogPost[] = [];
try {
  const blogData = await import('@/app/data/blogData');
  blogPosts = blogData.blogPosts || [];
} catch (e) {
  console.log('blogData not found, using empty array');
}

export async function POST(req: NextRequest) {
  try {
    const { tool, arguments: args } = await req.json();

    switch (tool) {
      case 'get_price_list': {
        const { category } = args || {};
        let data = priceCategories;
        if (category) {
          data = data.filter((cat) => cat.id === category);
        }
        return NextResponse.json({ result: data });
      }

      case 'get_contact_info': {
        const contact = {
          address: 'Hermstrasse 37, 63695 Glauburg-Stockheim',
          phone: '+49 151 24908000',
          email: 'balabamassage@gmail.com',
          whatsapp: 'https://wa.me/4915124908000',
          instagram: 'https://www.instagram.com/balabastudio_glauburg/',
          facebook: 'https://www.facebook.com/profile.php?id=61571893245558',
          openingHours: 'Mo–Sa 09:00–20:00 Uhr, So geschlossen',
          parking: '3 kostenlose Parkplätze vor dem Studio',
        };
        return NextResponse.json({ result: contact });
      }

      case 'book_appointment': {
        console.log('Booking request:', args);
        return NextResponse.json({
          result: {
            status: 'success',
            message: 'Ihre Terminanfrage wurde entgegengenommen. Wir melden uns innerhalb von 24 Stunden.',
          },
        });
      }

      case 'get_blog_posts': {
        const limit = args?.limit || 5;
        const posts = (blogPosts || []).slice(0, limit).map((post) => ({
          id: post.id,
          title: post.title || 'Blog Post',
          excerpt: post.excerpt || '',
          date: post.date || new Date().toISOString().split('T')[0],
          link: `https://www.balabastudio.de/blog/${post.id}`,
        }));
        return NextResponse.json({ result: posts });
      }

      default:
        return NextResponse.json(
          { error: `Unknown tool: ${tool}` },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('WebMCP execute error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}