import StatCard   from "../ui/StatCard";
import OrderForm  from "./OrderForm";
import OrderTable from "./OrderTable";
import { useOrders } from "../../hooks/useOrders";

export default function OrdersSection({ toast }) {
  const { orders, submitting, deletingId, createOrder, deleteOrder, updateStatus } = useOrders(toast);

  const revenue = orders.reduce((s, o) => s + (o.price    || 0), 0);
  const items   = orders.reduce((s, o) => s + (o.quantity || 0), 0);

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Orders" value={orders.length}                                                    accent="amber"   />
        <StatCard label="Revenue"      value={`$${revenue.toFixed(0)}`}                       sub="all time"   accent="emerald" />
        <StatCard label="Items Sold"   value={items}                                                            accent="sky"     />
        <StatCard label="Avg. Order"   value={orders.length ? `$${(revenue/orders.length).toFixed(0)}` : "—"}  accent="rose"    />
      </div>

      <OrderForm onSubmit={createOrder} submitting={submitting} />

      <OrderTable
        orders={orders}
        deletingId={deletingId}
        onDelete={deleteOrder}
        onUpdateStatus={updateStatus}
      />
    </div>
  );
}