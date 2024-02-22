import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  mode: string;
} = {
  mode: "light"
};
export const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    changeMode(state) {
      state.mode === "light" ? (state.mode = "dark") : (state.mode = "light");
    }
  }
});
export const { changeMode } = AppSlice.actions;
export default AppSlice.reducer;
