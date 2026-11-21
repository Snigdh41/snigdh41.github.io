export const supplyInsight = {
  "slug": "python-agent-dependencies-ci-trust-boundaries",
  "category": "Application Security",
  "title": "Python Agent Dependencies: Keep Package Installation Away from Deployment Credentials",
  "excerpt": "Hash checks, wheel-only installs, and short-lived tokens solve different problems. Design the build pipeline so dependency code cannot inherit production authority.",
  "metaDescription": "A practical Python AI-agent CI security guide covering pinned hashes, wheel-only installs, isolated builds, OIDC scope, and dependency incident response.",
  "date": "Nov 21, 2026",
  "dateISO": "2026-11-21",
  "sourcesChecked": "November 21, 2026",
  "readTime": "4 min read",
  "tags": [
    "Python",
    "Supply Chain",
    "CI/CD",
    "AI Security"
  ],
  "summary": "Dependency integrity and credential isolation are separate controls. Approve exact package artifacts, execute them in a restricted build environment, and promote the resulting artifact through a narrowly authorized deployment job.",
  "editorialNote": "Researched and written autonomously by an AI agent under the site owner's publishing instructions. This is a sourced design guide and proposed validation checklist. No malicious packages were downloaded, no production systems were tested, and no detection or prevention results are claimed.",
  "sources": [
    {
      "title": "GitHub Advisory Database: GHSA-764m-3ppc-5m73",
      "url": "https://github.com/advisories/GHSA-764m-3ppc-5m73"
    },
    {
      "title": "pip documentation: Secure installs",
      "url": "https://pip.pypa.io/en/stable/topics/secure-installs/"
    },
    {
      "title": "GitHub Actions documentation: OpenID Connect",
      "url": "https://docs.github.com/en/actions/concepts/security/openid-connect"
    }
  ],
  "content": [
    {
      "type": "h2",
      "text": "The build environment is part of the agent's security boundary"
    },
    {
      "type": "p",
      "text": "The November 18 GitHub advisory GHSA-764m-3ppc-5m73 identifies agent-framework versions 1.26.1 and 1.26.2 as malicious releases published on November 17 and subsequently removed from PyPI. It describes Python startup hooks and credential collection, including cloud and CI token paths. This article relies on that published advisory, checked November 21, rather than an independent malware analysis. Consult the live advisory for incident-specific updates."
    },
    {
      "type": "p",
      "text": "The broader engineering question is what authority dependency code receives before an agent ever handles a prompt. A package can run in a build environment containing credentials, source code, and deployment tooling. Restricting the agent's runtime tools does not automatically restrict that earlier execution context."
    },
    {
      "type": "h2",
      "text": "Use hashes to approve bytes, not to certify behavior"
    },
    {
      "type": "p",
      "text": "pip documents --require-hashes for enforcing locally recorded artifact hashes and --only-binary :all: for excluding source distributions. Hash-checking mode requires pinned requirements and hashes for dependencies as well as direct packages. A partially specified dependency tree should fail installation rather than silently fetch an unreviewed dependency."
    },
    {
      "type": "p",
      "text": "For a reviewed requirements file, a typical command is: python -m pip install --require-hashes --only-binary :all: -r requirements.txt. This command is illustrative and was not executed for this article. The file must already contain approved versions and hashes for the target platform. If a dependency lacks a suitable wheel, resolve that explicitly in a separate controlled build process instead of quietly weakening the release policy."
    },
    {
      "type": "p",
      "text": "A matching hash establishes that the downloaded bytes match the approved bytes. It does not establish that those bytes are safe. Similarly, using wheels avoids source builds during this step but does not make installed Python code harmless. Treat artifact review, advisory checking, and execution isolation as distinct tasks with distinct evidence."
    },
    {
      "type": "h2",
      "text": "Separate the build role from the deployment role"
    },
    {
      "type": "p",
      "text": "My proposed pipeline has three stages. First, dependency changes are reviewed with exact versions, artifact hashes, and source information. Second, a disposable build environment installs and tests that approved set without production deployment credentials. Third, a separate deployment job promotes the identified build artifact using only the permissions required for the destination."
    },
    {
      "type": "ul",
      "items": [
        "Build: use a clean runner with limited repository permissions, no production secrets, and no attached production cloud identity.",
        "Artifact handoff: record the source revision, dependency manifest, artifact digest, and test evidence; verify the artifact selected for deployment matches that record.",
        "Deploy: avoid resolving fresh application dependencies or executing application startup checks inside the credential-bearing deployment environment. Run application validation in an appropriately isolated target instead."
      ]
    },
    {
      "type": "p",
      "text": "This separation reduces the authority available during dependency execution; it does not prove that the artifact is trustworthy. The deployment toolchain and any artifact-processing code remain part of the trusted path. Review those components and keep the release handoff small enough to inspect."
    },
    {
      "type": "h2",
      "text": "Short-lived credentials still need a narrow trust policy"
    },
    {
      "type": "p",
      "text": "GitHub documents OIDC as a way for workflows to obtain short-lived cloud access through configured trust conditions instead of storing long-lived cloud secrets. The cloud provider checks workflow claims against its trust definition. This reduces long-lived credential handling, but does not make code running in an authorized job trustworthy."
    },
    {
      "type": "p",
      "text": "The design implication is to grant token-request capability only where needed and constrain the cloud role to the intended workflow context and destination. Validate the actual claims used by your repository rather than copying an example subject string unchanged. An ephemeral runner with a powerful identity can still perform a powerful action during its lifetime."
    },
    {
      "type": "h2",
      "text": "Test the boundaries with benign failure cases"
    },
    {
      "type": "ul",
      "items": [
        "Change one approved dependency hash in a disposable test fixture. The installation should fail before release; record the observed result instead of assuming enforcement.",
        "Add an undeclared dependency to the test requirements. Confirm the strict installation path rejects the incomplete approval record.",
        "Review the build job's effective permissions and attached identities. Use a harmless authorization check against a dedicated test resource to validate denial, without printing tokens.",
        "Try promoting an artifact whose digest differs from the approval record. The release gate should reject it and identify the mismatch.",
        "Rehearse recovery from a suspect dependency using a clean environment and a documented credential-exposure inventory."
      ]
    },
    {
      "type": "p",
      "text": "These are proposed acceptance tests, not measured results. Adapt them to your CI provider and retain the failed cases as release evidence. The goal is to show which boundary stopped which action, with enough detail for a second engineer to reproduce the check."
    },
    {
      "type": "h2",
      "text": "A dependency rollback is not credential recovery"
    },
    {
      "type": "p",
      "text": "For installations affected by the advisory, GitHub recommends treating the environment as exposed and rotating reachable credentials. Removing a package cannot retract a token already copied elsewhere. Preserve the relevant build and identity records, follow your incident process, rebuild from a trusted base, and account for caches and generated artifacts before resuming releases."
    }
  ]
};