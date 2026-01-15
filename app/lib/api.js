import { fetcher, userId } from "./constants";

const API_BASE = process.env.NEXT_PUBLIC_API;

// Helper to construct full URL
const getUrl = (endpoint) => `${API_BASE}/${endpoint}`;

export const api = {
    // Banners & Sliders
    getBanners: (uid = userId) => getUrl(`public/banners/${uid}`),
    getSliders: (uid = userId) => getUrl(`get-sliders/${uid}`),

    // Products & Categories
    getNewArrivals: (uid = userId) => getUrl(`public/new-arrivals/${uid}`),
    getBestDeals: (uid = userId) => getUrl(`public/best-deals/${uid}`),
    getCategories: (uid = userId) => getUrl(`public/categories/${uid}`),
    getCategoryProducts: (categoryId) => getUrl(`public/categorywise-products/${categoryId}`),
    getFeaturedProducts: (uid = userId) => getUrl(`public/featured-products/${uid}`),

    getTopBrandProducts: (uid = userId) => getUrl(`public/top-brand-products/${uid}`),
    getRelatedProducts: () => getUrl(`public/get-related-products`),

    // Brands
    getBrands: (uid = userId) => getUrl(`public/brands/${uid}`),

    // Search & Tracking
    searchProducts: () => getUrl(`public/search-product`),
    searchInvoice: () => getUrl(`search-web-invoice`),
    getProductDetails: (id) => getUrl(`public/products-detail/${id}`),

    // Offers
    getLatestOffers: (uid = userId) => getUrl(`latest-ecommerce-offer-list/${uid}`),

    // User/Cart (if needed, adding placeholders based on common patterns)
    // ...
};

// Re-export fetcher and userId for convenience
export { fetcher, userId };
