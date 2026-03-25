import { useState } from "react";
import { allEvents } from "../data/events.js";

const milestoneBadges = [
  { count: 1, label: "First Step", icon: "🌱", unlocked: true },
  { count: 5, label: "Getting Going", icon: "⭐", unlocked: true },
  { count: 10, label: "Committed", icon: "🔥", unlocked: true },
  { count: 25, label: "Dedicated", icon: "💪", unlocked: false },
  { count: 50, label: "Unstoppable", icon: "🚀", unlocked: false },
  { count: 100, label: "Legend", icon: "👑", unlocked: false },
];

const categoryBadges = [
  { label: "Society", icon: "🎓", color: "#06b6d4", count: 0, unlocked: false },
  { label: "Cultural", icon: "🎭", color: "#ec4899", count: 1, unlocked: true },
  { label: "Social", icon: "🤝", color: "#f59e0b", count: 2, unlocked: true },
  { label: "Exercise", icon: "🏃", color: "#22c55e", count: 3, unlocked: true },
  { label: "Wellbeing", icon: "🧠", color: "#8b5cf6", count: 4, unlocked: true },
];

const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function EventsList({ category, onBack }) {
  const filtered = allEvents
    .filter((e) => e.categories.includes(category.label))
    .sort((a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day));

  const [added, setAdded] = useState(new Set());
  const [justAdded, setJustAdded] = useState(null);

  const handleAdd = (name) => {
    setAdded((prev) => new Set(prev).add(name));
    setJustAdded(name);
    setTimeout(() => setJustAdded(null), 1200);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 0 16px" }}>
        <div style={{
          width: 44, height: 44, borderRadius: 13, background: category.color,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0,
        }}>{category.icon}</div>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#1e293b" }}>{category.label}</div>
          <div style={{ fontSize: 13, color: "#94a3b8" }}>
            {filtered.length} {filtered.length === 1 ? "event" : "events"} this week
          </div>
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, overflowY: "auto" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 16px", color: "#94a3b8" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
            <p style={{ fontSize: 15, margin: 0 }}>No events in this category this week.</p>
          </div>
        ) : (
          filtered.map((ev, i) => {
            const isAdded = added.has(ev.name);
            const isJustAdded = justAdded === ev.name;
            return (
              <div key={i} style={{
                padding: "14px 16px", borderRadius: 14,
                background: `${category.color}0a`, border: `2px solid ${category.color}25`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{
                    width: 48, minHeight: 48, borderRadius: 12, background: category.color + "18",
                    display: "flex", flexDirection: "column", alignItems: "center",
                    justifyContent: "center", flexShrink: 0, padding: "6px 4px",
                  }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: category.color, textTransform: "uppercase" }}>
                      {ev.day.slice(0, 3)}
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: category.color }}>{ev.time}</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#1e293b", lineHeight: 1.3 }}>{ev.name}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 6 }}>
                      {ev.categories.map((cat) => (
                        <span key={cat} style={{
                          fontSize: 10, fontWeight: 600,
                          color: categoryBadges.find(c => c.label === cat)?.color || "#64748b",
                          background: (categoryBadges.find(c => c.label === cat)?.color || "#64748b") + "18",
                          padding: "2px 8px", borderRadius: 8,
                        }}>{cat}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => !isAdded && handleAdd(ev.name)}
                  disabled={isAdded}
                  style={{
                    marginTop: 10, width: "100%", padding: "10px", borderRadius: 10,
                    border: "none", fontSize: 13, fontWeight: 600, cursor: isAdded ? "default" : "pointer",
                    background: isAdded ? "#f0fdf4" : category.color,
                    color: isAdded ? "#22c55e" : "#fff",
                    transition: "all 0.2s",
                  }}
                >
                  {isJustAdded ? "✅ Added to your calendar!" : isAdded ? "✅ Added" : "Add to Calendar"}
                </button>
              </div>
            );
          })
        )}
      </div>
      <button onClick={onBack} style={{
        marginTop: 16, padding: "14px", borderRadius: 14, border: "2px solid #e2e8f0",
        background: "#fff", color: "#6366f1", fontSize: 15, fontWeight: 600, cursor: "pointer",
      }}>← Back to Categories</button>
    </div>
  );
}

