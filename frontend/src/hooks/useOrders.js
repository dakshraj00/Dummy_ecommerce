import { useState, useEffect } from "react";
import { API } from "../utils/api";

export function useOrders(toast) {
  const [orders,     setOrders]     = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const load = async () => {
    try {
      const r = await fetch(`${API}/orders?limit=100`);
      setOrders(await r.json());
    } catch {
      toast("Failed to load orders", "error");
    }
  };

  useEffect(() => { load(); }, []);

  const createOrder = async (form) => {
    setSubmitting(true);
    try {
      await fetch(`${API}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: form.customer_name,
          product_name:  form.product_name,
          quantity:      parseInt(form.quantity),
          price:         parseFloat(form.price),
        }),
      });
      toast("Order created");
      load();
      return true;
    } catch {
      toast("Failed to create order", "error");
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const deleteOrder = async (id) => {
    setDeletingId(id);
    try {
      await fetch(`${API}/orders/${id}`, { method: "DELETE" });
      toast("Order deleted");
      load();
    } catch {
      toast("Delete failed", "error");
    } finally {
      setDeletingId(null);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await fetch(`${API}/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      toast("Status updated");
      load();
    } catch {
      toast("Update failed", "error");
    }
  };

  return { orders, submitting, deletingId, createOrder, deleteOrder, updateStatus };
}