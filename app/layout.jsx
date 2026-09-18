import './globals.css';
import '../src/index.css';
import '../src/App.css';
// Fonts are served as local woff2 files via @font-face in globals.css
// (Anton, Oswald, Bodoni Moda — copied from the cinematic-portofilo reference)

export const metadata = {
  metadataBase: new URL('https://kiran-profile-delta.vercel.app'),
  alternates: { canonical: '/' },
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#030014" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
