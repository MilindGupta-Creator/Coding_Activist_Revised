import { Metadata } from 'next';

const PAGE_TITLE = 'Frontend Interview Preparation Course | Advanced React & System Design';
const PAGE_DESCRIPTION =
  'Master frontend interviews with Coding Activist: event loop, advanced React & Next.js, system design, and machine coding practice. Learn like a Staff Engineer.';

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords:
    'Frontend Interview Preparation Course, Advanced React, Next.js, JavaScript Event Loop, Frontend System Design, Machine Coding Interview Practice, Web Development, Coding Tutorials',
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    type: 'website',
    url: 'https://codingactivist.com/product',
    siteName: 'Coding Activist',
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
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

