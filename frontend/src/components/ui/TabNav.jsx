const TABS = [
  { id: "orders",    label: "Orders",    icon: "◈" },
  { id: "incidents", label: "Incidents", icon: "⚑" },
  { id: "ai",        label: "AI Agent",  icon: "◆" },
];

export default function TabNav({ activeTab, onTabChange }) {
  return (
    <div className="flex gap-1 mb-8 p-1 bg-white/[0.03] border border-white/10 rounded-xl w-fit">
      {TABS.map(t => (
        <button
          key={t.id}
          onClick={() => onTabChange(t.id)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold
            tracking-widest uppercase transition-all
            ${activeTab === t.id
              ? "bg-white/10 text-white shadow-lg"
              : "text-white/30 hover:text-white/60 hover:bg-white/5"}`}>
          <span>{t.icon}</span>{t.label}
        </button>
      ))}
    </div>
  );
}