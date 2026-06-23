import './globals.css';
import { personalInfo, skills, siteUrl } from '@/data/content';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Snigdh Sharma — Software Engineer & Data Analyst',
  description:
    'Portfolio of Snigdh Sharma — Software professional with 3+ years of experience building enterprise-grade full-stack applications, cloud solutions on Azure, and data engineering pipelines.',
  keywords: [
    'Snigdh Sharma',
    'Software Engineer',
    'Data Analyst',
    'Full Stack Developer',
    'Azure',
    'Databricks',
    'React',
    '.NET',
    'Data Engineering',
    'Portfolio',
  ],
  authors: [{ name: 'Snigdh Sharma', url: siteUrl }],
  creator: 'Snigdh Sharma',
  alternates: { canonical: siteUrl },
  openGraph: {
    title: 'Snigdh Sharma — Software Engineer & Data Analyst',
    description:
      'Building digital solutions that matter. 3+ years of enterprise full-stack development and cloud architecture.',
    url: siteUrl,
    siteName: 'Snigdh Sharma',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Snigdh Sharma — Software Engineer & Data Analyst',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Snigdh Sharma — Software Engineer & Data Analyst',
    description:
      'Building digital solutions that matter. 3+ years of enterprise full-stack development and cloud architecture.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: personalInfo.name,
  url: siteUrl,
  jobTitle: personalInfo.title,
  worksFor: { '@type': 'Organization', name: personalInfo.company },
  description: personalInfo.bio,
  email: `mailto:${personalInfo.email}`,
  knowsAbout: skills.flatMap((group) => group.items),
  sameAs: [personalInfo.socials.linkedin, personalInfo.socials.github],
};

const siteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Snigdh Sharma',
  url: siteUrl,
  author: { '@type': 'Person', name: personalInfo.name },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href={siteUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
