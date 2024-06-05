import { configureStore } from "@reduxjs/toolkit";
import notificationSlice from "./notification/notification";
import checkoutSlice from "./checkout/checkout";
import popSlice from "./pops/pops";
import authSlice from "./auth/auth";
import othersSlice from "./others/others";
import modeSlice from "./mode/mode";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    notification: notificationSlice.reducer,
    checkout: checkoutSlice.reducer,
    pop: popSlice.reducer,
    others: othersSlice.reducer,
    mode: modeSlice.reducer,
  },
});

export default store;