export default function BadgesScreen({ onBack }) {
  const [tab, setTab] = useState("milestones");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const totalEvents = 12;
  const points = 480;
  const nextMilestone = milestoneBadges.find(b => !b.unlocked);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "8px 20px 20px", overflowY: "auto" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 6 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#6366f1", letterSpacing: 1.5, textTransform: "uppercase" }}>
          Your Progress
        </span>
      </div>

      {/* Points card */}
      <div style={{
        background: "linear-gradient(135deg, #6366f1, #8b5cf6)", borderRadius: 20,
        padding: "20px", marginBottom: 16, color: "#fff", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: 50, background: "rgba(255,255,255,0.1)" }} />
        <div style={{ position: "absolute", bottom: -30, left: -10, width: 80, height: 80, borderRadius: 40, background: "rgba(255,255,255,0.08)" }} />
        <div style={{ fontSize: 14, opacity: 0.85, marginBottom: 4 }}>Total Points</div>
        <div style={{ fontSize: 40, fontWeight: 800, lineHeight: 1.1 }}>{points}</div>
        <div style={{ fontSize: 13, opacity: 0.75, marginTop: 8 }}>{totalEvents} events attended</div>
        {nextMilestone && (
          <div style={{ marginTop: 12 }}>
            <div style={{ fontSize: 12, opacity: 0.75, marginBottom: 4 }}>
              Next badge: {nextMilestone.label} ({nextMilestone.count} events)
            </div>
            <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.2)", overflow: "hidden" }}>
              <div style={{
                height: "100%", borderRadius: 3, background: "#fff",
                width: `${Math.min((totalEvents / nextMilestone.count) * 100, 100)}%`,
                transition: "width 0.5s ease",
              }} />
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div style={{
        display: "flex", marginBottom: 16, background: "#f1f5f9", borderRadius: 12, padding: 3,
      }}>
        {["milestones", "categories"].map((t) => (
          <button key={t} onClick={() => { setTab(t); setSelectedCategory(null); }} style={{
            flex: 1, padding: "10px", borderRadius: 10, border: "none", fontSize: 14, fontWeight: 600,
            cursor: "pointer", background: tab === t ? "#fff" : "transparent",
            color: tab === t ? "#6366f1" : "#94a3b8",
            boxShadow: tab === t ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
            transition: "all 0.2s", textTransform: "capitalize",
          }}>{t}</button>
        ))}
      </div>

      {/* Milestone badges */}
      {tab === "milestones" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          {milestoneBadges.map((b) => (
            <div key={b.count} style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              padding: "16px 8px", borderRadius: 16,
              background: b.unlocked ? "#f5f3ff" : "#f8fafc",
              border: `2px solid ${b.unlocked ? "#ddd6fe" : "#e2e8f0"}`,
              opacity: b.unlocked ? 1 : 0.45, position: "relative",
            }}>
              <div style={{ fontSize: 32, marginBottom: 6, filter: b.unlocked ? "none" : "grayscale(1)" }}>{b.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: b.unlocked ? "#4c1d95" : "#94a3b8", textAlign: "center" }}>{b.label}</div>
              <div style={{ fontSize: 11, color: b.unlocked ? "#7c3aed" : "#cbd5e1", marginTop: 2 }}>{b.count} events</div>
              {b.unlocked && (
                <div style={{
                  position: "absolute", top: 8, right: 8, fontSize: 10,
                  background: "#22c55e", color: "#fff", borderRadius: 10, padding: "1px 6px", fontWeight: 700,
                }}>✓</div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Category badges */}
      {tab === "categories" && !selectedCategory && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <p style={{ fontSize: 13, color: "#94a3b8", margin: "0 0 4px", textAlign: "center" }}>
            Tap a category to see upcoming events
          </p>
          {categoryBadges.map((b) => {
            const eventCount = allEvents.filter(e => e.categories.includes(b.label)).length;
            return (
              <button key={b.label} onClick={() => setSelectedCategory(b)} style={{
                display: "flex", alignItems: "center", gap: 14, padding: "14px 16px",
                borderRadius: 14, background: `${b.color}0a`, border: `2px solid ${b.color}30`,
                cursor: "pointer", transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = `${b.color}18`; e.currentTarget.style.transform = "translateX(4px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = `${b.color}0a`; e.currentTarget.style.transform = "translateX(0)"; }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 13, background: b.color,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0,
                }}>{b.icon}</div>
                <div style={{ flex: 1, textAlign: "left" }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "#1e293b" }}>{b.label}</div>
                  <div style={{ fontSize: 12, color: "#64748b", marginTop: 1 }}>
                    {eventCount} {eventCount === 1 ? "event" : "events"} this week
                  </div>
                </div>
                <span style={{ fontSize: 18, color: "#94a3b8" }}>›</span>
              </button>
            );
          })}
        </div>
      )}

      {tab === "categories" && selectedCategory && (
        <EventsList category={selectedCategory} onBack={() => setSelectedCategory(null)} />
      )}
    </div>
  );
}