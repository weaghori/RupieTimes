import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from "../assets/RT-white.svg";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaHeart, FaFacebookF, FaYoutube, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full max-w-7xl mx-auto px-4 py-8 font-sans">
      <div className="bg-[#00301F] rounded-[15px] p-8 lg:p-16 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Logo & Socials */}
          <div className="flex flex-col items-start">
            <div className="mb-8">
              {/* Logo Placeholder */}
              <div className="relative w-40 h-12">
                 {/* User will add logo image here */}
                 <Image 
                   src={logo} 
                   alt="Rupie Times Logo" 
                   fill
                   className="object-contain object-left"
                 />
              </div>
            </div>
            
            {/* Social Icons */}
            <div className="flex gap-4">
              <Link href="#" className="w-10 h-10 bg-white/10 rounded-md flex items-center justify-center cursor-pointer hover:bg-[#C0934B] transition-colors group">
                <FaFacebookF className="text-white group-hover:text-white" />
              </Link>
              <Link href="#" className="w-10 h-10 bg-white/10 rounded-md flex items-center justify-center cursor-pointer hover:bg-[#C0934B] transition-colors group">
                <FaYoutube className="text-white group-hover:text-white" />
              </Link>
              <Link href="#" className="w-10 h-10 bg-white/10 rounded-md flex items-center justify-center cursor-pointer hover:bg-[#C0934B] transition-colors group">
                <FaInstagram className="text-white group-hover:text-white" />
              </Link>
              <Link href="#" className="w-10 h-10 bg-white/10 rounded-md flex items-center justify-center cursor-pointer hover:bg-[#C0934B] transition-colors group">
                <FaTwitter className="text-white group-hover:text-white" />
              </Link>
            </div>
          </div>

          {/* Column 2: Company */}
          <div className="flex flex-col">
            <h3 className="text-lg font-bold mb-6">Company</h3>
            <ul className="space-y-4 text-gray-300 text-sm">
              <li><Link href="/advertise" className="hover:text-white transition-colors">Advertise With Us</Link></li>
              <li><Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div className="flex flex-col">
            <h3 className="text-lg font-bold mb-6">Support</h3>
            <ul className="space-y-4 text-gray-300 text-sm">
              <li><Link href="/faqs" className="hover:text-white transition-colors">FAQs</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Term & Condition</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="flex flex-col">
            <h3 className="text-lg font-bold mb-6">Contact Us</h3>
            <ul className="space-y-6 text-gray-300 text-sm">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="w-5 h-5 text-[#C0934B] mt-1 flex-shrink-0" />
                <span>Madhu Vihar, Ground Floor, Office No. 4 MG Road Kandivali West; 400067</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="w-4 h-4 text-[#C0934B] flex-shrink-0" />
                <span>+911234567890</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="w-4 h-4 text-[#C0934B] flex-shrink-0" />
                <span>test.support@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-600 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-300">
          <div className="mb-4 md:mb-0">
            &copy; 2025 RUPIE TIMES
          </div>
          <div className="flex items-center gap-1">
            Made With <FaHeart className="w-3 h-3 text-white" /> By <span className="font-bold text-white">Aghori</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
