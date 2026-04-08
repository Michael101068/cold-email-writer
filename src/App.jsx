import { useState, useEffect } from "react";

const FREE_LIMIT = 2;
const STORAGE_KEY = "cev2";

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
  const [page, setPage] = useState("app");
  if (page === "landing") return <Landing go={() => setPage("app")} />;
  return <EmailApp goLP={() => setPage("landing")} />;
}

function EmailApp({ goLP }) {
  const [target, setTarget] = useState("");
  const [role, setRole] = useState("");
  const [goal, setGoal] = useState("");
  const [tone, setTone] = useState("direct");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uses, setUses] = useState(0);
  const [copied, setCopied] = useState("");
  const [paywall, setPaywall] = useState(false);
  const [error, setError] = useState("");
  const [active, setActive] = useState("main");

  useEffect(() => { setUses(getUses()); }, []);

  const locked = uses >= FREE_LIMIT;

  async function generate() {
    if (!target.trim()) { setError("Who are you emailing?"); return; }
    if (!goal.trim()) { setError("What is your goal?"); return; }
    setError("");
    if (locked) { setPaywall(true); return; }
    setLoading(true);
    setResults(null);
    const toneDesc = TONES.find(t => t.id === tone)?.desc || "direct";
    const prompt = `You are an expert cold email copywriter. Write 3 emails for this outreach:
Target: ${target}
${role ? "Sender: " + role : ""}
Goal: ${goal}
Tone: ${toneDesc}
Return ONLY a JSON object with this structure:
{"main":{"subject":"...","body":"..."},"followUp1":{"subject":"...","body":"..."},"followUp2":{"subject":"...","body":"..."}}
Rules: max 5 sentences per body, no buzzwords, one soft CTA each.
followUp1: 3 days later, reference first email.
followUp2: 7 days later, different angle, more casual.`;
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{ role: "user", content: prompt }] }),
      });
      const data = await res.json();
      const raw = data.content?.map(b => b.text || "").join("") || "";
      const clean = raw.replace(/```json|```/g, "").trim();
      setResults(JSON.parse(clean));
      setActive("main");
      setUses(incrementUses());
    } catch {
      setError("Something went wrong. Try again.");
    }
    setLoading(false);
  }

  function copy(text, key) {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(""), 2000);
  }

  const tabs = [
    { key: "main", label: "Initial", tag: "Day 1" },
    { key: "followUp1", label: "Follow-Up 1", tag: "Day 3" },
    { key: "followUp2", label: "Follow-Up 2", tag: "Day 7" },
  ];

  const cur = results?.[active];

  return (
    <div style={{ minHeight: "100vh", background: "#0c0c0f", color: "#e8e4dc", fontFamily: "Georgia, serif" }}>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "48px 24px 80px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 48 }}>
          <span style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: 3, color: "#555" }}>OUTREACHAI</span>
          <button onClick={goLP} style={{ background: "transparent", border: "1px solid #222", color: "#555", padding: "6px 14px", fontSize: 11, fontFamily: "monospace", cursor: "pointer" }}>Landing Page →</button>
        </div>

        <h1 style={{ fontSize: "clamp(28px,5vw,48px)", fontWeight: 400, lineHeight: 1.1, margin: "0 0 12px" }}>
          Cold emails that open<br /><em style={{ color: "#c48c3c" }}>doors, not spam folders.</em>
        </h1>
        <p style={{ color: "#555", fontFamily: "monospace", fontSize: 12, margin: "0 0 36px" }}>
          {locked ? <span style={{ color: "#c05050" }}>Free uses exhausted.</span> : <span>{FREE_LIMIT - uses} free sequence{FREE_LIMIT - uses !== 1 ? "s" : ""} left.</span>}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 20 }}>
          <F label="WHO ARE YOU EMAILING?" val={target} set={setTarget} ph="e.g. Head of growth at a Series A startup" />
          <F label="YOUR ROLE / OFFER (optional)" val={role} set={setRole} ph="e.g. Freelance designer, SaaS founder" />
          <F label="WHAT IS YOUR GOAL?" val={goal} set={setGoal} ph="e.g. Book a demo, pitch a collab" />

          <div>
            <div style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: 2, color: "#555", marginBottom: 8 }}>TONE</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
              {TONES.map(t => (
                <button key={t.id} onClick={() => setTone(t.id)} style={{ background: tone === t.id ? "#1a1508" : "transparent", border: `1px solid ${tone === t.id ? "#c48c3c" : "#1e1e1e"}`, color: tone === t.id ? "#c48c3c" : "#555", padding: "10px 12px", textAlign: "left", cursor: "pointer" }}>
                  <div style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: 1 }}>{t.label}</div>
                  <div style={{ fontSize: 11, color: tone === t.id ? "#8a6020" : "#333", marginTop: 2 }}>{t.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {error && <p style={{ margin: 0, color: "#c05050", fontFamily: "monospace", fontSize: 12 }}>⚠ {error}</p>}

          <button onClick={generate} disabled={loading} style={{ background: locked ? "#181818" : "#c48c3c", color: locked ? "#444" : "#0c0c0f", border: "none", padding: "15px", fontSize: 12, fontFamily: "monospace", letterSpacing: 2, fontWeight: 700, cursor: locked ? "not-allowed" : "pointer" }}>
            {loading ? "WRITING..." : locked ? "🔒 UPGRADE TO CONTINUE" : "GENERATE EMAIL SEQUENCE →"}
          </button>
        </div>

        {loading && <div style={{ padding: 24, border: "1px solid #1a1a1a", background: "#111", color: "#444", fontFamily: "monospace", fontSize: 12 }}>Writing your 3-email sequence...</div>}

        {results && !loading && (
          <div style={{ border: "1px solid #1e1e1e", background: "#0f0f12" }}>
            <div style={{ display: "flex", borderBottom: "1px solid #1a1a1a" }}>
              {tabs.map(t => (
                <button key={t.key} onClick={() => setActive(t.key)} style={{ flex: 1, background: active === t.key ? "#161618" : "transparent", border: "none", borderBottom: active === t.key ? "2px solid #c48c3c" : "2px solid transparent", color: active === t.key ? "#c48c3c" : "#444", padding: "12px 4px", cursor: "pointer", fontFamily: "monospace", fontSize: 10 }}>
                  <div>{t.label}</div>
                  <div style={{ fontSize: 9, opacity: 0.6 }}>{t.tag}</div>
                </button>
              ))}
            </div>
            {cur && (
              <>
                <div style={{ padding: "16px 20px", borderBottom: "1px solid #151515" }}>
                  <div style={{ fontFamily: "monospace", fontSize: 9, color: "#444", marginBottom: 6 }}>SUBJECT</div>
                  <div style={{ fontSize: 14, color: "#d8d4cc" }}>{cur.subject}</div>
                </div>
                <div style={{ padding: "16px 20px" }}>
                  <div style={{ fontFamily: "monospace", fontSize: 9, color: "#444", marginBottom: 8 }}>BODY</div>
                  <div style={{ fontSize: 14, lineHeight: 1.8, whiteSpace: "pre-wrap", color: "#ccc9c0" }}>{cur.body}</div>
                </div>
                <div style={{ padding: "0 20px 16px", display: "flex", gap: 8 }}>
                  <button onClick={() => copy(`Subject: ${cur.subject}\n\n${cur.body}`, active)} style={{ background: "transparent", border: "1px solid #222", color: copied === active ? "#c48c3c" : "#666", padding: "6px 14px", fontSize: 10, fontFamily: "monospace", cursor: "pointer" }}>
                    {copied === active ? "✓ COPIED" : "COPY"}
                  </button>
                  <button onClick={() => copy(tabs.map(t => `--- ${t.label} ---\nSubject: ${results[t.key].subject}\n\n${results[t.key].body}`).join("\n\n"), "all")} style={{ background: "transparent", border: "1px solid #222", color: copied === "all" ? "#c48c3c" : "#444", padding: "6px 14px", fontSize: 10, fontFamily: "monospace", cursor: "pointer" }}>
                    {copied === "all" ? "✓ ALL COPIED" : "COPY ALL 3"}
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {paywall && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 24 }} onClick={() => setPaywall(false)}>
          <div onClick={e => e.stopPropagation()} style={{ background: "#0f0f12", border: "1px solid #222", maxWidth: 440, width: "100%", padding: 36 }}>
            <h2 style={{ fontSize: 24, fontWeight: 400, margin: "0 0 12px" }}>Free uses exhausted.<br /><em style={{ color: "#c48c3c" }}>Upgrade to continue.</em></h2>
            <ul style={{ color: "#666", fontFamily: "monospace", fontSize: 12, lineHeight: 2, margin: "0 0 24px", paddingLeft: 18 }}>
              <li>Unlimited sequences</li><li>All 4 tones</li><li>Copy all 3 emails</li>
            </ul>
            <button style={{ width: "100%", background: "#c48c3c", color: "#0c0c0f", border: "none", padding: 14, fontSize: 12, fontFamily: "monospace", letterSpacing: 2, fontWeight: 700, cursor: "pointer", marginBottom: 8 }}>UPGRADE — $9/mo →</button>
            <button onClick={() => setPaywall(false)} style={{ width: "100%", background: "transparent", border: "1px solid #1e1e1e", color: "#444", padding: 11, fontSize: 11, fontFamily: "monospace", cursor: "pointer" }}>MAYBE LATER</button>
          </div>
        </div>
      )}
      <style>{`* { box-sizing: border-box; }`}</style>
    </div>
  );
}

function F({ label, val, set, ph }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label style={{ display: "block", fontFamily: "monospace", fontSize: 10, letterSpacing: 2, color: "#555", marginBottom: 6 }}>{label}</label>
      <input type="text" value={val} onChange={e => set(e.target.value)} placeholder={ph} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{ width: "100%", background: "#0f0f12", border: `1px solid ${focused ? "#c48c3c" : "#1e1e1e"}`, color: "#e8e4dc", padding: "12px 14px", fontSize: 15, fontFamily: "Georgia, serif", outline: "none" }} />
    </div>
  );
}

