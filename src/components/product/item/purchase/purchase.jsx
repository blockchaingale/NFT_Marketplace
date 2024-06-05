import styles from "./purchase.module.css" 
import Buy from './buy/buy';
import Sell from './sell/sell';
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import Unlist from "./unlist/unlist";
import { useNavigate } from "react-router-dom";
import { reportListing } from "../helper";


const Purchase = ({data}) => {
    const user = useSelector((state) => state.auth.user);
    const authState = useSelector((state) => state.auth.loggedIn);
    const dispatch = useDispatch()
    const idd = user.user_id || user.merchant_id 
    const { dark } = useSelector(
        (state) => state.mode
      );
const navigate = useNavigate()
    return (
        <div className={`${styles.purchase} ${dark ? styles.dark : ""}`}>
            <div className={styles.text}>
                <h2>{data.name}</h2>
                <p> Owned by  <span style={{cursor: "pointer"}} onClick={()=>navigate("/merchants/" + data.merchant_id)}>{data.store_name}</span></p>
                {idd && idd != data.merchant_id && <button onClick={()=>reportListing(dispatch, data.item_id, authState)}>Report Listing</button>}

            </div>
            {data.listed && ((user.user_id === data.owner_id) || (user.merchant_id === data.owner_id)) ? <Unlist data={data}/> : data.listed ? <Buy data={data}/> : ((user.user_id === data.owner_id && data.free == "paid") || (user.merchant_id === data.owner_id)) ? <Sell data={data}/> : <></>}
        </div>
    );
}

export default Purchase;
Purchase.propTypes = {
    data: PropTypes.object,
};