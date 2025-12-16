import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frontend Mastery - Ultimate Guide to Next.js & React | Coding Activist',
  description: 'Master Next.js 14 App Router, React Server Components, Machine Coding, and System Design. The Ultimate Guide (Vol 2) - Transform your frontend career with comprehensive tutorials and real-world projects.',
  keywords: 'Next.js, React, Frontend Development, App Router, Server Components, Machine Coding, System Design, Web Development, Coding Tutorials',
  openGraph: {
    title: 'Frontend Mastery - Ultimate Guide to Next.js & React | Coding Activist',
    description: 'Master Next.js 14 App Router, React Server Components, Machine Coding, and System Design. Transform your frontend career with comprehensive tutorials.',
    type: 'website',
    url: 'https://codingactivist.com/product',
    siteName: 'Coding Activist',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frontend Mastery - Ultimate Guide to Next.js & React',
    description: 'Master Next.js 14 App Router, React Server Components, Machine Coding, and System Design.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://codingactivist.com/product',
  },
};

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

