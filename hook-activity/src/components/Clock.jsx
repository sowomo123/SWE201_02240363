// src/components/Clock.jsx
import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

function Clock() {
  const { theme } = useTheme();
  const [time, setTime] = useState(new Date());

  const isLight = theme === "light";
  const textColor = "#000000";

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  return (
    <div style={{ 
      fontSize: "1rem", 
      color: textColor,
      fontWeight: "500",
      opacity: 0.9,
      display: "flex",
      alignItems: "center",
      gap: "8px"
    }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
      {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </div>
  );
}

export default Clock;
