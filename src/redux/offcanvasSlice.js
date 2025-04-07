import { createSlice } from "@reduxjs/toolkit";

const offcanvasSlice = createSlice({
  name: "offcanvas",
  initialState: false,

  reducers: {
    toggleOffcanvas(state, action) {
      return !state;
    },
  },
});

const { reducer, actions } = offcanvasSlice;
export const { toggleOffcanvas } = actions;
export default reducer;
