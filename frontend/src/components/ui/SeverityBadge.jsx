const map = {
  critical: "bg-red-500/15    text-red-400    border-red-500/30",
  high:     "bg-orange-500/15 text-orange-400 border-orange-500/30",
  medium:   "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  low:      "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
};

export default function SeverityBadge({ severity }) {
  const cls = map[(severity || "").toLowerCase()] || "bg-white/10 text-white/40 border-white/10";

  return (
    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold tracking-widest uppercase border ${cls}`}>
      {severity || "—"}
    </span>
  );
}