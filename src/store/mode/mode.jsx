import { createSlice } from "@reduxjs/toolkit";
import { getFromLocalStorage, setLocalStorage } from "../../helpers/utils";


const initialState = getFromLocalStorage("mode") || {
  dark: true,
};

const modeSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {

    setMode(state, action) {
      state.dark = action.payload
      setLocalStorage("mode", state)
    },
    
  },
});

export const modeActions = modeSlice.actions;

export default modeSlice;
