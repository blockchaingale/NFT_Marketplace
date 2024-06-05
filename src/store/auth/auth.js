import { createSlice } from "@reduxjs/toolkit";
import { getFromLocalStorage, setLocalStorage } from "../../helpers/utils";

const initialState = getFromLocalStorage("authState") || {

    loggedIn: {
        state: false,
        token: "",
    },
    user: {},
};

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        setLoggedIn(state, action) {
            state.loggedIn = action.payload;
            setLocalStorage("authState", state);
        },
        setUser(state, action) {
            state.user = action.payload;
            setLocalStorage("authState", state);
        },
    },
});

export const authSliceActions = authSlice.actions;

export default authSlice;