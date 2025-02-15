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
      </head>
      <body
        className={`${inter.className} relative bg-[#2C2B2B] bg-hero text-white bg-contain bg-no-repeat`}
      >
        <AuthProvider>
          <section className="fixed top-0 w-full z-10">
            <Navbar />
          </section>
          <main className="pb-16">
            {" "}
            {/* Add padding-bottom to main content */}
            {children}
          </main>
          <EmailPopUp />
          <Toaster />

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
