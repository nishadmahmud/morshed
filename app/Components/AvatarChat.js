'use client'

import { useState } from 'react'
import Image from 'next/image'
import avatar from '/public/avatar.jpg'
import ChatbotComponent from './ChatbotComponent';
import TawkTo from './TawkTo';


export default function Component() {
  const [isOpen, setIsOpen] = useState(false); // Track visibility

  return (
    <div className="fixed cursor-pointer lg:bottom-20 bottom-20 right-5 ">
     
      <TawkTo></TawkTo>
     

    
    </div>
  )
}
