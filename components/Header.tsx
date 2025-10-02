"use client";
import Link from "next/link";
import Image from "next/image";
import {
  FaInstagram,
  FaWhatsapp,
  FaFacebook,
  FaTelegram,
} from "react-icons/fa";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/price", label: "Preisliste" },
  { href: "/about", label: "Über uns" },
  { href: "/contacts", label: "Kontakt" },
  { href: "/blog", label: "Blog" },
];
export default function Header() {
  const pathName = usePathname();
  return (
    <header className="flex justify-between items-center p-5">
      <Link href="/">
        <Image src="/BalabaStudio.png" alt="Logo" width={100} height={50} />
      </Link>

      <nav>
        <ul className="flex gap-8 text-gray-500">
          {navLinks.map((link) => {
            const isActive = pathName === link.href;
            return (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  className={`transition-colors ${
                    isActive
                      ? "text-green-600 "
                      : "text-gray-500 hover:text-green-500"
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
      <section>
        <ul className="social-links flex gap-2">
          <li>
            <a
              href="https://wa.me/4915124908000?text=Hallo,%20ich%20interessiere%20mich%20für%20Ihre%20Dienstleistungen"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp size={20}/>
            </a>
          </li>
          <li>
            <a
              href="https://wa.me/4915124908000?text=Hallo,%20ich%20interessiere%20mich%20für%20Ihre%20Dienstleistungen"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={20}/>
            </a>
          </li>
          <li>
            <a
              href="https://wa.me/4915124908000?text=Hallo,%20ich%20interessiere%20mich%20für%20Ihre%20Dienstleistungen"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook size={20}/>
            </a>
          </li>
          <li>
            <a
              href="https://wa.me/4915124908000?text=Hallo,%20ich%20interessiere%20mich%20für%20Ihre%20Dienstleistungen"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTelegram size={20}/>
            </a>
          </li>
        </ul>
      </section>
    </header>
  );
}
