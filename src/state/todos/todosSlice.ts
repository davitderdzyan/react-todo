import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export enum Status {
  Pending,
  Completed,
  Overdue,
  Removed,
}

export interface Todo {
  id?: number;
  title: string;
  description?: string;
  deadline?: string;
  status: Status;
}

export interface TodosState {
  todos: Todo[];
}

const initialState: TodosState = {
  todos: [],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      let newTodo = action.payload;
      newTodo.id = state.todos.length;
      state.todos = [...state.todos, newTodo];
    },
    editTodo: (state, action: PayloadAction<Todo>) => {
      let newTodos = [...state.todos];
      const index = newTodos.findIndex((todo) => todo.id === action.payload.id);
      newTodos[index] = action.payload;
      state.todos = newTodos;
    },
    deleteTodo: (state, action: PayloadAction<Todo>) => {
      let newTodos = [...state.todos];
      const index = newTodos.findIndex((todo) => todo.id === action.payload.id);
      newTodos[index].status = Status.Removed;
      state.todos = newTodos;
    },
    completeTodo: (state, action: PayloadAction<Todo>) => {
      let newTodos = [...state.todos];
      const index = newTodos.findIndex((todo) => todo.id === action.payload.id);
      newTodos[index].status = Status.Completed;
      state.todos = newTodos;
    },
    markUncomplete: (state, action: PayloadAction<Todo>) => {
      let newTodos = [...state.todos];
      const index = newTodos.findIndex((todo) => todo.id === action.payload.id);
      newTodos[index].status = Status.Pending;
      state.todos = newTodos;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateOverdueStatus.fulfilled, (state, action) => {
      state.todos = action.payload;
    });
  },
});

export const updateOverdueStatus = createAsyncThunk(
  "todos/updateOverdueStatus",
  async (_, { getState }) => {
    const todos = (getState() as RootState).todos.todos;
    const currentDate = new Date();

    const updatedTodos = todos.map((todo) => {
      if (
        todo.status == Status.Pending &&
        todo.deadline != null &&
        new Date(todo.deadline).getTime() < currentDate.getTime()
      ) {
        return { ...todo, status: Status.Overdue };
      }
      return todo;
    });

    return updatedTodos;
  }
);

export const { addTodo, editTodo, deleteTodo, completeTodo, markUncomplete } =
  todosSlice.actions;
export default todosSlice.reducer;
