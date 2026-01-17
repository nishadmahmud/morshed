import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp, FaYoutube, FaLinkedin } from "react-icons/fa6";
import { Mail, MapPin, Phone, Clock } from "lucide-react";

const companyLogo = '/morshed-mart-logo-removebg-preview.png';
const noImg = '/no-image.jpg';

export default function Footer() {
  return (
    <footer className="bg-[#030B22] text-gray-300 pt-16 pb-8 border-t-4 border-[#033D7D]">
      <div className="container mx-auto px-4 md:px-8">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Column 1: Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <Image
                src={companyLogo}
                alt="Morshed Mart Logo"
                width={180}
                height={60}
                className="brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Your one-stop destination for premium fashion and lifestyle products. Quality meets style at Morshed Mart.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 pt-2">
              {[
                { icon: FaWhatsapp, href: "https://wa.me/+8801970085954", color: "hover:bg-green-600" },
                { icon: FaFacebook, href: "https://www.facebook.com/morshed.mart2.0", color: "hover:bg-blue-600" },
                { icon: FaInstagram, href: "#", color: "hover:bg-pink-600" },
                { icon: FaYoutube, href: "#", color: "hover:bg-red-600" },
                { icon: FaTiktok, href: "#", color: "hover:bg-black" },
              ].map(({ icon: Icon, href, color }, index) => (
                <Link
                  key={index}
                  href={href}
                  target="_blank"
                  className={`w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 ${color} hover:text-white hover:-translate-y-1`}
                >
                  <Icon className="text-xl" />
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
              Company
              <span className="absolute bottom-[-8px] left-0 w-12 h-1 bg-[#033D7D] rounded-full"></span>
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about-us" className="hover:text-[#033D7D] hover:pl-2 transition-all duration-300">About Us</Link></li>
              <li><Link href="/blogs" className="hover:text-[#033D7D] hover:pl-2 transition-all duration-300">Our Blogs</Link></li>
              <li><Link href="/wishlist" className="hover:text-[#033D7D] hover:pl-2 transition-all duration-300">My Wishlist</Link></li>
              <li><Link href="/export-info" className="hover:text-[#033D7D] hover:pl-2 transition-all duration-300">Export Information</Link></li>
            </ul>
          </div>

          {/* Column 3: Customer Care (Includes Track Order) */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
              Customer Care
              <span className="absolute bottom-[-8px] left-0 w-12 h-1 bg-[#033D7D] rounded-full"></span>
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/order-tracking" className="hover:text-[#033D7D] hover:pl-2 transition-all duration-300 font-semibold text-white">Track Your Order</Link></li>
              <li><Link href="/faq" className="hover:text-[#033D7D] hover:pl-2 transition-all duration-300">FAQs</Link></li>
              <li><Link href="/return-exchange-policy" className="hover:text-[#033D7D] hover:pl-2 transition-all duration-300">Return & Exchange</Link></li>
              <li><Link href="/refund-policy" className="hover:text-[#033D7D] hover:pl-2 transition-all duration-300">Refund Policy</Link></li>
              <li><Link href="/delivery-terms-and-conditions" className="hover:text-[#033D7D] hover:pl-2 transition-all duration-300">Delivery Terms</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-[#033D7D] hover:pl-2 transition-all duration-300">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
              Contact Us
              <span className="absolute bottom-[-8px] left-0 w-12 h-1 bg-[#033D7D] rounded-full"></span>
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#033D7D] mt-1 shrink-0" />
                <a href="https://maps.app.goo.gl/r2PZTybTwgb8SLd5A" target="_blank" className="hover:text-white transition-colors">
                  Rampura, Dhaka, Bangladesh
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#033D7D] shrink-0" />
                <a href="tel:+8801970085954" className="hover:text-white transition-colors">+880 1970 085 954</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#033D7D] shrink-0" />
                <a href="mailto:support@morshedmart.com" className="hover:text-white transition-colors">support@morshedmart.com</a>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#033D7D] mt-1 shrink-0" />
                <div>
                  <p>Sat - Thu: 10:00 AM - 8:00 PM</p>
                  <p className="text-xs text-gray-500">Friday Closed</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Payment Banner */}
        <div className="border-t border-gray-800 pt-8 pb-6 flex justify-center">
          <div className="relative w-full max-w-4xl h-16 md:h-24">
            {/* Desktop Banner */}
            <Image
              src="/Payment Banner_Jul24_V1-02.png"
              alt="Payment Methods"
              fill
              className="object-contain hidden md:block"
            />
            {/* Mobile Banner */}
            <Image
              src="/Payment Banner_Jul24_V1-04.png"
              alt="Payment Methods Mobile"
              fill
              className="object-contain md:hidden"
            />
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} <span className="text-white font-medium">Morshed Mart</span>. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            Designed & Developed by <Link href="https://squadinnovators.com" target="_blank" className="text-[#033D7D] hover:text-white transition-colors font-semibold">Squad Innovators</Link>
          </p>
        </div>

      </div>
    </footer>
  );
}
