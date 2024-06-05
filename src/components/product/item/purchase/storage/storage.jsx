import { useState } from "react";
import { getImageUrl, numberToTwoDecimals } from "../../../../../helpers/utils";
import Cardheader from "../../../cardheader/cardheader";
import styles from "./storage.module.css"
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { burn, burnShip } from "../../helper";
import { useAccount } from "wagmi";
import numberWithCommas from '../../../../../helpers/commaSeperator';
import { useWeb3Modal } from "@web3modal/react";

const Storage = ({ data }) => {
    const dispatch = useDispatch()
    const { open } = useWeb3Modal()
    const authState = useSelector((state) => state.auth.loggedIn);
    const { dark } = useSelector(
        (state) => state.mode
      );
    const [filter, setFilter] = useState("M")

    const { isConnected } = useAccount()
    const user = useSelector((state) => state.auth.user);
    const now = new Date().getTime()
    const dt = new Date(data.storage_due).getTime()
    const time = (dt - now) / 86400000


    return (
        <div className={`${styles.storage} ${dark ? styles.dark : ""}`}>
            <Cardheader name="Storage" image={getImageUrl("storage.png")} />
            {data.free == "paid" && <div className={styles.content}>
                <div>
                    <span>Storage Fee</span>
                    <p>${ filter === "M" ? data.monthly : data.yearly}</p>
                </div>
                <div>
                    <span>Expires</span>
                    <p>{data.merchant_id === data.owner_id ? "90" : numberWithCommas(numberToTwoDecimals(time))} days</p>
                </div>
                <div className={styles.filter}>
                    <button onClick={() => setFilter("M")} className={filter === "M" ? styles.active : ""}>M</button>
                    <button onClick={() => setFilter("Y")} className={filter === "Y" ? styles.active : ""}>Y</button>
                </div>
            </div>}

            {data.free != "service" && !data.redeemed && ((user.merchant_id == data.owner_id && user.merchant_id != data.merchant_id) || (user.user_id == data.owner_id && user.user_id != data.merchant_id)) ?
             <> <button className={styles.ship} onClick={!isConnected ? () => open({ route: "ConnectWallet" }) : isConnected ? () => burnShip(dispatch, data.contract, data.item_id, authState) : () => { }}>
                <img loading="lazy" src={getImageUrl("plane.png")} alt="ship" />
                <p >{!isConnected ? "Connect Wallet" : "Burn token and ship"}</p>
            </button> </> : <></>}

            {data.free == "service" && !data.redeemed && ((user.merchant_id == data.owner_id && user.merchant_id != data.merchant_id) || (user.user_id == data.owner_id && user.user_id != data.merchant_id)) ?
             <> <button className={styles.ship} onClick={!isConnected ? () => open({ route: "ConnectWallet" }) : isConnected ? () => burn(dispatch, data.contract, data.item_id, authState) : () => { }}>
                <img loading="lazy" src={getImageUrl("plane.png")} alt="ship" />
                <p >{!isConnected ? "Connect Wallet" : "Burn Service Token"}</p>
            </button> </> : <></>}
        </div>
    );
}

export default Storage;
Storage.propTypes = {
    data: PropTypes.object,
};