import { useDispatch, useSelector } from "react-redux";
import styles from "./unlist.module.css"
import { unListNFT } from "../../helper";
import { useAccount } from "wagmi";
import PropTypes from "prop-types";
import { notificationActions } from "../../../../../store/notification/notification";
import { useWeb3Modal } from '@web3modal/react';
import { useNavigate } from "react-router-dom";
import OwnerPop from "../../../../popup/owner/owner";

const Unlist = ({ data }) => {
    const dispatch = useDispatch()
    const { open } = useWeb3Modal()
    const navigate = useNavigate()
    const { dark } = useSelector(
        (state) => state.mode
    );
    let bids = false
    if (data.bids?.length > 0) {
        bids = JSON.parse(data.bids)
    }
    const { rate: { matic } } = useSelector(
        (state) => state.others
    );

    const { address, isConnected } = useAccount()

    const handleUnlisting = () => {
        if (!isConnected) {
            open({ route: "ConnectWallet" })
        } else {
            dispatch(notificationActions.setNotify(true))

            unListNFT(dispatch, data, data.price, address, data.owner_id, navigate)

        }

    }

    const now = new Date().getTime()
    const isAuctionFinished = ((data.auction_duration * 1000) - now) > 0 ? false : true

    return (
        <>
            <OwnerPop data={data}/>
            <div className={`${styles.action} ${dark ? styles.dark : ""}`}>
                <div className={styles.buy}>
                    <button>Manage NFT</button>
                    <div>
                        <div className={styles.input}>
                            <p>Buy Now Price</p>
                            <div>
                                <p>$</p>
                                <input type="number" onWheel={(e) => e.target.blur()} value={data.price * matic} readOnly />
                                <span>{data.price}MATIC</span>
                            </div>
                        </div>
                    </div>
                    <button onClick={handleUnlisting}>{!isConnected ? "Connect Wallet" : data.auction && bids && bids.length > 0 && isAuctionFinished ? "Claim Payment" : data.auction && bids && bids.length > 0 && !isAuctionFinished ? "Auction is live" : "Unlist NFT"}</button>
                </div>
            </div>
        </>
    );
}

export default Unlist;
Unlist.propTypes = {
    data: PropTypes.object,
};