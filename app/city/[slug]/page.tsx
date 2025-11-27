import { getCityDataBySlug, getAllCitySlugs } from "@/app/data/SEOText";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaParking,
} from "react-icons/fa";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pageData = getCityDataBySlug(slug);

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
      type: "website",
    },
  };
}

export default async function CityPage({ params }: Props) {
  const { slug } = await params;
  const pageData = getCityDataBySlug(slug);

  if (!pageData) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-4 sm:py-8">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-green-700 text-white py-16 sm:py-20">
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block px-4 py-2 bg-white/10 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-white/20">
              🚗 Nur {pageData.travelTime} von {pageData.city}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Massage in{" "}
              <span className="bg-gradient-to-r from-green-100 to-green-300 bg-clip-text text-transparent">
                {pageData.city}
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Professionelle Entspannung im Balaba Studio Glauburg
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/contacts"
                className="bg-white text-green-800 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg border border-green-200 flex items-center justify-center"
              >
                📞 Jetzt Termin vereinbaren
              </Link>
              <Link
                href="/preisliste"
                className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm flex items-center justify-center"
              >
                💰 Preisliste ansehen
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Modern Content Grid */}
          <div className="grid lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-12 border border-green-100 text-gray-700">
                <div
                  className="prose prose-lg max-w-none 
                    prose-headings:font-bold prose-headings:text-gray-900
                    prose-h1:text-3xl sm:text-4xl prose-h1:mb-6 sm:mb-8 prose-h1:text-gray-900
                    prose-h2:text-xl sm:text-2xl prose-h2:mt-8 sm:mt-12 prose-h2:mb-4 sm:mb-6 prose-h2:pb-2 sm:pb-3 prose-h2:border-b-2 prose-h2:border-green-200 prose-h2:text-gray-800
                    prose-h3:text-lg sm:text-xl prose-h3:mt-6 sm:mt-8 prose-h3:mb-3 sm:mb-4 prose-h3:text-gray-800
                    prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-base sm:text-lg
                    prose-ul:list-none prose-ul:space-y-2 sm:space-y-3
                    prose-li:flex prose-li:items-start prose-li:text-gray-700 prose-li:text-base sm:text-lg
                    prose-strong:text-gray-900 prose-strong:font-semibold
                    prose-blockquote:border-l-4 prose-blockquote:border-green-400 prose-blockquote:bg-green-50 prose-blockquote:px-4 sm:px-6 prose-blockquote:py-3 sm:py-4 prose-blockquote:rounded-xl
                    prose-blockquote:font-medium prose-blockquote:text-gray-700
                    prose-cite:text-gray-600 prose-cite:not-italic
                    prose-a:text-green-600 prose-a:no-underline hover:prose-a:text-green-700 prose-a:font-medium
                    [&_.services-grid]:grid [&_.services-grid]:md:grid-cols-2 [&_.services-grid]:gap-4 sm:gap-6 [&_.services-grid]:my-6 sm:my-8
                    [&_.service-item]:bg-white [&_.service-item]:p-4 sm:p-6 [&_.service-item]:rounded-xl [&_.service-item]:shadow-md [&_.service-item]:border [&_.service-item]:border-green-200
                    [&_.service-item_h3]:text-base sm:text-lg [&_.service-item_h3]:font-bold [&_.service-item_h3]:text-gray-900 [&_.service-item_h3]:mb-2
                    [&_.service-item_p]:text-gray-600 [&_.service-item_p]:text-sm sm:text-base
                    [&_.services-list]:space-y-3 sm:space-y-4 [&_.services-list]:my-6 sm:my-8
                    [&_.service]:bg-white [&_.service]:p-4 sm:p-5 [&_.service]:rounded-lg [&_.service]:shadow-sm [&_.service]:border [&_.service]:border-green-200
                    [&_.service_h4]:font-semibold [&_.service_h4]:text-gray-900 [&_.service_h4]:mb-2
                    [&_.services-overview]:grid [&_.services-overview]:md:grid-cols-2 [&_.services-overview]:gap-4 sm:gap-6 [&_.services-overview]:my-6 sm:my-8
                    [&_.service-card]:bg-white [&_.service-card]:p-4 sm:p-6 [&_.service-card]:rounded-xl [&_.service-card]:shadow-md [&_.service-card]:border [&_.service-card]:border-green-200 [&_.service-card]:hover:shadow-lg [&_.service-card]:transition-shadow
                    [&_.testimonial]:my-8 sm:my-10 [&_.testimonial_blockquote]:text-base sm:text-lg [&_.testimonial_blockquote]:italic [&_.testimonial_blockquote]:text-gray-700
                    [&_.cta-button]:inline-block [&_.cta-button]:bg-gradient-to-r [&_.cta-button]:from-green-500 [&_.cta-button]:to-green-600 [&_.cta-button]:text-white [&_.cta-button]:px-6 sm:px-8 [&_.cta-button]:py-3 sm:py-4 [&_.cta-button]:rounded-xl [&_.cta-button]:font-bold [&_.cta-button]:text-base sm:text-lg [&_.cta-button]:hover:from-green-600 [&_.cta-button]:hover:to-green-700 [&_.cta-button]:transition-all [&_.cta-button]:duration-300 [&_.cta-button]:shadow-lg [&_.cta-button]:hover:shadow-xl [&_.cta-button]:transform [&_.cta-button]:hover:-translate-y-0.5"
                  dangerouslySetInnerHTML={{ __html: pageData.content }}
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-4 sm:space-y-6">
                {/* Contact Card */}
                <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-4 sm:p-6 text-white shadow-lg">
                  <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white flex items-center justify-center">
                    <FaPhone className="mr-2 text-lg" />
                    Direkt Kontakt
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    <a
                      href="tel:+4915124908000"
                      className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white/10 rounded-lg hover:bg-white/15 transition-all duration-200 border border-white/10 text-sm sm:text-base"
                    >
                      <FaPhone className="text-green-300 flex-shrink-0" />
                      <span className="font-medium">+49 151 24908000</span>
                    </a>
                    <a
                      href="https://wa.me/4915124908000"
                      className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white/10 rounded-lg hover:bg-white/15 transition-all duration-200 border border-white/10 text-sm sm:text-base"
                    >
                      <FaWhatsapp className="text-green-300 flex-shrink-0" />
                      <span className="font-medium">WhatsApp</span>
                    </a>
                    <Link
                      href="/contacts"
                      className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white/10 rounded-lg hover:bg-white/15 transition-all duration-200 border border-white/10 text-sm sm:text-base"
                    >
                      <FaEnvelope className="text-green-300 flex-shrink-0" />
                      <span className="font-medium">Kontaktformular</span>
                    </Link>
                  </div>
                </div>

                {/* Quick Info Card */}
                <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-green-200">
                  <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900 flex items-center">
                    <FaClock className="mr-2 text-green-600" />
                    Schnellinfo
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <FaClock className="text-green-500 text-lg flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900 text-sm sm:text-base">
                          Öffnungszeiten
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600">
                          Mo-Sa: 9:00-20:00
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <FaParking className="text-green-500 text-lg flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900 text-sm sm:text-base">
                          Anfahrt
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600">
                          Kostenlose Parkplätze
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <FaMapMarkerAlt className="text-green-500 text-lg flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900 text-sm sm:text-base">
                          Standort
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600">
                          <a 
                            href="https://www.google.com/maps/place/Balaba+Massage+Studio/@50.3251245,9.0124268,20.58z/data=!4m6!3m5!1s0x47bd1ff68239fc3d:0xacd5e4c867c97da6!8m2!3d50.3250513!4d9.0123212!16s%2Fg%2F11wxg0z523?entry=ttu&g_ep=EgoyMDI1MTEyMy4xIKXMDSoASAFQAw%3D%3D" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:text-green-600 transition-colors"
                          >
                            Hermstrasse 37, Glauburg
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Media Card */}
                <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-green-200">
                  <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900 flex items-center justify-center">
                    Folge uns
                  </h3>
                  <div className="flex justify-center gap-4">
                    <a
                      href="https://www.instagram.com/balabastudio_glauburg/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-110 shadow-lg hover:shadow-xl"
                      aria-label="Instagram"
                    >
                      <FaInstagram size={20} />
                    </a>
                    <a
                      href="https://www.facebook.com/profile.php?id=61571893245558"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-all transform hover:scale-110 shadow-lg hover:shadow-xl"
                      aria-label="Facebook"
                    >
                      <FaFacebook size={20} />
                    </a>
                  </div>
                </div>

                {/* CTA Card */}
                <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-4 sm:p-6 text-white shadow-lg">
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white text-center">
                    ✨ Jetzt buchen!
                  </h3>
                  <p className="text-xs sm:text-sm mb-3 sm:mb-4 text-green-300 text-center">
                    Nimm einen Termin ohne wochenlange Wartezeit
                  </p>
                  <Link
                    href="/contacts"
                    className="block w-full bg-white text-green-800 text-center font-bold py-2 sm:py-3 px-4 rounded-lg hover:bg-gray-100 transition-all duration-300 border border-green-300 text-sm sm:text-base"
                  >
                    Termin anfragen
                  </Link>
                </div>
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