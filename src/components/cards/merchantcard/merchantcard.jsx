import { useNavigate } from "react-router-dom";
import { getImageUrl, numberToTwoDecimals } from "../../../helpers/utils";
import styles from "./merchantcard.module.css"
import PropTypes from "prop-types";
import ValidImage from '../../validImage/validImage';
import { useSelector } from "react-redux";

const Merchantcard = ({ item }) => {
    const navigate = useNavigate()
    const { dark } = useSelector(
        (state) => state.mode
      );
    const { rate: {matic} } = useSelector(
        (state) => state.others
    );
    return (
        <div onClick={()=>navigate("/merchants/" + item.merchant_id)} style={{
            backgroundImage: `url(${item.image})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }} className={styles.card}>
            <div className={`${styles.overlay} ${dark ? styles.dark : ""}`}>
                <ValidImage link={item.image} alt={item.name} fallback={getImageUrl("merchatav.png")} />

                <div>
                    <div className={styles.top}>
                    {item.name.length < 18 ?
                            <p>{item.name.toLowerCase()}</p>
                            : <p><marquee>{item.name.toLowerCase()}</marquee></p>}
                        <img loading="lazy" src={getImageUrl("verified.png")} alt="verified" />
                    </div>
                    <div className={styles.dets}>
                        <div>
                            <h5>Products</h5>
                            <p>{item.products}</p>
                        </div>
                        <div>
                            <h5>Total Volume</h5>
                            <p>${numberToTwoDecimals(item.volume * matic)}</p>
                            <span>{numberToTwoDecimals(item.volume)}MATIC</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Merchantcard;
Merchantcard.propTypes = {
    item: PropTypes.object,
};
