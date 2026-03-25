const styles = {
  amber:   "from-amber-500/10   border-amber-500/20   text-amber-400",
  sky:     "from-sky-500/10     border-sky-500/20     text-sky-400",
  rose:    "from-rose-500/10    border-rose-500/20    text-rose-400",
  emerald: "from-emerald-500/10 border-emerald-500/20 text-emerald-400",
};

export default function StatCard({ label, value, sub, accent }) {
  const s = styles[accent] || styles.sky;

  return (
    <div className={`relative rounded-2xl border bg-gradient-to-br ${s} to-transparent p-5 overflow-hidden`}>
      <p className={`text-[10px] tracking-[0.25em] uppercase font-bold mb-1 ${s.split(" ")[2]}`}>
        {label}
      </p>
      <p className="text-4xl font-black text-white leading-none">{value}</p>
      {sub && <p className="text-xs text-white/30 mt-1">{sub}</p>}
    </div>
  );
}