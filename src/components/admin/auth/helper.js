import apiRequest from "../../../helpers/connections";
import { setLocalStorage } from "../../../helpers/utils";
import { authSliceActions } from "../../../store/auth/auth";
import { notificationActions } from "../../../store/notification/notification";

export const login = async (dispatch, form, navigate) => {
    dispatch(notificationActions.setNotify(true));
    try {
        const data =  await apiRequest(
            "admin/login",
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
        navigate("/myadmin/dashboard");
    } catch (error) {
        if (error?.info?.error?.status === 422) {
            dispatch(notificationActions.setMessage(error?.info?.error?.message));
        } else {
            dispatch(notificationActions.setMessage("Something went wrong"));
        }
    }
};

export const logout = async (dispatch, navigate, auth) => {
    dispatch(notificationActions.setNotify(true));

    try {
        await apiRequest(
            "admin/logout",
            undefined,
            undefined,
            auth
        );
        const authy = {};

        dispatch(authSliceActions.setLoggedIn(authy));
        dispatch(authSliceActions.setUser({}));
        dispatch(notificationActions.setMessage("Logout successful."));
        navigate("/myadmin/login");
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
            "admin/recover",
            { email: form.get("email") },
            "POST",
            undefined
        );
        dispatch(notificationActions.setMessage("A recovery code has been sent to your email"));
        navigate("/myadmin/set-password");
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
            "admin/reset",
            { password: form.get("password"), token: form.get("token") },
            "POST",
            undefined
        );
        dispatch(notificationActions.setMessage("Password reset completed"));
        navigate("/myadmin/login");
    } catch (error) {
        if (error?.info?.error?.status === 422) {
            dispatch(notificationActions.setMessage(error?.info?.error?.message));
        } else {
            dispatch(notificationActions.setMessage("Something went wrong"));
        }
    }
};