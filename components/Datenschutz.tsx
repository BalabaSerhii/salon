"use client";

import React from "react";

type Link = {
  text: string;
  url: string;
  label?: string;
};

type ContentItem = {
  type: string;
  title?: string;
  subtitle?: string;
  text?: string;
  important?: string;
  link?: Link;
};

type Section = {
  id: string;
  title: string;
  icon: string;
  content: ContentItem[];
};

type SocialContact = {
  type: string;
  label: string;
  value: string;
  href: string;
};

type Contact = {
  company: string;
  address: {
    street: string;
    city: string;
  };
  phone: string;
  email: string;
  social?: SocialContact[];
};

type DatenschutzData = {
  sections: Section[];
  contact: Contact;
};

import datenschutzData from "../app/data/datenschutz-data.json";
import { Icons } from "./Icons";

const Datenschutz: React.FC = () => {
  const renderContent = (content: ContentItem) => {
    switch (content.type) {
      case "text":
        return (
          <div className="bg-gray-50 rounded-lg md:rounded-xl p-4 md:p-6 hover:shadow-md transition-shadow duration-200">
            {content.subtitle && (
              <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-3 md:mb-4 flex items-center">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-500 rounded-full mr-2 md:mr-3 flex-shrink-0"></div>
                {content.subtitle}
              </h3>
            )}

            <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm md:text-base">
              {content.text}
            </p>

            {content.important && (
              <div className="mt-3 md:mt-4 p-3 md:p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 font-semibold text-sm md:text-base">
                  {content.important}
                </p>
              </div>
            )}

            {content.link && (
              <div className="mt-2 md:mt-3">
                <p className="text-gray-700 text-sm md:text-base">
                  {content.link.text}
                </p>
                <a
                  href={content.link.url}
                  className="text-blue-600 hover:text-blue-800 transition-colors duration-200 inline-block mt-1 md:mt-2 text-sm md:text-base break-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {content.link.label || content.link.url}
                </a>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-4 md:py-8 lg:py-12">
      <div className="container mx-auto px-3 sm:px-4 max-w-4xl">
        <div className="text-center mb-6 md:mb-8 lg:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 md:mb-4">
            DATENSCHUTZ
          </h1>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-[#637440] mx-auto rounded-full"></div>
        </div>

        <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 mb-6 md:mb-8 border border-gray-100">
          <div className="space-y-8 md:space-y-10 lg:space-y-12">
            {(datenschutzData as DatenschutzData).sections.map((section) => (
              <section
                key={section.id}
                aria-labelledby={section.id}
                className="border-l-2 md:border-l-4 border-blue-200 pl-4 md:pl-6 ml-1 md:ml-2"
              >
                <div className="flex items-center mb-6 md:mb-8">
                  <span className="text-xl md:text-2xl mr-3 md:mr-4">
                    {section.icon}
                  </span>
                  <h2
                    id={section.id}
                    className="text-xl sm:text-2xl font-bold text-gray-800"
                  >
                    {section.title}
                  </h2>
                </div>

                <div className="space-y-4 md:space-y-6">
                  {section.content.map((content, index) => (
                    <div key={index}>{renderContent(content)}</div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Contact Section */}
          <section className="mt-8 md:mt-10 lg:mt-12 pt-6 md:pt-8 border-t border-gray-200">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 border border-blue-100">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 pb-3 mb-4 md:mb-6 flex items-center">
                <svg
                  className="w-5 h-5 md:w-6 md:h-6 text-blue-600 mr-2 md:mr-3 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Verantwortlicher für die Datenverarbeitung
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
                <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-sm">
                  <h4 className="text-base md:text-lg font-semibold text-gray-800 mb-3 md:mb-4">
                    {(datenschutzData as DatenschutzData).contact.company}
                  </h4>
                  <div className="space-y-1 md:space-y-2 text-gray-700 text-sm md:text-base">
                    <p>
                      {
                        (datenschutzData as DatenschutzData).contact.address
                          .street
                      }
                    </p>
                    <p>
                      {
                        (datenschutzData as DatenschutzData).contact.address
                          .city
                      }
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-sm">
                  <h4 className="text-base md:text-lg font-semibold text-gray-800 mb-3 md:mb-4">
                    Kontakt
                  </h4>
                  <div className="space-y-2 md:space-y-3 text-gray-700">
                    <p className="flex items-center text-sm md:text-base">
                      <Icons.Phone className="w-4 h-4 md:w-5 md:h-5 text-green-600 mr-2 md:mr-3 flex-shrink-0" />
                      <a
                        href={`tel:${
                          (datenschutzData as DatenschutzData).contact.phone
                        }`}
                        className="hover:text-blue-600 transition-colors duration-200 break-all"
                      >
                        {(datenschutzData as DatenschutzData).contact.phone}
                      </a>
                    </p>
                    <p className="flex items-center text-sm md:text-base">
                      <Icons.Email className="w-4 h-4 md:w-5 md:h-5 text-purple-600 mr-2 md:mr-3 flex-shrink-0" />
                      <a
                        href={`mailto:${
                          (datenschutzData as DatenschutzData).contact.email
                        }`}
                        className="hover:text-blue-600 transition-colors duration-200 break-all"
                      >
                        {(datenschutzData as DatenschutzData).contact.email}
                      </a>
                    </p>

                    {/* Social Media Contacts */}
                    {(datenschutzData as DatenschutzData).contact.social?.map(
                      (social, index) => (
                        <p
                          key={index}
                          className="flex items-center text-sm md:text-base"
                        >
                          {social.type === "instagram" && (
                            <Icons.Instagram className="w-4 h-4 md:w-5 md:h-5 text-pink-600 mr-2 md:mr-3 flex-shrink-0" />
                          )}
                          {social.type === "whatsapp" && (
                            <Icons.WhatsApp className="w-4 h-4 md:w-5 md:h-5 text-green-600 mr-2 md:mr-3 flex-shrink-0" />
                          )}
                          {social.type === "telegram" && (
                            <Icons.Telegram className="w-4 h-4 md:w-5 md:h-5 text-blue-500 mr-2 md:mr-3 flex-shrink-0" />
                          )}
                          <a
                            href={social.href}
                            className="hover:text-blue-600 transition-colors duration-200 break-all"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {social.value}
                          </a>
                        </p>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Datenschutz;
