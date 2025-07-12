import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LeetCode Pro - Coding Interview Questions & Challenges | Coding Activist',
  description: 'Master coding interviews with our curated collection of 500+ DSA challenges from top tech companies. Practice Blind 75, Dynamic Programming, and company-specific questions.',
  openGraph: {
    title: 'LeetCode Pro - Coding Interview Questions & Challenges',
    description: 'Master coding interviews with our curated collection of 500+ DSA challenges from top tech companies. Practice Blind 75, Dynamic Programming, and company-specific questions.',
    type: 'website',
  },
};

export default function QuestionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 