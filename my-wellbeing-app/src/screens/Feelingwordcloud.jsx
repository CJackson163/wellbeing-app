import { useState } from "react";

const words = [
  { label: "Stressed", size: 23, color: "#ef4444" },
  { label: "Great", size: 22, color: "#22c55e" },
  { label: "Lonely", size: 19, color: "#6366f1" },
  { label: "Okay", size: 24, color: "#eab308" },
  { label: "Anxious", size: 20, color: "#e879f9" },
  { label: "Calm", size: 17, color: "#14b8a6" },
  { label: "Tired", size: 21, color: "#f97316" },
  { label: "Excited", size: 20, color: "#f59e0b" },
  { label: "Depressed", size: 17, color: "#7c3aed" },
  { label: "Good", size: 19, color: "#16a34a" },
  { label: "Numb", size: 18, color: "#78716c" },
  { label: "Hopeful", size: 16, color: "#06b6d4" },
  { label: "Burnt-out", size: 17, color: "#dc2626" },
  { label: "Grateful", size: 15, color: "#10b981" },
  { label: "Sad", size: 26, color: "#8b5cf6" },
  { label: "Meh", size: 18, color: "#a3a3a3" },
  { label: "Frustrated", size: 16, color: "#e11d48" },
  { label: "Content", size: 17, color: "#2dd4bf" },
  { label: "Overwhelmed", size: 15, color: "#b91c1c" },
  { label: "Restless", size: 15, color: "#c084fc" },
  { label: "Drained", size: 16, color: "#ea580c" },
  { label: "Worried", size: 16, color: "#d946ef" },
];

const positive = ["Great", "Good", "Excited", "Hopeful", "Calm", "Grateful", "Content"];
const negative = ["Stressed", "Burnt-out", "Overwhelmed", "Anxious", "Worried", "Sad", "Depressed", "Lonely", "Frustrated", "Numb"];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function FeelingScreen({ onBack, onContinue }) {
  const [shuffledWords] = useState(() => shuffle(words));
  const [selected, setSelected] = useState(new Set());

  const toggle = (label) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  const handleContinue = () => {
    if (selected.size === 0) return;
    const sel = [...selected];
    if (sel.some(w => negative.includes(w))) onContinue("negative");
    else if (sel.some(w => positive.includes(w))) onContinue("positive");
    else onContinue("medium");
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      padding: "16px",
      background: "#f1f5f9",
    }}>
      <div style={{
        width: 375,
        minHeight: 720,
        background: "#ffffff",
        borderRadius: 40,
        boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        border: "8px solid #1e1e1e",
        position: "relative",
      }}>
        {/* Notch */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          padding: "12px 24px 0",
        }}>
          <div style={{
            width: 120,
            height: 28,
            background: "#1e1e1e",
            borderRadius: 20,
          }} />
        </div>

        {/* Back button */}
        <button onClick={onBack} style={{
          background: "none",
          border: "none",
          fontSize: 16,
          color: "#6366f1",
          cursor: "pointer",
          padding: "8px 20px",
          textAlign: "left",
          fontWeight: 600,
        }}>
          ← Back
        </button>

        {/* Content */}
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "16px 20px 28px",
        }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#6366f1", letterSpacing: 1.5, textTransform: "uppercase" }}>
              Check-in
            </span>
          </div>
          <h1 style={{
            fontSize: 24,
            fontWeight: 700,
            textAlign: "center",
            color: "#1e293b",
            margin: "0 0 4px",
            lineHeight: 1.3,
          }}>
            How are you feeling today?
          </h1>
          <p style={{
            fontSize: 14,
            color: "#94a3b8",
            textAlign: "center",
            margin: "0 0 24px",
            lineHeight: 1.5,
          }}>
            Tap all the words that resonate with you.
          </p>

          {/* Word cloud */}
          <div style={{
            flex: 1,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignContent: "center",
            gap: 8,
            padding: "4px 0",
          }}>
            {shuffledWords.map((w) => {
              const active = selected.has(w.label);
              return (
                <button
                  key={w.label}
                  onClick={() => toggle(w.label)}
                  style={{
                    fontSize: w.size,
                    fontWeight: active ? 700 : 500,
                    padding: "8px 16px",
                    borderRadius: 50,
                    border: `3px solid ${active ? w.color : w.color + "80"}`,
                    background: active ? w.color : w.color + "18",
                    color: active ? "#fff" : w.color,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    boxShadow: active ? `0 3px 14px ${w.color}40` : "none",
                    transform: active ? "scale(1.08)" : "scale(1)",
                    lineHeight: 1,
                    whiteSpace: "nowrap",
                  }}
                >
                  {w.label}
                </button>
              );
            })}
          </div>

          {/* Selected count */}
          {selected.size > 0 && (
            <p style={{
              textAlign: "center",
              fontSize: 13,
              color: "#94a3b8",
              margin: "10px 0 0",
            }}>
              {selected.size} selected
            </p>
          )}

          {/* Continue button */}
          <button
            onClick={handleContinue}
            disabled={selected.size === 0}
            style={{
              marginTop: 16,
              padding: "16px",
              borderRadius: 16,
              border: "none",
              background: selected.size > 0 ? "#6366f1" : "#cbd5e1",
              color: "#fff",
              fontSize: 17,
              fontWeight: 600,
              cursor: selected.size > 0 ? "pointer" : "default",
              transition: "background 0.2s",
              letterSpacing: 0.3,
            }}
          >
            Continue
          </button>
        </div>

        {/* Home indicator */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: 8,
        }}>
          <div style={{
            width: 134,
            height: 5,
            background: "#1e1e1e",
            borderRadius: 3,
          }} />
        </div>
      </div>
    </div>
  );
}