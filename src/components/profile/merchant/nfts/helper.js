import { notificationActions } from '../../../../store/notification/notification';
import apiRequest from '../../../../helpers/connections';


export const createItem = async (dispatch, form, navigate, address, traits, free, auth) => {
    form.append("traits", JSON.stringify(traits))
    form.append("address", address)
    form.append("free", free)
    try {
        await apiRequest(
            "merchant/create",
            form,
            "POST",
            auth
        );
        dispatch(notificationActions.setMessage("Item creation successful."));
        navigate("/profile/merchant");
    } catch (error) {
        if (error?.info?.error?.status === 422) {
            dispatch(notificationActions.setMessage(error?.info?.error?.message));
        } else {
            dispatch(notificationActions.setMessage("Something went wrong"));
        }
    }
}