import { allEvents, dayOrder } from "../data/events.js";

export default function HomeScreen({ onNavigate }) {
  const upcoming = [...allEvents].sort((a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day)).slice(0, 3);

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "24px 20px 20px" }}>
      <div style={{ marginBottom: 20 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#6366f1", letterSpacing: 1.5, textTransform: "uppercase" }}>
          Welcome back
        </span>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: "#1e293b", margin: "4px 0 0" }}>
          Your Wellbeing
        </h1>
      </div>
      <div style={{
        background: "linear-gradient(135deg, #6366f1, #8b5cf6)", borderRadius: 20,
        padding: "20px", marginBottom: 16, color: "#fff", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: 40, background: "rgba(255,255,255,0.1)" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 13, opacity: 0.85 }}>Your Points</div>
            <div style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.1 }}>480</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 13, opacity: 0.85 }}>Events</div>
            <div style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.1 }}>12</div>
          </div>
        </div>
        <button onClick={() => onNavigate("badges")} style={{
          marginTop: 14, width: "100%", padding: "10px", borderRadius: 12,
          border: "2px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.15)",
          color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer",
        }}>View Badges & Progress →</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
        {[
          { label: "Browse Events", icon: "📅", color: "#22c55e", route: "events" },
          { label: "Leave a Review", icon: "⭐", color: "#f59e0b", route: "review" },
        ].map((a) => (
          <button key={a.label} onClick={() => onNavigate(a.route)} style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
            padding: "18px 12px", borderRadius: 16, border: "none",
            background: a.color + "10", cursor: "pointer",
          }}>
            <span style={{ fontSize: 28 }}>{a.icon}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}>{a.label}</span>
          </button>
        ))}
      </div>
      <div style={{ marginBottom: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, color: "#1e293b", margin: 0 }}>Coming Up</h2>
          <button onClick={() => onNavigate("events")} style={{
            background: "none", border: "none", fontSize: 13, fontWeight: 600,
            color: "#6366f1", cursor: "pointer",
          }}>See all →</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {upcoming.map((ev, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "12px 14px", borderRadius: 14,
              background: "#f8fafc", border: "1px solid #e2e8f0",
            }}>
              <span style={{ fontSize: 24 }}>{ev.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#1e293b" }}>{ev.name}</div>
                <div style={{ fontSize: 12, color: "#94a3b8" }}>{ev.day} at {ev.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{
        display: "flex", alignItems: "center", gap: 10, padding: "12px 14px",
        borderRadius: 14, background: "#f0f9ff", border: "1px solid #bae6fd", marginTop: 12,
      }}>
        <span style={{ fontSize: 24 }}>☀️</span>
        <p style={{ fontSize: 13, color: "#0369a1", margin: 0, lineHeight: 1.4 }}>
          The weather looks great — try a walk around Leazes Park.
        </p>
      </div>
    </div>
  );
}