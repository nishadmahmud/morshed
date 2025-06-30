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
  description: "Elevate Your Style – Premium Men’s Fashion for Every Occasion.",
};


export default async function RootLayout({ children }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/public/categories/${userId}`,{cache : 'no-cache'});
  const data = await res.json();
  return (
    <html lang="en">
      <head>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#ffffff" />

  <link rel="icon" sizes="180x180" href="/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-32x32.png" />
  <link rel="shortcut icon" href="/favicon-32x32.png" />
  <title>Morshed Mart</title>
</head>


      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased nunito`}
      >
        <Toaster></Toaster>
      <StoreProvider>
          <Suspense fallback={null}>
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
