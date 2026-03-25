import { useState } from "react";
import SeverityBadge from "../ui/SeverityBadge";
import Spinner       from "../ui/Spinner";

export default function IncidentDetect({ onDetect, looking, found }) {
  const [lookupId, setLookupId] = useState("");

  const handleDetect = () => onDetect(lookupId);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
      <h3 className="text-[10px] tracking-[0.3em] uppercase text-rose-400 font-bold mb-4 flex items-center gap-2">
        <span className="w-3 h-px bg-rose-400" /> Detect Incident by Order ID
      </h3>

      <div className="flex gap-3">
        <input
          type="number" placeholder="Enter Order ID…" value={lookupId}
          onChange={e => setLookupId(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleDetect()}
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white
            placeholder-white/25 focus:outline-none focus:border-rose-500/60 transition-all"
        />
        <button
          onClick={handleDetect} disabled={looking}
          className="px-6 py-2.5 rounded-lg bg-rose-500 hover:bg-rose-400 text-white text-sm font-black
            tracking-widest uppercase transition-all disabled:opacity-40 flex items-center gap-2">
          {looking
            ? <Spinner className="w-4 h-4 border-white/30 border-t-white" />
            : "Detect"}
        </button>
      </div>

      {found && (
        <div className="mt-4 p-4 rounded-xl border border-rose-500/20 bg-rose-500/5 space-y-2.5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-white">Order #{found.order_id}</p>
              <p className="text-xs text-rose-300/70 mt-0.5">{found.incident_type}</p>
            </div>
            <SeverityBadge severity={found.severity} />
          </div>
          <div className="h-px bg-white/5" />
          <p className="text-xs text-white/50">
            <span className="text-white/30 uppercase tracking-widest text-[10px]">Cause · </span>
            {found.possible_cause}
          </p>
          <p className="text-xs text-white/50">
            <span className="text-white/30 uppercase tracking-widest text-[10px]">Recommendation · </span>
            {found.recommendation}
          </p>
          <p className="text-[10px] text-white/20">{found.detected_at}</p>
        </div>
      )}
    </div>
  );
}