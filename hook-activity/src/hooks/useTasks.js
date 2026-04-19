// src/hooks/useTasks.js
import { useReducer, useEffect } from "react";
import { taskReducer, initialTaskState } from "../reducers/taskReducer";

export function useTasks() {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);

  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) {
      dispatch({ type: "LOAD_FROM_STORAGE", tasks: JSON.parse(stored) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  }, [state.tasks]);

  const getFilteredTasks = () => {
    switch (state.filter) {
      case "active":
        return state.tasks.filter((t) => !t.done);
      case "completed":
        return state.tasks.filter((t) => t.done);
      default:
        return state.tasks;
    }
  };

  const isRecentTask = (createdAt) => {
    const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
    return createdAt > fiveMinutesAgo;
  };

  return { 
    tasks: getFilteredTasks(), 
    allTasks: state.tasks,
    filter: state.filter,
    dispatch,
    isRecentTask
  };
}
