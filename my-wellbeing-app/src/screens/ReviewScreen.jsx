import { useState } from "react";

export default function ReviewScreen({ onBack }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating > 0) setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "40px 24px", textAlign: "center",
      }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: "#1e293b", margin: "0 0 8px" }}>
          Thanks for your feedback!
        </h2>
        <p style={{ fontSize: 15, color: "#94a3b8", margin: "0 0 32px", lineHeight: 1.5 }}>
          Your review helps us improve events for everyone.
        </p>
        <button onClick={() => { setSubmitted(false); setRating(0); setReview(""); setSuggestion(""); }} style={{
          padding: "16px 48px", borderRadius: 16, border: "none",
          background: "#6366f1", color: "#fff", fontSize: 17, fontWeight: 600, cursor: "pointer",
        }}>Leave Another Review</button>
      </div>
    );
  }

  return (
    <div style={{
      flex: 1, display: "flex", flexDirection: "column",
      padding: "8px 20px 20px", overflowY: "auto",
    }}>
      {/* Event card */}
      <div style={{
        display: "flex", alignItems: "center", gap: 14, padding: "16px",
        borderRadius: 16, background: "#fefce8", border: "2px solid #fde68a", marginBottom: 24,
      }}>
        <div style={{
          width: 48, height: 48, borderRadius: 14, background: "#eab308",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0,
        }}>🚶</div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 600, color: "#1e293b" }}>Wellbeing Walk</div>
          <div style={{ fontSize: 13, color: "#64748b", marginTop: 2 }}>Thursday 12pm</div>
          <div style={{
            display: "inline-block", marginTop: 6, fontSize: 12, fontWeight: 600,
            color: "#eab308", background: "#fef9c3", padding: "3px 10px", borderRadius: 20,
          }}>Free</div>
        </div>
      </div>

      {/* Star rating */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ textAlign: "center", marginBottom: 4 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#6366f1", letterSpacing: 1.5, textTransform: "uppercase" }}>
            Rate this event
          </span>
        </div>
        <p style={{ fontSize: 14, color: "#94a3b8", textAlign: "center", margin: "0 0 14px" }}>
          How was your experience?
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
          {[1, 2, 3, 4, 5].map((star) => {
            const active = star <= (hoverRating || rating);
            return (
              <button key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                style={{
                  background: "none", border: "none", fontSize: 40, cursor: "pointer",
                  transition: "transform 0.15s ease",
                  transform: active ? "scale(1.15)" : "scale(1)",
                  filter: active ? "none" : "grayscale(1) opacity(0.3)", padding: 2,
                }}>⭐</button>
            );
          })}
        </div>
        {rating > 0 && (
          <p style={{
            textAlign: "center", fontSize: 14, fontWeight: 600, color: "#eab308", margin: "8px 0 0",
          }}>
            {["", "Poor", "Fair", "Good", "Great", "Amazing"][rating]}
          </p>
        )}
      </div>

      {/* Review text */}
      <div style={{ marginBottom: 20 }}>
        <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#1e293b", marginBottom: 8 }}>
          Write a review
        </label>
        <p style={{ fontSize: 12, color: "#94a3b8", margin: "0 0 8px" }}>
          This will be visible to other students.
        </p>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="What did you enjoy? Would you recommend it?"
          style={{
            width: "100%", minHeight: 100, padding: "14px", borderRadius: 14,
            border: "2px solid #e2e8f0", fontSize: 14, fontFamily: "inherit",
            color: "#1e293b", resize: "vertical", outline: "none", boxSizing: "border-box",
            transition: "border-color 0.2s",
          }}
          onFocus={(e) => e.target.style.borderColor = "#6366f1"}
          onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
        />
      </div>

      {/* Private suggestion */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <label style={{ fontSize: 14, fontWeight: 600, color: "#1e293b" }}>
            Private suggestion
          </label>
          <span style={{
            fontSize: 10, fontWeight: 700, color: "#6366f1", background: "#ede9fe",
            padding: "2px 8px", borderRadius: 10, textTransform: "uppercase", letterSpacing: 0.5,
          }}>Organiser only</span>
        </div>
        <p style={{ fontSize: 12, color: "#94a3b8", margin: "0 0 8px" }}>
          Only the event organiser will see this.
        </p>
        <textarea
          value={suggestion}
          onChange={(e) => setSuggestion(e.target.value)}
          placeholder="Any ideas to improve this event? Accessibility suggestions?"
          style={{
            width: "100%", minHeight: 80, padding: "14px", borderRadius: 14,
            border: "2px solid #ede9fe", background: "#faf5ff", fontSize: 14,
            fontFamily: "inherit", color: "#1e293b", resize: "vertical",
            outline: "none", boxSizing: "border-box", transition: "border-color 0.2s",
          }}
          onFocus={(e) => e.target.style.borderColor = "#8b5cf6"}
          onBlur={(e) => e.target.style.borderColor = "#ede9fe"}
        />
      </div>

      {/* Submit */}
      <button onClick={handleSubmit} disabled={rating === 0} style={{
        marginTop: "auto", padding: "16px", borderRadius: 16, border: "none",
        background: rating > 0 ? "#6366f1" : "#cbd5e1", color: "#fff",
        fontSize: 17, fontWeight: 600, cursor: rating > 0 ? "pointer" : "default",
        transition: "background 0.2s", letterSpacing: 0.3,
      }}>Submit Review</button>
    </div>
  );
}