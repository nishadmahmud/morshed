


import CardSkeleton from "./CardSkeleton";
import SummerCollectionUi from "./SummerCollectionUi";

import { Suspense } from "react";


const SummerCollection = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/public/categorywise-products/${6785}&limit=12`);
  const data = res.json();


  return (
    <div>
      <Suspense fallback={<CardSkeleton />}>
       <SummerCollectionUi data={data}/>
      </Suspense>
    </div>
  );
};

export default SummerCollection;
