"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useRef, useState, useEffect, useCallback } from "react";
import { Send, Square, Sparkles, User, Bot, ArrowRight, Code2, Cpu, Layers } from "lucide-react";
import Link from "next/link";
import type { UIMessage } from "ai";

/* ─── Starter questions ──────────────────────────────────────────────── */
const STARTERS = [
  { icon: <Cpu className="h-5 w-5" />, label: "What is Orcha AI?", prompt: "Tell me about Orcha AI and what it can do for my business." },
  { icon: <Code2 className="h-5 w-5" />, label: "Custom software development", prompt: "What custom software development services does Orcha offer?" },
  { icon: <Layers className="h-5 w-5" />, label: "IT systems & integrations", prompt: "How does Orcha help with IT systems and business integrations?" },
  { icon: <ArrowRight className="h-5 w-5" />, label: "Start a project with us", prompt: "I'd like to apply to start a project with Orcha Solutions." },
];

/* ─── Pull plain text out of a v6 UIMessage ─────────────────────────── */
function getText(msg: UIMessage): string {
  return msg.parts
    .filter((p) => p.type === "text")
    .map((p) => (p as { type: "text"; text: string }).text)
    .join("");
}

/* ─── Minimal markdown renderer ─────────────────────────────────────── */
function render(raw: string) {
  let t = raw.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  t = t.replace(/```[\s\S]*?```/g, (m) => {
    const code = m.replace(/^```\w*\n?/, "").replace(/```$/, "").trim();
    return `<pre class="cb"><code>${code}</code></pre>`;
  });
  t = t.replace(/`([^`]+)`/g, '<code class="ic">$1</code>');
  t = t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  t = t.replace(/^### (.+)$/gm, '<h3 class="h3">$1</h3>');
  t = t.replace(/^## (.+)$/gm, '<h2 class="h2">$1</h2>');
  t = t.replace(/^[-*] (.+)$/gm, '<li class="li">$1</li>');
  t = t.replace(/(<li[^>]*>[\s\S]*?<\/li>\n?)+/g, '<ul class="ul">$&</ul>');
  t = t.replace(/\n\n/g, "</p><p>");
  return `<p>${t}</p>`;
}

export default function ChatPage() {
  const { messages, sendMessage, stop, setMessages, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const isStreaming = status === "streaming" || status === "submitted";
  const [input, setInput] = useState("");
  const [rateLimited, setRateLimited] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* Start countdown when rate-limited */
  const startCooldown = useCallback((seconds: number) => {
    setRateLimited(true);
    setCountdown(seconds);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setRateLimited(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  /* Detect 429 from the hook error */
  useEffect(() => {
    if (!error) return;
    const msg = error.message ?? "";
    const match = msg.match(/(\d+)s/);
    const seconds = match ? parseInt(match[1], 10) : 60;
    if (msg.toLowerCase().includes("too many") || msg.includes("429")) {
      startCooldown(seconds);
    }
  }, [error, startCooldown]);

  const submit = () => {
    const text = input.trim();
    if (!text || isStreaming || rateLimited) return;
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    sendMessage({ role: "user", parts: [{ type: "text", text }] });
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); }
  };

  const sendStarter = (prompt: string) => {
    if (rateLimited) return;
    sendMessage({ role: "user", parts: [{ type: "text", text: prompt }] });
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="root">
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .root {
          display: flex; flex-direction: column; height: 100dvh;
          background: #08080f; color: #e5e7eb; overflow: hidden;
          font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
        }

        /* ── NAV ── */
        .nav {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 28px; border-bottom: 1px solid rgba(255,255,255,.07);
          background: rgba(8,8,15,.9); backdrop-filter: blur(12px);
          position: relative; z-index: 10; flex-shrink: 0;
        }
        .nav-brand { display: flex; align-items: center; gap: 10px; text-decoration: none; color: white; }
        .nav-icon { width: 34px; height: 34px; border-radius: 10px;
          background: linear-gradient(135deg,#7c3aed,#4f46e5);
          display: flex; align-items: center; justify-content: center; }
        .nav-name { font-size: 16px; font-weight: 700; }
        .nav-tag { font-size: 11px; padding: 2px 8px; border-radius: 999px;
          background: rgba(124,58,237,.15); color: #a78bfa;
          border: 1px solid rgba(124,58,237,.3); }
        .nav-right { display: flex; gap: 8px; align-items: center; }
        .nav-link {
          font-size: 13px; color: #9ca3af; padding: 5px 14px;
          border: 1px solid rgba(255,255,255,.09); border-radius: 8px;
          text-decoration: none; background: transparent; cursor: pointer;
          font-family: inherit; transition: all .2s;
        }
        .nav-link:hover { color: white; background: rgba(255,255,255,.06); }

        /* ── MESSAGES SCROLL ── */
        .msgs { flex: 1; overflow-y: auto; position: relative; }
        .msgs::-webkit-scrollbar { width: 4px; }
        .msgs::-webkit-scrollbar-thumb { background: rgba(255,255,255,.1); border-radius: 4px; }

        /* ── WELCOME ── */
        .welcome {
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; min-height: 80vh;
          padding: 40px 24px; text-align: center;
        }

        @keyframes pulse-orb {
          0%,100% { box-shadow: 0 0 36px rgba(124,58,237,.4); transform: scale(1); }
          50%      { box-shadow: 0 0 64px rgba(124,58,237,.65); transform: scale(1.04); }
        }
        .welcome-icon {
          width: 68px; height: 68px; border-radius: 50%;
          background: linear-gradient(135deg, #7c3aed, #4f46e5);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 24px;
          animation: pulse-orb 3s ease-in-out infinite;
        }
        .welcome-title {
          font-size: clamp(24px, 4vw, 36px); font-weight: 800;
          margin-bottom: 10px; line-height: 1.2;
          background: linear-gradient(135deg, #fff 20%, #a78bfa 70%, #818cf8 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .welcome-sub {
          color: #6b7280; font-size: 15px; max-width: 380px;
          line-height: 1.6; margin-bottom: 40px;
        }

        /* Starter buttons */
        .starters { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; width: 100%; max-width: 560px; }
        @media (max-width: 480px) { .starters { grid-template-columns: 1fr; } }
        .starter-btn {
          display: flex; align-items: center; gap: 10px;
          background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.09);
          border-radius: 14px; padding: 14px 16px; text-align: left;
          cursor: pointer; color: #e5e7eb; font-size: 14px; font-family: inherit;
          transition: all .22s;
        }
        .starter-btn:hover {
          background: rgba(124,58,237,.12); border-color: rgba(124,58,237,.35);
          transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,.3);
          color: white;
        }
        .starter-ico {
          width: 36px; height: 36px; border-radius: 10px; flex-shrink: 0;
          background: rgba(124,58,237,.2); color: #a78bfa;
          display: flex; align-items: center; justify-content: center;
        }
        .starter-btn:hover .starter-ico { background: rgba(124,58,237,.35); }

        /* ── MESSAGE LIST ── */
        .inner { max-width: 760px; margin: 0 auto; padding: 32px 24px 140px; display: flex; flex-direction: column; gap: 24px; }

        @keyframes msg-in { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .row { display: flex; gap: 12px; animation: msg-in .28s ease forwards; }
        .row.user { flex-direction: row-reverse; }
        .av {
          width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
        }
        .av.bot { background: linear-gradient(135deg,#7c3aed,#4f46e5); box-shadow: 0 0 14px rgba(124,58,237,.3); }
        .av.me  { background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.12); }
        .body { flex: 1; min-width: 0; }
        .who { font-size: 11px; color: #6b7280; margin-bottom: 5px; font-weight: 500; }
        .row.user .who { text-align: right; }

        .bubble-user {
          display: inline-block; max-width: 100%;
          background: rgba(124,58,237,.18); border: 1px solid rgba(124,58,237,.25);
          border-radius: 16px 16px 4px 16px;
          padding: 11px 16px; font-size: 14px; line-height: 1.65;
          white-space: pre-wrap; word-break: break-word;
        }
        .bubble-bot { font-size: 14px; line-height: 1.72; color: #d1d5db; }
        .bubble-bot p   { margin: 0 0 10px; }
        .bubble-bot p:last-child { margin: 0; }
        .bubble-bot .h2 { font-size: 15px; font-weight: 700; color: white; margin: 12px 0 5px; }
        .bubble-bot .h3 { font-size: 14px; font-weight: 600; color: #d1d5db; margin: 10px 0 4px; }
        .bubble-bot .ul { margin: 6px 0 10px; list-style: none; padding: 0; }
        .bubble-bot .li { padding-left: 14px; position: relative; margin-bottom: 3px; }
        .bubble-bot .li::before { content: '•'; position: absolute; left: 0; color: #7c3aed; }
        .bubble-bot .cb {
          background: rgba(0,0,0,.5); border: 1px solid rgba(255,255,255,.08);
          border-radius: 8px; padding: 12px 14px; font-family: monospace;
          font-size: 12px; overflow-x: auto; margin: 10px 0; color: #a5f3fc; white-space: pre;
        }
        .bubble-bot .ic {
          background: rgba(124,58,237,.15); border: 1px solid rgba(124,58,237,.2);
          border-radius: 4px; padding: 1px 5px; font-family: monospace; font-size: 12px; color: #c084fc;
        }

        /* Typing indicator */
        @keyframes tp { 0%,80%,100%{transform:scale(.6);opacity:.3} 40%{transform:scale(1);opacity:1} }
        .dot { display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #7c3aed;
          animation: tp 1.3s infinite ease-in-out; }
        .dot:nth-child(2){animation-delay:.18s} .dot:nth-child(3){animation-delay:.36s}
        .dots { display: flex; gap: 4px; align-items: center; padding: 8px 0; }

        /* ── INPUT BAR ── */
        .bar {
          position: fixed; bottom: 0; left: 0; right: 0; z-index: 20;
          padding: 12px 24px 20px;
          background: linear-gradient(to top, #08080f 60%, transparent);
        }
        .bar-wrap { max-width: 760px; margin: 0 auto; }
        .bar-inner {
          display: flex; align-items: flex-end; gap: 8px;
          background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1);
          border-radius: 18px; padding: 10px 12px 10px 16px;
          transition: border-color .2s, box-shadow .2s;
        }
        .bar-inner:focus-within {
          border-color: rgba(124,58,237,.5);
          box-shadow: 0 0 0 3px rgba(124,58,237,.1);
        }
        textarea {
          flex: 1; background: transparent; border: none; outline: none;
          resize: none; color: #e5e7eb; font-size: 14px; line-height: 1.6;
          font-family: inherit; max-height: 150px; min-height: 22px;
        }
        textarea::placeholder { color: #4b5563; }
        .send-btn {
          width: 36px; height: 36px; border-radius: 10px; border: none; flex-shrink: 0;
          background: linear-gradient(135deg,#7c3aed,#4f46e5);
          color: white; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 3px 10px rgba(124,58,237,.35);
          transition: transform .2s, box-shadow .2s;
        }
        .send-btn:hover { transform: scale(1.08); box-shadow: 0 5px 18px rgba(124,58,237,.5); }
        .send-btn:disabled { opacity: .35; cursor: not-allowed; transform: none; }
        .stop-btn {
          width: 36px; height: 36px; border-radius: 10px;
          border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.05);
          color: #d1d5db; cursor: pointer; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center; transition: all .2s;
        }
        .stop-btn:hover { background: rgba(239,68,68,.12); border-color: rgba(239,68,68,.3); color: #f87171; }
        .hint { font-size: 11px; color: #374151; text-align: center; margin-top: 8px; }

        /* New chat button */
        .new-chat { display: flex; justify-content: center; margin-top: 8px; }
        .new-chat-btn {
          font-size: 12px; color: #6b7280; background: transparent;
          border: none; cursor: pointer; font-family: inherit;
          transition: color .2s; padding: 4px 8px;
        }
        .new-chat-btn:hover { color: #d1d5db; }

        /* Rate-limit banner */
        @keyframes banner-in { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        .rate-banner {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          background: rgba(239,68,68,.1); border: 1px solid rgba(239,68,68,.25);
          border-radius: 10px; padding: 9px 16px; margin-bottom: 8px;
          font-size: 13px; color: #fca5a5;
          animation: banner-in .3s ease forwards;
        }
        .rate-banner strong { color: #f87171; }
        .countdown-chip {
          background: rgba(239,68,68,.2); border-radius: 6px;
          padding: 2px 8px; font-weight: 700; font-size: 13px; color: #f87171;
          min-width: 36px; text-align: center;
        }
        textarea:disabled { opacity: .4; cursor: not-allowed; }
      `}</style>

      {/* ── Nav ── */}
      <nav className="nav">
        <Link href="/" className="nav-brand">
          <div className="nav-icon">
            <Bot className="h-4 w-4 text-white" />
          </div>
          <span className="nav-name">Orcha Assistant</span>
          <span className="nav-tag">Virtual Sales Agent</span>
        </Link>
        <div className="nav-right">
          <Link href="/contacts" className="nav-link">Contact Us</Link>
          <Link href="/" className="nav-link">← Back</Link>
        </div>
      </nav>

      {/* ── Messages ── */}
      <div className="msgs">
        {isEmpty ? (
          <div className="welcome">
            <div className="welcome-icon">
              <Sparkles className="h-7 w-7 text-white" />
            </div>
            <h1 className="welcome-title">How can Orcha help you?</h1>
            <p className="welcome-sub">
              Ask about our services, get a recommendation, or kick off your project application — I&apos;m here to help.
            </p>
            <div className="starters">
              {STARTERS.map((s) => (
                <button key={s.label} className="starter-btn" onClick={() => sendStarter(s.prompt)}>
                  <span className="starter-ico">{s.icon}</span>
                  <span>{s.label}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="inner">
            {messages.map((m, i) => {
              const text = getText(m);
              return (
                <div key={m.id} className={`row ${m.role === "user" ? "user" : ""}`}>
                  <div className={`av ${m.role === "user" ? "me" : "bot"}`}>
                    {m.role === "user"
                      ? <User className="h-3.5 w-3.5 text-gray-400" />
                      : <Sparkles className="h-3.5 w-3.5 text-white" />}
                  </div>
                  <div className="body">
                    <div className="who">{m.role === "user" ? "You" : "Orcha Assistant"}</div>
                    {m.role === "user"
                      ? <div className="bubble-user">{text}</div>
                      : <div className="bubble-bot" dangerouslySetInnerHTML={{ __html: render(text) }} />}
                  </div>
                </div>
              );
            })}

            {/* Typing indicator */}
            {isStreaming && messages[messages.length - 1]?.role === "user" && (
              <div className="row">
                <div className="av bot"><Sparkles className="h-3.5 w-3.5 text-white" /></div>
                <div className="body">
                  <div className="who">Orcha Assistant</div>
                  <div className="dots">
                    <span className="dot" /><span className="dot" /><span className="dot" />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* ── Input bar ── */}
      <div className="bar">
        <div className="bar-wrap">
          {/* Rate-limit banner */}
          {rateLimited && (
            <div className="rate-banner">
              <span>⏱ Slow down! Please wait</span>
              <span className="countdown-chip">{countdown}s</span>
              <span>before sending another message.</span>
            </div>
          )}

          <div className="bar-inner" style={rateLimited ? { borderColor: "rgba(239,68,68,.3)" } : {}}>
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              disabled={rateLimited}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = Math.min(e.target.scrollHeight, 150) + "px";
              }}
              onKeyDown={handleKey}
              placeholder={rateLimited ? `Wait ${countdown}s…` : "Ask about our services or start a project…"}
            />
            {isStreaming
              ? <button className="stop-btn" onClick={stop}><Square className="h-4 w-4" /></button>
              : (
                <button
                  className="send-btn"
                  onClick={submit}
                  disabled={!input.trim() || rateLimited}
                  title={rateLimited ? `Rate limited — wait ${countdown}s` : "Send"}
                >
                  {rateLimited
                    ? <span style={{ fontSize: 12, fontWeight: 700 }}>{countdown}</span>
                    : <Send className="h-4 w-4" />}
                </button>
              )}
          </div>
          {!isEmpty && (
            <div className="new-chat">
              <button className="new-chat-btn" onClick={() => { setMessages([]); setInput(""); }}>
                ↺ Start a new conversation
              </button>
            </div>
          )}
          <p className="hint">Orcha Solutions · hello@orcha-solutions.com</p>
        </div>
      </div>
    </div>
  );
}
