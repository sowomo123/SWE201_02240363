// src/reducers/taskReducer.js
export const initialTaskState = {
  tasks: [],
  filter: "all", // "all", "active", "completed"
};

export function taskReducer(state, action) {
  switch (action.type) {
    case "LOAD_FROM_STORAGE":
      return { ...state, tasks: action.tasks };
    case "ADD_TASK":
      return { 
        ...state, 
        tasks: [...state.tasks, { ...action.task, createdAt: Date.now() }] 
      };
    case "TOGGLE_DONE":
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.id ? { ...t, done: !t.done } : t
        ),
      };
    case "CLEAR_COMPLETED":
      return {
        ...state,
        tasks: state.tasks.filter((t) => !t.done),
      };
    case "EDIT_TASK":
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.id ? { ...t, title: action.title } : t
        ),
      };
    case "SET_FILTER":
      return { ...state, filter: action.filter };
    default:
      return state;
  }
}
