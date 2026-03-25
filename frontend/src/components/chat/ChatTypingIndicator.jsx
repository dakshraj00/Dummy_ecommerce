export default function ChatTypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500
        flex items-center justify-center text-xs font-bold text-white">
        ◆
      </div>
      <div className="bg-white/[0.06] border border-white/10 rounded-2xl px-4 py-3 flex gap-1.5 items-center">
        {[0, 1, 2].map(d => (
          <span
            key={d}
            className="w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce"
            style={{ animationDelay: `${d * 150}ms` }}
          />
        ))}
      </div>
    </div>
  );
}