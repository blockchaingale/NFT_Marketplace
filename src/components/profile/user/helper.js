import apiRequest from "../../../helpers/connections";
import { authSliceActions } from "../../../store/auth/auth";
import { notificationActions } from "../../../store/notification/notification";
import { popActions } from "../../../store/pops/pops";

export const logout = async (dispatch, navigate, auth, disconnect) => {
    dispatch(notificationActions.setNotify(true));

    try {
        disconnect()

        await apiRequest(
            "auth/user/logout",
            undefined,
            undefined,
            auth
        );
        const authy = {};

        dispatch(authSliceActions.setLoggedIn(authy));
        dispatch(authSliceActions.setUser({}));
        dispatch(notificationActions.setMessage("Logout successful."));
        navigate("/auth/login");
    } catch (error) {
        if (error?.info?.error?.status === 422) {
            dispatch(notificationActions.setMessage(error?.info?.error?.message));
        } else {
            dispatch(notificationActions.setMessage("Something went wrong"));
        }
    }
};

export const getUserItems = async(auth) => {
    try {
        const res = await apiRequest(
            "user",
            undefined,
            undefined,
            auth
        );
        return res
    } catch (error) {
        console.log(error);
    }
};

export const getUserActivities = async(auth) => {
    try {
        const res = await apiRequest(
            "user/activities",
            undefined,
            undefined,
            auth
        );
        return res
    } catch (error) {
        console.log(error);
    }
};

export const rateItem = async(dispatch, body, auth) => {
    try {
        dispatch(notificationActions.setNotify(true))
        await apiRequest(
            "user/rate",
            body,
            "POST",
            auth
        );
        
        dispatch(notificationActions.setMessage("Rating completed"))
        dispatch(popActions.setRate(false))


    } catch (error) {
        if (error?.info?.error?.status === 422) {
            dispatch(notificationActions.setMessage(error?.info?.error?.message));
        } else {
            dispatch(notificationActions.setMessage("Something went wrong"));
        }
    }
};