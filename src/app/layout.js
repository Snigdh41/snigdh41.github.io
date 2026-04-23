import './globals.css';

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
