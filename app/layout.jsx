import './globals.css';
import '../src/index.css';
import '../src/App.css';
import { Outfit, Inter } from 'next/font/google';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'B. Kiran Babu | Generative AI Engineer & ML Developer',
  description: 'Portfolio of B. Kiran Babu - AI/ML Engineer specializing in Generative AI, LLMs, and Computer Vision.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
