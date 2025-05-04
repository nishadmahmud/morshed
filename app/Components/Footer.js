import Image from "next/image"
import Link from "next/link"

import companyLogo from '/public/logo.png'
import { FaBehance, FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa6"
import { FaLinkedin, FaYoutube } from "react-icons/fa"
import { Mail, MapPin, Phone } from "lucide-react"
import noImg from '/public/no-image.jpg'


export default function Footer() {
  return (
    <footer className="bg-[#080808] py-12  md:pt-20 px-6">

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 justify-center md:justify-items-start items-center justify-items-center gap-8">
          {/* Logo and Social Section */}
          <div className="md:space-y-6">
            <Link href={'/'}>
            <Image 
            unoptimized
              src={companyLogo || noImg} 
              alt="apple-newton"
              width={280}
              height={150}
              className="mb-4 md:block hidden"
            />
            </Link>

            <div className="md:hidden  flex flex-col gap-1">
                <div className="flex items-center gap-2 border border-white p-5 rounded-full">
                  <Phone size={25} className="w-7 h-7 border-r border-white text-white pr-2" />
                  <Link href="tel:+8801898931468" className="text-white hover:underline text-sm">
                  +8801898931468
                  </Link>
                </div>
          
                <Link className="pt-2" target="_blank" href='https://maps.app.goo.gl/yLk4iW6GenCbn8BG8'>
                <div className="flex mt-1.5 items-center border gap-2  border-[#ffffff] p-4 rounded-full">
                  <MapPin size={45} className=" border-r text-white border-white pr-2" />

                  <p className="text-white text-sm">
                  Level-4 | Block - A | Shop 029B, Jamuna Future Park, Dhaka, Bangladesh.
                  </p>
                </div>
                </Link>

              </div>
            
            <div className="space-y-2 mt-8 md:mt-0">

              <p className="font-semibold text-lg text-[#ffffff] hidden md:block">Join us</p>

              <div className="flex flex-wrap gap-2 mt-5 justify-center items-center md:justify-start">
                {[
                  { icon: FaWhatsapp, href: "https://wa.me/+8801898931468" },
                  { icon: FaFacebook, href: "https://www.facebook.com/share/18oagGM1az/?mibextid=wwXIfr" },
                  { icon: FaTiktok, href: "#tiktok" }, // Behance
                  { icon: FaInstagram, href: "#instagram" },
                  
                  { icon: FaYoutube, href: "#youtube" }
                ].map(({ icon: Icon, href }) => (
                  <Link
                    key={href}
                    href={href}
                    target="_blank"
                    className=" rounded-full  flex items-center justify-center  transition-colors"
                  >
                    <Icon className=" text-white text-3xl border border-white rounded-full p-1" />
                  </Link>
                ))}
            </div>

              
            </div>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="font-bold text-lg text-[#ffffff] mb-4 uppercase md:text-start text-center">Company</h3>
            <ul className="md:space-y-2 md:flex-col flex-row  flex md:items-start items-center md:gap-0 gap-4">
              <li><Link href="/about-us" className="text-white hover:underline">About Us</Link></li> <span className="md:hidden block">|</span>
              <li><Link href="/brands" className="text-white hover:underline">Our Brands</Link></li>  <span className="md:hidden block">|</span>
              <li><Link href="/order-tracking" className="text-white hover:underline">Order Tracking</Link></li> <span className="md:hidden block">|</span>
              <li><Link href="/blogs" className="text-white hover:underline">Blogs</Link></li> 
            </ul>
          </div>

          {/* Help Center Section */}
          <div>
            <h3 className="font-bold text-lg text-[#ffffff] mb-4 uppercase md:text-start text-center">Help Center</h3>
            <ul className="md:flex-col flex-row  flex md:items-start items-center md:gap-0 gap-4 md:space-y-2">
              <li><Link href="/faq" className="text-white hover:underline">FAQ</Link></li> <span className="md:hidden block">|</span>
              <li><Link href="tel:+8801898931468" className="text-white hover:underline">Support Center</Link></li> <span className="md:hidden block">|</span>
              <li><Link href="https://wa.me/+8801898931468" className="text-white hover:underline">Feedback</Link></li>
            </ul>
          </div>

          {/* Terms section  */}
          <div className="space-y-8">
            <div>
              <h3 className="font-bold text-[#ffffff] text-lg mb-4 uppercase md:text-start text-center">Terms & Conditions</h3>
              <ul className="md:space-y-2 md:grid-cols-1 grid grid-cols-2 md:gap-0 gap-2 md:justify-start justify-center md:items-start items-center">
                <li><Link href="/delivery-terms-and-conditions" className="text-white hover:underline flex items-center gap-1">Terms & Conditions <span className="md:hidden block">|</span></Link></li> 
                
                <li>
                  <Link href="/refundPolicy" className="text-white hover:underline flex items-center gap-1">Refund Policy <span className="md:hidden block">|</span></Link>
                  </li>
                
                <li>
                  <Link href="/privacyPolicy" className="text-white hover:underline flex items-center gap-1">Privacy Policy <span className="md:hidden block">|</span></Link>
                  </li>
                
                <li>
                  <Link href="/warrantyPloicy" className="text-white hover:underline flex items-center gap-1">Warranty Policy <span className="md:hidden block">|</span></Link>
                  </li>

                <li>
                  <Link href="/exchangePolicy" className="text-white hover:underline">Exchange Policy</Link>
                  </li>
               
              </ul>
            </div>
           
          </div>

          {/* stay connected section */}
          <div>
          <div className="mb-8">
           
              
            <div className="space-y-3 hidden md:block">
                <div className="flex items-center gap-2 border border-white p-2 rounded-md">
                  <Phone size={25} className="w-7 h-7 border-r border-white text-white pr-2" />
                  <Link href="tel:+8801898931468" className="text-white hover:underline text-xs">
                  +8801898931468
                  </Link>
                </div>
          
                <Link className="pt-2" target="_blank" href='https://maps.app.goo.gl/yLk4iW6GenCbn8BG8'>
                <div className="flex mt-1.5 items-center border gap-2  border-[#ffffff] p-2 rounded-md">
                  <MapPin size={45} className=" border-r text-white border-white pr-2" />

                  <p className="text-white text-[10px]">
                  Level-4 | Block - A | Shop 029B, Jamuna Future Park, Dhaka, Bangladesh.
                  </p>
                </div>
                </Link>

              </div>
              
            </div>    
          </div>
        </div>
      </div>
    </footer>
  )
}


