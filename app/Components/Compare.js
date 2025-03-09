import { GitCompare } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

const Compare = () => {
  
    return (
        <Link href='compare' className="fixed cursor-pointer bottom-44 right-6 z-[10000] border-2 border-[#c03b2c] px-1.5 py-2 rounded-md lg:text-md text-[10px] flex justify-center flex-col items-center gap-1 text-[#c03b2c] hover:bg-[#c03b2c] hover:text-white transition ease-in-out font-semibold">
            
            <GitCompare size={18}></GitCompare>
            <div>Compare</div>
           
        </Link>
    );
};

export default Compare;