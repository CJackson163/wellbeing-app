import { useState } from "react";

const feelings = [
  { label: "Great", emoji: "😄", color: "#22c55e" },
  { label: "Good", emoji: "🙂", color: "#84cc16" },
  { label: "Okay", emoji: "😐", color: "#eab308" },
  { label: "Not Good", emoji: "😔", color: "#f97316" },
  { label: "Struggling", emoji: "😞", color: "#ef4444" },
];

export default function FeelingScreen({ onBack, onContinue }) {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (i) => {
    setSelected(i);
    setSubmitted(false);
  };

 const handleContinue = () => {
  if (selected === null) return;
  const label = feelings[selected].label;
  if (label === "Great" || label === "Good") onContinue("positive");
  else if (label === "Okay" || label === "Not Good") onContinue("medium");
  else onContinue("negative");
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
        {/* Status bar */}
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
          padding: "40px 24px 32px",
        }}>
          <div style={{ textAlign: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#6366f1", letterSpacing: 1.5, textTransform: "uppercase" }}>
              Check-in
            </span>
          </div>
          <h1 style={{
            fontSize: 26,
            fontWeight: 700,
            textAlign: "center",
            color: "#1e293b",
            margin: "0 0 8px",
            lineHeight: 1.3,
          }}>
            How are you feeling today?
          </h1>
          <p style={{
            fontSize: 15,
            color: "#94a3b8",
            textAlign: "center",
            margin: "0 0 36px",
            lineHeight: 1.5,
          }}>
            There are no wrong answers — just pick what feels right.
          </p>

          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            flex: 1,
          }}>
            {feelings.map((f, i) => {
              const isSelected = selected === i;
              return (
                <button
                  key={f.label}
                  onClick={() => handleSelect(i)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    padding: "14px 18px",
                    borderRadius: 16,
                    border: `2px solid ${isSelected ? f.color : "#e2e8f0"}`,
                    background: isSelected ? `${f.color}12` : "#fff",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    boxShadow: isSelected ? `0 2px 12px ${f.color}30` : "none",
                  }}
                >
                  <span style={{
                    fontSize: 36,
                    lineHeight: 1,
                    filter: isSelected ? "none" : "grayscale(0.3)",
                    transition: "filter 0.2s",
                  }}>
                    {f.emoji}
                  </span>
                  <span style={{
                    fontSize: 17,
                    fontWeight: isSelected ? 600 : 500,
                    color: isSelected ? f.color : "#475569",
                    transition: "color 0.2s",
                  }}>
                    {f.label}
                  </span>
                  {isSelected && (
                    <span style={{
                      marginLeft: "auto",
                      width: 24,
                      height: 24,
                      borderRadius: 12,
                      background: f.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontSize: 14,
                      fontWeight: 700,
                    }}>✓</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Continue button */}
          <button
            onClick={handleContinue}
            disabled={selected === null}
            style={{
              marginTop: 28,
              padding: "16px",
              borderRadius: 16,
              border: "none",
              background: selected !== null ? "#6366f1" : "#cbd5e1",
              color: "#fff",
              fontSize: 17,
              fontWeight: 600,
              cursor: selected !== null ? "pointer" : "default",
              transition: "background 0.2s",
              letterSpacing: 0.3,
            }}
          >
            {submitted ? `Got it — you're feeling ${feelings[selected].label.toLowerCase()}` : "Continue"}
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