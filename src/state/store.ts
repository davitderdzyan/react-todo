import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todos/todosSlice";
import viewReducer from "./view/viewSlice";
import editingReducer from "./editing/editingSlice";
export const store = configureStore({
  reducer: {
    todos: todosReducer,
    views: viewReducer,
    editing: editingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
