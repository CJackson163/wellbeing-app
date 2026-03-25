import { useState } from "react";

const allEvents = [
  { name: "5-a-side Football", day: "Wednesday", time: "5pm", icon: "⚽", categories: ["Exercise", "Social"] },
  { name: "Girls who Lift", day: "Friday", time: "1:15pm", icon: "🏋️", categories: ["Exercise", "Social"] },
  { name: "Chess Society", day: "Tuesday", time: "6pm", icon: "♟️", categories: ["Society", "Social"] },
  { name: "History Society - History Walk", day: "Saturday", time: "10am", icon: "🏛️", categories: ["Society", "Social"] },
  { name: "PGR Society - The Lunch Break", day: "Thursday", time: "1pm", icon: "🎓", categories: ["Society", "Social"] },
  { name: "Therapy Dogs Visit", day: "Thursday", time: "11am", icon: "🐕", categories: ["Social", "Wellbeing"] },
  { name: "Peer Mentoring Group", day: "Monday", time: "4pm", icon: "🤝", categories: ["Social", "Wellbeing"] },
  { name: "Karaoke Night", day: "Friday", time: "7pm", icon: "🎤", categories: ["Social"] },
  { name: "The Glass House Tour", day: "Saturday", time: "10am", icon: "🌿", categories: ["Cultural", "Social"] },
  { name: "Harry Potter in Concert", day: "Saturday", time: "7pm", icon: "🎵", categories: ["Cultural", "Social"] },
  { name: "Moulin Rouge Theatre Show", day: "Sunday", time: "2pm", icon: "🎭", categories: ["Cultural", "Social"] },
];

const moodEvents = {
  positive: allEvents,
  medium: allEvents.filter(e => e.categories.includes("Wellbeing") || e.categories.includes("Social")),
  negative: [],
};

const weatherTip = "The weather looks great — try a walk around Leazes Park.";

