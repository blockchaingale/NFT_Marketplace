import { useDispatch, useSelector } from "react-redux";
import styles from "./rate.module.css"
import { popActions } from "../../../store/pops/pops";
import { useState } from "react";
import ReactStars from "react-stars";
import { rateItem } from "../../profile/user/helper";
import { getImageUrl, getLocalStorage } from "../../../helpers/utils";

const Ratepop = () => {
    const dispatch = useDispatch()
    const [text, setText] = useState("")
    const data = getLocalStorage("rate")
    const { rate } = useSelector(
        (state) => state.pop
    );
    const authState = useSelector((state) => state.auth.loggedIn);

    const [rating, setRating] = useState(0)

    const handleSubmit = (e) => {
        e.preventDefault()
        //send rating
        rateItem(dispatch, { review_id: data.id, rating, text }, authState)
    }
    const { dark } = useSelector(
        (state) => state.mode
    );

    return (
        <div className={`${styles.overlay} ${rate ? styles.soverlay : ""} ${dark ? styles.dark : ""}`}>
            <div className={styles.checkout}>
                <h2>Rate {data?.name}</h2>

                <p>This can only be done once and would be displayed under this product details</p>

                <ReactStars
                    value={rating}
                    onChange={(num) => setRating(num)}
                    count={5}
                    size={50}
                    color1={dark ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)'}
                    color2={dark ? "rgba(233, 4, 4, 1)" : "rgba(233, 4, 4, 0.10)"} />

                <textarea value={text} onChange={(e)=>setText(e.target.value)} rows="4" placeholder="Review: Max of 50 Characters"></textarea>
                
                <div className={styles.button}>
                    <button type="button" onClick={() => dispatch(popActions.setRate(false))}>Cancel</button>
                    <button onClick={handleSubmit}>Rate</button>
                </div>
                <img loading="lazy" onClick={() => dispatch(popActions.setRate(false))} src={getImageUrl("wclose.png")} alt="x" />
            </div>
        </div>
    );
}

export default Ratepop;
