import { useDispatch, useSelector } from "react-redux";
import Countdown from "../../../../countdown/countdown";
import styles from "./buy.module.css";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { checkoutActions } from "../../../../../store/checkout/checkout";
import { useAccount } from "wagmi";
import { bidItem, checkWApproved, handleBidApproval, handleBidClaim } from "../../helper";
import Bids from './bids/bids';
import { useNavigate } from "react-router-dom";
import { useWeb3Modal } from "@web3modal/react";
import { numberToTwoDecimals } from "../../../../../helpers/utils";
import numberWithCommas from '../../../../../helpers/commaSeperator';

const Buy = ({ data }) => {
    const dispatch = useDispatch()
    const [approve, setApprove] = useState(true);
    let bids = false
    if (data.bids?.length > 0) {
        bids = JSON.parse(data.bids)
    }
    const { dark } = useSelector(
        (state) => state.mode
      );

    const {state} = useSelector((state) => state.auth.loggedIn);


    const { rate: { matic } } = useSelector(
        (state) => state.others
    );
    const { basket } = useSelector(
        (state) => state.checkout
    );
    const index = basket.findIndex(object => {
        return object.item_id === data.item_id;
    });
    const user = useSelector((state) => state.auth.user);

    const navigate = useNavigate()

    const {open} = useWeb3Modal()

    const [amount, setAmount] = useState(bids ? (Number(bids[0].price) + 0.01) * matic : data.startBid * matic)
    const handleBuyNow = async () => { 
        if (index < 0) {
            dispatch(checkoutActions.addToBasket(data))
        }
        dispatch(checkoutActions.setPop(true))
    } 

    const { address, isConnected } = useAccount()

    const handleBid = async () => {
        await bidItem(dispatch, data, amount / matic, user.user_id ? user.user_id : user.merchant_id)
    }

    const { message } = useSelector(
        (state) => state.notification
    );

    useEffect(() => {
        let abortController;
        (async function () {
            abortController = new AbortController();

            if (isConnected) {
                await checkWApproved(address, setApprove, amount / matic);
            }

        })();
        return () => abortController.abort();
    }, [isConnected, address, message, amount, matic]);
const now = new Date().getTime()
const isAuctionFinished = data.auction == 0 ? false : ((data.auction_duration * 1000) - now) > 0 ? false : true 
return (
        <>
            <div className={`${styles.action} ${dark ? styles.dark : ""}`}>
                <div className={styles.buy}>
                    <button>Buy Now</button>
                    <h3>${numberWithCommas(numberToTwoDecimals(data.price * matic))}</h3>
                    <p>{data.price}MATIC</p>
                    {!isAuctionFinished ? <button onClick={!state ? ()=>navigate("/auth/login") : !isConnected ? ()=>open({ route: "ConnectWallet" }) : ()=>handleBuyNow()}>{!state ? "Login" : !isConnected ? "Connect Wallet" : data.free == "paid" ? "Buy Now" : "Buy & Ship"}</button> : <button style={{opacity: 0}}></button>}
                </div>
                {data.auction ? <div className={styles.offer}>
                    <button>Live Auction</button>
                    <div className={styles.counter}>

                        <p>Sale ends in:</p>
                        <Countdown countDownDate={data.auction_duration * 1000} />

                    </div>
                    <div className={styles.input}>
                        <div>
                            <p>$</p>
                            <input type="number" onWheel={(e) => e.target.blur()} value={amount} onChange={(e) => setAmount(e.target.value)} />
                            <span>{amount / matic}MATIC</span>
                        </div>
                    </div>
                    {!isAuctionFinished && <button onClick={!state ? ()=>navigate("/auth/login") : !isConnected ? ()=>open({ route: "ConnectWallet" }) : isConnected && approve ? () => handleBid() : isConnected && !approve ? () => handleBidApproval(dispatch, setApprove, amount / matic) : () => { }}>{!state ? "Login" : !isConnected ? "Connect Wallet" : isConnected && approve ? "Make Offer" : isConnected && !approve ? "Approve WMATIC" : "Connect Wallet"}</button>}
                    {isAuctionFinished && <button onClick={!state ? ()=>navigate("/auth/login") : !isConnected ? ()=>open({ route: "ConnectWallet" }) : bids && address == bids[0].buyer ? () => handleBidClaim(dispatch, data) : ()=>{}}>{!state ? "Login" : !isConnected ? "Connect Wallet" : bids && address == bids[0].buyer ? "Claim NFT" : "You did not win this bid"}</button>}
                </div> : <></>}

            </div>
            {data.bids?.length > 0 ? <Bids data={JSON.parse(data.bids)} /> : <></>}
        </>
    );
}

export default Buy;
Buy.propTypes = {
    data: PropTypes.object,
};