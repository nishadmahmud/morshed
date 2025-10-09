


import CardSkeleton from "./CardSkeleton";
import StripeShirtUi from "./StripeShirtUi";

import { Suspense } from "react";


const StripeShirt = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/public/categorywise-products/${6749}&limit=12`);
  const data = res.json();


  return (
    <div>
      <Suspense fallback={<CardSkeleton />}>
       <StripeShirtUi data={data}/>
      </Suspense>
    </div>
  );
};

export default StripeShirt;
