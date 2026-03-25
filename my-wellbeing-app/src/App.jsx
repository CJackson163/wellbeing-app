import { useState } from "react";
import HomeScreen from "./screens/HomeScreen.jsx";
import EventsBrowse from "./screens/EventsBrowse.jsx";
import BadgesScreen from "./screens/BadgesScreen.jsx";
import ReviewScreen from "./screens/ReviewScreen.jsx";
import EventsScreen from "./screens/EventsScreen.jsx";
import FeelingPopup from "./components/FeelingPopup.jsx";

const tabs = [
  { id: "home", label: "Home", icon: "🏠" },
  { id: "events", label: "Events", icon: "📅" },
  { id: "badges", label: "Badges", icon: "🏆" },
  { id: "review", label: "Review", icon: "⭐" },
];

export default function App() {
  const [tab, setTab] = useState("home");
  const [showPopup, setShowPopup] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mood, setMood] = useState(null);

  const handleMoodSet = (m) => {
    setMood(m);
    setShowPopup(false);
    setShowSuggestions(true);
  };

  const handleSuggestionsDone = () => {
    setShowSuggestions(false);
    setTab("home");
  };

  const navigate = (dest) => {
    setTab(dest);
  };

  // Show the Yes/No event suggestions flow after the popup
  if (showSuggestions) {
    return (
      <div style={{
        display: "flex", justifyContent: "center", alignItems: "center",
        minHeight: "100vh", padding: "16px", background: "#f1f5f9",
      }}>
        <EventsScreen mood={mood} onBack={handleSuggestionsDone} />
      </div>
    );
  }

  return (
    <div style={{
      display: "flex", justifyContent: "center", alignItems: "center",
      minHeight: "100vh", padding: "16px", background: "#f1f5f9",
    }}>
      <div style={{
        width: 375, height: 720, background: "#ffffff", borderRadius: 40,
        boxShadow: "0 8px 40px rgba(0,0,0,0.12)", overflow: "hidden",
        display: "flex", flexDirection: "column", border: "8px solid #1e1e1e",
        position: "relative",
      }}>
        {/* Notch */}
        <div style={{ display: "flex", justifyContent: "center", padding: "12px 24px 0" }}>
          <div style={{ width: 120, height: 28, background: "#1e1e1e", borderRadius: 20 }} />
        </div>

        {/* Screen content */}
        {tab === "home" && <HomeScreen onNavigate={navigate} />}
        {tab === "events" && <EventsBrowse />}
        {tab === "badges" && <BadgesScreen onBack={() => navigate("home")} />}
        {tab === "review" && <ReviewScreen onBack={() => navigate("home")} />}

        {/* Tab bar */}
        <div style={{
          display: "flex", borderTop: "1px solid #e2e8f0",
          background: "#fff", padding: "6px 8px 2px", flexShrink: 0,
        }}>
          {tabs.map((t) => (
            <button key={t.id} onClick={() => navigate(t.id)} style={{
              flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
              gap: 2, padding: "6px 0", background: "none", border: "none", cursor: "pointer",
            }}>
              <span style={{
                fontSize: 20, filter: tab === t.id ? "none" : "grayscale(1) opacity(0.4)",
                transition: "filter 0.2s",
              }}>{t.icon}</span>
              <span style={{
                fontSize: 10, fontWeight: 600,
                color: tab === t.id ? "#6366f1" : "#94a3b8",
              }}>{t.label}</span>
            </button>
          ))}
        </div>

        {/* Home indicator */}
        <div style={{ display: "flex", justifyContent: "center", paddingBottom: 6, background: "#fff" }}>
          <div style={{ width: 134, height: 5, background: "#1e1e1e", borderRadius: 3 }} />
        </div>

        {/* Feeling popup */}
        {showPopup && (
          <FeelingPopup
            onClose={() => setShowPopup(false)}
            onMoodSet={handleMoodSet}
          />
        )}
      </div>
    </div>
  );
}