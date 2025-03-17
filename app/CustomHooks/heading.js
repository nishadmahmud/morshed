import React from 'react';

const Heading = ({title}) => {
    return (
        <div className='text-[#c03b2c] mt-3 space-y-2 flex justify-center items-center gap-2 w-11/12 mx-auto'>

            <h2 className="text-xl lg:text-3xl font-medium text-center">{title}</h2>

          
        </div>
    );
};

export default Heading;