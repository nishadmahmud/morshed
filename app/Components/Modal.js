import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

const Modal = ({ onClose, content, title }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Start animation on mount
    requestAnimationFrame(() => setIsVisible(true));
    return () => setIsVisible(false);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setShouldRender(false);
      onClose();
    }, 300);
  };

  if (!shouldRender) return null;

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center px-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal Content */}
      <div
        className={`relative w-full max-w-[350px] lg:max-w-[400px] md:w-[450px] bg-white rounded-2xl p-5 shadow-xl transform transition-all duration-300 flex flex-col max-h-[85vh] overflow-y-auto ${isVisible ? 'scale-100 translate-y-0' : 'scale-90 translate-y-4'}`}
      >
        {/* Title Section */}
        <div className="mb-5 w-full">
          <div className="flex justify-between items-center w-full">
            <h3 className="font-semibold text-xl">{title}</h3>
            <button
              onClick={handleClose}
              className="bg-red-600 hover:bg-red-700 text-white p-1 rounded-full transition-colors"
            >
              <IoClose size={20} />
            </button>
          </div>
          <hr className="mt-2 border-gray-100" />
        </div>

        {/* Content */}
        <div>{content}</div>
      </div>
    </div>
  );
};

export default Modal;
