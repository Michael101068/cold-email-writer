</span>
          ))}
        </div>
      </div>

      {/* How it works */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "80px 40px" }}>
        <div style={{ fontFamily: "'Courier New', monospace", fontSize: 10, letterSpacing: 3, color: "#aaa", marginBottom: 32 }}>HOW IT WORKS</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 2 }}>
          {[
            { n: "01", title: "Describe your target", body: "Tell us who you're reaching and what you want. Takes 30 seconds." },
            { n: "02", title: "Pick a tone", body: "Direct, warm, bold, or curious — you choose how you show up." },
            { n: "03", title: "Get 3 emails instantly", body: "An opener plus two follow-ups, ready to copy and send." },
          ].map(step => (
            <div key={step.n} style={{ background: "#ede8de", padding: "32px 28px", border: "1px solid #ddd5c0" }}>
              <div style={{ fontFamily: "'Courier New', monospace", fontSize: 28, color: "#c48c3c", marginBottom: 16, lineHeight: 1 }}>{step.n}</div>
              <h3 style={{ fontSize: 18, fontWeight: 400, margin: "0 0 10px" }}>{step.title}</h3>
              <p style={{ color: "#7a6f5e", fontSize: 14, lineHeight: 1.65, margin: 0 }}>{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: "#1a1610", color: "#e8e4dc", padding: "80px 40px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ fontFamily: "'Courier New', monospace", fontSize: 10, letterSpacing: 3, color: "#555", marginBottom: 40 }}>WHAT PEOPLE SAY</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 2 }}>
            {[
              { quote: "Booked 4 calls in my first week. The follow-ups alone are worth it.", name: "James R.", role: "Freelance consultant" },
              { quote: "I used to spend 20 minutes per cold email. Now it's 20 seconds.", name: "Priya M.", role: "B2B SaaS founder" },
              { quote: "The bold tone is genuinely different from anything I've seen from AI.", name: "Tom K.", role: "Sales lead" },
            ].map(t => (
              <div key={t.name} style={{ padding: "28px 24px", border: "1px solid #2a2520", background: "#201c18" }}>
                <p style={{ fontSize: 15, lineHeight: 1.7, margin: "0 0 20px", fontStyle: "italic", color: "#c8c0b0" }}>"{t.quote}"</p>
                <div style={{ fontFamily: "'Courier New', monospace", fontSize: 11, color: "#c48c3c" }}>{t.name}</div>
                <div style={{ fontFamily: "'Courier New', monospace", fontSize: 10, color: "#555", marginTop: 2 }}>{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 900, margin: "0 auto", padding: "80px 40px" }}>
        <div style={{ fontFamily: "'Courier New', monospace", fontSize: 10, letterSpacing: 3, color: "#aaa", marginBottom: 40 }}>PRICING</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 2 }}>
          {[
            { plan: "Free", price: "$0", features: ["2 email sequences", "All 4 tones", "Copy to clipboard"], cta: "Start Free", highlight: false },
            { plan: "Pro", price: "$9/mo", features: ["Unlimited sequences", "A/B subject variants", "Export to Gmail / CSV", "Priority support"], cta: "Upgrade to Pro", highlight: true },
          ].map(p => (
            <div key={p.plan} style={{ padding: "36px 32px", background: p.highlight ? "#1a1610" : "#ede8de", color: p.highlight ? "#e8e4dc" : "#1a1610", border: p.highlight ? "none" : "1px solid #ddd5c0" }}>
              <div style={{ fontFamily: "'Courier New', monospace", fontSize: 10, letterSpacing: 3, color: p.highlight ? "#c48c3c" : "#aaa", marginBottom: 12 }}>{p.plan}</div>
              <div style={{ fontSize: 40, fontWeight: 400, marginBottom: 24, letterSpacing: "-1px" }}>{p.price}</div>
              <ul style={{ padding: 0, margin: "0 0 32px", listStyle: "none" }}>
                {p.features.map(f => (
                  <li key={f} style={{ fontFamily: "'Courier New', monospace", fontSize: 12, color: p.highlight ? "#888" : "#6b6050", lineHeight: 2.2 }}>✦ {f}</li>
                ))}
              </ul>
              <button onClick={onCTA} style={{ width: "100%", background: p.highlight ? "#c48c3c" : "#1a1610", color: "#fff", border: "none", padding: "13px", fontSize: 11, fontFamily: "'Courier New', monospace", letterSpacing: 2, fontWeight: 700, cursor: "pointer" }}>{p.cta} →</button>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: "#c48c3c", padding: "60px 40px", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(24px,4vw,44px)", fontWeight: 400, margin: "0 0 20px", color: "#fff", letterSpacing: "-1px" }}>
          Your next reply is 20 seconds away.
        </h2>
        <button onClick={onCTA} style={{ background: "#fff", color: "#c48c3c", border: "none", padding: "16px 36px", fontSize: 12, fontFamily: "'Courier New', monospace", letterSpacing: 2, fontWeight: 700, cursor: "pointer" }}>
          TRY IT FREE →
        </button>
      </section>

      <style>{`* { box-sizing: border-box; }`}</style>
    </div>
  );
                             } import { useState, useEffect } from "react";

const FREE_LIMIT = 2;
const STORAGE_KEY = "cold_email_uses_v2";

function getUses() {
  try { return parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10); } catch { return 0; }
}
function incrementUses() {
  try { const n = getUses() + 1; localStorage.setItem(STORAGE_KEY, String(n)); return n; } catch { return 1; }
}

const TONES = [
  { id: "direct", label: "Direct", desc: "Straight to the point" },
  { id: "warm", label: "Warm", desc: "Friendly & personable" },
  { id: "bold", label: "Bold", desc: "Confident, no fluff" },
  { id: "curious", label: "Curious", desc: "Question-led hook" },
];

export default function App() {
  const [tab, setTab] = useState("app"); // "app" | "landing"
  return tab === "landing" ? <LandingPage onCTA={() => setTab("app")} /> : <ColdEmailApp onSeeLP={() => setTab("landing")} />;
}

function ColdEmailApp({ onSeeLP }) {
  const [target, setTarget] = useState("");
  const [yourRole, setYourRole] = useState("");
  const [goal, setGoal] = useState("");
  const [tone, setTone] = useState("direct");
  const [results, setResults] = useState(null); // { main, followUp1, followUp2 }
  const [loading, setLoading] = useState(false);
  const [uses, setUses] = useState(0);
  const [copied, setCopied] = useState("");
  const [showPaywall, setShowPaywall] = useState(false);
  const [error, setError] = useState("");
  const [activeEmail, setActiveEmail] = useState("main");

  useEffect(() => { setUses(getUses()); }, []);

  const locked = uses >= FREE_LIMIT;

  async function generate() {
    if (!target.trim()) { setError("Who are you emailing?"); return; }
    if (!goal.trim()) { setError("What's your goal?"); return; }
    setError("");
    if (locked) { setShowPaywall(true); return; }
    setLoading(true);
    setResults(null);

    const toneDesc = TONES.find(t => t.id === tone)?.desc || "direct";

    const prompt = `You are an expert cold email copywriter. Write 3 emails for this outreach:

Target: ${target}
${yourRole ? `Sender: ${yourRole}` : ""}
Goal: ${goal}
Tone: ${toneDesc}

Return ONLY a JSON object (no markdown, no explanation) with this exact structure:
{
  "main": {
    "subject": "...",
    "body": "..."
  },
  "followUp1": {
    "subject": "...",
    "body": "..."
  },
  "followUp2": {
    "subject": "...",
    "body": "..."
  }
}

Rules for ALL emails:
- Body max 5 sentences
- No buzzwords or fluff
- Single soft CTA per email
- Tone must be ${toneDesc}

followUp1: Send 3 days later if no reply. Reference the first email briefly.
followUp2: Send 7 days later. Take a different angle, shorter, maybe a bit more casual.`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await res.json();
      const raw = data.content?.map(b => b.text || "").join("") || "";
      const clean = raw.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setResults(parsed);
      setActiveEmail("main");
      const newCount = incrementUses();
      setUses(newCount);
    } catch (e) {
      setError("Something went wrong — try again.");
    }
    setLoading(false);
  }

  function copy(text, key) {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(""), 2000);
  }

  const emailTabs = results ? [
    { key: "main", label: "Initial Email", tag: "Day 1" },
    { key: "followUp1", label: "Follow-Up #1", tag: "Day 3" },
    { key: "followUp2", label: "Follow-Up #2", tag: "Day 7" },
  ] : [];

  const current = results?.[activeEmail];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0c0c0f",
      color: "#e8e4dc",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Noise texture overlay */}
      <div style={{
        position: "fixed", inset: 0, opacity: 0.03,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        pointerEvents: "none",
      }} />

      {/* Amber glow top-right */}
      <div style={{
        position: "fixed", top: -150, right: -150, width: 500, height: 500,
        background: "radial-gradient(circle, rgba(196,140,60,0.1) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 700, margin: "0 auto", padding: "48px 24px 80px" }}>

        {/* Nav */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 52 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 8, height: 8, background: "#c48c3c", borderRadius: "50%" }} />
            <span style={{ fontFamily: "'Courier New', monospace", fontSize: 11, letterSpacing: 3, color: "#555", textTransform: "uppercase" }}>
              OutreachAI
            </span>
          </div>
          <button onClick={onSeeLP} style={{
            background: "transparent", border: "1px solid #222", color: "#555",
            padding: "6px 14px", fontSize: 11, fontFamily: "'Courier New', monospace",
            letterSpacing: 1, cursor: "pointer",
          }}>
            See Landing Page →
          </button>
        </div>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontSize: "clamp(32px,5vw,50px)", fontWeight: 400, lineHeight: 1.1, margin: "0 0 14px", letterSpacing: "-0.5px" }}>
            Cold emails that open<br />
            <em style={{ color: "#c48c3c" }}>doors, not spam folders.</em>
          </h1>
          <p style={{ color: "#555", fontFamily: "'Courier New', monospace", fontSize: 13, margin: 0 }}>
            {locked
              ? <span style={{ color: "#c05050" }}>Free uses exhausted — upgrade to continue.</span>
              : <span>{FREE_LIMIT - uses} free {FREE_LIMIT - uses === 1 ? "sequence" : "sequences"} remaining. Each includes 3 emails.</span>
            }
          </p>
        </div>

        {/* Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18, marginBottom: 24 }}>
          <Field label="WHO ARE YOU EMAILING?" placeholder="e.g. Head of growth at a Series A startup" value={target} onChange={setTarget} />
          <Field label="YOUR ROLE / OFFER (optional)" placeholder="e.g. Freelance designer, SaaS founder, recruiter" value={yourRole} onChange={setYourRole} />
          <Field label="WHAT'S YOUR GOAL?" placeholder="e.g. Book a demo, pitch a collab, get an intro" value={goal} onChange={setGoal} />

          {/* Tone selector */}
          <div>
            <div style={{ fontFamily: "'Courier New', monospace", fontSize: 10, letterSpacing: 2, color: "#555", marginBottom: 10 }}>TONE</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {TONES.map(t => (
                <button key={t.id} onClick={() => setTone(t.id)} style={{
                  background: tone === t.id ? "#1a1508" : "transparent",
                  border: `1px solid ${tone === t.id ? "#c48c3c" : "#1e1e1e"}`,
                  color: tone === t.id ? "#c48c3c" : "#555",
                  padding: "10px 14px",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}>
                  <div style={{ fontFamily: "'Courier New', monospace", fontSize: 11, letterSpacing: 1, marginBottom: 2 }}>{t.label}</div>
                  <div style={{ fontSize: 12, color: tone === t.id ? "#8a6020" : "#333" }}>{t.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {error && <p style={{ margin: 0, color: "#c05050", fontFamily: "'Courier New', monospace", fontSize: 12 }}>⚠ {error}</p>}

          <button onClick={generate} disabled={loading} style={{
            background: locked ? "#181818" : "#c48c3c",
            color: locked ? "#444" : "#0c0c0f",
            border: "none",
            padding: "15px 28px",
            fontSize: 12,
            fontFamily: "'Courier New', monospace",
            letterSpacing: 2,
            fontWeight: 700,
            cursor: locked ? "not-allowed" : "pointer",
            transition: "background 0.2s",
            marginTop: 4,
          }}
            onMouseEnter={e => { if (!locked && !loading) e.target.style.background = "#d9a050"; }}
            onMouseLeave={e => { if (!locked && !loading) e.target.style.background = "#c48c3c"; }}
          >
            {loading ? "WRITING 3 EMAILS..." : locked ? "🔒 UPGRADE TO CONTINUE" : "GENERATE EMAIL SEQUENCE →"}
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ padding: 28, border: "1px solid #1a1a1a", background: "#111", color: "#444", fontFamily: "'Courier New', monospace", fontSize: 12, display: "flex", gap: 10, alignItems: "center" }}>
            <span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>◌</span>
            Writing your 3-email sequence...
          </div>
        )}

        {/* Results */}
        {results && !loading && (
          <div style={{ animation: "fadeUp 0.4s ease", border: "1px solid #1e1e1e", background: "#0f0f12" }}>

            {/* Email tab switcher */}
            <div style={{ display: "flex", borderBottom: "1px solid #1a1a1a" }}>
              {emailTabs.map(t => (
                <button key={t.key} onClick={() => setActiveEmail(t.key)} style={{
                  flex: 1,
                  background: activeEmail === t.key ? "#161618" : "transparent",
                  border: "none",
                  borderBottom: activeEmail === t.key ? "2px solid #c48c3c" : "2px solid transparent",
                  color: activeEmail === t.key ? "#c48c3c" : "#444",
                  padding: "12px 8px",
                  cursor: "pointer",
                  fontFamily: "'Courier New', monospace",
                  fontSize: 10,
                  letterSpacing: 1,
                  transition: "all 0.15s",
                }}>
                  <div>{t.label}</div>
                  <div style={{ fontSize: 9, opacity: 0.6, marginTop: 2 }}>{t.tag}</div>
                </button>
              ))}
            </div>

            {current && (
              <>
                <div style={{ padding: "18px 22px 0", borderBottom: "1px solid #151515" }}>
                  <div style={{ fontFamily: "'Courier New', monospace", fontSize: 9, letterSpacing: 2, color: "#444", marginBottom: 6 }}>SUBJECT</div>
                  <div style={{ fontSize: 15, color: "#d8d4cc", paddingBottom: 16 }}>{current.subject}</div>
                </div>

                <div style={{ padding: "18px 22px" }}>
                  <div style={{ fontFamily: "'Courier New', monospace", fontSize: 9, letterSpacing: 2, color: "#444", marginBottom: 10 }}>BODY</div>
                  <div style={{ fontSize: 15, lineHeight: 1.8, whiteSpace: "pre-wrap", color: "#ccc9c0" }}>{current.body}</div>
                </div>

                <div style={{ padding: "0 22px 20px", display: "flex", gap: 8 }}>
                  <button onClick={() => copy(`Subject: ${current.subject}\n\n${current.body}`, activeEmail)} style={{
                    background: "transparent", border: "1px solid #222",
                    color: copied === activeEmail ? "#c48c3c" : "#666",
                    padding: "7px 16px", fontSize: 10, fontFamily: "'Courier New', monospace",
                    letterSpacing: 1, cursor: "pointer",
                  }}>
                    {copied === activeEmail ? "✓ COPIED" : "COPY EMAIL"}
                  </button>
                  <button onClick={() => copy(
                    emailTabs.map(t => `--- ${t.label} (${t.tag}) ---\nSubject: ${results[t.key].subject}\n\n${results[t.key].body}`).join("\n\n"),
                    "all"
                  )} style={{
                    background: "transparent", border: "1px solid #222",
                    color: copied === "all" ? "#c48c3c" : "#444",
                    padding: "7px 16px", fontSize: 10, fontFamily: "'Courier New', monospace",
                    letterSpacing: 1, cursor: "pointer",
                  }}>
                    {copied === "all" ? "✓ ALL COPIED" : "COPY ALL 3"}
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Usage bar */}
        {!locked && uses > 0 && (
          <p style={{ marginTop: 16, fontFamily: "'Courier New', monospace", fontSize: 11, color: "#333", letterSpacing: 1 }}>
            {"▓".repeat(uses)}{"░".repeat(FREE_LIMIT - uses)} {uses}/{FREE_LIMIT}
          </p>
        )}
      </div>

      {/* Paywall */}
      {showPaywall && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 100, padding: 24,
        }} onClick={() => setShowPaywall(false)}>
          <div onClick={e => e.stopPropagation()} style={{
            background: "#0f0f12", border: "1px solid #222",
            maxWidth: 460, width: "100%", padding: 40, animation: "fadeUp 0.25s ease",
          }}>
            <div style={{ background: "#c48c3c", color: "#0c0c0f", fontSize: 10, fontFamily: "'Courier New', monospace", letterSpacing: 3, padding: "4px 10px", display: "inline-block", marginBottom: 20 }}>UPGRADE</div>
            <h2 style={{ fontSize: 26, fontWeight: 400, margin: "0 0 10px", lineHeight: 1.2 }}>
              You've used your<br /><em style={{ color: "#c48c3c" }}>free sequences.</em>
            </h2>
            <p style={{ color: "#555", fontFamily: "'Courier New', monospace", fontSize: 12, lineHeight: 1.7, margin: "0 0 10px" }}>Get unlimited sequences for one low price:</p>
            <ul style={{ color: "#666", fontFamily: "'Courier New', monospace", fontSize: 12, lineHeight: 2, margin: "0 0 28px", paddingLeft: 18 }}>
              <li>Unlimited email sequences</li>
              <li>All 4 tones</li>
              <li>A/B subject line variants</li>
              <li>Export to Gmail / CSV</li>
            </ul>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <button style={{ background: "#c48c3c", color: "#0c0c0f", border: "none", padding: 14, fontSize: 12, fontFamily: "'Courier New', monospace", letterSpacing: 2, fontWeight: 700, cursor: "pointer" }}>
                UPGRADE — $9/mo →
              </button>
              <button onClick={() => setShowPaywall(false)} style={{ background: "transparent", border: "1px solid #1e1e1e", color: "#444", padding: 11, fontSize: 11, fontFamily: "'Courier New', monospace", letterSpacing: 1, cursor: "pointer" }}>
                MAYBE LATER
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        @keyframes spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}

function Field({ label, placeholder, value, onChange }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label style={{ display: "block", fontFamily: "'Courier New', monospace", fontSize: 10, letterSpacing: 2, color: "#555", marginBottom: 8 }}>{label}</label>
      <input
        type="text" value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%", background: "#0f0f12",
          border: `1px solid ${focused ? "#c48c3c" : "#1e1e1e"}`,
          color: "#e8e4dc", padding: "12px 15px", fontSize: 15,
          fontFamily: "'Georgia', serif", outline: "none", transition: "border-color 0.2s",
        }}
      />
    </div>
  );
}

