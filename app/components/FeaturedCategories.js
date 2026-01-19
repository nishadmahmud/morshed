import React, { Suspense } from 'react';
import FeaturedCategoryUi from './FeaturedCategoryUi';
import { api } from '../lib/api';

const FeaturedCategories = async () => {
    const categoriesRes = await fetch(api.getCategories(), {
        next: { revalidate: 60 }
    });
    const categoriesData = await categoriesRes.json();
    // Filter out categories that have no image_url or empty string
    const filteredData = categoriesData.data.filter(cat => cat.image_url);

    return (
        <div>
            <Suspense>
                <FeaturedCategoryUi categories={{ data: filteredData }} />
            </Suspense>
        </div>
    );
};

export default FeaturedCategories;
