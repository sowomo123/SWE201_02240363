// src/App.jsx
import React from "react";
import TaskInput from "./components/TaskInput";
import ThemeToggleButton from "./components/ThemeToggleButton";
import Clock from "./components/Clock";
import { useTheme } from "./context/ThemeContext";
import { useTasks } from "./hooks/useTasks";

function App() {
  const { theme } = useTheme();
  const { tasks, allTasks, filter, dispatch, isRecentTask } = useTasks();

  const isLight = theme === "light";
  const background = isLight ? "#f5f5f5" : "#2d2d2d";
  const cardBg = isLight ? "#ffffff" : "#2d2d44";
  const textColor = "#000000";
  const secondaryText = "#666666";
  const borderColor = isLight ? "#e2e8f0" : "#4a5568";
  const primaryColor = "#667eea";
  const successColor = "#48bb78";
  const dangerColor = "#f56565";
  const warningColor = "#ed8936";

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return dangerColor;
      case "low": return successColor;
      default: return primaryColor;
    }
  };

  const getActiveCount = () => allTasks.filter(t => !t.done).length;
  const getCompletedCount = () => allTasks.filter(t => t.done).length;

  return (
    <div style={{ 
      minHeight: "100vh", 
      background,
      padding: "20px",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      transition: "all 0.3s ease"
    }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <header style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1 style={{ 
            color: isLight ? "#7e7a7aff" : "#ffffff", 
            margin: "0 0 20px 0", 
            fontSize: "2.5rem", 
            fontWeight: "700",
            textShadow: "0 2px 4px rgba(0,0,0,0.1)"
          }}>
            Reactive Task Board
          </h1>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <Clock />
            <ThemeToggleButton />
          </div>
        </header>
        
        <main>
          <TaskInput
            onAddTask={(task) =>
              dispatch({ type: "ADD_TASK", task: { ...task, done: false } })
            }
          />

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "15px",
            margin: "30px 0"
          }}>
            <div style={{
              background: cardBg,
              padding: "20px",
              borderRadius: "12px",
              textAlign: "center",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              border: `1px solid ${borderColor}`,
              transition: "transform 0.2s ease"
            }}>
              <div style={{ fontSize: "2rem", fontWeight: "700", color: primaryColor, marginBottom: "5px" }}>
                {allTasks.length}
              </div>
              <div style={{ color: secondaryText, fontSize: "0.9rem" }}>Total Tasks</div>
            </div>
            <div style={{
              background: cardBg,
              padding: "20px",
              borderRadius: "12px",
              textAlign: "center",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              border: `1px solid ${borderColor}`,
              transition: "transform 0.2s ease"
            }}>
              <div style={{ fontSize: "2rem", fontWeight: "700", color: primaryColor, marginBottom: "5px" }}>
                {getActiveCount()}
              </div>
              <div style={{ color: secondaryText, fontSize: "0.9rem" }}>Active</div>
            </div>
            <div style={{
              background: cardBg,
              padding: "20px",
              borderRadius: "12px",
              textAlign: "center",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              border: `1px solid ${borderColor}`,
              transition: "transform 0.2s ease"
            }}>
              <div style={{ fontSize: "2rem", fontWeight: "700", color: primaryColor, marginBottom: "5px" }}>
                {getCompletedCount()}
              </div>
              <div style={{ color: secondaryText, fontSize: "0.9rem" }}>Completed</div>
            </div>
          </div>

          <nav style={{ margin: "30px 0" }}>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
              {["all", "active", "completed"].map((filterOption) => {
                const count = filterOption === "all" ? allTasks.length : 
                             filterOption === "active" ? getActiveCount() : getCompletedCount();
                return (
                  <button
                    key={filterOption}
                    onClick={() => dispatch({ type: "SET_FILTER", filter: filterOption })}
                    style={{
                      padding: "12px 24px",
                      borderRadius: "25px",
                      border: "none",
                      background: filter === filterOption 
                        ? primaryColor 
                        : cardBg,
                      color: filter === filterOption 
                        ? "#ffffff" 
                        : textColor,
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      boxShadow: filter === filterOption 
                        ? "0 4px 12px rgba(102, 126, 234, 0.4)" 
                        : "0 2px 4px rgba(0,0,0,0.1)"
                    }}
                  >
                    {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)} ({count})
                  </button>
                );
              })}
            </div>
          </nav>

          <section style={{ margin: "30px 0" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
              <button 
                onClick={() => dispatch({ type: "CLEAR_COMPLETED" })} 
                style={{
                  padding: "12px 24px",
                  borderRadius: "8px",
                  border: "none",
                  background: dangerColor,
                  color: "#ffffff",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 2px 4px rgba(245, 101, 101, 0.3)"
                }}
              >
                Clear Completed
              </button>
            </div>
          </section>

          <section>
            <div style={{ display: "grid", gap: "15px" }}>
              {tasks.map((t) => (
                <div 
                  key={t.id} 
                  style={{
                    background: cardBg,
                    padding: "20px",
                    borderRadius: "12px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    border: `1px solid ${borderColor}`,
                    transition: "all 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "15px"
                  }}
                >
                  <label style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    cursor: "pointer",
                    flex: 1,
                    margin: 0
                  }}>
                    <input
                      type="checkbox"
                      checked={t.done}
                      onChange={() => dispatch({ type: "TOGGLE_DONE", id: t.id })}
                      style={{
                        width: "20px",
                        height: "20px",
                        cursor: "pointer",
                        accentColor: primaryColor
                      }}
                    />
                    <span style={{ 
                      marginLeft: "15px", 
                      textDecoration: t.done ? "line-through" : "none",
                      color: t.done ? secondaryText : textColor,
                      fontSize: "1rem",
                      flex: 1
                    }}>
                      {t.title}
                    </span>
                  </label>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ 
                      padding: "4px 12px", 
                      background: getPriorityColor(t.priority), 
                      color: "#ffffff", 
                      fontSize: "0.75rem", 
                      fontWeight: "600",
                      borderRadius: "15px",
                      textTransform: "uppercase"
                    }}>
                      {t.priority}
                    </span>
                    {t.createdAt && isRecentTask(t.createdAt) && (
                      <span style={{ 
                        padding: "4px 12px", 
                        background: successColor, 
                        color: "#ffffff", 
                        fontSize: "0.75rem", 
                        fontWeight: "600",
                        borderRadius: "15px",
                        animation: "pulse 2s infinite"
                      }}>
                        NEW
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
