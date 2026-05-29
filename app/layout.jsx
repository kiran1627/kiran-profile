import './globals.css';
import '../src/index.css';
import '../src/App.css';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata = {
  title: 'Kiran Babu Bandela | AI Engineer & Full Stack Developer',
  description:
    'Portfolio of Kiran Babu Bandela — AI/ML Engineer specializing in Generative AI, LLMs, Computer Vision, RAG Pipelines, and Full Stack Development. Building intelligent systems that matter.',
  keywords: [
    'AI Engineer',
    'Machine Learning',
    'Full Stack Developer',
    'Generative AI',
    'LLM Fine-tuning',
    'RAG Pipeline',
    'Computer Vision',
    'PyTorch',
    'TensorFlow',
    'Next.js',
    'React',
    'Kiran Babu Bandela',
  ],
  authors: [{ name: 'Kiran Babu Bandela' }],
  creator: 'Kiran Babu Bandela',
  openGraph: {
    title: 'Kiran Babu Bandela | AI Engineer & Full Stack Developer',
    description:
      'Explore the portfolio of Kiran Babu Bandela — AI/ML Engineer building intelligent systems with LLMs, Computer Vision, and Autonomous Agents.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Kiran Babu Bandela Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kiran Babu Bandela | AI Engineer',
    description:
      'AI/ML Engineer specializing in Generative AI, LLMs, and Computer Vision.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#030014" />
      </head>
      <body>{children}</body>
    </html>
  );
}
