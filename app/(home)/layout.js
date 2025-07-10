import localFont from "next/font/local";
import "../globals.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import StoreProvider from "../StoreContext/store";
import AvatarChat from "../Components/AvatarChat";
import { userId } from "./page";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import Image from "next/image";
import Script from "next/script";
import ClientLayout from "../client-layout";

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
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/public/categories/${userId}`,{next: {revalidate : 360}});
  const data = await res.json();
  return (
    <html lang="en">
      <head>
         <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src='https://connect.facebook.net/en_US/fbevents.js';
            s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script');
            fbq('init', '${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
        {/* Optional: noscript fallback */}
        <noscript>
          <Image
          alt="logo"
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
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
            <ClientLayout>

            {children}
            </ClientLayout>
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
