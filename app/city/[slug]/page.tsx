import { getCityDataBySlug, getAllCitySlugs } from "@/app/data/SEOText";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pageData = getCityDataBySlug(params.slug);

  if (!pageData) {
    return {
      title: "Seite nicht gefunden",
    };
  }

  return {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    openGraph: {
      title: pageData.metaTitle,
      description: pageData.metaDescription,
      type: 'website',
    },
  };
}

export default function CityPage({ params }: Props) {
  const pageData = getCityDataBySlug(params.slug);

  if (!pageData) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-slate-100/30">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-800 to-slate-900 text-white py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block px-4 py-2 bg-white/10 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-white/20">
              🚗 Nur {pageData.travelTime} von {pageData.city}
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Massage in{" "}
              <span className="bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
                {pageData.city}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Professionelle Entspannung im Balaba Studio Glauburg
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/contacts"
                className="bg-white text-slate-800 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg border border-gray-200"
              >
                📞 Jetzt Termin vereinbaren
              </Link>
              <Link
                href="/preisliste"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              >
                💰 Preisliste ansehen
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Modern Content Grid */}
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-200">
                <div
                  className="prose prose-lg max-w-none 
                    prose-headings:font-bold prose-headings:text-gray-900
                    prose-h1:text-4xl prose-h1:mb-8 prose-h1:text-gray-900
                    prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b-2 prose-h2:border-gray-200 prose-h2:text-gray-800
                    prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-gray-800
                    prose-p:text-gray-700 prose-p:leading-relaxed
                    prose-ul:list-none prose-ul:space-y-3
                    prose-li:flex prose-li:items-start prose-li:text-gray-700
                    prose-strong:text-gray-900 prose-strong:font-semibold
                    prose-blockquote:border-l-4 prose-blockquote:border-gray-400 prose-blockquote:bg-gray-50 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-xl
                    prose-blockquote:font-medium prose-blockquote:text-gray-700
                    prose-cite:text-gray-600 prose-cite:not-italic
                    prose-a:text-gray-700 prose-a:no-underline hover:prose-a:text-gray-900 prose-a:font-medium
                    [&_.services-grid]:grid [&_.services-grid]:md:grid-cols-2 [&_.services-grid]:gap-6 [&_.services-grid]:my-8
                    [&_.service-item]:bg-white [&_.service-item]:p-6 [&_.service-item]:rounded-xl [&_.service-item]:shadow-md [&_.service-item]:border [&_.service-item]:border-gray-200
                    [&_.service-item_h3]:text-lg [&_.service-item_h3]:font-bold [&_.service-item_h3]:text-gray-900 [&_.service-item_h3]:mb-2
                    [&_.service-item_p]:text-gray-600 [&_.service-item_p]:text-sm
                    [&_.services-list]:space-y-4 [&_.services-list]:my-8
                    [&_.service]:bg-white [&_.service]:p-5 [&_.service]:rounded-lg [&_.service]:shadow-sm [&_.service]:border [&_.service]:border-gray-200
                    [&_.service_h4]:font-semibold [&_.service_h4]:text-gray-900 [&_.service_h4]:mb-2
                    [&_.services-overview]:grid [&_.services-overview]:md:grid-cols-2 [&_.services-overview]:gap-6 [&_.services-overview]:my-8
                    [&_.service-card]:bg-white [&_.service-card]:p-6 [&_.service-card]:rounded-xl [&_.service-card]:shadow-md [&_.service-card]:border [&_.service-card]:border-gray-200 [&_.service-card]:hover:shadow-lg [&_.service-card]:transition-shadow
                    [&_.testimonial]:my-10 [&_.testimonial_blockquote]:text-lg [&_.testimonial_blockquote]:italic [&_.testimonial_blockquote]:text-gray-700
                    [&_.cta-button]:inline-block [&_.cta-button]:bg-gray-900 [&_.cta-button]:text-white [&_.cta-button]:px-8 [&_.cta-button]:py-4 [&_.cta-button]:rounded-xl [&_.cta-button]:font-bold [&_.cta-button]:text-lg [&_.cta-button]:hover:bg-gray-800 [&_.cta-button]:transition-all [&_.cta-button]:duration-300"
                  dangerouslySetInnerHTML={{ __html: pageData.content }}
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Contact Card */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-lg">
                  <h3 className="text-xl font-bold mb-4 text-white">📞 Direkt Kontakt</h3>
                  <div className="space-y-3">
                    <a
                      href="tel:+4915124908000"
                      className="flex items-center gap-3 p-3 bg-white/10 rounded-lg hover:bg-white/15 transition-all duration-200 border border-white/10"
                    >
                      <span className="text-lg">📱</span>
                      <span className="font-medium">+49 151 24908000</span>
                    </a>
                    <a
                      href="https://wa.me/4915124908000"
                      className="flex items-center gap-3 p-3 bg-white/10 rounded-lg hover:bg-white/15 transition-all duration-200 border border-white/10"
                    >
                      <span className="text-lg">💬</span>
                      <span className="font-medium">WhatsApp</span>
                    </a>
                    <Link
                      href="/contacts"
                      className="flex items-center gap-3 p-3 bg-white/10 rounded-lg hover:bg-white/15 transition-all duration-200 border border-white/10"
                    >
                      <span className="text-lg">📧</span>
                      <span className="font-medium">Kontaktformular</span>
                    </Link>
                  </div>
                </div>

                {/* Quick Info Card */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">ℹ️ Schnellinfo</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl text-gray-600">🕒</span>
                      <div>
                        <p className="font-semibold text-gray-900">Öffnungszeiten</p>
                        <p className="text-sm text-gray-600">Mo-Sa: 9:00-20:00</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl text-gray-600">🚗</span>
                      <div>
                        <p className="font-semibold text-gray-900">Anfahrt</p>
                        <p className="text-sm text-gray-600">Kostenlose Parkplätze</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl text-gray-600">🎁</span>
                      <div>
                        <p className="font-semibold text-gray-900">Geschenkgutscheine</p>
                        <p className="text-sm text-gray-600">Perfekt als Geschenk</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Card */}
                <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-6 text-white shadow-lg">
                  <h3 className="text-xl font-bold mb-3 text-white">✨ Jetzt buchen!</h3>
                  <p className="text-sm mb-4 text-gray-300">
                    Sichern Sie sich Ihren Wohlfühl-Termin
                  </p>
                  <Link
                    href="/contacts"
                    className="block w-full bg-white text-gray-900 text-center font-bold py-3 px-4 rounded-lg hover:bg-gray-100 transition-all duration-300 border border-gray-300"
                  >
                    Termin anfragen
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA Section */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl p-12 text-white shadow-lg">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Bereit für Entspannung?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Vereinbaren Sie noch heute Ihren Massagetermin und erleben Sie professionelle Entspannung in unserem Studio in Glauburg.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/contacts"
                  className="bg-white text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg border border-gray-300"
                >
                  📞 Jetzt Termin vereinbaren
                </Link>
                <a
                  href="tel:+4915124908000"
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-300"
                >
                  🔗 Direkt anrufen
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const slugs = getAllCitySlugs();
  
  return slugs.map((slug) => ({
    slug: slug,
  }));
}