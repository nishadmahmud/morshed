'use client'

import { useState } from 'react'
import Image from 'next/image'
import avatar from '/public/avatar.jpg'
import ChatbotComponent from './ChatbotComponent';


export default function Component() {
  const [isOpen, setIsOpen] = useState(false); // Track visibility

  return (
    <div className="fixed cursor-pointer lg:bottom-20 bottom-20 right-6">
     
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        style={{
          padding: "1px 1px",
          borderRadius: "50%",
          background: "#ffffff",
          color: "white",
          border: "none",
          cursor: "pointer",
          fontSize: "18px"
        }}
      >
        <Image width={60} height={60} alt='logo' className='rounded-full' src={avatar} />
      </button>

     
      {isOpen && (
        <div 
          style={{
            position: "absolute",
            bottom: "0px",
            right: "65px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            borderRadius: "10px",
            overflow: "hidden",
            background: "white"
          }}
          onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the chatbot
        >
          <ChatbotComponent />
        </div>
      )}
     

    
    </div>
  )
}
