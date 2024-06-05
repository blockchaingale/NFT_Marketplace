import apiRequest from "../../helpers/connections";
import { notificationActions } from "../../store/notification/notification";

export const getUsers = async (auth) => {
    try {
        const res = await apiRequest(
            "admin/users",
            undefined,
            undefined,
            auth
        );
        return res
    } catch (error) {
        console.log(error);
    }
};


export const userAction = async (dispatch, body, auth) => {
    dispatch(notificationActions.setNotify(true));
    try {
        await apiRequest(
            "admin/users",
            body,
            "POST",
            auth
        );
        dispatch(notificationActions.setMessage(`User ${body.action ? "Activated" : "Deactivated"}`));
    } catch (error) {
        if (error?.info?.error?.status === 422) {
            dispatch(notificationActions.setMessage(error?.info?.error?.message));
        } else {
            dispatch(notificationActions.setMessage("Something went wrong"));
        }
    }
};

export const getMerchants = async (auth) => {
    try {
        const res = await apiRequest(
            "admin/merchants",
            undefined,
            undefined,
            auth
        );
        return res
    } catch (error) {
        console.log(error);
    }
};


export const merchantAction = async (dispatch, body, auth) => {
    dispatch(notificationActions.setNotify(true));
    try {
        await apiRequest(
            "admin/merchants",
            body,
            "POST",
            auth
        );
        dispatch(notificationActions.setMessage(`Merchant ${body.action ? "Activated" : "Deactivated"}`));
    } catch (error) {
        if (error?.info?.error?.status === 422) {
            dispatch(notificationActions.setMessage(error?.info?.error?.message));
        } else {
            dispatch(notificationActions.setMessage("Something went wrong"));
        }
    }
};

export const getOrders = async (auth) => {
    try {
        const res = await apiRequest(
            "admin/sale",
            undefined,
            undefined,
            auth
        );
        return res
    } catch (error) {
        console.log(error);
    }
};

export const getTransactions = async (auth) => {
    try {
        const res = await apiRequest(
            "admin/transactions",
            undefined,
            undefined,
            auth
        );
        return res
    } catch (error) {
        console.log(error);
    }
};

export const kycAction = async (dispatch, body, auth) => {
    dispatch(notificationActions.setNotify(true));
    try {
        await apiRequest(
            "admin/kyc",
            body,
            "POST",
            auth
        );
        dispatch(notificationActions.setMessage(`KYC ${body.action ? "Passed" : "Failed"}`));
    } catch (error) {
        if (error?.info?.error?.status === 422) {
            dispatch(notificationActions.setMessage(error?.info?.error?.message));
        } else {
            dispatch(notificationActions.setMessage("Something went wrong"));
        }
    }
};
export const kybAction = async (dispatch, body, auth) => {
    dispatch(notificationActions.setNotify(true));
    try {
        await apiRequest(
            "admin/kyb",
            body,
            "POST",
            auth
        );
        dispatch(notificationActions.setMessage(`KYB ${body.action ? "Passed" : "Failed"}`));
    } catch (error) {
        if (error?.info?.error?.status === 422) {
            dispatch(notificationActions.setMessage(error?.info?.error?.message));
        } else {
            dispatch(notificationActions.setMessage("Something went wrong"));
        }
    }
};

//updateAdmin
export const updateAdmin = async (dispatch, auth, form) => {
    dispatch(notificationActions.setNotify(true));

    try {
        await apiRequest(
            "admin/fee",
            form,
            "POST",
            auth
        );
        dispatch(notificationActions.setMessage(`Updated`));
    } catch (error) {
        if (error?.info?.error?.status === 422) {
            dispatch(notificationActions.setMessage(error?.info?.error?.message));
        } else {
            dispatch(notificationActions.setMessage("Something went wrong"));
        }
    }
};

//getFees
export const getFees = async (auth) => {
    try {
        const res = await apiRequest(
            "admin/fee",
            undefined,
            undefined,
            auth
        );
        return res
    } catch (error) {
        console.log(error);
    }
};

//getFees
export const getDashboard = async (auth) => {
    try {
        const res = await apiRequest(
            "admin/dashboard",
            undefined,
            undefined,
            auth
        );
        return res
    } catch (error) {
        console.log(error);
    }
};