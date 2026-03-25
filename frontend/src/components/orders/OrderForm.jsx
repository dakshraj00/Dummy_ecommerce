import { useState } from "react";
import Spinner from "../ui/Spinner";

const FIELDS = [
  { n: "customer_name", p: "Customer name"           },
  { n: "product_name",  p: "Product name"            },
  { n: "quantity",      p: "Quantity",   t: "number" },
  { n: "price",         p: "Price ($)",  t: "number" },
];

const EMPTY = { customer_name: "", product_name: "", quantity: "", price: "" };

export default function OrderForm({ onSubmit, submitting }) {
  const [form, setForm] = useState(EMPTY);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await onSubmit(form);
    if (ok) setForm(EMPTY);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
      <h3 className="text-[10px] tracking-[0.3em] uppercase text-amber-400 font-bold mb-5 flex items-center gap-2">
        <span className="w-3 h-px bg-amber-400" /> New Order
      </h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {FIELDS.map(({ n, p, t = "text" }) => (
          <input
            key={n} name={n} type={t} placeholder={p} value={form[n]} required
            onChange={e => setForm(f => ({ ...f, [n]: e.target.value }))}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white
              placeholder-white/25 focus:outline-none focus:border-amber-500/60 focus:bg-amber-500/5 transition-all"
          />
        ))}
        <button
          type="submit" disabled={submitting}
          className="col-span-2 md:col-span-4 mt-1 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400
            text-black text-sm font-black tracking-widest uppercase transition-all disabled:opacity-40
            flex items-center justify-center gap-2">
          {submitting ? <Spinner /> : "＋ Create Order"}
        </button>
      </form>
    </div>
  );
}