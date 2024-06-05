import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pushMessage: "",
  message: "",
  loading: false,
  notify: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setMessage(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    setloading(state, action) {
      state.loading = action.payload;
    },
    setNotify(state, action) {
      state.loading = action.payload;

      state.notify = action.payload;
    },
    setPushMessage(state, action) {
      state.pushMessage = action.payload;
    },
  },
});

export const notificationActions = notificationSlice.actions;

export default notificationSlice;
