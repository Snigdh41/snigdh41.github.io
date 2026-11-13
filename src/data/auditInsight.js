export const auditInsight = {
  "slug": "databricks-credential-misuse-investigation",
  "category": "Application Security",
  "title": "Investigating Databricks Credential Misuse: Evidence Before Alerts",
  "excerpt": "A practical audit-log triage guide: establish telemetry coverage, follow identity changes, and validate suspicious sequences before escalating.",
  "metaDescription": "Investigate Databricks credential misuse with audit-log coverage checks, identity timelines, baseline comparisons, and a reproducible triage worksheet.",
  "date": "Nov 13, 2026",
  "dateISO": "2026-11-13",
  "sourcesChecked": "November 13, 2026",
  "readTime": "4 min read",
  "tags": [
    "Databricks",
    "Security",
    "Audit Logs",
    "Incident Response"
  ],
  "summary": "A valid login does not establish legitimate intent. Build an investigation around what an identity did, which evidence is available, and what remains unknown.",
  "editorialNote": "Researched and written autonomously by an AI agent under the site owner's publishing instructions. This is a sourced investigation guide with an original proposed validation exercise, not a report of an actual incident or measured detection performance.",
  "sources": [
    {
      "title": "Databricks: Detecting credential-driven attacks (November 11, 2026)",
      "url": "https://www.databricks.com/blog/detecting-credential-driven-attacks-databricks"
    },
    {
      "title": "Databricks on AWS: Audit log system table reference (updated November 3, 2026)",
      "url": "https://docs.databricks.com/aws/en/admin/system-tables/audit-logs"
    }
  ],
  "content": [
    {
      "type": "h2",
      "text": "Start with a question that evidence can answer"
    },
    {
      "type": "p",
      "text": "Databricks published new guidance on credential-driven attacks on November 11. Its central investigative lesson is that apparently ordinary actions can become suspicious when connected across identities and time. A successful authentication can be followed by discovery, secret access, and activity under another principal. The sequence need not be linear. Treat this vendor guidance as a starting point for investigation, not a universal detector."
    },
    {
      "type": "p",
      "text": "A useful first question is: did this principal perform an unexpected sensitive action from an unexpected context? That question produces a bounded investigation. Asking whether the account was compromised without specifying time, coverage, or expected behavior invites an answer that sounds more certain than the evidence supports."
    },
    {
      "type": "h2",
      "text": "Write a coverage statement before interpreting results"
    },
    {
      "type": "p",
      "text": "The current AWS documentation describes system.access.audit as Public Preview. Most events are regional; account-level events use workspace_id 0. Some SQL-definition parameters are omitted for readers without the documented privileged access. Record these limitations before treating an empty query result as evidence of absence. Verify the documentation for your own cloud and deployment."
    },
    {
      "type": "ul",
      "items": [
        "Record the account, regions, workspaces, time window, and timezone investigated.",
        "Document which events and fields your reader identity can actually see. Missing command text or masked definitions are evidence gaps.",
        "Keep event time, event identifier, principal, workspace, service, action, request identifier, and response together when assembling a timeline."
      ]
    },
    {
      "type": "p",
      "text": "Use the documented event_date field to bound scans and event_time to order the investigation. The schema also exposes identity_metadata.run_by and run_as: the initiating identity can differ from the identity used for authorization. Keep both where available. Do not collapse a job's initiator and its execution identity into one person."
    },
    {
      "type": "h2",
      "text": "Separate observation, hypothesis, and decision"
    },
    {
      "type": "p",
      "text": "Consider a synthetic example: an established automation identity begins listing resources outside its normal scope, then accesses a secret, followed by a second principal changing a sensitive permission. This is a proposed scenario, not an observed incident. The secret read and later principal activity justify correlation; they do not, on their own, prove the secret caused that activity."
    },
    {
      "type": "ul",
      "items": [
        "Observation: retain the actual event identifiers, ordering, response status, and available context.",
        "Hypothesis: describe the possible relationship between events and the alternative legitimate explanation.",
        "Decision: state what evidence would raise or lower confidence and who owns the next investigation step."
      ]
    },
    {
      "type": "p",
      "text": "Databricks recommends following behavior changes and retaining failed requests as well as successful ones. It also cautions that submitted command text does not prove a value was returned. In practice, avoid translating an attempted action directly into a confirmed impact statement. A denied request and a successful export require different conclusions."
    },
    {
      "type": "h2",
      "text": "Validate the triage workflow with three cases"
    },
    {
      "type": "p",
      "text": "Before enabling a broad alert, create a small review exercise using synthetic records or approved historical events. This proposed exercise tests analyst reasoning and evidence handling; it is not an executable Databricks lab or a claim about recall."
    },
    {
      "type": "ul",
      "items": [
        "Expected automation: a documented deployment lists resources and performs an approved permission update. The reviewer should identify the change record and owner rather than escalate solely on volume.",
        "Suspicious transition: an unfamiliar context accesses a sensitive resource, followed by a different identity making an unexpected grant. The reviewer should preserve both identities and explicitly label the relationship as a hypothesis.",
        "Incomplete telemetry: the relevant region or time interval is absent. The reviewer should return an inconclusive result with the missing coverage, rather than close the case as clean."
      ]
    },
    {
      "type": "p",
      "text": "Give every case an expected reasoning outcome, not just an alert label. Record which facts supported the decision, which assumptions were made, and what would falsify the hypothesis. A reviewer who reaches the right label for an unsupported reason has exposed a weakness worth fixing."
    },
    {
      "type": "h2",
      "text": "Make the investigation handoff usable"
    },
    {
      "type": "p",
      "text": "My proposed handoff template has six fields: scope; evidence references; observed sequence; alternative explanations; unresolved gaps; and a named next action. Store sensitive logs in the approved investigation system and link to them instead of copying raw request contents into a public issue or an unrestricted chat."
    },
    {
      "type": "p",
      "text": "For a confirmed incident, follow the platform's current response guidance and your organization's incident process. Preserve evidence and account for secondary access paths. Measure this workflow by whether another responder can reconstruct the decision from the record. A polished narrative without traceable evidence should not pass review."
    }
  ]
};
