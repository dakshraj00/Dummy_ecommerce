export default function Toast({ toast }) {
  if (!toast) return null;

  return (
    <div className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-lg border text-sm font-semibold shadow-2xl transition-all
      ${toast.type === "error"
        ? "bg-red-950 border-red-500/50 text-red-300"
        : "bg-slate-800 border-emerald-500/50 text-emerald-300"}`}>
      {toast.type === "error" ? "✕ " : "✓ "}{toast.msg}
    </div>
  );
}