'use client'

import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link';
import avatar from '/public/avatar.jpg'
import Chatbot from './Chatbot';


export default function Component() {
  const [isMinimized, setIsMinimized] = useState(true);

  return (

    <div className="fixed cursor-pointer bottom-20 right-12 z-[10000]">

      {/* <Chatbot></Chatbot> */}

      <div className={`  transition-all duration-300 ease-in-out ${isMinimized ? 'w-14' : 'max-w-sm'}`}>
        <div className="flex items-center justify-between p-4">
         
          
          <div className="relative flex-shrink-0">
          
            <div className="h-16 w-16 overflow-hidden relative rounded-full border-2 border-white">
               <Link target='_blank' href={'tel:+880 1711-292348'}>
               <Image
                src={avatar}
                alt="avatar"

                fill={true}
                style={{objectFit : 'contain'}}
              />
               </Link> 
             
            </div>
            
           
            <div className="absolute -right-0.5 -top-1">
              <div className="relative h-3 w-3">
               
                <div className="absolute h-3 w-3 rounded-full bg-emerald-500" />
                
               
                <div className="absolute h-3 w-3 animate-[ping_2s_ease-in-out_infinite] rounded-full bg-emerald-500 opacity-75" />
                <div className="absolute h-3 w-3 animate-[ping_2.5s_ease-in-out_infinite] rounded-full bg-emerald-500 opacity-50" />
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  )
}





