import React, { Suspense } from 'react';
import { api, userId } from '../lib/api';
import HeaderUi from './HeaderUi';
const Header = async () => {
  const res = await fetch(api.getCategories(userId), { next: { revalidate: 60 } });
  const data = await res.json();
  return (
    <Suspense>
      <HeaderUi data={data} />
    </Suspense>
  );
};

export default Header;