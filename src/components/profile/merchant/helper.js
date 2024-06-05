import apiRequest from "../../../helpers/connections";
import { authSliceActions } from "../../../store/auth/auth";
import { notificationActions } from "../../../store/notification/notification";

export const logout = async (dispatch, navigate, auth, disconnect) => {
    dispatch(notificationActions.setNotify(true));


    try {
        disconnect()
        await apiRequest(
            "auth/merchant/logout",
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

export const deleteNFT = async (dispatch, id, auth) => {
    dispatch(notificationActions.setNotify(true));


    try {
        await apiRequest(
            "merchant/id/" + id,
            undefined,
            "DELETE",
            auth
        );

        dispatch(notificationActions.setMessage("Deleted successfully."));
    } catch (error) {
        if (error?.info?.error?.status === 422) {
            dispatch(notificationActions.setMessage(error?.info?.error?.message));
        } else {
            dispatch(notificationActions.setMessage("Something went wrong"));
        }
    }
};

export const getItems = async (auth) => {
    try {
        const res = await apiRequest(
            "merchant",
            undefined,
            undefined,
            auth
        );
        return res
    } catch (error) {
        console.log(error);
    }
};

export const getRate = async () => {
    try {
        const res = await apiRequest(
            "item/rate",
            undefined,
            undefined,
            undefined
        );
        return res
    } catch (error) {
        console.log(error);
    }
}

export const getExplore = async () => {
    try {
        const res = await apiRequest(
            "item/explore",
            undefined,
            undefined,
            undefined
        );
        return res
    } catch (error) {
        console.log(error);
    }
}

export const getOrders = async (auth) => {
    try {
        const res = await apiRequest(
            "merchant/orders",
            undefined,
            undefined,
            auth
        );
        return res
    } catch (error) {
        console.log(error);
    }
};

export const updateStorage = async (dispatch, body, auth) => {
    dispatch(notificationActions.setNotify(true));

    try {
        await apiRequest(
            "merchant/storage",
            body,
            "POST",
            auth
        );
        dispatch(notificationActions.setMessage("Update completed"));

    } catch (error) {
        if (error?.info?.error?.status === 422) {
            dispatch(notificationActions.setMessage(error?.info?.error?.message));
        } else {
            dispatch(notificationActions.setMessage("Something went wrong"));
        }
    }
};

export const getUserActivities = async (auth) => {
    try {
        const res = await apiRequest(
            "merchant/activity",
            undefined,
            undefined,
            auth
        );
        return res
    } catch (error) {
        console.log(error);
    }
};

export const updateStatus = async (dispatch, body, auth) => {
    dispatch(notificationActions.setNotify(true));

    try {
        await apiRequest(
            "merchant/status",
            body,
            "POST",
            auth
        );
        dispatch(notificationActions.setMessage("Update completed"));

    } catch (error) {
        if (error?.info?.error?.status === 422) {
            dispatch(notificationActions.setMessage(error?.info?.error?.message));
        } else {
            dispatch(notificationActions.setMessage("Something went wrong"));
        }
    }
};