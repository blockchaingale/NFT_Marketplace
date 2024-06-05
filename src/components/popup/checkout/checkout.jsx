import { useDispatch, useSelector } from "react-redux";
import styles from "./checkout.module.css"
import { getImageUrl, numberToTwoDecimals } from '../../../helpers/utils';
import { checkoutActions } from "../../../store/checkout/checkout";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/react";
import { popActions } from "../../../store/pops/pops";
import ValidImage from '../../validImage/validImage';
import numberWithCommas from '../../../helpers/commaSeperator';

const Checkout = () => {
    const dispatch = useDispatch()
    const [total, setTotal] = useState({ usd: 0, matic: 0 })
    const navigate = useNavigate()
    const { rate: { matic } } = useSelector(
        (state) => state.others
    );
    const { dark } = useSelector(
        (state) => state.mode
    );

    const {state} = useSelector((state) => state.auth.loggedIn);
    const {open} = useWeb3Modal()


    const { isConnected } = useAccount()

    const { basket, popUp } = useSelector(
        (state) => state.checkout
    );

    useEffect(() => {
        if (basket.length > 0) {
            let usd = 0
            let mati = 0
            basket.map((item) => {
                usd += item.usdcprice
                mati += item.price
            })
            setTotal({ usd, matic: mati })
        }
    }, [basket, matic])



    return (
        <div className={`${styles.overlay} ${popUp ? styles.soverlay : ""} ${dark ? styles.dark : ""}`}>
            <div className={styles.checkout}>
                <h2>Checkout</h2>
                <p>You intend to buy NFT, please check token and cost information before proceeding</p>
                {basket.length === 0 ? <p>Your Checkout Basket is Empty !</p> : <div>
                    {basket.map((item, index) => {
                        return <div key={index} className={styles.card}>
                            <ValidImage src={item.image} fallback={item.images[0]} />
                            <div>
                                <p>#{item.item_id}</p>
                                <span>{item.name.length > 20 ? item.name.slice(0,20) + "..." : item.name}</span>
                            </div>
                            <p>${numberWithCommas(numberToTwoDecimals(item.price * matic))}</p>
                            <img loading="lazy" onClick={() => dispatch(checkoutActions.removeFromBasket(item))} src={getImageUrl("close.png")} alt="x" />
                        </div>
                    })}
                </div>}
                <div className={styles.fees}>
                    <p>Total</p>
                    <span>${numberWithCommas(total.usd)}({numberWithCommas(total.matic)}MATIC)</span>
                </div>
                {basket.length > 30 && <p>Only the first 30 Items would be processed</p>}
                <div className={styles.button}>
                    <button onClick={() => dispatch(checkoutActions.setPop(false))}>Back</button>
                    <button onClick={!state ? ()=>{dispatch(checkoutActions.setPop(false));navigate("/auth/login")} : !isConnected ? ()=>open({ route: "ConnectWallet" }) : isConnected && basket.length > 0 ? () => {dispatch(popActions.setPay(true))} : () => { }} >{!state ? "Login" : !isConnected ? "Connect Wallet" : "Checkout" }</button>
                </div>
                <img loading="lazy" onClick={() => dispatch(checkoutActions.setPop(false))} src={getImageUrl("wclose.png")} alt="x" />
            </div>
        </div>
    );
}

export default Checkout;
