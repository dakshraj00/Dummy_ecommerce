import { useState, useEffect, useRef } from "react";
import ChatMessage        from "./ChatMessage";
import ChatInput          from "./ChatInput";
import ChatTypingIndicator from "./ChatTypingIndicator";
import { API } from "../../utils/api";

const INITIAL_MESSAGES = [
  { role: "ai", text: "Hi! I'm your AI assistant. Ask me anything about orders, incidents, or your store." },
];

export default function ChatSection({ toast }) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input,    setInput]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    const q = input.trim();
    if (!q || loading) return;

    setInput("");
    setMessages(prev => [...prev, { role: "user", text: q }]);
    setLoading(true);

    try {
      const r = await fetch(`${API}/ai/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q }),
      });
      const data = await r.json();
      setMessages(prev => [...prev, { role: "ai", text: data.answer }]);
    } catch {
      setMessages(prev => [
        ...prev,
        { role: "ai", text: "⚠ Could not reach the AI agent. Is your backend running?" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col rounded-2xl border border-white/10 overflow-hidden bg-[#0c0c14]"
      style={{ height: "calc(100vh - 230px)", minHeight: "520px" }}>

      {/* Header */}
      <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3 bg-white/[0.02]">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500
          flex items-center justify-center text-white text-sm font-black">
          ◆
        </div>
        <div>
          <p className="text-sm font-bold text-white">AI Assistant</p>
          <p className="text-[10px] text-white/30 tracking-widest uppercase">LangChain Agent · Always on</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] text-emerald-400 tracking-widest uppercase">Online</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((msg, i) => (
          <ChatMessage key={i} message={msg} />
        ))}
        {loading && <ChatTypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <ChatInput
        value={input}
        onChange={setInput}
        onSend={send}
        loading={loading}
      />
    </div>
  );
}