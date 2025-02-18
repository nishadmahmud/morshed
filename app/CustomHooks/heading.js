import React from 'react';

const Heading = ({title}) => {
    return (
        <div className='text-[#F16724] mt-3 space-y-2 flex items-center gap-2 w-11/12 mx-auto'>
             <hr  className='border bg-[#F16724] w-2 h-7'/>
            <h2 className="text-xl lg:text-3xl font-medium text-start">{title}</h2>
          
        </div>
    );
};

export default Heading;