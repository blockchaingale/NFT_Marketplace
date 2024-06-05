import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rate: {},
  search: []
};

const othersSlice = createSlice({
  name: "others",
  initialState,
  reducers: {

    setRate(state, action) {
      state.rate = action.payload
    },
    setSeach(state, action) {
      state.search = action.payload
    },
  },
});

export const othersActions = othersSlice.actions;

export default othersSlice;
