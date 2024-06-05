import apiRequest from '../../helpers/connections';

export const getTopMerchants = async () => {
    try {
        const res = await apiRequest(
            "item/top",
            undefined,
            undefined,
            undefined
        );
        return res
    } catch (error) {
       console.log(error);
    }
}

export const getCategory = async (category) => {
    try {
        const res = await apiRequest(
            "item/category/" + category,
            undefined,
            undefined,
            undefined
        );
        return res
    } catch (error) {
       console.log(error);
    }
}



export const getMerchantById = async (id) => {
    try {
        const res = await apiRequest(
            "merchant/id/" + id,
            undefined,
            undefined,
            undefined
        );
        return res
    } catch (error) {
       console.log(error);
    }
}

export const getItemsByMerchant = async (id) => {
    try {
        const res = await apiRequest(
            "item/merch/id/" + id,
            undefined,
            undefined,
            undefined
        );
        return res
    } catch (error) {
       console.log(error);
    }
}