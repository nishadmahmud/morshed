import React, { Suspense } from 'react';
import { userId } from '../(home)/page';
import HeaderUi from './HeaderUi';
// export const revalidate = 360;
const Header = async () => {


  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/public/categories/${userId}`, { next: { revalidate: 360 } });
  const data = await res.json();
  return (
    <div>
        <HeaderUi data={data}/> 
    </div>
  );
};

export default Header;