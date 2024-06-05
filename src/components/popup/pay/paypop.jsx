import { useDispatch, useSelector } from "react-redux";
import styles from "./paypop.module.css"
import { getImageUrl } from '../../../helpers/utils';
import { popActions } from "../../../store/pops/pops";
import { useEffect, useState } from "react";
import { buyNFTs, buyUSDCNFTs, checkUSDCApproved, handleUSDCApproval } from '../../product/item/helper';
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";

const Paypop = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.user);
    const [route, setRoute] = useState("matic")
    const [total, setTotal] = useState({ usd: 0, matic: 0 })
    const { dark } = useSelector(
        (state) => state.mode
    );
    const { rate: { matic } } = useSelector(
        (state) => state.others
    );
    const navigate = useNavigate()
    const { pay } = useSelector(
        (state) => state.pop
    );
    const [approve, setApprove] = useState(true);

    const { basket } = useSelector(
        (state) => state.checkout
    );

    const { address } = useAccount()

    useEffect(() => {
        let abortcontroller;
        (async function () {
            abortcontroller = new AbortController()

            if (basket.length > 0) {
                let usd = 0
                let mati = 0
                basket.map((item) => {
                    usd += item.usdcprice
                    mati += item.price
                })
                await checkUSDCApproved(address, setApprove, usd)
                setTotal({ usd, matic: mati })
            }
        })()
        return () => {
            abortcontroller.abort()
        };
    }, [basket, matic, address])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (route === "matic") {
            //buy matic
            buyNFTs(dispatch, basket.length > 30 ? basket.splice(0, 30) : basket, user.user_id ? user.user_id : user.merchant_id, navigate)

        } else if (route === "usdc") {
            if (!approve) {
                handleUSDCApproval(dispatch, setApprove, total.usd)
            } else {
                //buy usdc
                buyUSDCNFTs(dispatch, basket.length > 30 ? basket.splice(0, 30) : basket, user.user_id ? user.user_id : user.merchant_id, navigate)
            }
            // } else if (route === "ethusdc") {
            //     //buy ethusdc
            //     buyNFTs(dispatch, basket.length > 30 ? basket.splice(0, 30) : basket, user.user_id ? user.user_id : user.merchant_id, navigate)

        }
    }

    return (
        <div className={`${styles.overlay} ${pay ? styles.soverlay : ""} ${dark ? styles.dark : ""}`}>
            <div className={styles.checkout}>
                <h2>Complete Purchase</h2>
                <p>Select how you would like to complete your purchase</p>
                <div>
                    <div className={styles.options}>
                        <div className={route === "matic" ? styles.active : ""} onClick={() => setRoute("matic")}>
                            <img src={getImageUrl("matic.png")} alt="matic" />
                            <p>POLYGON MATIC</p>
                        </div>
                        <div className={route === "usdc" ? styles.active : ""} onClick={() => setRoute("usdc")}>
                            <img src={getImageUrl("usdc.png")} alt="usdc" />
                            <p>POLYGON NATIVE USDC</p>
                        </div>
                        <div className={route === "usdce" ? styles.active : ""} onClick={() => setRoute("usdce")}>
                            <img src={getImageUrl("usdc.png")} alt="usdc" />
                            <p>POLYGON USDC.e</p>
                        </div>
                        <div className={route === "moon" ? styles.active : ""} onClick={() => window.open(`https://matcha.xyz/tokens/ethereum/eth`, "_blank")}>
                            <img src={getImageUrl("moon.png")} alt="moon" />
                            <p>Matcha Cross-Chain</p>
                        </div>
                        <div className={route === "poly" ? styles.active : ""} onClick={() => window.open(`https://wallet.polygon.technology/zkEVM-Bridge/bridge`, "_blank")}>
                            <img src={getImageUrl("poly.png")} alt="poly" />
                            <p>Bridge To Polygon</p>
                        </div>
                    </div>
                    <div className={styles.fees}>
                        <div>
                            <p>Total</p>
                            <span>{route === "matic" ? total.matic : total.usd} {route === "matic" ? "MATIC" : route === "usdc" ? "POLYGON USDC" : route === "usdce" ? "POLYGON USDC.e" : route === "ethusdc" ? "ETHEREUM USDC" : ""}</span>
                        </div>
                    </div>
                </div>
                <div className={styles.button}>
                    <button type="button" onClick={() => dispatch(popActions.setPay(false))}>Cancel</button>
                    <button onClick={handleSubmit}>{route === "matic" ? "Pay" : !approve ? "Approve USDC" : approve ? "Pay" : ""}</button>

                </div>
                <img loading="lazy" onClick={() => dispatch(popActions.setPay(false))} src={getImageUrl("wclose.png")} alt="x" />
            </div>
        </div>
    );
}

export default Paypop;
