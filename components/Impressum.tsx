"use client";

import React from "react";

// Типы для данных
type Address = {
  company: string;
  street: string;
  city: string;
  country: string;
};

type ContactItem = {
  type: string;
  label: string;
  value: string;
  href: string;
};

type Link = {
  text: string;
  url: string;
};

type ContentItem = {
  type: string;
  title?: string;
  subtitle?: string;
  text?: string;
  important?: string;
  address?: Address;
  name?: string;
  contacts?: ContactItem[];
  items?: string[];
  link?: Link;
};

type Section = {
  id: string;
  title: string;
  icon: string;
  content: ContentItem[];
};

type ImpressumData = {
  sections: Section[];
};

import impressumData from "../app/data/impressum-data.json";

const Impressum: React.FC = () => {
  const renderContent = (content: ContentItem) => {
    switch (content.type) {
      case "address":
        return (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg md:rounded-xl p-4 md:p-6 mb-4 md:mb-6 border border-blue-100">
            <address className="not-italic text-gray-700">
              <strong className="text-lg md:text-xl text-gray-900 block mb-2 md:mb-3">
                {content.address?.company}
              </strong>
              <div className="space-y-1 md:space-y-2">
                <p className="flex items-center text-sm md:text-base">
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5 text-blue-600 mr-2 md:mr-3 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {content.address?.street}
                </p>
                <p className="ml-6 md:ml-8 text-sm md:text-base">
                  {content.address?.city}
                </p>
                <p className="ml-6 md:ml-8 text-sm md:text-base">
                  {content.address?.country}
                </p>
              </div>
            </address>
          </div>
        );

      case "representative":
        return (
          <div className="bg-gray-50 rounded-lg md:rounded-xl p-4 md:p-6 mb-4 md:mb-6">
            <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2 md:mb-3">
              {content.title}
            </h3>
            <p className="text-gray-700 text-sm md:text-base">{content.name}</p>
          </div>
        );

      case "contact":
        return (
          <div className="bg-gray-50 rounded-lg md:rounded-xl p-4 md:p-6 mb-4 md:mb-6">
            <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-3 md:mb-4 flex items-center">
              <svg
                className="w-4 h-4 md:w-5 md:h-5 text-purple-600 mr-2 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              {content.title}
            </h3>
            <div className="space-y-1 md:space-y-2">
              {content.contacts?.map((contact, index) => (
                <p
                  key={index}
                  className="flex items-center text-gray-700 text-sm md:text-base"
                >
                  <span className="text-gray-600">{contact.label}</span>
                  <a
                    href={contact.href}
                    className="hover:text-blue-600 transition-colors duration-200 ml-1 break-all"
                  >
                    {contact.value}
                  </a>
                </p>
              ))}
            </div>
          </div>
        );

      case "notes":
        return (
          <div className="bg-yellow-50 rounded-lg md:rounded-xl p-4 md:p-6 mb-4 md:mb-6 border border-yellow-100">
            <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2 md:mb-3">
              {content.title}
            </h3>
            <p className="text-gray-700 text-sm md:text-base mb-2 md:mb-3">
              {content.text}
            </p>
            <ul className="list-disc list-inside text-gray-700 text-sm md:text-base space-y-1">
              {content.items?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        );

      case "development":
        return (
          <div className="bg-gray-50 rounded-lg md:rounded-xl p-4 md:p-6 mb-4 md:mb-6">
            <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2 md:mb-3">
              {content.title}
            </h3>
            <p className="text-gray-700 text-sm md:text-base">{content.text}</p>
          </div>
        );

      case "platform":
        return (
          <div className="bg-blue-50 rounded-lg md:rounded-xl p-4 md:p-6 mb-4 md:mb-6 border border-blue-100">
            <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2 md:mb-3">
              {content.title}
            </h3>
            <p className="text-gray-700 text-sm md:text-base mb-2 md:mb-3">
              {content.text}
            </p>
            {content.link && (
              <a
                href={content.link.url}
                className="text-blue-600 hover:text-blue-800 transition-colors duration-200 text-sm md:text-base break-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                {content.link.text}
              </a>
            )}
          </div>
        );

      case "text":
        return (
          <div className="bg-gray-50 rounded-lg md:rounded-xl p-4 md:p-6 hover:shadow-md transition-shadow duration-200">
            {content.subtitle && (
              <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2 md:mb-3">
                {content.subtitle}
              </h3>
            )}
            <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm md:text-base">
              {content.text}
            </p>
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
            Impressum
          </h1>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-[#637440] mx-auto rounded-full"></div>
        </div>

        <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 mb-6 md:mb-8 border border-gray-100">
          {(impressumData as ImpressumData).sections.map((section) => (
            <section
              key={section.id}
              aria-labelledby={section.id}
              className="mb-6 md:mb-8 lg:mb-10"
            >
              <div className="flex items-center mb-4 md:mb-6">
                <div className="w-2 h-6 md:w-3 md:h-8 bg-blue-600 rounded-full mr-3 md:mr-4"></div>
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
      </div>
    </main>
  );
};

export default Impressum;
