export const statusColor = (st) => {
  const map = {
    pending:    "text-yellow-400  border-yellow-500/30  bg-yellow-500/10",
    processing: "text-sky-400     border-sky-500/30     bg-sky-500/10",
    shipped:    "text-violet-400  border-violet-500/30  bg-violet-500/10",
    delivered:  "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    cancelled:  "text-red-400     border-red-500/30     bg-red-500/10",
  };
  return map[(st || "pending").toLowerCase()] || map.pending;
};