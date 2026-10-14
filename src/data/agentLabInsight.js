export const agentLabInsight = {
  slug: "agent-tool-authorization-lab",
  category: "Security Engineering",
  title:
    "Testing AI Agent Tool Authorization: Seven Reproducible Failure Cases",
  excerpt:
    "A small open-source experiment comparing unchecked tool execution with tenant ownership, tool scope, exact approval, and identity checks. Includes an interactive lab and executable tests.",
  metaDescription:
    "Reproduce seven AI agent tool-authorization cases with a browser lab and open-source tests: tenant isolation, tool scope, approval binding, and revocation.",
  date: "Oct 14, 2026",
  dateISO: "2026-10-14",
  readTime: "5 min read",
  tags: [
    "AI Agents",
    "Security",
    "Prompt Injection",
    "Authorization",
    "Evaluation",
  ],
  summary:
    "In this deterministic seven-fixture experiment, the unchecked baseline permits all five adverse actions. Enabling all four controls blocks those five while preserving both legitimate operations. These results test a policy boundary, not an LLM’s resistance to injection.",
  editorialNote:
    "Original synthetic experiment, engine version 1.0.0. Results reproduced with the published module and 19 automated tests. No language model, external service, or employer data was used.",
  sources: [
    {
      title: "Experiment source: engine and all seven fixtures",
      url: "https://github.com/Snigdh41/snigdh41.github.io/blob/main/public/labs/agent-security-engine.mjs",
    },
    {
      title: "Reproduction: 19 executable boundary tests",
      url: "https://github.com/Snigdh41/snigdh41.github.io/blob/main/scripts/agent-security.test.mjs",
    },
    {
      title: "OWASP: LLM Prompt Injection Prevention Cheat Sheet",
      url: "https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html",
    },
    {
      title: "Model Context Protocol: Security Best Practices (draft)",
      url: "https://modelcontextprotocol.io/docs/draft/tutorials/security/security_best_practices",
    },
  ],
  content: [
    {
      type: "link",
      text: "Open the interactive agent-security lab →",
      href: "/labs/agent-security",
    },
    {
      type: "h2",
      text: "What happens after an agent proposes the wrong action?",
    },
    {
      type: "p",
      text: "Prompt-injection discussions often focus on whether a model follows an instruction hidden inside a document. This experiment starts one step later: suppose the unwanted tool call has already been proposed. Can the application refuse it without also breaking the authorized task? Fixing the proposed call lets us isolate the behavior of the execution boundary.",
    },
    {
      type: "p",
      text: "OWASP recommends controls beyond prompt filtering, including least privilege and checking proposed actions against the task. MCP’s security guidance also treats authorization as a protocol and application concern. Neither source implies that a small browser simulator is a complete defense. The lab makes a narrower proposition testable: external text and model arguments must not determine the caller’s permissions.",
    },
    { type: "h2", text: "The experimental setup" },
    {
      type: "p",
      text: "The synthetic caller, Alex, belongs to tenant North. Invoice INV-A belongs to North and invoice INV-B belongs to South. A predefined tool call accompanies each fixture. Some fixtures include a hostile document note; one includes revoked access. The text is displayed for context and is never parsed into permissions. Exact approval is supplied separately as trusted test data.",
    },
    {
      type: "p",
      text: "The baseline validates known tool names and basic input structure but omits four authorization controls. The comparison enables active-identity checks, a tool allowlist, stored-record ownership checks, and approval bound to the actor and exact send payload. Both configurations run the same seven fixtures, so changes in the result come from the controls rather than model sampling.",
    },
    {
      type: "ul",
      items: [
        "Legitimate read: INV-A should be readable by Alex.",
        "Cross-tenant read: a proposed INV-B read must fail even if its arguments claim tenant North.",
        "Bulk export: an invoice note cannot authorize the export tool.",
        "Unapproved send: a read-only request cannot become a reminder send.",
        "Approved send: an exact, trusted approval should allow the intended reminder.",
        "Changed recipient: changing the recipient after approval must invalidate that approval.",
        "Revoked access: a previously valid read must fail once the caller is inactive.",
      ],
    },
    {
      type: "h2",
      text: "Results: containment without blocking the legitimate fixtures",
    },
    {
      type: "p",
      text: "For engine version 1.0.0, the baseline matches 2 of 7 expected decisions. It permits both legitimate operations, but also permits all five adverse actions. With every control enabled, the engine matches 7 of 7 expected decisions: all five adverse actions are blocked and both legitimate operations remain allowed. A denied call produces an empty simulated-effects list.",
    },
    {
      type: "p",
      text: "Those counts are deliberately small and fully inspectable. They are not a model accuracy score, an attack-success rate across prompts, or evidence about a production deployment. The fixtures were selected to exercise the controls, so passing them establishes those specific behaviors only. It cannot establish coverage of attacks we did not include.",
    },
    { type: "h2", text: "Remove one control and observe the regression" },
    {
      type: "p",
      text: "Disable tenant ownership and the cross-tenant read becomes allowed. Disable tool scope and the intentionally overbroad export becomes available. Disable exact approval and unapproved or changed-recipient sends become allowed. Disable the active-identity check and the revoked caller can read again. The lab recomputes the entire suite when a control changes, making both regressions and preserved legitimate actions visible.",
    },
    {
      type: "p",
      text: "The export example also shows a composition limit. Its intentionally vulnerable implementation has no row-level filtering, so tenant checks on individual reads do not protect the bulk endpoint. In a real system, every route to the data needs authorization, including exports, search, background jobs, and cached responses. A safe read endpoint cannot compensate for an unsafe alternative endpoint.",
    },
    { type: "h2", text: "Reproduce the result independently" },
    {
      type: "p",
      text: "Download the dependency-free module from the lab, save the following snippet beside it as reproduce.mjs, and run node reproduce.mjs with a current Node.js release. The module is the same source imported by the browser. It returns the controls, fixture-level decisions, policy trace, and synthetic effects as plain data.",
    },
    {
      type: "code",
      language: "JavaScript",
      text: "import { runSuite, allControls, noControls }\n  from './agent-security-engine.mjs';\n\nfor (const policy of [noControls, allControls]) {\n  const report = runSuite(policy);\n  console.log(report.correct, report.total);\n  console.log(report.results);\n}\n// Expected summary pairs: 2 7, then 7 7.",
    },
    {
      type: "p",
      text: "The repository also includes 19 automated tests. Beyond the seven fixture expectations, they check individual control removal, changed approval fields, malformed inputs, unknown tools, record identifiers that resemble prototype properties, document-text independence, and lack of mutation. Run npm run test:lab from the repository to reproduce them.",
    },
    { type: "h2", text: "What a production implementation still needs" },
    {
      type: "p",
      text: "Move the policy and trusted context to a server-side enforcement point. Authenticate the caller, validate token audiences, retrieve tenant membership and current permissions, and obtain approvals from trusted storage. Browser toggles and client-side records are an educational interface, not a security boundary.",
    },
    {
      type: "p",
      text: "This experiment does not model approval expiry or replay, concurrent revocation, network egress, idempotent writes, malicious final answers, or the probability that an LLM proposes an adverse action. A next experiment could add one-time approvals and a retry ledger, then test races and ambiguous execution outcomes. Treat the current suite as a reproducible starting point for those additional tests, not as a certification.",
    },
  ],
};
