import { useState } from "react";
import { allEvents, dayOrder } from "../data/events.js";

const categories = [
  { label: "All", icon: "📋", color: "#6366f1" },
  { label: "Exercise", icon: "🏃", color: "#22c55e" },
  { label: "Social", icon: "🤝", color: "#f59e0b" },
  { label: "Society", icon: "🎓", color: "#06b6d4" },
  { label: "Cultural", icon: "🎭", color: "#ec4899" },
  { label: "Wellbeing", icon: "🧠", color: "#8b5cf6" },
];

export default function EventsBrowse() {
  const [cat, setCat] = useState("All");
  const [added, setAdded] = useState(new Set());
  const [justAdded, setJustAdded] = useState(null);
  const filtered = cat === "All" ? allEvents : allEvents.filter(e => e.categories.includes(cat));
  const sorted = [...filtered].sort((a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day));

  const handleAdd = (name) => {
    setAdded((prev) => new Set(prev).add(name));
    setJustAdded(name);
    setTimeout(() => setJustAdded(null), 1200);
  };

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "24px 20px 20px" }}>
      <h1 style={{ fontSize: 24, fontWeight: 800, color: "#1e293b", margin: "0 0 16px" }}>Events</h1>
      <div style={{
        display: "flex", gap: 8, overflowX: "auto", paddingBottom: 12, marginBottom: 12,
      }}>
        {categories.map((c) => (
          <button key={c.label} onClick={() => setCat(c.label)} style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "8px 14px", borderRadius: 50, border: "none", whiteSpace: "nowrap",
            background: cat === c.label ? c.color : "#f1f5f9",
            color: cat === c.label ? "#fff" : "#64748b",
            fontSize: 13, fontWeight: 600, cursor: "pointer",
          }}>
            <span>{c.icon}</span> {c.label}
          </button>
        ))}
      </div>
      <p style={{ fontSize: 13, color: "#94a3b8", margin: "0 0 12px" }}>
        {sorted.length} {sorted.length === 1 ? "event" : "events"} this week
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {sorted.map((ev, i) => {
          const isAdded = added.has(ev.name);
          const isJustAdded = justAdded === ev.name;
          return (
            <div key={i} style={{
              padding: "14px 16px", borderRadius: 14,
              background: "#fff", border: "1px solid #e2e8f0",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{
                  width: 48, minHeight: 48, borderRadius: 12,
                  background: "#f1f5f9", display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center", flexShrink: 0, padding: "6px 4px",
                }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#6366f1", textTransform: "uppercase" }}>
                    {ev.day.slice(0, 3)}
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#6366f1" }}>{ev.time}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#1e293b", lineHeight: 1.3 }}>{ev.name}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 4 }}>
                    {ev.categories.map((c) => {
                      const catObj = categories.find(x => x.label === c);
                      return (
                        <span key={c} style={{
                          fontSize: 10, fontWeight: 600,
                          color: catObj?.color || "#64748b",
                          background: (catObj?.color || "#64748b") + "18",
                          padding: "2px 8px", borderRadius: 8,
                        }}>{c}</span>
                      );
                    })}
                  </div>
                </div>
                <span style={{ fontSize: 24 }}>{ev.icon}</span>
              </div>
              <button
                onClick={() => !isAdded && handleAdd(ev.name)}
                disabled={isAdded}
                style={{
                  marginTop: 10, width: "100%", padding: "10px", borderRadius: 10,
                  border: "none", fontSize: 13, fontWeight: 600,
                  cursor: isAdded ? "default" : "pointer",
                  background: isAdded ? "#f0fdf4" : "#6366f1",
                  color: isAdded ? "#22c55e" : "#fff",
                  transition: "all 0.2s",
                }}
              >
                {isJustAdded ? "✅ Added to your calendar!" : isAdded ? "✅ Added" : "Add to Calendar"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}