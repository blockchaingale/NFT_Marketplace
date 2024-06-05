import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getRate } from "../components/profile/merchant/helper";
import { useDispatch } from "react-redux";
import { othersActions } from "../store/others/others";
import { getSearch } from "../components/product/item/helper";

export const ScrollToTop = () => {
  const { pathname } = useLocation();
  const dispatch =  useDispatch()
  useEffect(() => {
    window.scrollTo(0, 0);
    let abortController;
    (async function(){ 
      abortController = new AbortController()
      const res =  await getRate()
      const search =  await getSearch()
      if (search) {
        dispatch(othersActions.setSeach(search.items))
      }
      if (res) {
        dispatch(othersActions.setRate({matic: res.rate.usd}))
      }
    })()

    return ()=> abortController.abort()
  }, [pathname, dispatch]);
  return null;
};