function Landing({ go }) {
  return (
    <div style={{ minHeight: "100vh", background: "#f5f0e8", color: "#1a1610", fontFamily: "Georgia, serif" }}>
      <nav style={{ padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #ddd5c0" }}>
        <span style={{ fontFamily: "monospace", fontSize: 12, letterSpacing: 3, color: "#888" }}>OUTREACHAI</span>
        <button onClick={go} style={{ background: "#1a1610", color: "#f5f0e8", border: "none", padding: "10px 20px", fontSize: 12, fontFamily: "monospace", letterSpacing: 2, cursor: "pointer" }}>TRY FREE →</button>
      </nav>

      <section style={{ maxWidth: 860, margin: "0 auto", padding: "80px 40px 60px" }}>
        <div style={{ background: "#c48c3c", color: "#fff", fontSize: 10, fontFamily: "monospace", letterSpacing: 3, padding: "4px 12px", display: "inline-block", marginBottom: 24 }}>AI-POWERED COLD OUTREACH</div>
        <h1 style={{ fontSize: "clamp(36px,6vw,72px)", fontWeight: 400, lineHeight: 1.05, margin: "0 0 24px", letterSpacing: "-2px" }}>Stop writing cold<br />emails from scratch.</h1>
        <p style={{ fontSize: 17, lineHeight: 1.7, color: "#6b6050", maxWidth: 500, margin: "0 0 36px" }}>OutreachAI writes a full 3-email sequence in seconds. Personalized, sharp, and actually worth replying to.</p>
        <button onClick={go} style={{ background: "#c48c3c", color: "#fff", border: "none", padding: "16px 32px", fontSize: 13, fontFamily: "monospace", letterSpacing: 2, fontWeight: 700, cursor: "pointer" }}>WRITE MY FIRST EMAIL →</button>
        <span style={{ marginLeft: 20, fontFamily: "monospace", fontSize: 12, color: "#aaa" }}>2 free sequences. No card.</span>
      </section>

      <div style={{ background: "#ede8de", borderTop: "1px solid #ddd5c0", borderBottom: "1px solid #ddd5c0", padding: "14px 40px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", display: "flex", gap: 32, flexWrap: "wrap" }}>
          {["2,400+ sequences written", "4 tone settings", "3-email sequences", "$9/mo unlimited"].map(s => (
            <span key={s} style={{ fontFamily: "monospace", fontSize: 11, color: "#999" }}>✦ {s}</span>
          ))}
        </div>
      </div>

      <section style={{ maxWidth: 860, margin: "0 auto", padding: "72px 40px" }}>
        <div style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: 3, color: "#aaa", marginBottom: 28 }}>HOW IT WORKS</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 2 }}>
          {[["01","Describe your target","Tell us who you're reaching. Takes 30 seconds."],["02","Pick a tone","Direct, warm, bold, or curious."],["03","Get 3 emails","An opener plus two follow-ups, ready to send."]].map(([n,t,b]) => (
            <div key={n} style={{ background: "#ede8de", padding: "28px 24px", border: "1px solid #ddd5c0" }}>
              <div style={{ fontFamily: "monospace", fontSize: 26, color: "#c48c3c", marginBottom: 12 }}>{n}</div>
              <h3 style={{ fontSize: 16, fontWeight: 400, margin: "0 0 8px" }}>{t}</h3>
              <p style={{ color: "#7a6f5e", fontSize: 13, lineHeight: 1.6, margin: 0 }}>{b}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: "#1a1610", color: "#e8e4dc", padding: "72px 40px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: 3, color: "#555", marginBottom: 32 }}>WHAT PEOPLE SAY</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 2 }}>
            {[["Booked 4 calls in my first week. The follow-ups alone are worth it.","James R.","Freelance consultant"],["I used to spend 20 minutes per cold email. Now it takes 20 seconds.","Priya M.","B2B SaaS founder"],["The bold tone is genuinely different from anything I have seen from AI.","Tom K.","Sales lead"]].map(([q,n,r]) => (
              <div key={n} style={{ padding: "24px", border: "1px solid #2a2520", background: "#201c18" }}>
                <p style={{ fontSize: 14, lineHeight: 1.7, margin: "0 0 16px", fontStyle: "italic", color: "#c8c0b0" }}>"{q}"</p>
                <div style={{ fontFamily: "monospace", fontSize: 11, color: "#c48c3c" }}>{n}</div>
                <div style={{ fontFamily: "monospace", fontSize: 10, color: "#555", marginTop: 2 }}>{r}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 860, margin: "0 auto", padding: "72px 40px" }}>
        <div style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: 3, color: "#aaa", marginBottom: 32 }}>PRICING</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 2 }}>
          {[[false,"Free","$0",["2 email sequences","All 4 tones","Copy to clipboard"],"Start Free"],[true,"Pro","$9/mo",["Unlimited sequences","A/B subject variants","Export to CSV","Priority support"],"Upgrade to Pro"]].map(([hi,plan,price,feats,cta]) => (
            <div key={plan} style={{ padding: "32px", background: hi ? "#1a1610" : "#ede8de", color: hi ? "#e8e4dc" : "#1a1610", border: hi ? "none" : "1px solid #ddd5c0" }}>
              <div style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: 3, color: hi ? "#c48c3c" : "#aaa", marginBottom: 10 }}>{plan}</div>
              <div style={{ fontSize: 36, fontWeight: 400, marginBottom: 20 }}>{price}</div>
              <ul style={{ padding: 0, margin: "0 0 28px", listStyle: "none" }}>
                {feats.map(f => <li key={f} style={{ fontFamily: "monospace", fontSize: 11, color: hi ? "#888" : "#6b6050", lineHeight: 2.2 }}>✦ {f}</li>)}
              </ul>
              <button onClick={go} style={{ width: "100%", background: hi ? "#c48c3c" : "#1a1610", color: "#fff", border: "none", padding: "12px", fontSize: 11, fontFamily: "monospace", letterSpacing: 2, fontWeight: 700, cursor: "pointer" }}>{cta} →</button>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: "#c48c3c", padding: "56px 40px", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(22px,4vw,40px)", fontWeight: 400, margin: "0 0 20px", color: "#fff" }}>Your next reply is 20 seconds away.</h2>
        <button onClick={go} style={{ background: "#fff", color: "#c48c3c", border: "none", padding: "16px 32px", fontSize: 12, fontFamily: "monospace", letterSpacing: 2, fontWeight: 700, cursor: "pointer" }}>TRY IT FREE →</button>
      </section>
      <style>{`* { box-sizing: border-box; }`}</style>
    </div>
  );
              }
