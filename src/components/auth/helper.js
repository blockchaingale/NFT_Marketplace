import apiRequest from "../../helpers/connections";
import { setLocalStorage } from "../../helpers/utils";
import { authSliceActions } from "../../store/auth/auth";
import { notificationActions } from "../../store/notification/notification";

export const login = async (dispatch, form, navigate) => {
    dispatch(notificationActions.setNotify(true));
    try {
        const data =  await apiRequest(
            "auth/user/login",
            { email: form.get("email"), password: form.get("password") },
            "POST",
            undefined
        );
        const auth = {};
        auth.state = true;
        auth.token = data.token;
        dispatch(authSliceActions.setLoggedIn(auth));
        dispatch(authSliceActions.setUser(data.user));
        setLocalStorage("expiry", new Date().getTime() + 36000000);
        dispatch(notificationActions.setMessage("Login Successful"));
        navigate("/profile/user");
    } catch (error) {
        if (error?.info?.error?.status === 422) {
            dispatch(notificationActions.setMessage(error?.info?.error?.message));
        } else {
            dispatch(notificationActions.setMessage("Something went wrong"));
        }
    }
};

export const signup = async (dispatch, form, navigate) => {
    dispatch(notificationActions.setNotify(true));
    if (form.get("password") != form.get("password2")) {
        dispatch(notificationActions.setMessage("Passwords do not match"));
        return
    }
    try {
        await apiRequest(
            "auth/user/signup",
            { first_name: form.get("first_name"), last_name: form.get("last_name"), email: form.get("email"), password: form.get("password") },
            "POST",
            undefined
        );
        dispatch(notificationActions.setMessage("Signup successful. A verification code has been sent to your email"));
        navigate("/auth/login");
    } catch (error) {
        if (error?.info?.error?.status === 422) {
            dispatch(notificationActions.setMessage(error?.info?.error?.message));
        } else {
            dispatch(notificationActions.setMessage("Something went wrong"));
        }
    }
};


export const recover = async (dispatch, form, navigate) => {
    dispatch(notificationActions.setNotify(true));

    try {
        await apiRequest(
            "auth/user/recover",
            { email: form.get("email") },
            "POST",
            undefined
        );
        dispatch(notificationActions.setMessage("A recovery code has been sent to your email"));
        navigate("/auth/set-password");
    } catch (error) {
        if (error?.info?.error?.status === 422) {
            dispatch(notificationActions.setMessage(error?.info?.error?.message));
        } else {
            dispatch(notificationActions.setMessage("Something went wrong"));
        }
    }
};

export const setPassword = async (dispatch, form, navigate) => {
    dispatch(notificationActions.setNotify(true));

    try {
        await apiRequest(
            "auth/user/reset",
            { password: form.get("password"), token: form.get("token") },
            "POST",
            undefined
        );
        dispatch(notificationActions.setMessage("Password reset completed"));
        navigate("/auth/login");
    } catch (error) {
        if (error?.info?.error?.status === 422) {
            dispatch(notificationActions.setMessage(error?.info?.error?.message));
        } else {
            dispatch(notificationActions.setMessage("Something went wrong"));
        }
    }
};