import { useState } from "react";

const words = [
  { label: "Stressed", size: 20, color: "#ef4444" },
  { label: "Great", size: 19, color: "#22c55e" },
  { label: "Lonely", size: 17, color: "#6366f1" },
  { label: "Okay", size: 21, color: "#eab308" },
  { label: "Anxious", size: 18, color: "#e879f9" },
  { label: "Calm", size: 16, color: "#14b8a6" },
  { label: "Tired", size: 19, color: "#f97316" },
  { label: "Excited", size: 18, color: "#f59e0b" },
  { label: "Depressed", size: 16, color: "#7c3aed" },
  { label: "Good", size: 17, color: "#16a34a" },
  { label: "Numb", size: 16, color: "#78716c" },
  { label: "Hopeful", size: 15, color: "#06b6d4" },
  { label: "Burnt-out", size: 16, color: "#dc2626" },
  { label: "Grateful", size: 14, color: "#10b981" },
  { label: "Sad", size: 22, color: "#8b5cf6" },
  { label: "Meh", size: 16, color: "#a3a3a3" },
  { label: "Frustrated", size: 15, color: "#e11d48" },
  { label: "Content", size: 16, color: "#2dd4bf" },
  { label: "Overwhelmed", size: 14, color: "#b91c1c" },
  { label: "Restless", size: 14, color: "#c084fc" },
  { label: "Drained", size: 15, color: "#ea580c" },
  { label: "Worried", size: 15, color: "#d946ef" },
];

const positiveWords = ["Great", "Good", "Excited", "Hopeful", "Calm", "Grateful", "Content"];
const negativeWords = ["Stressed", "Burnt-out", "Overwhelmed", "Anxious", "Worried", "Sad", "Depressed", "Lonely", "Frustrated", "Numb"];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function FeelingPopup({ onClose, onMoodSet }) {
  const [shuffled] = useState(() => shuffle(words));
  const [selected, setSelected] = useState(new Set());

  const toggle = (label) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(label) ? next.delete(label) : next.add(label);
      return next;
    });
  };

  const handleContinue = () => {
    if (selected.size === 0) return;
    const sel = [...selected];
    if (sel.some(w => negativeWords.includes(w))) onMoodSet("negative");
    else if (sel.some(w => positiveWords.includes(w))) onMoodSet("positive");
    else onMoodSet("medium");
  };

  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 50,
      background: "#fff", display: "flex", flexDirection: "column",
    }}>
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "20px 20px 32px",
        overflowY: "auto",
      }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, textAlign: "center", color: "#1e293b", margin: "0 0 4px" }}>
          How are you feeling today?
        </h2>
        <p style={{ fontSize: 14, color: "#94a3b8", textAlign: "center", margin: "0 0 24px" }}>
          Tap all that apply
        </p>
        <div style={{
          display: "flex", flexWrap: "wrap", justifyContent: "center",
          gap: 8, marginBottom: 20,
        }}>
          {shuffled.map((w) => {
            const active = selected.has(w.label);
            return (
              <button key={w.label} onClick={() => toggle(w.label)} style={{
                fontSize: w.size, fontWeight: active ? 700 : 500,
                padding: "8px 16px", borderRadius: 50,
                border: `3px solid ${active ? w.color : w.color + "80"}`,
                background: active ? w.color : w.color + "18",
                color: active ? "#fff" : w.color,
                cursor: "pointer", transition: "all 0.2s ease",
                boxShadow: active ? `0 3px 12px ${w.color}40` : "none",
                transform: active ? "scale(1.06)" : "scale(1)",
                lineHeight: 1, whiteSpace: "nowrap",
              }}>
                {w.label}
              </button>
            );
          })}
        </div>
        {selected.size > 0 && (
          <p style={{ textAlign: "center", fontSize: 13, color: "#94a3b8", margin: "0 0 12px" }}>
            {selected.size} selected
          </p>
        )}
        <div style={{ display: "flex", gap: 10, marginTop: "auto" }}>
          <button onClick={onClose} style={{
            flex: 1, padding: "16px", borderRadius: 14, border: "2px solid #e2e8f0",
            background: "#fff", color: "#64748b", fontSize: 16, fontWeight: 600, cursor: "pointer",
          }}>Skip</button>
          <button onClick={handleContinue} disabled={selected.size === 0} style={{
            flex: 2, padding: "16px", borderRadius: 14, border: "none",
            background: selected.size > 0 ? "#6366f1" : "#cbd5e1",
            color: "#fff", fontSize: 16, fontWeight: 600,
            cursor: selected.size > 0 ? "pointer" : "default",
          }}>Continue</button>
        </div>
      </div>
    </div>
  );
}