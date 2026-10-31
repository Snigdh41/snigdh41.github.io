export const migrationInsight = {
  "slug": "dotnet-8-9-end-of-support-migration",
  "category": ".NET Engineering",
  "title": ".NET 8 and 9 End of Support: A Deployment-First Migration Checklist",
  "excerpt": "November 10, 2026 is the support deadline for both releases. Inventory the deployed runtime, test the published artifact, and rehearse rollback before calling the upgrade complete.",
  "metaDescription": ".NET 8 and .NET 9 reach end of support November 10, 2026. Plan a .NET 10 migration with runtime inventory, compatibility tests, artifact verification, and rollback.",
  "date": "Oct 31, 2026",
  "dateISO": "2026-10-31",
  "sourcesChecked": "October 31, 2026",
  "readTime": "4 min read",
  "tags": [
    ".NET",
    "Migration",
    "Deployment",
    "Reliability"
  ],
  "summary": "Changing TargetFramework is one step. A migration is complete when the actual deployed artifact runs on a supported runtime, important behaviors pass regression tests, and the team can recover safely from a failed rollout.",
  "editorialNote": "Researched and written autonomously by an AI agent under publishing instructions from the site owner. This is a sourced migration checklist and illustrative release plan, not a report of a completed production migration.",
  "sources": [
    {
      "title": "Microsoft .NET Blog: .NET 8 and .NET 9 end of support",
      "url": "https://devblogs.microsoft.com/dotnet/dotnet-8-9-end-of-support/"
    },
    {
      "title": "Microsoft Learn: .NET application publishing overview",
      "url": "https://learn.microsoft.com/en-us/dotnet/core/deploying/"
    },
    {
      "title": "Microsoft Learn: Breaking changes in .NET 10",
      "url": "https://learn.microsoft.com/en-us/dotnet/core/compatibility/10"
    }
  ],
  "content": [
    {
      "type": "h2",
      "text": "A shared deadline, not an automatic shutdown"
    },
    {
      "type": "p",
      "text": "Microsoft lists November 10, 2026 as the end of support for both .NET 8 and .NET 9. Applications do not automatically stop running on that date, but these releases stop receiving servicing, security fixes, and technical support. Microsoft recommends .NET 10, an LTS release supported through November 2028. This guide was checked on October 31; consult the linked policy before planning a later migration."
    },
    {
      "type": "p",
      "text": "The practical task is to account for every deployed application, not just every project file. A repository can target the intended framework while an old container, scheduled job, or deployment slot continues serving an earlier artifact. Treat the rollout as an inventory and verification exercise with explicit owners."
    },
    {
      "type": "h2",
      "text": "Start with what is actually running"
    },
    {
      "type": "ul",
      "items": [
        "For each service, record its owner, target framework, SDK selection, deployment mode, operating system, hosting platform, and deployed artifact identifier.",
        "Include background workers, command-line utilities, scheduled jobs, inactive recovery environments, and vendor-supplied applications.",
        "Record which team owns runtime patching and which pipeline produces the artifact. An unanswered ownership question is a migration dependency."
      ]
    },
    {
      "type": "p",
      "text": "Framework-dependent applications rely on a compatible installed runtime. Self-contained applications ship their runtime with the published output. Consequently, inspecting only the host runtime list does not establish which runtime a self-contained application carries. For containers, inspect the final runtime image as well as the SDK build stage. Updating a build image alone is not evidence that the running application changed."
    },
    {
      "type": "p",
      "text": "Keep inventory commands and conclusions separate. A runtime listing on a developer laptop describes that laptop. It is not proof about a production host. Collect deployment manifests and runtime evidence from the environment that actually executes the service, using existing authorized access."
    },
    {
      "type": "h2",
      "text": "Make the smallest migration you can verify"
    },
    {
      "type": "p",
      "text": "Retarget application projects to net10.0 where appropriate, align SDK selection and CI tooling, and review dependencies for compatible releases. Preserve the deployment model initially. Combining a framework upgrade with a database redesign, a move to Native AOT, and a new hosting platform makes failures harder to attribute. Those improvements can have separate release criteria."
    },
    {
      "type": "p",
      "text": "Read the .NET 10 compatibility catalog for the technologies the application uses. Microsoft distinguishes source, binary, and behavioral changes: compiling successfully covers only part of the risk. For an application moving from .NET 8, review intervening .NET 9 changes as well. The relevant list depends on the application; a generic checklist cannot establish compatibility for every package or hosting environment."
    },
    {
      "type": "h2",
      "text": "Test the artifact you will deploy"
    },
    {
      "type": "p",
      "text": "Build a release candidate through the normal publishing pipeline and run it in a representative environment. Testing source through a development server is not equivalent to testing the packaged output. Preserve artifact identity between the validated candidate and the deployment rather than rebuilding an untracked variation at release time."
    },
    {
      "type": "ul",
      "items": [
        "Identity and access: verify successful sign-in, expired credentials, forbidden requests, and intended status codes.",
        "Contracts: replay representative API payloads and compare serialization, validation errors, dates, and null handling.",
        "Persistence: exercise representative queries, transaction boundaries, and schema compatibility with both rollout and rollback versions.",
        "Operations: test startup, graceful shutdown, cancellation, health checks, background-job completion, and downstream timeouts.",
        "Diagnostics: confirm logs, traces, and alerts still identify failures without exposing sensitive inputs."
      ]
    },
    {
      "type": "p",
      "text": "These are proposed regression categories, not measured test results. Choose concrete cases from the service's real contract and incident history. Record the input, expected behavior, observed result, artifact identifier, and environment. When a case changes intentionally, document the new contract instead of weakening the assertion until the build turns green."
    },
    {
      "type": "h2",
      "text": "Rehearse rollback before increasing traffic"
    },
    {
      "type": "p",
      "text": "For an illustrative rollout, begin with a small traffic slice and compare error rates, latency, and business outcomes with the prior version. Define the observation period and stop conditions before release. A healthy process does not prove that authentication, billing, or a scheduled export still behaves correctly."
    },
    {
      "type": "p",
      "text": "Keep the previous artifact available, but check whether rollback can read data written by the new version. A destructive schema change can make an application rollback unsafe. Prefer changes that allow old and new versions to coexist during the transition, or provide a separately validated recovery procedure. Rolling back to an unsupported runtime may be an emergency measure; it is not completion of the support migration."
    },
    {
      "type": "h2",
      "text": "Close the migration with evidence"
    },
    {
      "type": "p",
      "text": "A useful completion record includes the deployed artifact and runtime, the compatibility issues addressed, the regression results, the rollback rehearsal, and the owner of future patch updates. Capture remaining exceptions explicitly, including vendor dependencies and a dated follow-up. This makes the migration auditable without claiming that a successful build guarantees a safe release."
    }
  ]
};
