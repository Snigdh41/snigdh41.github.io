import { agentLabInsight } from "./agentLabInsight";

export const newInsights = [
  agentLabInsight,
  {
    slug: "production-ai-agent-checklist",
    category: "AI Engineering",
    title:
      "A Production AI Agent Checklist: Identity, Evaluation, and Recovery",
    excerpt:
      "A practical release checklist for agents that query enterprise data or call business APIs, with a worked example and explicit failure tests.",
    metaDescription:
      "A production AI agent checklist covering identity, tool authorization, evaluations, cost limits, retries, and rollback, with a worked example.",
    date: "Oct 14, 2026",
    dateISO: "2026-10-14",
    readTime: "5 min read",
    tags: ["AI Agents", "Azure", "Identity", "Evaluation", "Governance"],
    summary:
      "Start with one bounded workflow. Authorize every tool call outside the model, evaluate complete tasks against known outcomes, and prove that retries, revocation, and rollback behave correctly before granting write access.",
    editorialNote:
      "A research-informed engineering guide. The example and release criteria below are illustrative recommendations, not an account of an employer deployment or measured production results.",
    sources: [
      {
        title: "Microsoft Learn: Microsoft Entra security for AI overview",
        url: "https://learn.microsoft.com/en-us/entra/agent-id/security-for-ai-overview",
      },
      {
        title:
          "Databricks: How to scale agentic applications without creating AI sprawl",
        url: "https://www.databricks.com/blog/how-scale-agentic-applications-without-creating-ai-sprawl",
      },
    ],
    content: [
      { type: "h2", text: "Why the release checklist needs to change" },
      {
        type: "p",
        text: "An assistant that drafts a paragraph can be wrong without changing a system. An agent that updates an account has a different failure boundary: its output becomes an input to an API. A useful review therefore asks what the application can do when the model misunderstands a request, receives hostile retrieved text, or loses a connection halfway through a task.",
      },
      {
        type: "p",
        text: "Current platform guidance points toward stronger operational controls. Microsoft distinguishes user-delegated agents from autonomous agents with their own identities. Databricks argues for shared infrastructure for agent context, governance, evaluation, and observability. Those are product directions, not evidence that adopting a platform automatically makes an application reliable. The checklist below is a proposed way to turn the operating concerns into release evidence.",
      },
      { type: "h2", text: "1. Define the smallest useful task" },
      {
        type: "p",
        text: "Consider an illustrative invoice assistant. Its first job is to find overdue invoices for the signed-in account manager and draft a reminder. Sending the reminder is a separate action. Changing payment details is outside its scope. This boundary makes success measurable: the correct invoices, for the correct account manager, with accurate amounts and dates, in a draft that can be reviewed.",
      },
      {
        type: "ul",
        items: [
          "Write down the allowed inputs, outputs, and side effects.",
          "Identify the deterministic calculation or query behind each factual answer.",
          "Define when the system must ask for clarification, decline a task, or hand it to a person.",
        ],
      },
      { type: "h2", text: "2. Put authorization at the tool boundary" },
      {
        type: "p",
        text: "The API must derive the caller and permitted accounts from trusted identity context. Do not trust an account ID merely because the model supplied it. Filter records before returning them to the agent, and check authorization again when an action is executed. An earlier successful read does not prove that a later write is still permitted.",
      },
      {
        type: "p",
        text: "For the invoice example, expose a narrow draft-reminder operation rather than arbitrary SQL or a general outbound HTTP tool. If sending is later enabled, approval should bind to the actual recipients, invoice IDs, and message content. A changed draft invalidates the earlier approval. Treat retrieved documents as data; an instruction inside an invoice cannot expand the application’s authority.",
      },
      { type: "h2", text: "3. Evaluate the task, not just the answer" },
      {
        type: "p",
        text: "Build a small, versioned test set before changing prompts or models. Record expected records, tool calls, and side effects alongside the expected response. Use deterministic assertions for account boundaries and duplicate sends. Use human review for whether the draft is clear and appropriately qualified. A fluent answer should never compensate for an unauthorized read.",
      },
      {
        type: "ul",
        items: [
          "A valid request returns only invoices visible to the caller.",
          "A forged account ID is rejected even when the requested invoice exists.",
          "An invoice containing instructions to send data elsewhere does not trigger another tool.",
          "A request with no matching invoices produces an explicit empty result rather than an invented balance.",
          "Access revoked between drafting and sending prevents the send.",
          "A timeout followed by retry cannot produce two reminders.",
        ],
      },
      { type: "h2", text: "4. Design recovery before enabling writes" },
      {
        type: "p",
        text: "Assign a stable operation ID when a send is approved. Store its state at the service boundary and reuse the same ID on retries. If the downstream provider cannot deduplicate requests or report whether a send succeeded, an ambiguous timeout should become a reconciliation task rather than an automatic resend. The system needs a way to distinguish “failed” from “outcome unknown.”",
      },
      {
        type: "p",
        text: "Bound runtime, tool-call count, and spending per task. Save enough structured evidence to reconstruct a failure: model and prompt versions, permitted operation, authorization result, approval reference, and tool status. Avoid recording full invoice contents by default. Test a kill switch that disables new writes while preserving the evidence needed to investigate.",
      },
      { type: "h2", text: "5. Make rollout a sequence of gates" },
      {
        type: "p",
        text: "Begin with offline fixtures, then a read-only pilot, then drafts reviewed by people. Enable a narrow write operation only after its failure tests pass and an owner accepts the remaining risks. Set thresholds appropriate to that task rather than copying a universal accuracy target. Track task completion and time saved alongside incorrect actions, escalation rate, latency, and cost per successful task.",
      },
      {
        type: "p",
        text: "The release artifact should be a short evidence bundle: the task boundary, permission map, evaluation results, recovery procedure, and named operational owner. A new model or tool permission changes that evidence. Re-run the affected tests before expanding the rollout.",
      },
    ],
  },
  {
    slug: "databricks-data-quality-contracts",
    category: "Data Engineering",
    title: "Data Quality Contracts in Databricks: Beyond a Passing Pipeline",
    excerpt:
      "How to define freshness, completeness, and failure handling before a dataset feeds a dashboard or AI assistant. Includes a small SQL validation example.",
    metaDescription:
      "Design Databricks data quality contracts for freshness, uniqueness, completeness, and recovery. Includes illustrative SQL checks and a release checklist.",
    date: "Oct 14, 2026",
    dateISO: "2026-10-14",
    readTime: "5 min read",
    tags: [
      "Databricks",
      "Data Quality",
      "Data Contracts",
      "SQL",
      "Data Governance",
    ],
    summary:
      "A successful pipeline run does not prove that a dataset is usable. Define its meaning, owner, freshness target, validation rules, and failure response; then test those promises where downstream consumers depend on them.",
    editorialNote:
      "An illustrative design guide with synthetic examples. The SQL is a validation pattern to adapt and test against your schema; it is not a benchmark or a report about employer data.",
    sources: [
      {
        title:
          "Databricks documentation: Manage data quality with pipeline expectations",
        url: "https://docs.databricks.com/aws/en/ldp/expectations",
      },
      {
        title: "Databricks: Data-native AI agents",
        url: "https://www.databricks.com/blog/data-native-ai-agents-why-agents-must-move-your-data",
      },
    ],
    content: [
      { type: "h2", text: "Start with the decision the dataset supports" },
      {
        type: "p",
        text: "Suppose a daily operations report shows open invoices. An upstream job finishes successfully, but it loads only one of three source regions. The SQL is valid and the dashboard renders. The business still receives a misleading answer. The missing requirement is a contract describing what “ready” means for this particular dataset.",
      },
      {
        type: "p",
        text: "The same problem becomes harder to notice when an AI assistant turns the result into a confident sentence. Databricks’ discussion of data-native agents emphasizes keeping governed data and agent computation together. An additional engineering question remains: even when access is authorized, is the data complete and current enough for this answer? This guide proposes a consumer-facing contract to make that question testable.",
      },
      { type: "h2", text: "Write a small contract before writing more checks" },
      {
        type: "p",
        text: "A contract can start as a reviewed document stored beside the transformation code. It should define the dataset at the level a consumer understands, not merely list column types. For an illustrative daily invoice snapshot, the following fields would make the operational promise explicit.",
      },
      {
        type: "ul",
        items: [
          "Grain: one row per invoice and snapshot date; multiple invoice lines must be aggregated or represented by a different key.",
          "Meaning: amounts use a named currency convention, and status values have agreed definitions.",
          "Coverage: each expected source region reports a successful batch, including an explicit empty batch when there are no records.",
          "Freshness: yesterday’s completed business day is ready by an agreed time in a named timezone.",
          "Ownership: one team owns the producer, a named contact owns the report, and an escalation channel exists.",
          "Failure response: hold publication, label a previous snapshot as stale, or publish partial data with visible coverage only if consumers have accepted that behavior.",
        ],
      },
      { type: "h2", text: "Separate row rules from dataset rules" },
      {
        type: "p",
        text: "Databricks pipeline expectations evaluate SQL Boolean constraints on records. Its documented actions can retain invalid rows while recording quality information, drop invalid rows, or fail an update. The constraints do not support subqueries to other tables. Use separate aggregate validation for uniqueness, expected-source coverage, and reconciliation instead of assuming a row expectation verifies the entire contract.",
      },
      {
        type: "p",
        text: "The following illustrative Spark SQL query returns duplicate business keys for one fixed snapshot. Use a run parameter in an actual job. A passing check returns zero rows. This example assumes invoice_id and snapshot_date define the agreed grain; it would be wrong for a table whose grain is invoice line.",
      },
      {
        type: "code",
        language: "SQL",
        text: "SELECT invoice_id, snapshot_date, COUNT(*) AS row_count\nFROM curated.invoice_daily\nWHERE snapshot_date = DATE '2026-10-13'\nGROUP BY invoice_id, snapshot_date\nHAVING COUNT(*) > 1;",
      },
      {
        type: "p",
        text: "Check null business keys separately. For freshness, use a batch manifest with a completed business date, source-region identifier, and completion time. The largest event timestamp in the table is insufficient: a single recent row can hide an otherwise incomplete load. Coverage checks should compare the manifest with the expected source list, rather than infer success from whichever sources happened to arrive.",
      },
      { type: "h2", text: "Choose a failure action based on the consumer" },
      {
        type: "p",
        text: "Dropping malformed records may be acceptable for a low-stakes exploratory event stream, but it can silently understate a financial total. Failing every minor anomaly can also leave a report permanently stale. Classify each rule by its consequence: warn for a newly observed optional attribute, quarantine an invalid key for repair, and block publication when a required source is missing.",
      },
      {
        type: "p",
        text: "Keep rejected records in a restricted repair path when retention and data handling requirements allow it. Record the rule, batch, and reason, then decide who can correct and replay them. Do not treat quarantine as an unowned second data lake. A useful quality measure includes unresolved age and repair rate, not just how many rows were rejected.",
      },
      { type: "h2", text: "Publish data and readiness together" },
      {
        type: "p",
        text: "Make the readiness result part of the consumer interface. A dashboard should show the business date and source coverage. An assistant should receive those fields alongside the query result and decline a current-state answer when the snapshot is not ready. Preserve the last accepted version when appropriate, but label its age explicitly. A stale answer described honestly is easier to reason about than a current-looking answer assembled from partial data.",
      },
      { type: "h2", text: "Test the contract with a deliberately bad batch" },
      {
        type: "ul",
        items: [
          "Remove one expected source and confirm publication is held.",
          "Duplicate one invoice key and confirm the aggregate validation finds it.",
          "Send an explicit empty batch and confirm it is distinguishable from a missing batch.",
          "Replay the same batch and check that the output is not duplicated.",
          "Restore a corrected batch and confirm readiness changes only after all required checks pass.",
        ],
      },
      {
        type: "p",
        text: "Version changes to grain, business meaning, and readiness promises with the consumers who depend on them. Adding a column is usually easier than changing what an existing amount represents. The contract earns its place when it changes release and recovery behavior, not when it becomes another document nobody reads.",
      },
    ],
  },
];
