// src/components/TaskInput.jsx
import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";

function TaskInput({ onAddTask }) {
  const { theme } = useTheme();
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("normal");

  const isLight = theme === "light";
  const cardBg = isLight ? "#ffffff" : "#2d2d44";
  const textColor = "#000000";
  const placeholderColor = "#999999";
  const secondaryText = "#666666";
  const borderColor = isLight ? "#e2e8f0" : "#4a5568";
  const primaryColor = "#667eea";
  const dangerColor = "#f56565";

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return primaryColor;
      case "low": return primaryColor;
      default: return primaryColor;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddTask({ id: Date.now(), title: title.trim(), priority });
    setTitle("");
    setPriority("normal");
  };

  return (
    <div style={{ marginBottom: "30px" }}>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "1fr auto auto auto", 
          gap: "12px",
          alignItems: "center"
        }}>
          <input
            type="text"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              padding: "16px 20px",
              borderRadius: "12px",
              border: `2px solid ${borderColor}`,
              background: cardBg,
              color: textColor,
              fontSize: "1rem",
              fontFamily: "inherit",
              transition: "all 0.3s ease",
              outline: "none"
            }}
            onFocus={(e) => {
              e.target.style.borderColor = primaryColor;
              e.target.style.boxShadow = `0 0 0 3px rgba(102, 126, 234, 0.1)`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = borderColor;
              e.target.style.boxShadow = "none";
            }}
          />
          
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            style={{
              padding: "16px 20px",
              borderRadius: "12px",
              border: `2px solid ${borderColor}`,
              background: cardBg,
              color: textColor,
              fontSize: "1rem",
              fontFamily: "inherit",
              cursor: "pointer",
              transition: "all 0.3s ease",
              outline: "none"
            }}
            onFocus={(e) => {
              e.target.style.borderColor = primaryColor;
              e.target.style.boxShadow = `0 0 0 3px rgba(102, 126, 234, 0.1)`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = borderColor;
              e.target.style.boxShadow = "none";
            }}
          >
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </select>

          <button
            type="submit"
            disabled={!title.trim()}
            style={{
              padding: "16px 32px",
              borderRadius: "12px",
              border: "none",
              background: title.trim() ? primaryColor : "#e2e8f0",
              color: title.trim() ? "#ffffff" : "#a0aec0",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: title.trim() ? "pointer" : "not-allowed",
              transition: "all 0.3s ease",
              boxShadow: title.trim() ? "0 4px 12px rgba(102, 126, 234, 0.3)" : "none"
            }}
          >
            Add Task
          </button>

          <button
            type="button"
            onClick={() => setTitle("")}
            disabled={!title.trim()}
            style={{
              padding: "16px 24px",
              borderRadius: "12px",
              border: `2px solid ${borderColor}`,
              background: cardBg,
              color: !title.trim() ? placeholderColor : textColor,
              fontSize: "1rem",
              fontWeight: "600",
              cursor: !title.trim() ? "not-allowed" : "pointer",
              transition: "all 0.3s ease"
            }}
          >
            Clear
          </button>
        </div>
      </form>

      {title.trim() && (
        <div style={{
          background: cardBg,
          padding: "20px",
          borderRadius: "12px",
          border: `2px solid ${borderColor}`,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          transition: "all 0.3s ease"
        }}>
          <div style={{ 
            color: secondaryText, 
            fontSize: "0.875rem", 
            fontWeight: "600", 
            marginBottom: "8px",
            textTransform: "uppercase",
            letterSpacing: "0.5px"
          }}>
            Preview
          </div>
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "12px",
            color: textColor,
            fontSize: "1rem"
          }}>
            <div style={{
              width: "20px",
              height: "20px",
              borderRadius: "4px",
              border: `2px solid ${borderColor}`,
              background: "transparent"
            }} />
            <span style={{ flex: 1 }}>{title}</span>
            <span style={{ 
              padding: "4px 12px", 
              background: getPriorityColor(priority), 
              color: "#ffffff", 
              fontSize: "0.75rem", 
              fontWeight: "600",
              borderRadius: "15px",
              textTransform: "uppercase"
            }}>
              {priority}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskInput;
