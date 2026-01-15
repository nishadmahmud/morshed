import { MessageCircleMore } from "lucide-react";
import React, { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io5";
import { MdClose } from "react-icons/md";

const FloatingActionMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  // Helper for child buttons
  const ActionButton = ({ icon, onClick, bgColor, className }) => (
    <button
      onClick={onClick}
      className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all duration-300 hover:scale-110 ${className}`}
      style={{ backgroundColor: bgColor || "white" }}
    >
      {icon}
    </button>
  );

  return (
    <div className="flex flex-row-reverse items-center gap-2" style={{ zIndex: 0 }}>
      {/* Main Button */}
      <button
        onClick={toggleOpen}
        className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors z-50 text-teal-800 border disabled:opacity-50"
      >
        {isOpen ? (
          <MdClose size={20} className="text-teal-800" />
        ) : (
          <MessageCircleMore size={25} className="text-teal-800" />
        )}
      </button>

      {/* Child Buttons - Show when open */}
      <div className={`flex items-center gap-2 transition-all duration-300 origin-right ${isOpen ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-10 scale-0 pointer-events-none"}`}>

        {/* Support */}
        <ActionButton
          icon={<FaPhoneAlt size={15} className="text-teal-800" />}
          onClick={() => window.open("tel: +8801970085954")}
        />

        {/* WhatsApp */}
        <ActionButton
          icon={<IoLogoWhatsapp size={20} className="text-green-600" />}
          onClick={() => window.open("https://wa.me/+8801970085954", "_blank")}
        />

        {/* Facebook */}
        <ActionButton
          icon={<FaFacebook size={20} className="text-blue-600" />}
          onClick={() => window.open("https://www.facebook.com/morshed.mart2.0", "_blank")}
        />
      </div>
    </div>
  );
};

export default FloatingActionMenu;
