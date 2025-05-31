import localFont from "next/font/local";
import "../globals.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import StoreProvider from "../StoreContext/store";
import AvatarChat from "../Components/AvatarChat";
import { userId } from "./page";
import { Suspense } from "react";
import Loader from "../Components/Loader";
import Compare from "../Components/Compare";
import TawkTo from "../Components/TawkTo";
import { Toaster } from "react-hot-toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Morshed Mart",
  description: "Get all kind of next gen gadget",
  
};


export default async function RootLayout({ children }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/public/categories/${userId}`,{cache : 'no-cache'});
  const data = await res.json();
  return (
    <html lang="en">
      <head>
  <link rel="apple-touch-icon" sizes="180x180" href="/morshed-mart-logo-removebg-preview.png" />
  <link rel="icon" type="image/png" sizes="32x32" href="/morshed-mart-logo-removebg-preview.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/morshed-mart-logo-removebg-preview.png" />
</head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased nunito`}
      >
        <Toaster></Toaster>
      <StoreProvider>
          <Suspense fallback={<Loader />}>
          <div>
           <Header data={data}/>
          </div>

          <div className="bg-[#ffffff] ">
            {children}
        {/* <Compare /> */}

        {/* <div className="fixed cursor-pointer lg:bottom-20 bottom-20 right-5 bg-green-700 p-10">
        <TawkTo className="bottom-9"></TawkTo>
        </div> */}
            <AvatarChat />
          </div>
          <Footer/>
          </Suspense>
      </StoreProvider>
      </body>
    </html>
  );
}
