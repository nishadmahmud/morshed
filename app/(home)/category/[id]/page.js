import React from 'react'
import CategoryWiseProductUi from './CategoryWiseProductUi';

export default async function CategoryProducts({ params }) {

  const { id } = await params;
  let initialProducts = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/public/categorywise-products/${id}?page=1&limit=20`, {
      next: { revalidate: 60 }
    });
    if (res.ok) {
      initialProducts = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch initial category products", error);
  }

  return (
    <CategoryWiseProductUi id={id} initialProducts={initialProducts} />
  )
}

