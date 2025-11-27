import React from 'react'
import CategoryWiseProductUi from './CategoryWiseProductUi';


export default async function CategoryProducts({params,searchParams}) {
  const {category,total,limit,page} = await searchParams;
  const {id} = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/public/categorywise-products/${id}?page=${page}&limit=${limit}`,{next : {revalidate : 100}});
  const products = await res.json();

  return (
      <CategoryWiseProductUi searchedCategory={category} limit={limit} searchedTotal={total} id={id} data={products}/>
  )
}

