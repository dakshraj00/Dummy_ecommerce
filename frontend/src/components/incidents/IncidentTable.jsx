import SeverityBadge from "../ui/SeverityBadge";

export default function IncidentTable({ incidents }) {
  return (
    <div className="rounded-2xl border border-white/10 overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-[0.4fr_1fr_1fr_2fr_2fr_0.8fr] px-5 py-3
        text-[10px] tracking-[0.2em] uppercase text-white/30 border-b border-white/5 bg-white/[0.02]">
        <span>Order</span>
        <span>Type</span>
        <span>Severity</span>
        <span>Cause</span>
        <span>Recommendation</span>
        <span>Date</span>
      </div>

      {incidents.length === 0 ? (
        <div className="py-16 text-center text-white/20 text-sm tracking-widest uppercase">
          No incidents logged
        </div>
      ) : (
        incidents.map((inc, i) => (
          <div key={i} className="grid grid-cols-[0.4fr_1fr_1fr_2fr_2fr_0.8fr] px-5 py-4 items-start
            border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors gap-3">
            <p className="text-sm font-mono font-bold text-white/60">#{inc.order_id}</p>
            <p className="text-xs text-white/70 font-semibold leading-relaxed">{inc.incident_type}</p>
            <div><SeverityBadge severity={inc.severity} /></div>
            <p className="text-xs text-white/40 leading-relaxed">{inc.possible_cause}</p>
            <p className="text-xs text-white/40 leading-relaxed">{inc.recommendation}</p>
            <p className="text-[10px] text-white/25 mt-0.5">
              {inc.detected_at ? new Date(inc.detected_at).toLocaleDateString() : "—"}
            </p>
          </div>
        ))
      )}
    </div>
  );
}