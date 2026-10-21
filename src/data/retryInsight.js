export const retryInsight = {
  "slug": "ai-agent-retries-idempotency",
  "category": "AI Engineering",
  "title": "Safe Retries for AI Agent Tools: Idempotency Beyond Authorization",
  "excerpt": "An authorized action can still run twice after a timeout. Design stable operation IDs, durable execution records, and explicit recovery for ambiguous outcomes.",
  "metaDescription": "Design safe retries for AI agent tools with stable operation IDs, tenant-scoped idempotency, durable execution records, and tests for ambiguous outcomes.",
  "date": "Oct 21, 2026",
  "dateISO": "2026-10-21",
  "readTime": "5 min read",
  "tags": [
    "AI Agents",
    "Idempotency",
    "Azure",
    "Reliability"
  ],
  "summary": "Authorization decides whether an action may run. Idempotency controls whether a retry repeats its effects. Keep the operation identity stable across attempts, bind it to the approved payload, and reconcile an unknown outcome before creating a new operation.",
  "editorialNote": "Research-informed design guide developed with AI assistance. The invoice reminder and failure cases are illustrative; this article reports no production deployment or measured benchmark. Primary documentation checked October 21, 2026.",
  "sources": [
    {
      "title": "Microsoft Learn: Prevent message loss and duplicate processing in Azure Service Bus",
      "url": "https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-message-loss-and-duplicates"
    },
    {
      "title": "Azure Architecture Center: Idempotent Consumer pattern",
      "url": "https://learn.microsoft.com/en-us/azure/architecture/patterns/idempotent-consumer"
    },
    {
      "title": "Stripe API: Idempotent requests",
      "url": "https://docs.stripe.com/api/idempotent_requests"
    }
  ],
  "content": [
    {
      "type": "h2",
      "text": "The failure after the permission check"
    },
    {
      "type": "p",
      "text": "Consider an agent asked to send one invoice reminder. The application verifies tenant ownership and approval, the downstream service accepts the message, and then the connection drops before the application receives a response. The agent sees a timeout. Sending again with a fresh operation identifier may deliver a second reminder. Refusing every retry would avoid that duplicate but could also abandon requests that never reached the service."
    },
    {
      "type": "p",
      "text": "The useful distinction is between an unsuccessful observation and an unsuccessful action. A timeout tells the caller that it lacks a conclusive response. It does not, on its own, establish that nothing happened. This is a reliability problem even when the model follows instructions perfectly."
    },
    {
      "type": "link",
      "text": "Explore the earlier tool-authorization lab →",
      "href": "/labs/agent-security"
    },
    {
      "type": "h2",
      "text": "Give the logical action an identity before execution"
    },
    {
      "type": "p",
      "text": "For the reminder workflow, let trusted application code create an operation ID when it records the approved action. Persist that ID with the authenticated tenant, actor, tool, invoice, recipient, and message body. Every transport attempt for that same action carries the same ID. A genuinely new reminder receives a new ID, even when its text happens to match an earlier reminder."
    },
    {
      "type": "p",
      "text": "Do not let the model regenerate the identifier while retrying. Do not use only an invoice ID: an invoice may legitimately receive several reminders. A correlation ID is useful for tracing a conversation, but one conversation may contain several distinct actions. Keep trace identity, operation identity, and attempt identity separate."
    },
    {
      "type": "p",
      "text": "Within this illustrative design, scope the execution record by tenant, tool, and operation ID. Bind it to a canonical representation of the approved payload, using a hash only after defining field normalization. Reusing the ID with a changed recipient must produce a conflict, not silently replay a result for different arguments. An idempotency key is not a credential; authorization still applies."
    },
    {
      "type": "h2",
      "text": "Record outcomes without inventing certainty"
    },
    {
      "type": "ul",
      "items": [
        "Pending: the operation is durably recorded but has no confirmed downstream outcome.",
        "Succeeded: persist the downstream receipt and the result the authorized caller may retrieve.",
        "Rejected: retain a definitive refusal and its reason where appropriate.",
        "Unknown: execution may have occurred, but evidence is insufficient to label it successful or failed."
      ]
    },
    {
      "type": "p",
      "text": "This state model is a design proposal, not a provider API contract. It deliberately separates an unknown outcome from a rejection. When a worker dies after dispatch, recovery should inspect the downstream receipt or retry under the provider's supported idempotency contract. Creating a fresh ID to escape the uncertainty changes the operation and can duplicate its effects."
    },
    {
      "type": "p",
      "text": "A durable record alone is insufficient if two workers can both observe that the key is absent and dispatch simultaneously. For effects inside one database, place the business write and deduplication record in the same transaction, with a uniqueness constraint that arbitrates concurrent claims. For an external email or payment provider, that database transaction cannot atomically commit the remote effect. Use the downstream service's guarantees, or reconcile ambiguous work explicitly."
    },
    {
      "type": "h2",
      "text": "Read the provider's actual contract"
    },
    {
      "type": "p",
      "text": "Azure Service Bus duplicate detection addresses repeated producer sends within a configured window. It does not remove the need for idempotent consumers when a message is redelivered. In peek-lock mode, processing can finish before settlement succeeds, leaving another consumer to receive the message again. Preserve the logical operation identity across that handoff."
    },
    {
      "type": "p",
      "text": "Stripe illustrates why generic retry advice is insufficient. Its API v1 saves the response after endpoint execution begins, including a 500 response; retries with that key return the saved response. Parameters must match, and reuse after a retained key is pruned can create a new request. API v2 has different documented behavior for failed or partially completed operations. Those are Stripe-specific contracts, not promises made by every tool API."
    },
    {
      "type": "h2",
      "text": "Six failure tests before granting write access"
    },
    {
      "type": "ul",
      "items": [
        "Lost response after acceptance: simulate downstream success followed by a timeout. Retry the same logical operation and inspect the actual effect count.",
        "Concurrent attempts: release two workers against the same operation ID. Check the uniqueness mechanism and downstream behavior, not just HTTP status codes.",
        "Changed payload: retry the same ID with a different recipient or body. Require a conflict with no new effect.",
        "Worker restart: stop execution after remote acceptance but before the local success record. Verify that recovery preserves uncertainty until reconciled.",
        "Expired deduplication history: retry after the provider's retention window. Verify the application's reconciliation policy rather than assuming deduplication lasts forever.",
        "Revoked permission: retry after the caller loses access. Verify that neither a new dispatch nor disclosure of a cached result bypasses current authorization."
      ]
    },
    {
      "type": "h2",
      "text": "Define what success means"
    },
    {
      "type": "p",
      "text": "For each test, record the logical operation ID, attempt IDs, authorization decision, downstream receipt, and observed effects. Avoid logging message bodies or personal data unless required and appropriately protected. Specify the boundary being tested: one database mutation, one accepted provider request, and one delivered email are different claims."
    },
    {
      "type": "p",
      "text": "The release criterion should name the invariant and its limits: for example, retries of one approved operation produce no additional accepted sends within the documented retention and recovery conditions. This article supplies a design and test plan, not proof that a particular implementation satisfies it. The next step is to execute those cases against the actual database, broker, and downstream service used by the application."
    }
  ]
};
