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
          flex items-center
          px-4 py-3
          sm:px-6 sm:py-4
          lg:px-8 lg:py-4
          xl:max-w-7xl xl:mx-auto xl:px-0
          bg-[#f8f7f4] z-50 
          transition-all duration-500 ${
            !isAtTop && isVisible
              ? "bg-[#f8f7f4]/90 backdrop-blur-xl shadow-sm"
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
          className="z-50 flex-shrink-0 mr-6 lg:mr-12" 
          aria-label="Zur Startseite"
        >
          <Image
            src="/logobeauty.webp"
            alt="Logo von Balaba Studio Massage in Glauburg"
            width={120}
            height={60}
            priority={true}
            unoptimized={true}
            className="w-24 h-auto lg:w-28 transition-transform hover:scale-105 duration-300"
          />
        </Link>

        {/* Десктопная навигация */}
        <nav
          className="hidden lg:flex flex-1"
          role="navigation"
          aria-label="Hauptnavigation"
        >
          <ul className="flex space-x-1">
            {navLinks.map((link) => {
              const linkPath = normalizePath(link.href);
              const isActive =
                linkPath === currentPath ||
                (linkPath !== "/" && currentPath.startsWith(linkPath));
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "text-green-800 bg-green-50/80 font-semibold"
                        : "text-gray-700 hover:text-green-800 hover:bg-gray-100/80"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-2xl border border-green-200/60 bg-green-50/40"
                        layoutId="active-nav-bg"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Социальные иконки и CTA */}
        <div className="hidden lg:flex items-center space-x-3 ml-auto">
          <ul className="flex space-x-2">
            {socialLinks.map((s) => {
              const Icon = s.icon;
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-2xl text-gray-600 hover:text-green-600 hover:bg-white/80 transition-all duration-300 border border-transparent hover:border-green-200"
                    aria-label={s.label}
                  >
                    <Icon size={18} />
                  </a>
                </li>
              );
            })}
          </ul>
          
          {/* CTA кнопка */}
          <a
            href="https://wa.me/4915124908000?text=Hallo,%20ich%20interessiere%20mich%20für%20Ihre%20Dienstleistungen"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 px-5 py-2.5 bg-green-600 text-white rounded-2xl text-sm font-semibold hover:bg-green-700 transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md flex items-center space-x-2"
          >
            <FaWhatsapp size={16} />
            <span>Termin buchen</span>
          </a>
        </div>

        {/* Кнопка меню для мобильных */}
        <button
          onClick={toggleMenu}
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-2xl text-gray-600 hover:text-green-600 hover:bg-white/80 transition-all duration-300 ml-auto"
          aria-label={isMenuOpen ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
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
              className="fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden z-40"
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
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white/95 backdrop-blur-xl shadow-2xl border-l border-gray-200/50 lg:hidden z-50 overflow-y-auto"
            >
              <div className="flex flex-col h-full">
                {/* Заголовок и кнопка закрытия */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
                  <Image
                    src="/logobeauty.webp"
                    alt="Logo"
                    width={100}
                    height={50}
                    className="w-20 h-auto"
                  />
                  <button
                    onClick={closeMenu}
                    aria-label="Menü schließen"
                    className="flex items-center justify-center w-10 h-10 rounded-2xl text-gray-600 hover:text-green-600 hover:bg-gray-100 transition-all duration-300"
                  >
                    <FaTimes size={20} />
                  </button>
                </div>

                {/* Навигация */}
                <nav className="flex-1 p-6" aria-label="Mobile Navigation">
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
                          transition={{ delay: index * 0.05 }}
                        >
                          <Link
                            href={link.href}
                            onClick={closeMenu}
                            className={`flex items-center px-4 py-3 rounded-2xl text-lg transition-all duration-300 ${
                              isActive
                                ? "text-green-800 bg-green-50/80 font-semibold border border-green-200"
                                : "text-gray-700 hover:text-green-800 hover:bg-gray-100/80"
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
                <div className="p-6 border-t border-gray-200/50 space-y-6">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-4 text-center">
                      Folgen Sie uns
                    </p>
                    <ul className="flex justify-center space-x-4">
                      {socialLinks.map((s) => {
                        const Icon = s.icon;
                        return (
                          <li key={s.label}>
                            <a
                              href={s.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center w-12 h-12 rounded-2xl text-gray-600 hover:text-green-600 hover:bg-gray-100 transition-all duration-300"
                              onClick={closeMenu}
                              aria-label={s.label}
                            >
                              <Icon size={20} />
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  
                  <a
                    href="https://wa.me/4915124908000?text=Hallo,%20ich%20interessiere%20mich%20für%20Ihre%20Dienstleistungen"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                    className="flex items-center justify-center space-x-3 w-full bg-green-600 text-white py-4 px-6 rounded-2xl font-semibold hover:bg-green-700 transition-all duration-300 hover:scale-105 shadow-sm"
                  >
                    <FaWhatsapp size={20} />
                    <span>Termin buchen</span>
                  </a>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
