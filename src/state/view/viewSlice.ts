import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type viewType = "todos" | "add" | "edit" | "deleted-todos";

export interface ViewState {
  currentView: viewType;
}

const initialState: ViewState = {
  currentView: "todos",
};
const viewSlice = createSlice({
  name: "views",
  initialState,
  reducers: {
    setView: (state, action: PayloadAction<viewType>) => {
      state.currentView = action.payload;
    },
  },
});

export const { setView } = viewSlice.actions;
export default viewSlice.reducer;
