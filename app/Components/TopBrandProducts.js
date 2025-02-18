"use client";
import { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Image from "next/image";
import "@smastrom/react-rating/style.css";
import Heading from "../CustomHooks/heading";
import useStore from "../CustomHooks/useStore";
import Link from "next/link";
import useSWR from "swr";
import { fetcher, userId } from "../(home)/page";
import CardSkeleton from "./CardSkeleton";
import ProductCard from "./ProductCard";

const TopBrandProducts = ({brands}) => {
  const [tabIndex, setTabIndex] = useState(0);
  const { handleCart } = useStore();
  const {data : pdcByBrands,isLoading} =  useSWR(
    `${process.env.NEXT_PUBLIC_API}/public/brandwise-products/${tabIndex === 0 ? 0 : brands?.data[tabIndex - 1]?.id}/${userId}`,fetcher
  );



  return (
    <div className="lg:mt-24 mt-12">
      <Heading title={"Top Brand Products"} />

      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)} className="mt-5">
        <TabList className="flex flex-wrap justify-center gap-6 mb-5 md:flex-wrap lg:flex-nowrap">
          <Tab
            className={`text-sm cursor-pointer outline-none ${
              tabIndex === 0
                ? "font-semibold  text-black"
                : "text-[#0000006B]"
            }`}
          >
            All
          </Tab>
          {brands?.data.slice(0, 6).map((brand, index) => (
            <Tab
              key={brand.id}
              className={`text-sm cursor-pointer outline-none ${
                tabIndex === index + 1
                  ? "font-semibold  text-black"
                  : "text-[#0000006B]"
              }`}
            >
              {brand?.name}
            </Tab>
          ))}
        </TabList>

        {[null, ...brands?.data.slice(0, 6)].map((_, index) => (
          <TabPanel key={index}>
            { isLoading ?
            <div className='grid w-11/12 lg:w-10/12 gap-5 mx-auto grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
               {
                Array.from({length : 6}).map((_,idx) => {
                  return  <CardSkeleton key={idx} />
               })
              }
               </div> : (
              <div className="grid grid-cols-2 w-11/12 md:w-10/12 mx-auto md:grid-cols-3 lg:grid-cols-4 lg:gap-10 gap-5">
                {pdcByBrands?.data.length > 0 ? (
                  pdcByBrands?.data.slice(0,6).map((product) => (
                    <ProductCard key={product.id} product={product}/>
                  ))
                ) : (
                  <p className="text-black col-span-full text-center">No products found for this brand.</p>
                )}
              </div>
            )}
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
};

export default TopBrandProducts;


