import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

// ⚡ Bolt: Use next/font/google to optimize font loading
// This removes render-blocking network requests to Google Fonts, preloads
// the font files, and sets CSS variables to prevent Cumulative Layout Shift (CLS).
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

export const metadata = {
  title: 'Snigdh Sharma — Software Engineer & Data Analyst',
  description:
    'Portfolio of Snigdh Sharma — Software professional with 3+ years of experience building enterprise-grade full-stack applications, cloud solutions on Azure, and data engineering pipelines.',
  keywords: [
    'Snigdh Sharma',
    'Software Engineer',
    'Data Analyst',
    'Full Stack Developer',
    'Azure',
    'React',
    '.NET',
    'Portfolio',
  ],
  authors: [{ name: 'Snigdh Sharma' }],
  openGraph: {
    title: 'Snigdh Sharma — Software Engineer & Data Analyst',
    description:
      'Building digital solutions that matter. 3+ years of enterprise full-stack development and cloud architecture.',
    url: 'https://snigdhsharma.in',
    siteName: 'Snigdh Sharma',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Snigdh Sharma — Software Engineer & Data Analyst',
    description:
      'Building digital solutions that matter. 3+ years of enterprise full-stack development and cloud architecture.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
