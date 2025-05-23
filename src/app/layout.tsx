import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import BottomBar from "@/components/common/BottomBar";
import Blur from "../../public/assets/blur-23.png";
import Image from "next/image";
import _ from "lodash";
import EmailPopUp from "@/components/common/EmailPopUp";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import { AuthProvider } from "@/auth/AuthContext";
import FeedbackWidget from "@/components/common/FeedbackWidget";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Coding Activist | Jobs for Freshers</title>
        <meta
          name="description"
          content="Find the latest off-campus job opportunities for Students and Professionals, Freshers Jobs, Graduate Jobs, BTech, Software Engineer Jobs, Software Engineer Intern Jobs, Frontend Developer Jobs, Frontend Developer Intern Jobs, Career Switch and more. Start your career journey now!"
        />
        <meta name="robots" content="index, follow" />
        <meta
          name="googlebot"
          content="index, max-image-preview:large, max-snippet:-1"
        />

        <meta name="google-adsense-account" content="ca-pub-2570738441831963" />

        {/* Google tag (gtag.js) */}
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
        ></Script>
        <Script id="google-analytics">
          {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${GTM_ID}');
    `}
        </Script>

        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2570738441831963"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${inter.className} relative bg-[#2C2B2B] bg-hero text-white bg-contain bg-no-repeat`}
      >
        <AuthProvider>
          <section className="fixed top-0 w-full z-10">
            <Navbar />
          </section>
          <main className="pb-16">
            {children}
            {/* AdSense Ad Container - Clearly separated from content */}
            <div className="ad-container p-4 border border-gray-700 rounded-lg">
              <div className="text-sm text-gray-400 mb-2">Advertisement</div>
              <ins
                className="adsbygoogle"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  margin: '0 auto'
                }}
                data-ad-client="ca-pub-2570738441831963"
                data-ad-slot="5438523302"
                data-ad-format="auto"
                data-full-width-responsive="true"
              />
              <Script id="adsense-init">
                {`(adsbygoogle = window.adsbygoogle || []).push({});`}
              </Script>
            </div>
          </main>
          <EmailPopUp />
          <Toaster />
          <FeedbackWidget />

          <BottomBar className="fixed bottom-0 w-full z-20" />

          <Image
            src={Blur}
            alt="blur"
            className="absolute bottom-0 -z-10"
            loading="lazy"
          />
        </AuthProvider>
      </body>
    </html>
  );
}
