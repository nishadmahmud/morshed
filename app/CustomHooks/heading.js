import React from 'react';

const Heading = ({title}) => {
    return (
        <div className='text-[#c03b2c] mt-3 space-y-2 flex justify-center items-center gap-2 w-11/12 mx-auto'>
            <hr  className='border bg-[#c03b2c] w-7 h-1 relative top-3 left-2'/>

            <h2 className="text-xl lg:text-3xl font-medium text-center">{title}</h2>

             <hr  className='border bg-[#c03b2c] w-7 h-1 relative top-2 right-2'/>
          
        </div>
    );
};

export default Heading;