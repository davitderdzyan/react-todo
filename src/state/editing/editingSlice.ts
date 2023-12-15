import { createSlice } from "@reduxjs/toolkit";

export interface EditingState {
  editing: boolean;
  editItemId: boolean;
}

const editingSlice = createSlice({
  name: "editing",
  initialState: {
    editing: false,
    editItemId: null,
  },
  reducers: {
    startEditing: (state, action) => {
      state.editing = true;
      state.editItemId = action.payload;
    },
    stopEditing: (state) => {
      state.editing = false;
      state.editItemId = null;
    },
  },
});

export const { startEditing, stopEditing } = editingSlice.actions;
export default editingSlice.reducer;
