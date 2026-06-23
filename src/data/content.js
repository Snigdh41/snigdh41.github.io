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

/* ---------- Services / What I Do ---------- */
export const services = [
  {
    icon: 'Cloud',
    title: 'Cloud & Data Platforms',
    description:
      'Architecting scalable, cloud-native data platforms on Azure — from Databricks lakehouses to automated ETL pipelines — that turn raw data into a reliable, governed asset for the business.',
    deliverables: ['Lakehouse architecture', 'ETL / ELT pipelines', 'Cost optimization'],
  },
  {
    icon: 'LineChart',
    title: 'Analytics & Decision Intelligence',
    description:
      'Translating messy operational data into clear KPIs, dashboards, and self-service analytics that help leaders make faster, evidence-based decisions instead of relying on gut feel.',
    deliverables: ['KPI frameworks', 'Interactive dashboards', 'Self-service analytics'],
  },
  {
    icon: 'AppWindow',
    title: 'Full-Stack Product Engineering',
    description:
      'Designing and shipping enterprise-grade web applications end to end — secure authentication, clean APIs, and intuitive front-ends — built to scale with the organisation.',
    deliverables: ['.NET / React apps', 'REST API design', 'Secure auth (Entra ID)'],
  },
  {
    icon: 'Workflow',
    title: 'Automation & Workflow Orchestration',
    description:
      'Removing manual toil with background jobs, notification systems, and orchestrated workflows — cutting process turnaround from days to minutes while improving auditability.',
    deliverables: ['Azure WebJobs', 'Approval workflows', 'Process automation'],
  },
];

/* ---------- Tech Radar / Now ---------- */
export const techRadar = {
  intro:
    'A snapshot of the technologies and business themes I am actively exploring, betting on, or keeping an eye on right now.',
  rings: [
    {
      name: 'Adopt',
      label: 'Using in production',
      items: ['Databricks & Delta Lake', 'Azure Entra ID', 'Next.js', '.NET 8'],
    },
    {
      name: 'Trial',
      label: 'Hands-on, evaluating',
      items: ['LLM-assisted analytics', 'dbt-style modeling', 'Retrieval-augmented apps'],
    },
    {
      name: 'Assess',
      label: 'Watching closely',
      items: ['AI agents for ops', 'Data contracts', 'Vector databases', 'FinOps tooling'],
    },
    {
      name: 'Business themes',
      label: 'Where tech meets value',
      items: ['Healthcare data interoperability', 'Self-service decision intelligence', 'AI governance & trust'],
    },
  ],
};

