import localFont from "next/font/local";
import "../globals.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import StoreProvider from "../StoreContext/store";
import AvatarChat from "../Components/AvatarChat";
import { Toaster } from "react-hot-toast";
import Image from "next/image";
import Script from "next/script";
import ClientLayout from "../client-layout";
import Providers from "@/lib/Providers";
import { Poppins } from "next/font/google"
import { PT_Serif } from "next/font/google"
import { Open_Sans } from "next/font/google"
import { Cinzel } from "next/font/google"
import { Jost } from "next/font/google"
import { PT_Sans } from "next/font/google"


const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});
const ptSerif = PT_Serif({
  variable: "--font-poppins",
  subsets: ['latin'],
  weight: ['400', '700'],
});
const ptSans = PT_Sans({
  variable: "--font-pt-sans",
  subsets: ['latin'],
  weight: ['400', '700'],
});
const openSans = Open_Sans({
  variable: "--font-poppins",
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
});
const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});
const jost = Jost({
  variable: "--font-jost",
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
});

export const metadata = {
  title: "Morshed Mart",
  description: "Elevate Your Style – Premium Men’s Fashion for Every Occasion.",
  icons: {
    icon: '/favicon-32x32.png'
  }
};

export default async function RootLayout({ children }) {
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
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>

      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${openSans.variable} ${ptSerif.variable} ${cinzel.variable} ${jost.variable} ${ptSans.variable} antialiased nunito`}
      >
        <Toaster></Toaster>
        <StoreProvider>
          <Header />
            <div className="bg-[#ffffff] ">
              <Providers>
                <ClientLayout>{children}</ClientLayout>
              </Providers>
              <AvatarChat />
            </div>
            <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