export default function EventsScreen({ mood = "medium", onBack }) {
  const [browsing, setBrowsing] = useState(false);
  const events = browsing ? allEvents : (moodEvents[mood] || moodEvents.medium);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [added, setAdded] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [finished, setFinished] = useState(false);

  const current = events[currentIndex];

  const handleYes = () => {
    setAdded((prev) => [...prev, current.name]);
    setShowConfirm(true);
    setTimeout(() => {
      setShowConfirm(false);
      if (currentIndex + 1 < events.length) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setFinished(true);
      }
    }, 1200);
  };

  const handleNo = () => {
    if (currentIndex + 1 < events.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setFinished(true);
    }
  };

  // Negative mood — support screen
  if (mood === "negative" && !browsing) {
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
        }}>
          <div style={{ display: "flex", justifyContent: "center", padding: "12px 24px 0" }}>
            <div style={{ width: 120, height: 28, background: "#1e1e1e", borderRadius: 20 }} />
          </div>
          <button onClick={onBack} style={{
            background: "none", border: "none", fontSize: 16, color: "#6366f1",
            cursor: "pointer", padding: "8px 20px", textAlign: "left", fontWeight: 600,
          }}>← Back</button>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px 20px 28px" }}>
            <div style={{ textAlign: "center", marginBottom: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#6366f1", letterSpacing: 1.5, textTransform: "uppercase" }}>For You</span>
            </div>
            <h1 style={{ fontSize: 24, fontWeight: 700, textAlign: "center", color: "#1e293b", margin: "0 0 4px", lineHeight: 1.3 }}>
              We hear you
            </h1>
            <p style={{ fontSize: 14, color: "#94a3b8", textAlign: "center", margin: "0 0 28px", lineHeight: 1.5 }}>
              There's support available — you're not on your own.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {/* Mental Health team */}
              <div style={{
                padding: "18px", borderRadius: 16, background: "#f5f3ff", border: "2px solid #ddd6fe",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <span style={{ fontSize: 22 }}>💜</span>
                  <span style={{ fontSize: 15, fontWeight: 700, color: "#6d28d9" }}>Mental Health &amp; Wellbeing Team</span>
                </div>
                <p style={{ fontSize: 14, color: "#4c1d95", margin: "0 0 12px", lineHeight: 1.5 }}>
                  Register for ongoing support from the university team.
                </p>
                <a href="https://myportal.northumbria.ac.uk/Help-and-support/forms/cmhst%20v2%20registration%20form"
                  target="_blank" rel="noopener noreferrer" style={{
                    display: "block", textAlign: "center", padding: "12px", borderRadius: 12,
                    background: "#7c3aed", color: "#fff", fontSize: 15, fontWeight: 600, textDecoration: "none",
                  }}>Register Now</a>
              </div>

              {/* Need help now */}
              <div style={{
                padding: "18px", borderRadius: 16, background: "#f1f5f9", border: "2px solid #cbd5e1",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <span style={{ fontSize: 22 }}>📞</span>
                  <span style={{ fontSize: 15, fontWeight: 700, color: "#475569" }}>Do you need help right now?</span>
                </div>
                <p style={{ fontSize: 14, color: "#64748b", margin: "0 0 12px", lineHeight: 1.5 }}>
                  Contact Security — available 24/7.
                </p>
                <a href="tel:01912273200" style={{
                  display: "block", textAlign: "center", padding: "12px", borderRadius: 12,
                  background: "#475569", color: "#fff", fontSize: 16, fontWeight: 600, textDecoration: "none",
                }}>Call 0191 227 3200</a>
              </div>
            </div>

            <div style={{ flex: 1 }} />
            <button onClick={() => setBrowsing(true)} style={{
              marginTop: 20, padding: "16px", borderRadius: 16, border: "none",
              background: "#6366f1", color: "#fff", fontSize: 17, fontWeight: 600, cursor: "pointer", letterSpacing: 0.3,
            }}>Go Ahead to Events</button>
            <button onClick={onBack} style={{
              marginTop: 10, padding: "16px", borderRadius: 16, border: "2px solid #e2e8f0",
              background: "#fff", color: "#64748b", fontSize: 15, fontWeight: 600, cursor: "pointer", letterSpacing: 0.3,
            }}>Back to Home</button>
          </div>
          <div style={{ display: "flex", justifyContent: "center", paddingBottom: 8 }}>
            <div style={{ width: 134, height: 5, background: "#1e1e1e", borderRadius: 3 }} />
          </div>
        </div>
      </div>
    );
  }

  // Finished browsing events
  if (finished) {
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
        }}>
          <div style={{ display: "flex", justifyContent: "center", padding: "12px 24px 0" }}>
            <div style={{ width: 120, height: 28, background: "#1e1e1e", borderRadius: 20 }} />
          </div>
          <div style={{
            flex: 1, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", padding: "40px 24px", textAlign: "center",
          }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: "#1e293b", margin: "0 0 8px" }}>
              You're all set!
            </h2>
            {added.length > 0 ? (
              <>
                <p style={{ fontSize: 15, color: "#94a3b8", margin: "0 0 20px", lineHeight: 1.5 }}>
                  You added {added.length} {added.length === 1 ? "event" : "events"} to your calendar:
                </p>
                <div style={{
                  display: "flex", flexDirection: "column", gap: 8,
                  width: "100%", marginBottom: 24,
                }}>
                  {added.map((name, i) => (
                    <div key={i} style={{
                      padding: "10px 16px", borderRadius: 12,
                      background: "#f0fdf4", border: "2px solid #bbf7d0",
                      fontSize: 14, fontWeight: 600, color: "#166534",
                      display: "flex", alignItems: "center", gap: 8,
                    }}>
                      <span>✅</span> {name}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p style={{ fontSize: 15, color: "#94a3b8", margin: "0 0 24px", lineHeight: 1.5 }}>
                No events added this time — you can always browse again later.
              </p>
            )}

            {/* Weather tip */}
            {(mood === "positive" || mood === "medium") && (
              <div style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "14px 16px", borderRadius: 16,
                background: "#f0f9ff", border: "2px solid #bae6fd",
                marginBottom: 24, width: "100%",
              }}>
                <span style={{ fontSize: 28 }}>☀️</span>
                <p style={{ fontSize: 14, color: "#0369a1", margin: 0, lineHeight: 1.5, textAlign: "left" }}>
                  {weatherTip}
                </p>
              </div>
            )}

            <button onClick={onBack} style={{
              padding: "16px 48px", borderRadius: 16, border: "none",
              background: "#6366f1", color: "#fff", fontSize: 17, fontWeight: 600, cursor: "pointer",
            }}>Back to Home</button>
          </div>
          <div style={{ display: "flex", justifyContent: "center", paddingBottom: 8 }}>
            <div style={{ width: 134, height: 5, background: "#1e1e1e", borderRadius: 3 }} />
          </div>
        </div>
      </div>
    );
  }

  // Event card with Yes/No
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
      }}>
        {/* Notch */}
        <div style={{ display: "flex", justifyContent: "center", padding: "12px 24px 0" }}>
          <div style={{ width: 120, height: 28, background: "#1e1e1e", borderRadius: 20 }} />
        </div>

        {/* Back button */}
        <button onClick={onBack} style={{
          background: "none", border: "none", fontSize: 16, color: "#6366f1",
          cursor: "pointer", padding: "8px 20px", textAlign: "left", fontWeight: 600,
        }}>← Back</button>

        {/* Content */}
        <div style={{
          flex: 1, display: "flex", flexDirection: "column", padding: "16px 20px 28px",
        }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#6366f1", letterSpacing: 1.5, textTransform: "uppercase" }}>
              For You
            </span>
          </div>
          <h1 style={{
            fontSize: 22, fontWeight: 700, textAlign: "center", color: "#1e293b",
            margin: "0 0 4px", lineHeight: 1.3,
          }}>
            {mood === "positive" ? "Keep the good vibes going!" : "A little boost might help"}
          </h1>
          <p style={{
            fontSize: 14, color: "#94a3b8", textAlign: "center", margin: "0 0 8px", lineHeight: 1.5,
          }}>
            Interested in this event?
          </p>

          {/* Progress */}
          <div style={{
            display: "flex", alignItems: "center", gap: 8, justifyContent: "center", marginBottom: 20,
          }}>
            <span style={{ fontSize: 12, color: "#94a3b8" }}>
              {currentIndex + 1} of {events.length}
            </span>
            <div style={{
              flex: 1, maxWidth: 160, height: 4, borderRadius: 2, background: "#e2e8f0",
            }}>
              <div style={{
                height: "100%", borderRadius: 2, background: "#6366f1",
                width: `${((currentIndex + 1) / events.length) * 100}%`,
                transition: "width 0.3s ease",
              }} />
            </div>
          </div>

          {/* Event card */}
          <div style={{
            flex: 1, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            position: "relative",
          }}>
            {showConfirm ? (
              <div style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                animation: "fadeIn 0.3s ease",
              }}>
                <div style={{ fontSize: 64, marginBottom: 12 }}>✅</div>
                <p style={{ fontSize: 18, fontWeight: 700, color: "#22c55e" }}>Added to your calendar!</p>
              </div>
            ) : (
              <div style={{
                width: "100%", padding: "28px 20px", borderRadius: 24,
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color: "#fff", textAlign: "center",
                boxShadow: "0 8px 30px rgba(99,102,241,0.3)",
              }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>{current.icon}</div>
                <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 6, lineHeight: 1.3 }}>
                  {current.name}
                </div>
                <div style={{ fontSize: 16, opacity: 0.9, marginBottom: 16 }}>
                  {current.day} at {current.time}
                </div>
                <div style={{
                  display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center",
                }}>
                  {current.categories.map((cat) => (
                    <span key={cat} style={{
                      fontSize: 11, fontWeight: 600,
                      background: "rgba(255,255,255,0.2)",
                      padding: "4px 12px", borderRadius: 20,
                    }}>
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Yes / No buttons */}
          {!showConfirm && (
            <div style={{
              display: "flex", gap: 12, marginTop: 24,
            }}>
              <button
                onClick={handleNo}
                style={{
                  flex: 1, padding: "16px", borderRadius: 16,
                  border: "2px solid #e2e8f0", background: "#fff",
                  color: "#64748b", fontSize: 17, fontWeight: 600, cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                No
              </button>
              <button
                onClick={handleYes}
                style={{
                  flex: 1, padding: "16px", borderRadius: 16,
                  border: "none", background: "#22c55e",
                  color: "#fff", fontSize: 17, fontWeight: 600, cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                Yes
              </button>
            </div>
          )}
        </div>

        {/* Home indicator */}
        <div style={{ display: "flex", justifyContent: "center", paddingBottom: 8 }}>
          <div style={{ width: 134, height: 5, background: "#1e1e1e", borderRadius: 3 }} />
        </div>
      </div>
    </div>
  );
}