export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function getStatusStyles(status: string) {
  switch (status) {
    case "accepted":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "proposed":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "superseded":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "archived":
      return "bg-zinc-100 text-zinc-600 border-zinc-200";
    default:
      return "bg-zinc-50 text-zinc-700 border-zinc-200";
  }
}

export type DecisionExportData = {
  title: string;
  projectName: string;
  status: string;
  summary?: string | null;
  context: string;
  optionsConsidered: string;
  decision: string;
  consequences: string;
  tags: string[];
  createdAt: Date;
};

export function generateDecisionMarkdown(decision: DecisionExportData) {
  return `# ADR: ${decision.title}

- **Project:** ${decision.projectName}
- **Status:** ${decision.status}
- **Date:** ${formatDate(decision.createdAt)}
- **Tags:** ${decision.tags.map((t) => `#${t}`).join(", ")}

${decision.summary ? `## Summary\n\n${decision.summary}\n` : ""}
## Context

${decision.context}

## Options Considered

${decision.optionsConsidered}

## Decision

${decision.decision}

## Consequences

${decision.consequences}
`;
}
