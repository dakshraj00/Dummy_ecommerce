const QUICK_PROMPTS = [
  "Summarize recent orders",
  "Any critical incidents?",
  "Which products are top sellers?",
  "What should I focus on today?",
];

export default function ChatInput({ value, onChange, onSend, loading }) {
  return (
    <div className="px-4 pb-4 space-y-3">
      {/* Quick prompts */}
      <div className="flex flex-wrap gap-2">
        {QUICK_PROMPTS.map(p => (
          <button
            key={p} onClick={() => onChange(p)}
            className="text-[11px] px-3 py-1.5 rounded-full border border-white/10 bg-white/5
              text-white/40 hover:border-violet-500/40 hover:text-violet-400 transition-all">
            {p}
          </button>
        ))}
      </div>

      {/* Input bar */}
      <div className="flex gap-2 bg-white/5 border border-white/10 rounded-xl p-2
        focus-within:border-violet-500/40 transition-colors">
        <input
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={e => e.key === "Enter" && !e.shiftKey && onSend()}
          placeholder="Ask about orders, incidents, trends…"
          className="flex-1 bg-transparent px-2 py-1.5 text-sm text-white placeholder-white/25 focus:outline-none"
        />
        <button
          onClick={onSend} disabled={loading || !value.trim()}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-600
            hover:from-violet-500 hover:to-cyan-500 text-white text-xs font-black
            tracking-widest uppercase transition-all disabled:opacity-30">
          Send
        </button>
      </div>
    </div>
  );
}