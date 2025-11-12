"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaInstagram,
  FaWhatsapp,
  FaFacebook,
  FaTelegram,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/preisliste", label: "Preisliste" },
  { href: "/about", label: "Über uns" },
  { href: "/contacts", label: "Kontakt" },
  { href: "/blog", label: "Blog" },
];

const socialLinks = [
  {
    href: "https://wa.me/4915124908000?text=Hallo,%20ich%20interessiere%20mich%20für%20Ihre%20Dienstleistungen",
    icon: FaWhatsapp,
    label: "WhatsApp",
  },
  {
    href: "https://instagram.com/balabastudio_glauburg",
    icon: FaInstagram,
    label: "Instagram",
  },
  {
    href: "https://facebook.com/profile.php?id=61571893245558",
    icon: FaFacebook,
    label: "Facebook",
  },
  {
    href: "https://t.me/balabastudio",
    icon: FaTelegram,
    label: "Telegram",
  },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathName = usePathname();

  const normalizePath = (p?: string) => {
    if (!p) return "/";
    try {
      let path = decodeURI(p);
      if (!path.startsWith("/")) path = "/" + path;
      if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
      return path;
    } catch {
      return p;
    }
  };

  const currentPath = useMemo(() => normalizePath(pathName ?? "/"), [pathName]);

  const toggleMenu = () => {
    setIsMenuOpen((s) => !s);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY ?? 0;
      const atTop = currentScrollY < 10;
      setIsAtTop(atTop);

      if (atTop) {
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlHeader, { passive: true });
    return () => window.removeEventListener("scroll", controlHeader);
  }, [lastScrollY]);

  useEffect(() => {
    const floatingButton = document.querySelector(
      ".fixed.bottom-6.right-6"
    ) as HTMLElement | null;

    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      if (floatingButton) floatingButton.style.display = "none";
    } else {
      document.body.style.overflow = "";
      if (floatingButton) floatingButton.style.display = "block";
    }

    return () => {
      document.body.style.overflow = "";
      if (floatingButton) floatingButton.style.display = "block";
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Spacer для фиксированного хедера */}
      <div className="h-16 md:h-20 lg:h-24" />

      {/* Основной хедер */}
      <motion.header
        className={`fixed top-0 left-0 right-0 
          flex justify-between items-center
          px-4 py-3
          sm:px-6
          md:px-8
          lg:px-12
          xl:px-16
          2xl:px-20
          bg-[#f8f7f4] z-50 
          transition-all duration-300 ${
            !isAtTop && isVisible
              ? "bg-[#f8f7f4]/95 backdrop-blur-sm shadow-sm"
              : isAtTop
              ? "bg-[#f8f7f4] shadow-none"
              : ""
          }`}
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        role="banner"
      >
        {/* Логотип */}
        <Link
          href="/"
          className="z-50 flex-shrink-0"
          aria-label="Zur Startseite"
        >
          <Image
            src="/logobeauty.webp"
            alt="Logo von Balaba Studio Massage in Glauburg"
            width={100}
            height={50}
            priority={true}
            unoptimized={true}
            className="w-20 sm:w-24 md:w-28 lg:w-32 transition-transform hover:scale-105 duration-300"
          />
        </Link>

        {/* Десктопная навигация */}
        <nav
          className="hidden md:block"
          role="navigation"
          aria-label="Hauptnavigation"
        >
          <ul className="flex gap-4 lg:gap-6 xl:gap-8 text-gray-500">
            {navLinks.map((link) => {
              const linkPath = normalizePath(link.href);
              const isActive =
                linkPath === currentPath ||
                (linkPath !== "/" && currentPath.startsWith(linkPath));
              return (
                <li key={link.href} className="relative">
                  <Link
                    href={link.href}
                    className={`transition-colors text-sm lg:text-base ${
                      isActive
                        ? "text-green-800"
                        : "text-gray-700 hover:text-green-800"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                  <div
                    className={`absolute -bottom-1 left-1/2 h-1 w-1 bg-green-600 rounded-full -translate-x-1/2 transition-all duration-300 ${
                      isActive ? "opacity-100 scale-100" : "opacity-0 scale-0"
                    }`}
                  />
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Социальные иконки (только для планшетов и десктопов) */}
        <div className="hidden md:flex items-center">
          <ul className="flex gap-2 lg:gap-3 xl:gap-4">
            {socialLinks.map((s) => {
              const Icon = s.icon;
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-green-500 transition-colors p-1 lg:p-2"
                    aria-label={s.label}
                  >
                    <Icon size={18} className="lg:w-5 lg:h-5" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Кнопка меню для мобильных */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-gray-500 hover:text-green-500 transition-colors z-50"
          aria-label={isMenuOpen ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </motion.header>

      {/* Мобильное меню */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Затемнение фона */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 md:hidden z-40"
              onClick={closeMenu}
            />

            {/* Боковое меню */}
            <motion.aside
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-lg border-l border-gray-200 md:hidden z-50 overflow-y-auto"
            >
              {/* Кнопка закрытия */}
              <div className="absolute top-4 right-4 z-50">
                <button
                  onClick={closeMenu}
                  aria-label="Menü schließen"
                  className="p-2 text-gray-500 hover:text-green-500 transition-colors"
                >
                  <FaTimes size={22} />
                </button>
              </div>

              <div className="flex flex-col h-full pt-20 pb-6 px-4">
                {/* Навигация */}
                <nav className="flex-1" aria-label="Mobile Navigation">
                  <ul className="space-y-2">
                    {navLinks.map((link, index) => {
                      const linkPath = normalizePath(link.href);
                      const isActive =
                        linkPath === currentPath ||
                        (linkPath !== "/" && currentPath.startsWith(linkPath));
                      return (
                        <motion.li
                          key={link.href}
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.08 }}
                        >
                          <Link
                            href={link.href}
                            onClick={closeMenu}
                            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                              isActive
                                ? "text-green-600 bg-green-50" // Убрал font-semibold
                                : "text-gray-500 hover:text-green-500 hover:bg-gray-50"
                            }`}
                            aria-current={isActive ? "page" : undefined}
                          >
                            {link.label}
                          </Link>
                        </motion.li>
                      );
                    })}
                  </ul>
                </nav>

                {/* Социальные иконки и CTA */}
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <p className="text-sm text-gray-500 mb-3 px-2">
                    Folgen Sie uns
                  </p>
                  <ul className="flex justify-center gap-4 mb-4">
                    {socialLinks.map((s) => {
                      const Icon = s.icon;
                      return (
                        <li key={s.label}>
                          <a
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-green-500 transition-colors"
                            onClick={closeMenu}
                            aria-label={s.label}
                          >
                            <Icon size={20} />
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="px-2">
                    <a
                      href="https://wa.me/4915124908000?text=Hallo,%20ich%20interessiere%20mich%20für%20Ihre%20Dienstleistungen"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMenu}
                      className="flex items-center justify-center gap-2 mt-8 w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
                    >
                      <FaWhatsapp size={18} />
                      Termin buchen
                    </a>
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
