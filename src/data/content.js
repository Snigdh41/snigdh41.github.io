export const personalInfo = {
  name: 'Snigdh Sharma',
  title: 'Data Analyst',
  company: 'Optum Global Solutions',
  tagline: 'Building digital solutions that matter',
  bio: `Software professional with 3+ years of experience designing and delivering enterprise-grade applications across the full stack. From architecting scalable cloud-native platforms on Azure to engineering intuitive front-end experiences, I bring ideas to life with clean code and purposeful design. Passionate about solving complex problems at the intersection of data, cloud, and modern web technologies.`,
  email: 'contact@snigdhsharma.in',
  resumeUrl: '/resume.pdf',
  socials: {
    linkedin: 'https://www.linkedin.com/in/snigdh-sharma',
    github: 'https://github.com/Snigdh41',
    email: 'mailto:contact@snigdhsharma.in',
  },
};

export const skills = [
  {
    category: 'Cloud & DevOps',
    items: ['Azure', 'Azure Data Factory', 'Azure WebJobs', 'CI/CD Pipelines', 'GitHub Actions', 'Azure Entra ID'],
  },
  {
    category: 'Full-Stack Development',
    items: ['React', 'Next.js', 'Blazor', '.NET', 'Node.js', 'REST APIs'],
  },
  {
    category: 'Data Engineering',
    items: ['Databricks', 'Delta Lake', 'PySpark', 'ETL Pipelines', 'Data Modeling', 'Microsoft Graph'],
  },
  {
    category: 'Database & Tools',
    items: ['SQL Server', 'PostgreSQL', 'Git', 'Agile / Scrum', 'System Design', 'Performance Tuning'],
  },
];

export const experience = [
  {
    role: 'Data Analyst',
    company: 'Optum Global Solutions',
    duration: '2025 — Present',
    durationLabel: 'Current',
    description: [
      'Spearheading enterprise data analytics initiatives — translating complex healthcare datasets into actionable intelligence that drives strategic decision-making across business units.',
      'Designing and optimizing large-scale data pipelines on Databricks and Delta Lake, enabling near-real-time reporting and self-service analytics for cross-functional stakeholders.',
      'Partnering with engineering and product teams to define KPIs, build interactive dashboards, and surface insights that directly influence roadmap prioritization.',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Optum Global Solutions',
    duration: '2023 — 2025',
    durationLabel: '2 Years',
    description: [
      'Led the design and development of enterprise-scale full-stack applications serving cross-functional business units.',
      'Architected cloud-native solutions on Azure, implementing secure authentication flows and automated workflow orchestration.',
      'Drove technical decision-making across the stack — from database schema design to front-end component architecture.',
    ],
  },
  {
    role: 'Associate Software Engineer',
    company: 'Optum Global Solutions',
    duration: '2022 — 2023',
    durationLabel: '1 Year',
    description: [
      'Built and maintained production-grade web applications using modern frameworks across React, Blazor, and .NET ecosystems.',
      'Developed automated notification systems and background processing pipelines using Azure WebJobs.',
      'Collaborated in agile teams to deliver high-quality software on tight release cycles.',
    ],
  },
];

export const projects = [
  {
    title: 'Enterprise Ledger Management Platform',
    description:
      'Architected a high-availability financial ledger system featuring multi-tier approval workflows, automated escalation chains, and intelligent reminder notifications — streamlining compliance for enterprise-scale financial operations.',
    tech: ['Blazor', '.NET', 'SQL Server', 'Azure WebJobs'],
  },
  {
    title: 'Legal Document Automation Suite',
    description:
      'Engineered an end-to-end legal document generation platform with dynamic billing templates, integrated digital signature workflows, and automated client distribution — reducing document turnaround from days to minutes.',
    tech: ['React', '.NET', 'SQL Server', 'Azure WebJobs'],
  },
  {
    title: 'Cloud Identity & Access Governance',
    description:
      'Designed a sophisticated Azure Entra ID role delegation framework enabling subscription-level resource management through on-behalf-of authentication, dynamic workflow orchestration, and self-service provisioning capabilities.',
    tech: ['Next.js', '.NET', 'Databricks', 'Delta Lake', 'Microsoft Graph'],
  },
];

export const education = {
  degree: 'B.Tech Computer Science & Engineering',
  specialization: 'Honours — IoT Specialization',
  duration: '2018 — 2022',
};

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];
