import { useState, useEffect } from "react";
import { API } from "../utils/api";

export function useIncidents(toast) {
  const [incidents, setIncidents] = useState([]);
  const [found,     setFound]     = useState(null);
  const [looking,   setLooking]   = useState(false);

  const loadAll = async () => {
    try {
      const r = await fetch(`${API}/incidents`);
      setIncidents(await r.json());
    } catch {
      toast("Failed to load incidents", "error");
    }
  };

  useEffect(() => { loadAll(); }, []);

  const detectByOrderId = async (orderId) => {
    if (!orderId) return;
    setLooking(true);
    setFound(null);
    try {
      const r = await fetch(`${API}/incident/${orderId}`);
      if (!r.ok) {
        toast("No incident found for that order ID", "error");
        return;
      }
      const data = await r.json();
      setFound(data);
      loadAll(); // refresh table in case a new incident was just created
    } catch {
      toast("Lookup failed", "error");
    } finally {
      setLooking(false);
    }
  };

  return { incidents, found, looking, detectByOrderId };
}