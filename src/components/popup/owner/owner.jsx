import { useSelector } from "react-redux";
import styles from "./owner.module.css"
import PropTypes from "prop-types"

const OwnerPop = ({data}) => {
    const { dark } = useSelector(
        (state) => state.mode
    );
    
    const { owner } = useSelector(
        (state) => state.pop
    );
    

    return (
        <div className={`${styles.overlay} ${owner ? styles.soverlay : ""} ${dark ? styles.dark : ""}`}>
            <div className={styles.checkout}>
                <h2>Wrong Address Connected</h2>
                <p>Please connect address: <strong>{data.address}</strong> to manage this item</p>
                <div>
                </div>
                <div></div>
            </div>
        </div>
    );
}

export default OwnerPop;
OwnerPop.propTypes = {
    data: PropTypes.object,
};