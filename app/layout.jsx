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
  title: 'Kiran Babu Bandela | GenAI/RAG Engineer',
  description:
    'Portfolio of Kiran Babu Bandela — GenAI/RAG Engineer building production AI systems: hybrid RAG pipelines, multi-agent orchestration, and LLM microservices.',
  keywords: [
    'GenAI Engineer',
    'RAG Engineer',
    'AI Architect',
    'Retrieval Augmented Generation',
    'Multi-Agent Orchestration',
    'LangGraph',
    'LangChain',
    'Qdrant',
    'LLM Microservices',
    'Machine Learning',
    'Kiran Babu Bandela',
  ],
  authors: [{ name: 'Kiran Babu Bandela' }],
  creator: 'Kiran Babu Bandela',
  openGraph: {
    title: 'Kiran Babu Bandela | GenAI/RAG Engineer',
    description:
      'GenAI/RAG Engineer building production AI systems: RAG pipelines, multi-agent orchestration, LLM microservices.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Kiran Babu Bandela Portfolio',
    images: ['/profile-fixed.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kiran Babu Bandela | GenAI/RAG Engineer',
    description:
      'GenAI/RAG Engineer building production AI systems: RAG pipelines, multi-agent orchestration, LLM microservices.',
    images: ['/profile-fixed.png'],
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
