import React, { Suspense } from 'react';
import FeaturedCategoryUi from './FeaturedCategoryUi';
import { api } from '../lib/api';

const FeaturedCategories = async () => {
  const categoriesRes = await fetch(api.getCategories(), {
    next: { revalidate: 60 }
  });
  const categories = categoriesRes.json();
  return (
    <div>
      <Suspense>
        <FeaturedCategoryUi categories={categories} />
      </Suspense>
    </div>
  );
};

export default FeaturedCategories;