// ─── LANDING PAGE ────────────────────────────────────────────────

function LandingPage({ onCTA }) {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#f5f0e8",
      color: "#1a1610",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      overflow: "hidden",
    }}>
      {/* Subtle grid */}
      <div style={{
        position: "fixed", inset: 0, opacity: 0.4,
        backgroundImage: "linear-gradient(#d8d0c0 1px, transparent 1px), linear-gradient(90deg, #d8d0c0 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        pointerEvents: "none",
      }} />

      {/* Nav */}
      <nav style={{ position: "relative", zIndex: 10, padding: "24px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #ddd5c0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 8, height: 8, background: "#c48c3c", borderRadius: "50%" }} />
          <span style={{ fontFamily: "'Courier New', monospace", fontSize: 12, letterSpacing: 3, color: "#888" }}>OUTREACHAI</span>
        </div>
        <button onClick={onCTA} style={{
          background: "#1a1610", color: "#f5f0e8",
          border: "none", padding: "10px 22px",
          fontSize: 12, fontFamily: "'Courier New', monospace",
          letterSpacing: 2, cursor: "pointer",
        }}>TRY FREE →</button>
      </nav>

      {/* Hero */}
      <section style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", padding: "80px 40px 60px" }}>
        <div style={{ display: "inline-block", background: "#c48c3c", color: "#fff", fontSize: 10, fontFamily: "'Courier New', monospace", letterSpacing: 3, padding: "4px 12px", marginBottom: 28 }}>
          AI-POWERED COLD OUTREACH
        </div>
        <h1 style={{ fontSize: "clamp(40px,7vw,80px)", fontWeight: 400, lineHeight: 1.05, margin: "0 0 28px", letterSpacing: "-2px" }}>
          Stop writing cold<br />emails from scratch.
        </h1>
        <p style={{ fontSize: 18, lineHeight: 1.7, color: "#6b6050", maxWidth: 520, margin: "0 0 40px" }}>
          OutreachAI writes you a full 3-email sequence — initial email plus two follow-ups — in seconds. Personalized, sharp, and actually worth replying to.
        </p>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <button onClick={onCTA} style={{
            background: "#c48c3c", color: "#fff", border: "none",
            padding: "16px 32px", fontSize: 13, fontFamily: "'Courier New', monospace",
            letterSpacing: 2, fontWeight: 700, cursor: "pointer",
          }}>
            WRITE MY FIRST EMAIL →
          </button>
          <div style={{ padding: "16px 0", fontFamily: "'Courier New', monospace", fontSize: 12, color: "#aaa", letterSpacing: 1 }}>
            2 free sequences. No credit card.
          </div>
        </div>
      </section>

      {/* Social proof bar */}
      <div style={{ borderTop: "1px solid #ddd5c0", borderBottom: "1px solid #ddd5c0", background: "#ede8de", padding: "16px 40px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", gap: 40, flexWrap: "wrap", alignItems: "center" }}>
          {["2,400+ sequences written", "4 tone settings", "3-email follow-up sequences", "$9/mo unlimited"].map(s => (
            <span key={s} style={{ fontFamily: "'Courier New', monospace", fontSize: 11, letterSpacing: 1, color: "#888" }}>
              ✦ {s}
