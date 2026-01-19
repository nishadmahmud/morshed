import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp, FaYoutube } from "react-icons/fa6";
import { Mail, MapPin, Phone, Clock } from "lucide-react";

const companyLogo = '/morshed-mart-logo-removebg-preview.png';

export default function Footer() {
  return (
    <footer className="bg-[#0a1628] text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">

          {/* Column 1: Brand Info */}
          <div className="space-y-5">
            <Link href="/" className="inline-block">
              <Image
                src={companyLogo}
                alt="Morshed Mart Logo"
                width={160}
                height={50}
                className="brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
                unoptimized
              />
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Your one-stop destination for premium fashion and lifestyle products. Quality meets style at Morshed Mart.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 pt-2">
              {[
                { icon: FaWhatsapp, href: "https://wa.me/+8801970085954" },
                { icon: FaFacebook, href: "https://www.facebook.com/morshed.mart2.0" },
                { icon: FaInstagram, href: "#" },
                { icon: FaYoutube, href: "#" },
                { icon: FaTiktok, href: "#" },
              ].map(({ icon: Icon, href }, index) => (
                <Link
                  key={index}
                  href={href}
                  target="_blank"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#0f766e] hover:border-[#0f766e] transition-all duration-300 hover:-translate-y-1"
                >
                  <Icon className="text-lg" />
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Company */}
          <div>
            <h3 className="text-white font-bold text-base mb-5">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about-us" className="hover:text-[#0f766e] transition-colors">About Us</Link></li>
              <li><Link href="/blogs" className="hover:text-[#0f766e] transition-colors">Our Blogs</Link></li>
              <li><Link href="/wishlist" className="hover:text-[#0f766e] transition-colors">My Wishlist</Link></li>
              <li><Link href="/export-info" className="hover:text-[#0f766e] transition-colors">Export Information</Link></li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div>
            <h3 className="text-white font-bold text-base mb-5">Customer Care</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/order-tracking" className="text-[#0f766e] font-semibold hover:text-white transition-colors">Track Your Order</Link></li>
              <li><Link href="/faq" className="hover:text-[#0f766e] transition-colors">FAQs</Link></li>
              <li><Link href="/return-exchange-policy" className="hover:text-[#0f766e] transition-colors">Return & Exchange</Link></li>
              <li><Link href="/refund-policy" className="hover:text-[#0f766e] transition-colors">Refund Policy</Link></li>
              <li><Link href="/delivery-terms-and-conditions" className="hover:text-[#0f766e] transition-colors">Delivery Terms</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-[#0f766e] transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-white font-bold text-base mb-5">Contact Us</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#0f766e] mt-0.5 shrink-0" />
                <a href="https://maps.app.goo.gl/r2PZTybTwgb8SLd5A" target="_blank" className="hover:text-white transition-colors">
                  Rampura, Dhaka, Bangladesh
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#0f766e] shrink-0" />
                <a href="tel:+8801970085954" className="hover:text-white transition-colors">+880 1970 085 954</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#0f766e] shrink-0" />
                <a href="mailto:support@morshedmart.com" className="hover:text-white transition-colors">support@morshedmart.com</a>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#0f766e] mt-0.5 shrink-0" />
                <div>
                  <p>Sat - Thu: 10:00 AM - 8:00 PM</p>
                  <p className="text-xs text-gray-500">Friday Closed</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Newsletter Section */}
        <div className="border-t border-white/10 pt-8 pb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-white font-semibold text-base mb-1">Subscribe to our newsletter</h4>
              <p className="text-gray-400 text-sm">Get the latest updates on new arrivals and exclusive offers</p>
            </div>
            <form className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-60 px-4 py-2.5 bg-white/5 border border-white/10 rounded-l-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#0f766e] text-sm"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#0f766e] text-white text-sm font-medium rounded-r-lg hover:bg-[#0a5c54] transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Payment Banner */}
        <div className="border-t border-white/10 pt-6 pb-4 flex justify-center">
          <div className="relative w-full max-w-3xl h-16 md:h-20">
            <Image
              src="/Payment Banner_Jul24_V1-02.png"
              alt="Payment Methods"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} <span className="text-white font-medium">Morshed Mart</span>. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            Designed & Developed by <Link href="https://squadinnovators.com" target="_blank" className="text-[#0f766e] hover:text-white transition-colors font-semibold">Squad Innovators</Link>
          </p>
        </div>

      </div>
    </footer>
  );
}
