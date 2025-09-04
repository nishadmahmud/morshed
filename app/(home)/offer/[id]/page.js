import { Suspense } from "react";
import { userId } from "../../page";
import OfferDetailsUi from "./OfferDetailsUi";


const OfferDetails = async ({ params, searchParams }) => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/latest-ecommerce-offer-list/${userId}`);
    const data = res.json();

    const { page } = await searchParams;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/public/best-deals-brand-id/${userId}/${params.id}?page=${page}`);
    const products = response.json();


    return (
        <div>
            <Suspense>
                <OfferDetailsUi data={data} productsData={products} id={params.id}/>
            </Suspense>
        </div>
    );
};

export default OfferDetails;
