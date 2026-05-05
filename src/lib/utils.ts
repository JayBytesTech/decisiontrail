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
