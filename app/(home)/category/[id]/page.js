import React from 'react'
import CategoryWiseProductUi from './CategoryWiseProductUi';

export default async function CategoryProducts({params}) {
 
  const {id} = await params;

  

  return (
      <CategoryWiseProductUi  id={id}/>
      
  )
}

