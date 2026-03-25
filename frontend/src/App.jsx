import { useState } from "react";

import Background       from "./components/ui/Background";
import Toast            from "./components/ui/Toast";
import AppHeader        from "./components/ui/AppHeader";
import TabNav           from "./components/ui/TabNav";
import OrdersSection    from "./components/orders/OrdersSection";
import IncidentsSection from "./components/incidents/IncidentsSection";
import ChatSection      from "./components/chat/ChatSection";
import { useToast }     from "./hooks/useToast";

export default function App() {
  const [tab]            = useState("orders");
  const [activeTab, setActiveTab] = useState("orders");
  const { toastData, toast }      = useToast();

  return (
    <div
      className="min-h-screen bg-[#08080f] text-white"
      style={{ fontFamily: "'DM Mono','Fira Code',monospace" }}>

      <Background />
      <Toast toast={toastData} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        <AppHeader />
        <TabNav activeTab={activeTab} onTabChange={setActiveTab} />

        <div key={activeTab} style={{ animation: "fadeUp 0.3s ease forwards" }}>
          {activeTab === "orders"    && <OrdersSection    toast={toast} />}
          {activeTab === "incidents" && <IncidentsSection toast={toast} />}
          {activeTab === "ai"        && <ChatSection      toast={toast} />}
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}