import Link from "next/link";
import {
  ArrowUpRight,
  ArrowDown,
  Layers,
  FileCheck2,
  ShieldCheck,
} from "lucide-react";
import Navbar from "@/components/Navbar/Navbar";
import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";
import {
  personalInfo,
  projects,
  experience,
  skills,
  insights,
  education,
  techRadar,
  services,
} from "@/data/content";
import s from "./portfolio.module.css";
const icons = [Layers, FileCheck2, ShieldCheck];
const labels = [
  "Financial operations",
  "Document workflows",
  "Cloud governance",
];
export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content" className={s.main}>
        <section className={s.hero} aria-labelledby="intro-title">
          <div className={s.eyebrow}>
            <span /> SOFTWARE ENGINEERING / DATA / CLOUD
          </div>
          <div className={s.heroGrid}>
            <div>
              <p className={s.intro}>Hi, I’m Snigdh Sharma.</p>
              <h1 id="intro-title">
                Complex problems.
                <br />
                <em>Thoughtful</em>
                <br />
                solutions.
              </h1>
              <p className={s.lede}>
                I build the applications and data platforms that help people do
                better work. From a clean interface to the cloud infrastructure
                behind it.
              </p>
              <div className={s.actions}>
                <a className="btn-primary" href="#projects">
                  Explore my work <ArrowDown size={17} />
                </a>
                <a className={s.textLink} href="#contact">
                  Let’s talk <ArrowUpRight size={18} />
                </a>
              </div>
            </div>
            <aside className={s.notebook} aria-label="Current focus">
              <div className={s.noteTop}>
                <span>THE ENGINEERING NOTEBOOK</span>
                <span>01 / SS</span>
              </div>
              <div className={s.diagram} aria-hidden="true">
                <div className={s.orbit} />
                <div className={s.orbitTwo} />
                <div className={s.core}>
                  SS<small>BUILD WITH PURPOSE</small>
                </div>
                <span className={s.nodeOne}>CODE</span>
                <span className={s.nodeTwo}>DATA</span>
                <span className={s.nodeThree}>CLOUD</span>
              </div>
              <div className={s.noteBottom}>
                <span>CURRENTLY AT OPTUM</span>
                <p>
                  Connecting engineering
                  <br />
                  with better decisions.
                </p>
                <small>Data Analyst · Software Engineer</small>
              </div>
            </aside>
          </div>
          <div className={s.heroFooter}>
            <span>Full-stack thinking. End-to-end ownership.</span>
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub ↗
            </a>
            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn ↗
            </a>
          </div>
        </section>
        <section id="projects" className={s.section}>
          <div className={s.sectionHead}>
            <div>
              <span className={s.kicker}>01 / SELECTED WORK</span>
              <h2>Built for the real world.</h2>
            </div>
            <p>
              Enterprise applications, purposeful automation,
              <br />
              and the systems that make them work.
            </p>
          </div>
          <div className={s.projectGrid}>
            {projects.map((p, i) => {
              const Icon = icons[i];
              return (
                <article className={s.project} key={p.title}>
                  <div
                    className={`${s.projectArt} ${s["art" + i]}`}
                    aria-hidden="true"
                  >
                    <span className={s.artIndex}>PROJECT / 0{i + 1}</span>
                    <Icon size={64} strokeWidth={1} />
                    <div className={s.artLines}>
                      <span />
                      <span />
                      <span />
                    </div>
                    <span className={s.artCaption}>{labels[i]}</span>
                  </div>
                  <div className={s.projectBody}>
                    <span className={s.kicker}>{labels[i]}</span>
                    <h3>{p.title}</h3>
                    <p>{p.description}</p>
                    <div className={s.tags}>
                      {p.tech.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
        <section id="about" className={`${s.section} ${s.about}`}>
          <div>
            <span className={s.kicker}>02 / THE PERSON BEHIND THE CODE</span>
            <h2>
              A builder’s mindset.
              <br />
              <em>A wider perspective.</em>
            </h2>
          </div>
          <div>
            <p className={s.aboutLead}>
              Good software starts with understanding the problem.
            </p>
            <p>{personalInfo.bio}</p>
            <p>
              Today, as a {personalInfo.title} at {personalInfo.company}, I work
              at the intersection of healthcare data, cloud platforms, and
              business decisions.
            </p>
            <div id="education" className={s.education}>
              <span className={s.kicker}>
                FOUNDATIONS / {education.duration}
              </span>
              <h3>{education.degree}</h3>
              <p>{education.specialization}</p>
            </div>
          </div>
        </section>
        <section className={s.section} aria-labelledby="lab-title">
          <div className={s.sectionHead}>
            <div>
              <span className={s.kicker}>BUILD / BREAK / UNDERSTAND</span>
              <h2 id="lab-title">An agent-security lab you can inspect.</h2>
            </div>
          </div>
          <p>
            Seven synthetic scenarios. Four authorization controls. See what
            changes when an agent requests the wrong data or an unapproved
            action.
          </p>
          <div className={s.actions} style={{ marginTop: 24 }}>
            <Link className="btn-primary" href="/labs/agent-security">
              Try the interactive lab ↗
            </Link>
            <Link
              className={s.textLink}
              href="/insights/agent-tool-authorization-lab"
            >
              Read the experiment →
            </Link>
          </div>
        </section>
        <section id="experience" className={s.section}>
          <div className={s.sectionHead}>
            <div>
              <span className={s.kicker}>03 / THE JOURNEY</span>
              <h2>Experience, in practice.</h2>
            </div>
            <p>Optum Global Solutions</p>
          </div>
          {experience.map((j) => (
            <article key={j.role} className={s.job}>
              <div className={s.jobDate}>
                {j.duration}
                {j.durationLabel === "Current" && (
                  <span className={s.current}>CURRENT</span>
                )}
              </div>
              <div>
                <h3>{j.role}</h3>
                <p className={s.company}>{j.company}</p>
                <ul>
                  {j.description.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </section>
        <section id="skills" className={s.section}>
          <div className={s.sectionHead}>
            <div>
              <span className={s.kicker}>04 / HOW I BUILD</span>
              <h2>
                The right tools.
                <br />A considered approach.
              </h2>
            </div>
            <p>
              Across the stack, from interface
              <br />
              to infrastructure.
            </p>
          </div>
          <div className={s.skillGrid}>
            {skills.map((g) => (
              <div key={g.category}>
                <h3>{g.category}</h3>
                <div className={s.tags}>
                  {g.items.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div id="services" className={s.services}>
            {services.map((v) => (
              <details key={v.title}>
                <summary>
                  {v.title}
                  <span>+</span>
                </summary>
                <p>{v.description}</p>
                <div className={s.tags}>
                  {v.deliverables.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </section>
        <section id="insights" className={s.section}>
          <div className={s.sectionHead}>
            <div>
              <span className={s.kicker}>05 / FIELD NOTES</span>
              <h2>Thinking out loud.</h2>
            </div>
            <p>
              Notes on data, technology,
              <br />
              and making useful things.
            </p>
          </div>
          {insights.slice(0, 3).map((p) => (
            <Link
              key={p.slug}
              href={`/insights/${p.slug}/`}
              className={s.article}
            >
              <span className={s.articleMeta}>
                {p.category}
                <small>
                  {p.date} · {p.readTime}
                </small>
              </span>
              <div>
                <h3>{p.title}</h3>
                <p>{p.excerpt}</p>
              </div>
              <ArrowUpRight size={24} />
            </Link>
          ))}
        </section>
        <div className={s.actions} style={{ padding: "24px 0" }}>
          <Link className="btn-secondary" href="/insights">
            Browse all engineering notes ↗
          </Link>
          <a className={s.textLink} href="/feed.xml">
            RSS feed ↗
          </a>
        </div>
        <section id="tech-radar" className={`${s.section} ${s.now}`}>
          <div>
            <span className={s.kicker}>ON MY RADAR</span>
            <h2>
              Always a work
              <br />
              <em>in progress.</em>
            </h2>
            <p>{techRadar.intro}</p>
          </div>
          <div className={s.radar}>
            {techRadar.rings.map((r) => (
              <div key={r.name}>
                <h3>
                  {r.name}
                  <span>{r.label}</span>
                </h3>
                <p>{r.items.join(" · ")}</p>
              </div>
            ))}
          </div>
        </section>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
