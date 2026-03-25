import OrderRow from "./OrderRow";

const COLS = "grid-cols-[0.4fr_1.1fr_1.2fr_0.55fr_0.75fr_1.1fr_auto]";

export default function OrderTable({ orders, deletingId, onDelete, onUpdateStatus }) {
  return (
    <div className="rounded-2xl border border-white/10 overflow-hidden">
      {/* Header */}
      <div className={`grid ${COLS} px-5 py-3 text-[10px] tracking-[0.2em] uppercase
        text-white/30 border-b border-white/5 bg-white/[0.02]`}>
        <span>ID</span>
        <span>Customer</span>
        <span>Product</span>
        <span>Qty</span>
        <span>Price</span>
        <span>Status</span>
        <span />
      </div>

      {orders.length === 0 ? (
        <div className="py-16 text-center text-white/20 text-sm tracking-widest uppercase">
          No orders yet
        </div>
      ) : (
        orders.map(order => (
          <OrderRow
            key={order.id}
            order={order}
            deletingId={deletingId}
            onDelete={onDelete}
            onUpdateStatus={onUpdateStatus}
          />
        ))
      )}
    </div>
  );
}