import { useDispatch, useSelector } from "react-redux";
import styles from "./auctionpop.module.css"
import { getImageUrl } from '../../../helpers/utils';
import { popActions } from "../../../store/pops/pops";
import { useState } from "react";

const Auctionpop = () => {
    const dispatch = useDispatch()
    const [days, setDays] = useState(10)
    const [amount, setAmount] = useState(1)

    const { auction } = useSelector(
        (state) => state.pop
    );

    const handleSubmit = (e)=>{
        e.preventDefault()
        if (days === 0 || amount === 0) return;
        dispatch(popActions.setAuctionData({days, amount}))
        dispatch(popActions.setAuction(false))

    }
    const { dark } = useSelector(
        (state) => state.mode
    );

    return (
        <div className={`${styles.overlay} ${auction ? styles.soverlay : ""} ${dark ? styles.dark : ""}`}>
            <div className={styles.checkout}>
                <h2>Add Auction To Item</h2>
                <p>This setup would guide you through adding auction to this listing you are about to make on Trumart</p>
                <div>
                    <form >
                        <label>
                        Auction duration (days)
                            <div>
                                <img loading="lazy" src={getImageUrl("calendar.png")} alt="calendar" />
                                <input type="number" onWheel={(e) => e.target.blur()} name="days" value={days} onChange={(e)=>setDays(e.target.value)} required/>
                            </div>
                        </label>
                        <label>
                        Start Bid
                            <div>
                                <img loading="lazy" src={getImageUrl("auction.png")} alt="auction" />
                                <p>$</p>
                                <input type="number" onWheel={(e) => e.target.blur()} name="amount" value={amount} onChange={(e)=>setAmount(e.target.value)} required/>
                            </div>
                        </label>
                    </form>
                    <div className={styles.fees}>
                        <div>
                            <p>Bid Type</p>
                            <span>Highest Bidder</span>
                        </div>

                        <div>
                            <p>Service Fee</p>
                            <span>16%</span>
                        </div>

                        <p>Note that whoever  uses the BUY NOW price to purchase the NFT wins the ITEM and ends the auction</p>
                    </div>
                </div>
                <div className={styles.button}>
                    <button type="button" onClick={() => dispatch(popActions.setAuction(false))}>Cancel</button>
                    <button onClick={handleSubmit}>Save</button>
                </div>
                <img loading="lazy" onClick={() => dispatch(popActions.setAuction(false))} src={getImageUrl("wclose.png")} alt="x" />
            </div>
        </div>
    );
}

export default Auctionpop;
