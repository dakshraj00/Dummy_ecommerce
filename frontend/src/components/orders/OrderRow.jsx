import { useState } from "react";
import Spinner from "../ui/Spinner";
import { statusColor } from "../../utils/statusColor";

const STATUSES = ["pending", "processing", "shipped", "delivered", "cancelled"];

export default function OrderRow({ order, onDelete, onUpdateStatus, deletingId }) {
  const [editing,    setEditing]    = useState(false);
  const [editStatus, setEditStatus] = useState(order.status || "pending");

  const handleSave = async () => {
    await onUpdateStatus(order.id, editStatus);
    setEditing(false);
  };

  return (
    <div className="grid grid-cols-[0.4fr_1.1fr_1.2fr_0.55fr_0.75fr_1.1fr_auto] px-5 py-3.5 items-center
      border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors group">

      {/* ID */}
      <p className="text-[11px] font-mono text-white/30">#{String(order.id).padStart(4, "0")}</p>

      {/* Customer */}
      <p className="text-sm font-semibold text-white truncate pr-2">{order.customer_name}</p>

      {/* Product */}
      <p className="text-sm text-white/60 truncate pr-2">{order.product_name}</p>

      {/* Qty */}
      <p className="text-sm font-mono font-bold text-sky-400">×{order.quantity}</p>

      {/* Price */}
      <p className="text-sm font-mono font-bold text-emerald-400">${Number(order.price).toFixed(2)}</p>

      {/* Status */}
      <div>
        {editing ? (
          <div className="flex gap-1.5 items-center">
            <select
              value={editStatus}
              onChange={e => setEditStatus(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-md px-2 py-1 text-xs text-white
                focus:outline-none focus:border-amber-400/50">
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <button
              onClick={handleSave}
              className="w-6 h-6 rounded-md bg-emerald-500/20 border border-emerald-500/30
                text-emerald-400 text-xs hover:bg-emerald-500/30 flex items-center justify-center">
              ✓
            </button>
            <button
              onClick={() => setEditing(false)}
              className="w-6 h-6 rounded-md bg-white/5 border border-white/10
                text-white/30 text-xs hover:text-white/60 flex items-center justify-center">
              ✕
            </button>
          </div>
        ) : (
          <button
            onClick={() => { setEditing(true); setEditStatus(order.status || "pending"); }}
            className={`text-[11px] px-2.5 py-1 rounded-md border font-semibold tracking-wide
              transition-all hover:opacity-80 ${statusColor(order.status)}`}>
            {order.status || "pending"}
          </button>
        )}
      </div>

      {/* Delete */}
      <button
        onClick={() => onDelete(order.id)}
        disabled={deletingId === order.id}
        className="opacity-0 group-hover:opacity-100 w-7 h-7 rounded-lg bg-red-500/10 border border-red-500/20
          text-red-400 hover:bg-red-500/20 text-xs flex items-center justify-center transition-all ml-2">
        {deletingId === order.id
          ? <Spinner className="w-3 h-3 border-red-400/30 border-t-red-400" />
          : "✕"}
      </button>
    </div>
  );
}