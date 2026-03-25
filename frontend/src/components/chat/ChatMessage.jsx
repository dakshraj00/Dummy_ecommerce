export default function ChatMessage({ message }) {
  const isAi = message.role === "ai";

  return (
    <div className={`flex gap-3 ${isAi ? "" : "flex-row-reverse"}`}>
      {/* Avatar */}
      <div className={`w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center text-xs font-bold mt-0.5
        ${isAi
          ? "bg-gradient-to-br from-violet-500 to-cyan-500 text-white"
          : "bg-amber-500 text-black"}`}>
        {isAi ? "◆" : "U"}
      </div>

      {/* Bubble */}
      <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed
        ${isAi
          ? "bg-white/[0.06] border border-white/10 text-white/80"
          : "bg-amber-500/15 border border-amber-500/20 text-amber-100"}`}>
        {message.text}
      </div>
    </div>
  );
}