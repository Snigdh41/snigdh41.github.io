import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import AgentLab from "./AgentLab";
import { siteUrl } from "@/data/content";
import s from "./lab.module.css";
const title = "AI Agent Security Lab: Test Tool Authorization | Snigdh Sharma";
const description =
  "Explore seven reproducible agent security scenarios. Toggle tenant isolation, tool permissions, approval binding, and identity checks in a browser-only simulator.";
export const metadata = {
  title,
  description,
  alternates: { canonical: `${siteUrl}/labs/agent-security` },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/labs/agent-security`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
};
export default function LabPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className={s.page}>
        <header className={s.hero}>
          <span className="section-label">INTERACTIVE LAB / 001</span>
          <h1>
            The model proposes.
            <br />
            <em>The boundary decides.</em>
          </h1>
          <p className={s.intro}>
            What happens when an agent asks for the wrong invoice, an extra
            tool, or an unapproved action? Change the controls and inspect the
            outcome.
          </p>
          <p className={s.scope}>
            Deterministic simulation · Synthetic invoices · No model or API
            calls
          </p>
        </header>
        <section className={s.context}>
          <h2>Test the action, not the wording.</h2>
          <p>
            This lab fixes the proposed tool call so you can isolate the effect
            of authorization controls. It does not run a language model or
            determine whether a prompt would persuade one. The browser simulates
            reads and sends; no messages or invoice data leave the lab.
          </p>
          <p>
            The caller is Alex from tenant North. INV-A belongs to North; INV-B
            belongs to South. Approval, when present, is a trusted fixture
            separate from document text. In production, these facts must come
            from your server, never from a browser or model.
          </p>
        </section>
        <AgentLab />
        <section className={s.method}>
          <span className="section-label">REPRODUCE / EXTEND</span>
          <h2>Inspect every assumption.</h2>
          <p>
            The same dependency-free module powers the browser and automated
            tests. Download it, import it in Node.js, and compare the two
            configurations.
          </p>
          <pre>
            <code>{`import { runSuite, allControls, noControls } from './agent-security-engine.mjs';\nconsole.log(runSuite(noControls));\nconsole.log(runSuite(allControls));`}</code>
          </pre>
          <div className={s.links}>
            <a href="/labs/agent-security-engine.mjs" download>
              Download engine &amp; fixtures ↗
            </a>
            <a href="https://github.com/Snigdh41/snigdh41.github.io/blob/main/scripts/agent-security.test.mjs">
              View executable tests ↗
            </a>
            <Link href="/insights/agent-tool-authorization-lab">
              Read the experiment write-up ↗
            </Link>
          </div>
          <h3>What this experiment cannot establish</h3>
          <p>
            It is not a production authorization library, MCP server, model
            benchmark, or complete prompt-injection defense. It does not test
            authentication, token validation, concurrent revocation, approval
            replay, network egress, or malicious content in the final answer.
            Bulk export is intentionally overbroad to demonstrate tool-scope
            risk. A real export endpoint also needs record-level authorization.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
