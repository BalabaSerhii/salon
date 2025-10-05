"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  FaInstagram, 
  FaWhatsapp, 
  FaFacebook, 
  FaTelegram,
  FaBars,
  FaTimes 
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
  }
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathName = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Логика скрытия/показа хедера при скролле
  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;

      // Проверяем находимся ли мы в самом верху
      const atTop = currentScrollY < 10; // Небольшой порог для плавности
      setIsAtTop(atTop);

      if (atTop) {
        // В самом верху страницы - всегда показываем
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY) {
        // Скроллим вверх - показываем
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Скроллим вниз и проскроллили больше 100px - скрываем
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlHeader, { passive: true });

    return () => {
      window.removeEventListener('scroll', controlHeader);
    };
  }, [lastScrollY]);

  // Блокировка скролла при открытом меню
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      // Скрываем плавающую кнопку WhatsApp
      const floatingButton = document.querySelector('.fixed.bottom-6.right-6');
      if (floatingButton) {
        (floatingButton as HTMLElement).style.display = 'none';
      }
    } else {
      document.body.style.overflow = 'unset';
      // Показываем плавающую кнопку WhatsApp
      const floatingButton = document.querySelector('.fixed.bottom-6.right-6');
      if (floatingButton) {
        (floatingButton as HTMLElement).style.display = 'block';
      }
    }

    return () => {
      document.body.style.overflow = 'unset';
      const floatingButton = document.querySelector('.fixed.bottom-6.right-6');
      if (floatingButton) {
        (floatingButton as HTMLElement).style.display = 'block';
      }
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Spacer для компенсации высоты хедера */}
      <div className="h-20 md:h-24" />
      
      <motion.header
        className={`fixed top-0 left-0 right-0 flex justify-between items-center p-5 border-b border-gray-200 bg-white z-50 transition-all duration-300 ${
          !isAtTop && isVisible ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 
          isAtTop ? 'bg-white shadow-none' : ''
        }`}
        initial={{ y: 0 }}
        animate={{ 
          y: isVisible ? 0 : -100 
        }}
        transition={{ 
          type: "spring", 
          damping: 25, 
          stiffness: 200 
        }}
      >
        {/* Logo */}
        <Link href="/" className="z-50">
          <Image 
            src="/balabastudio.png" 
            alt="Logo" 
            width={100} 
            height={50} 
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex gap-8 text-gray-500">
            {navLinks.map((link) => {
              const isActive = pathName === link.href;
              return (
                <li key={link.href} className="relative">
                  <Link 
                    href={link.href}
                    className={`transition-colors ${
                      isActive ? "text-green-600" : "text-gray-500 hover:text-green-500"
                    }`}
                  >
                    {link.label}
                  </Link>
                  {isActive && (
                    <motion.span
                      layoutId="active-dot"
                      className="absolute -bottom-1 left-1/2 h-1 w-1 bg-green-600 rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Desktop Social Links */}
        <div className="hidden md:block">
          <ul className="social-links flex gap-2">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-green-500 transition-colors"
                >
                  <social.icon size={20} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-gray-500 hover:text-green-500 transition-colors z-50"
          aria-label={isMenuOpen ? "Menü schließen" : "Menü öffnen"}
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </motion.header>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop с блокировкой */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 md:hidden z-40"
              onClick={closeMenu}
            />
            
            {/* Menu Panel с крестиком для закрытия */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-64 bg-white shadow-lg border-l border-gray-200 md:hidden z-50 overflow-y-auto"
            >
              {/* Крестик для закрытия меню */}
              <div className="absolute top-5 right-5 z-50">
                <button
                  onClick={closeMenu}
                  className="p-2 text-gray-500 hover:text-green-500 transition-colors"
                  aria-label="Menü schließen"
                >
                  <FaTimes size={24} />
                </button>
              </div>

              <div className="flex flex-col h-full pt-20 pb-6 px-4">
                
                {/* Mobile Navigation Links */}
                <nav className="flex-1">
                  <ul className="space-y-2">
                    {navLinks.map((link, index) => {
                      const isActive = pathName === link.href;
                      return (
                        <motion.li
                          key={link.href}
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Link
                            href={link.href}
                            onClick={closeMenu}
                            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                              isActive
                                ? "text-green-600 bg-green-50"
                                : "text-gray-500 hover:text-green-500 hover:bg-gray-50"
                            }`}
                          >
                            {link.label}
                          </Link>
                        </motion.li>
                      );
                    })}
                  </ul>
                </nav>

                {/* Mobile Social Links */}
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-500 mb-3 px-2">Folgen Sie uns</p>
                  <ul className="flex justify-center gap-4">
                    {socialLinks.map((social) => (
                      <li key={social.label}>
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-green-500 transition-colors"
                          onClick={closeMenu}
                        >
                          <social.icon size={20} />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button for Mobile */}
                <div className="mt-6">
                  <a
                    href="https://wa.me/4915124908000?text=Hallo,%20ich%20interessiere%20mich%20für%20Ihre%20Dienstleistungen"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                    className="flex items-center justify-center gap-2 w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
                  >
                    <FaWhatsapp size={18} />
                    Termin buchen
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}