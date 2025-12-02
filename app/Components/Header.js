import React, { Suspense } from 'react';
import { userId } from '../(home)/page';
import HeaderUi from './HeaderUi';
const Header = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/public/categories/${userId}`, { cache: 'no-cache' });
  const data = await res.json();
  return (
    <Suspense>
        <HeaderUi data={data}/> 
    </Suspense>
  );
};

export default Header;