/* ---------- Insights / Writing ---------- */
export const insights = [
  {
    slug: 'from-dashboards-to-decisions',
    category: 'Data Strategy',
    title: 'From Dashboards to Decisions: Why Analytics Maturity Is a Business Problem, Not a Tooling One',
    excerpt:
      'Most organisations do not have a dashboard shortage — they have a decision shortage. A look at how to shift analytics investment from building reports to changing how teams actually decide.',
    readTime: '6 min read',
    date: 'Jun 2026',
    dateISO: '2026-06-01',
    tags: ['Analytics', 'Data Strategy', 'Decision Intelligence', 'KPIs'],
    metaDescription:
      'Analytics maturity is not about better tools — it is about better decisions. A practical guide to moving from dashboard sprawl to decision intelligence in the enterprise.',
    content: [
      { type: 'p', text: 'Walk into almost any mid-to-large enterprise and ask to see their analytics, and you will be drowned in dashboards. Hundreds of them. Revenue dashboards, ops dashboards, executive dashboards, the dashboard someone built for a meeting two years ago that nobody has opened since. The instinct, when analytics is not delivering, is to build more of them — or to buy a shinier BI tool. Both instincts are usually wrong.' },
      { type: 'p', text: 'The uncomfortable truth is that most organisations do not have a dashboard shortage. They have a decision shortage. The gap between "we can see the number" and "we changed what we do because of the number" is where analytics investment quietly goes to die.' },
      { type: 'h2', text: 'Maturity is measured in decisions, not reports' },
      { type: 'p', text: 'It is tempting to measure analytics maturity by counting assets: how many dashboards, how many data sources connected, how many users with a BI licence. These are easy to count and almost completely disconnected from value. A team with one dashboard that reliably changes a weekly pricing decision is more mature than a team with fifty dashboards that inform nothing.' },
      { type: 'p', text: 'A more honest maturity model asks a different set of questions:' },
      { type: 'ul', items: [
        'Which recurring decisions does the business actually make, and how often?',
        'For each of those decisions, what evidence currently informs it — gut feel, a spreadsheet, a dashboard, a model?',
        'When the underlying data changes, does the decision change? And how quickly?',
        'Who owns the decision, and do they trust the number enough to act on it?',
      ] },
      { type: 'p', text: 'Notice that none of these questions are about tooling. They are about behaviour. Analytics maturity is the degree to which evidence reliably flows into action — and that is a property of the organisation, not the software.' },
      { type: 'h2', text: 'Why tooling-first transformations stall' },
      { type: 'p', text: 'The classic failure pattern goes like this. Leadership decides the company needs to be "data-driven." A platform is procured. A central team is stood up. They spend twelve months migrating sources, building a semantic layer, and producing a beautiful catalogue of dashboards. Adoption metrics look healthy for a quarter. Then usage flatlines, and the next budget cycle questions the entire investment.' },
      { type: 'p', text: 'The failure is rarely technical. The dashboards work. The data is reasonably clean. What is missing is the connective tissue between the dashboard and the decision: nobody redesigned the weekly business review to start from the data, nobody made the metric the basis for the conversation, and nobody changed the incentive so that ignoring the number has a cost. The tool was delivered; the decision was never re-wired.' },
      { type: 'quote', text: 'A dashboard that does not change a decision is a cost, not an asset — no matter how elegant the visualisation.' },
      { type: 'h2', text: 'Start from the decision, work backwards' },
      { type: 'p', text: 'The shift that actually moves maturity is deceptively simple: start from the decision and work backwards to the data, rather than starting from the data and hoping a decision appears.' },
      { type: 'p', text: 'In practice that means sitting with the people who make a recurring decision — say, how to allocate next month’s marketing spend — and mapping what they need to know to decide well, what they currently use, and where they hedge because they do not trust the evidence. Only then do you build. The deliverable is not "a dashboard"; it is a decision that is now faster, more consistent, and defensible. The dashboard is just the mechanism.' },
      { type: 'p', text: 'This reframing changes what you build and how you measure success. You instrument the decision: how long it takes, how often it reverses, how confident the owner feels. When those move, maturity moves. When they do not, you have learned something far more useful than another adoption chart.' },
      { type: 'h2', text: 'Self-service is a means, not an end' },
      { type: 'p', text: 'Self-service analytics is often sold as the destination — give everyone the data and let a thousand insights bloom. But unconstrained self-service frequently makes the decision shortage worse, not better, because it multiplies conflicting versions of the truth. Three teams compute "active customers" three different ways and spend the meeting arguing about whose number is right instead of deciding anything.' },
      { type: 'p', text: 'The fix is not to centralise everything again. It is to govern the handful of metrics that decisions actually depend on — define them once, certify them, and make the certified version the easiest one to use — while leaving genuine exploration free. Self-service then accelerates good decisions instead of manufacturing debate.' },
      { type: 'h2', text: 'What to do on Monday' },
      { type: 'p', text: 'If you want to raise analytics maturity without buying anything, start here. Pick one important recurring decision. Write down how it is made today and what evidence it uses. Identify the single metric that should drive it, certify that metric, and redesign the meeting where the decision happens so it begins with that number. Measure whether the decision gets faster or more consistent over the next quarter.' },
      { type: 'p', text: 'Do that for one decision and you will learn more about your organisation’s real maturity than any platform migration could teach you. Do it for your ten most important decisions and you will have transformed how the company runs — and you will have done it by treating analytics as a business problem, which is what it always was.' },
    ],
  },
  {
    slug: 'lakehouse-as-business-operating-system',
    category: 'Cloud & AI',
    title: 'The Lakehouse as a Business Operating System',
    excerpt:
      'When the data platform becomes the single source of truth, it stops being IT infrastructure and starts being how the company runs. Lessons from building governed lakehouses on Azure.',
    readTime: '8 min read',
    date: 'May 2026',
    dateISO: '2026-05-01',
    tags: ['Lakehouse', 'Databricks', 'Delta Lake', 'Azure', 'Data Governance'],
    metaDescription:
      'A governed lakehouse on Azure can become the operating system of a business. Lessons on architecture, governance, and turning a data platform into how the company runs.',
    content: [
      { type: 'p', text: 'For most of the last two decades, the data warehouse and the data lake were treated as separate worlds. The warehouse was where governed, structured, trusted data lived — slow to change but reliable enough to run finance off. The lake was where everything else landed — cheap, flexible, and largely ungoverned. Teams paid the tax of moving data between them, reconciling two versions of the truth, and explaining to the business why the numbers did not match.' },
      { type: 'p', text: 'The lakehouse pattern collapses that divide. By putting a transactional, governed table format — Delta Lake — directly on top of cheap cloud storage, it offers warehouse-grade reliability with lake-grade flexibility and cost. That is the technical story, and it is well told elsewhere. The more interesting story is what happens to a business once the lakehouse is in place and trusted: it stops being infrastructure and starts being the operating system the company runs on.' },
      { type: 'h2', text: 'From plumbing to platform' },
      { type: 'p', text: 'A data platform is plumbing when its job is to move bytes from A to B. It becomes an operating system when the important questions a business asks — what is our margin, which customers are at risk, is this process compliant — are answered from one governed place, in a way everyone trusts enough to act on.' },
      { type: 'p', text: 'The difference is not the technology; it is the trust. A lakehouse earns the right to be the operating system by being the single source of truth, not just the single source of storage. That distinction is where most platform efforts either succeed or quietly fail.' },
      { type: 'h2', text: 'The three properties that make a lakehouse trustworthy' },
      { type: 'p', text: 'In practice, three properties separate a lakehouse that the business runs on from one that is merely a large pile of parquet files.' },
      { type: 'ul', items: [
        'Reliability: ACID transactions, schema enforcement, and time travel mean a query returns a correct, consistent answer — and the same answer tomorrow. Delta Lake’s transaction log is what makes "the number" stable enough to put in front of an executive.',
        'Governance: lineage, access control, and certified datasets mean people know where a number came from, who can see it, and whether it is the blessed version. Without this, every metric is contestable.',
        'Self-describing structure: a medallion-style layering — raw, refined, and curated — gives consumers an obvious place to find the trustworthy, business-ready tables instead of guessing among hundreds of intermediate ones.',
      ] },
      { type: 'p', text: 'Get these three right and the platform crosses a threshold. People stop exporting data into private spreadsheets because the governed table is both easier to use and more credible than their own copy. That moment — when shadow data starts shrinking instead of growing — is the clearest signal that the lakehouse has become the operating system.' },
      { type: 'quote', text: 'You know the lakehouse has won when people stop making their own copy of the data because the governed one is easier to trust.' },
      { type: 'h2', text: 'Governance is the feature, not the friction' },
      { type: 'p', text: 'There is a persistent myth that governance slows teams down — that it is the compliance tax you pay for using data. In a well-built lakehouse the opposite is true. Governance is what lets you move fast, because it is what lets people trust a number without re-deriving it.' },
      { type: 'p', text: 'When a metric is certified, lineage is visible, and access is enforced centrally, a new team can adopt an existing definition in an afternoon instead of rebuilding it over a sprint and inevitably getting it subtly wrong. Data contracts — explicit agreements about the shape and meaning of a dataset between producer and consumer — turn the platform from a free-for-all into something teams can build on without fear that an upstream change will silently break their reports. Governance, done well, is the thing that makes self-service safe.' },
      { type: 'h2', text: 'Designing for the business, not the engineer' },
      { type: 'p', text: 'A subtle trap in lakehouse design is optimising for the people who build the platform rather than the people who use it. Engineers care about partition strategies, file sizes, and compaction. Those matter — but they are not why the platform exists.' },
      { type: 'p', text: 'The curated layer should be modelled around business concepts the organisation already understands: customer, claim, order, policy. The names should match the language used in the business review, not the source system. When a finance analyst can find a table called "monthly_recurring_revenue" and trust that it means what they think it means, the platform has done its real job. The most sophisticated lakehouse in the world is worthless if a business user cannot find the number they need and believe it.' },
      { type: 'h2', text: 'The payoff: compounding leverage' },
      { type: 'p', text: 'The reason it is worth treating the lakehouse as an operating system is that the returns compound. Every governed, certified dataset is reusable. The customer table built for the retention model also powers the marketing dashboard, the finance forecast, and the next AI feature. Each new use case starts from a higher base instead of from raw ingestion.' },
      { type: 'p', text: 'That compounding is also what makes the lakehouse the natural foundation for the next wave of AI work. Retrieval-augmented applications and analytical agents are only as trustworthy as the data they sit on. A governed lakehouse gives them a clean, lineage-aware substrate — which means the same investment that made human decisions trustworthy is what will make machine decisions trustworthy too.' },
      { type: 'p', text: 'Build the platform as plumbing and you get a cost centre. Build it as an operating system — reliable, governed, and modelled around the business — and you get the thing the company actually runs on, and a foundation that pays for itself again with every new question the business learns to ask.' },
    ],
  },
  {
    slug: 'llms-in-the-enterprise-without-the-risk',
    category: 'AI in the Enterprise',
    title: 'Putting LLMs to Work Without Putting the Business at Risk',
    excerpt:
      'AI agents promise huge productivity gains — but enterprise adoption lives or dies on governance, trust, and ROI. A pragmatic framework for separating the hype from the value.',
    readTime: '7 min read',
    date: 'Apr 2026',
    dateISO: '2026-04-01',
    tags: ['LLMs', 'AI Governance', 'Enterprise AI', 'RAG', 'AI Agents'],
    metaDescription:
      'A pragmatic framework for adopting LLMs and AI agents in the enterprise — separating hype from value through governance, trust, and a clear-eyed view of ROI.',
    content: [
      { type: 'p', text: 'Every enterprise is now under pressure to "do something with AI." The board has read the same headlines as everyone else, competitors are announcing AI initiatives, and there is a real fear of being left behind. The result is a wave of pilots — most of which will quietly disappear within a year, not because the technology does not work, but because they were never set up to deliver durable value.' },
      { type: 'p', text: 'Large language models are genuinely transformative for certain classes of work. They are also probabilistic, confidently wrong on occasion, and capable of leaking or fabricating information in ways traditional software does not. Putting them to work in a regulated enterprise is therefore less a modelling problem than a governance and design problem. The organisations that win will not be the ones with the best model; they will be the ones with the best framework for deciding where, and how, to use it.' },
      { type: 'h2', text: 'Start with the boring, high-volume work' },
      { type: 'p', text: 'The instinct is to aim AI at the most visible, most strategic problem in the business. That is usually a mistake. The best early use cases are boring: high-volume, repetitive, language-heavy tasks where a human currently spends time that the business would rather spend elsewhere — triaging support tickets, drafting first-pass documentation, summarising long documents, extracting structured fields from unstructured text.' },
      { type: 'p', text: 'These cases share three useful properties. The value is easy to quantify because you know how much the manual version costs. The risk is contained because a human stays in the loop. And the failure mode is recoverable — a slightly wrong first draft is annoying, not catastrophic. Win a few of these and you build both organisational confidence and a realistic sense of what the technology can and cannot do.' },
      { type: 'h2', text: 'The three questions every AI use case must answer' },
      { type: 'p', text: 'Before committing to an LLM use case, I find it clarifying to force answers to three questions. If any of them is unanswered, the use case is not ready.' },
      { type: 'ul', items: [
        'What is the cost of being wrong? A wrong product recommendation is cheap; a wrong dosage instruction or compliance determination is not. The acceptable error rate — and the amount of human oversight required — flows directly from this answer.',
        'How will we know it is wrong? If you cannot detect a bad output, you cannot govern it. Use cases where outputs can be checked against ground truth, validated by a human, or constrained to a known set of answers are far safer than open-ended generation.',
        'What is the value if it is right, and at what volume? An impressive demo that saves two minutes on a task done twice a month is not a business case. ROI lives in the multiplication of modest per-task savings by genuine volume.',
      ] },
      { type: 'quote', text: 'In the enterprise, the constraint on AI is rarely model capability. It is whether you can detect, govern, and stand behind what the model produces.' },
      { type: 'h2', text: 'Grounding beats cleverness' },
      { type: 'p', text: 'Most enterprise value from LLMs comes not from the model’s raw intelligence but from grounding it in the organisation’s own trustworthy data. Retrieval-augmented generation — fetching relevant, governed content and asking the model to answer strictly from it — turns a charming generalist into a useful specialist that cites its sources.' },
      { type: 'p', text: 'This is also where the earlier investment in a governed data platform pays off. An LLM grounded in a certified, lineage-aware dataset can answer questions about the business with traceability; the same model pointed at a sprawl of stale documents and private spreadsheets will produce fluent nonsense. The quality of enterprise AI is, to a first approximation, the quality of the data you ground it in.' },
      { type: 'h2', text: 'Governance is the adoption strategy' },
      { type: 'p', text: 'It is tempting to treat governance as the brake on AI adoption — the legal and risk hurdle to clear before the fun begins. In reality, governance is the adoption strategy. The reason most enterprise AI stalls is not that the technology fails; it is that nobody can get comfortable enough with the risk to deploy it at scale.' },
      { type: 'p', text: 'A practical governance posture covers a handful of concerns: what data the model is allowed to see, where prompts and outputs are logged and for how long, how outputs are reviewed before they reach a customer or a decision, and who is accountable when something goes wrong. None of this is exotic — it is the same discipline applied to any system that touches sensitive data. Put it in place early and AI moves from perpetual pilot to production. Leave it as an afterthought and every promising prototype dies at the security review.' },
      { type: 'h2', text: 'Agents: powerful, and not yet to be trusted blindly' },
      { type: 'p', text: 'The frontier right now is agentic systems — LLMs that do not just answer but take actions: querying systems, calling APIs, chaining steps to accomplish a goal. The potential is real, and so is the risk surface. An agent that can act is an agent that can act wrongly, at machine speed, across multiple systems.' },
      { type: 'p', text: 'The pragmatic path is to give agents capability gradually and under constraint: start with read-only actions, require human approval before anything consequential, scope their permissions tightly, and log everything they do. Treat an agent less like a trusted employee and more like a fast, capable, and occasionally unpredictable contractor whose work you check. That is not a lack of ambition; it is how you earn the right to expand the ambition safely.' },
      { type: 'h2', text: 'The honest conclusion' },
      { type: 'p', text: 'LLMs will change how enterprises work, but the change will be earned through a hundred well-governed, well-measured use cases rather than one heroic transformation. Pick boring, high-volume problems. Answer the three questions before you build. Ground the model in trusted data. Make governance the enabler rather than the obstacle. Do that, and you capture the value without betting the business on a probabilistic system you cannot fully predict — which is the only version of enterprise AI worth pursuing.' },
    ],
  },
];

export const navLinks = [
  { label: 'About', href: '/#about' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Services', href: '/#services' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Now', href: '/#now' },
  { label: 'Insights', href: '/#insights' },
  { label: 'Contact', href: '/#contact' },
];

export const siteUrl = 'https://snigdhsharma.in';
