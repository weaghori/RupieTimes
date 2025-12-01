"use client";
import React from "react";
import logo from "../assets/logo.png";
import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaShieldAlt,
  FaFileContract,
  FaCookie,
} from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-[#1e4034] text-white pt-16 pb-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c19755' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-white/20 pb-12">
          {/* Logo + Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="flex items-center gap-2 group"
                aria-label="Rupie Times Home"
              >
                <Image
                  src={logo}
                  alt="Rupie Times logo"
                  priority
                  className="h-10 w-auto sm:h-12 lg:h-14 transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              Empowering decisions with reliable insights. Get in touch with our
              analysts for personalized support.
            </p>

            {/* Social Icons - Moved to top */}
            <div className="flex space-x-3 pt-2">
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-sm bg-[#c19755] hover:bg-[#e1b36a] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                aria-label="Facebook"
              >
                <FaFacebookF className="text-sm" />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-sm bg-[#c19755] hover:bg-[#e1b36a] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                aria-label="Instagram"
              >
                <FaInstagram className="text-sm" />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-sm bg-[#c19755] hover:bg-[#e1b36a] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="text-sm" />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-sm bg-[#c19755] hover:bg-[#e1b36a] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                aria-label="Twitter"
              >
                <FaTwitter className="text-sm" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-[#c19755] relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-[#c19755] transform -translate-y-1"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/"
                  className="hover:text-[#c19755] transition-all duration-300 flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-[#c19755] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:text-[#c19755] transition-all duration-300 flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-[#c19755] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="hover:text-[#c19755] transition-all duration-300 flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-[#c19755] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Services
                </a>
              </li>
              <li>
                <a
                  href="/rupieTimes/contactUs"
                  className="hover:text-[#c19755] transition-all duration-300 flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-[#c19755] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Support - Now includes Privacy Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-[#c19755] relative inline-block">
              Support
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-[#c19755] transform -translate-y-1"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/faq"
                  className="hover:text-[#c19755] transition-all duration-300 flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-[#c19755] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="/privacy-policy"
                  className="hover:text-[#c19755] transition-all duration-300 flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-[#c19755] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="hover:text-[#c19755] transition-all duration-300 flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-[#c19755] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="/support"
                  className="hover:text-[#c19755] transition-all duration-300 flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-[#c19755] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-[#c19755] relative inline-block">
              Contact Info
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-[#c19755] transform -translate-y-1"></span>
            </h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-center space-x-3 group cursor-pointer">
                <div className="w-8 h-8 bg-[#c19755]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-[#c19755] transition-all duration-300">
                  <FaMapMarkerAlt className="text-[#c19755] text-sm group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="group-hover:text-white transition-colors duration-300">
                  11 Wall Street, New York, NY 10005
                </span>
              </li>
              <li>
                <a
                  href="tel:+18005551234"
                  className="flex items-center space-x-3 group hover:text-white transition-colors duration-300"
                >
                  <div className="w-8 h-8 bg-[#c19755]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-[#c19755] transition-all duration-300">
                    <FaPhone className="text-[#c19755] text-sm group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span>+1 (800) 555-1234</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@company.com"
                  className="flex items-center space-x-3 group hover:text-white transition-colors duration-300"
                >
                  <div className="w-8 h-8 bg-[#c19755]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-[#c19755] transition-all duration-300">
                    <FaEnvelope className="text-[#c19755] text-sm group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span>info@company.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section - Only two elements */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center">
          {/* Copyright */}
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Rupie Times. All rights reserved.
          </p>

          {/* Made with love by Aghori */}
          <div className="flex items-center text-gray-400 text-sm">
            MADE WITH&nbsp;
            <span className="flex items-center gap-1 group">
              <svg
                className="w-3.5 h-3.5 transition-colors duration-300 group-hover:fill-[#c19755] fill-current"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1.24264 8.24264L8 15L14.7574 8.24264C15.553 7.44699 16 6.36786 16 5.24264V5.05234C16 2.8143 14.1857 1 11.9477 1C10.7166 1 9.55233 1.55959 8.78331 2.52086L8 3.5L7.21669 2.52086C6.44767 1.55959 5.28338 1 4.05234 1C1.8143 1 0 2.8143 0 5.05234V5.24264C0 6.36786 0.44699 7.44699 1.24264 8.24264Z" />
              </svg>
              BY
              <a
                href="https://aghorimediahouse.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300 group-hover:text-[#c19755] font-medium"
              >
                AGHORI
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
