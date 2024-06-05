import { useDispatch, useSelector } from "react-redux";
import { getImageUrl } from "../../../../../helpers/utils";
import styles from "./sell.module.css"
import { popActions } from "../../../../../store/pops/pops";
import { useEffect, useState } from "react";
import { ApproveNFT, checkApproved, listNFT } from "../../helper";
import { useAccount } from "wagmi";
import PropTypes from "prop-types";
import { notificationActions } from "../../../../../store/notification/notification";
import { useWeb3Modal } from '@web3modal/react';
import OwnerPop from "../../../../popup/owner/owner";

const Sell = ({ data }) => {
    const dispatch = useDispatch()
    const [approve, setApprove] = useState(false)
    const [amount, setAmount] = useState(0)
    const { auctionData } = useSelector(
        (state) => state.pop
    );
    const { rate: {matic} } = useSelector(
        (state) => state.others
    );

    const { address, isConnected } = useAccount()
    const user = useSelector((state) => state.auth.user);
    const {open} = useWeb3Modal()

    const { message } = useSelector(
        (state) => state.notification
      );

    const handleListing = () => {
        if (!isConnected) {
            open({ route: "ConnectWallet" })
        }else{
            dispatch(notificationActions.setNotify(true))
        if (amount === 0) {
            dispatch(notificationActions.setMessage("Amount cannot be zero"))
            return
        }

        listNFT(dispatch, data, amount, address, user.merchant_id ? user.merchant_id : user.user_id, auctionData.amount > 0 ? auctionData : { amount: 0 }, matic)
    }}
    const { dark } = useSelector(
        (state) => state.mode
      );

    useEffect(() => {
        isConnected && data && checkApproved(address, data.contract, setApprove)
    }, [address, data, isConnected, message])

    useEffect(() => {
        if (isConnected && data.address != address) {
            dispatch(popActions.setOwner(true))
        }else{
            dispatch(popActions.setOwner(false))

        }
    }, [data, isConnected, address, dispatch]);
    return (
        <>
            <OwnerPop data={data} />
       
        <div className={`${styles.action} ${dark ? styles.dark : ""}`}>
            <div className={styles.buy}>
                <button>Manage NFT</button>
                <div>
                    <div className={styles.input}>
                        <p>Buy Now Price</p>
                        <div>
                            <p>$</p>
                            <input type="number" onWheel={(e) => e.target.blur()} value={amount} onChange={(e) => setAmount(e.target.value)} />
                            <span>{amount / matic}MATIC</span>
                        </div>
                    </div>
                    <button onClick={() => dispatch(popActions.setAuction(true))}>
                        <img loading="lazy" src={getImageUrl("auction.png")} alt="auction" />
                    </button>
                </div>
                <button onClick={approve ? handleListing : () => isConnected && ApproveNFT(dispatch, data.contract)}>{!isConnected ? "Connect Wallet" : approve ? "Complete Listing" : "Approve NFT"}</button>
            </div>
        </div>
        </>
    );
}

export default Sell;
Sell.propTypes = {
    data: PropTypes.object,
};