import Nftcard from "../../../cards/nfts/nftcard";
import styles from "./nfts.module.css"
import PropTypes from "prop-types";

const Nfts = ({ data }) => {
    return (
        <div className={styles.nfts}>
            {data.map((item, index) => {
                return <Nftcard key={index} item={item} />
            })}

        </div>
    );
}

export default Nfts;
Nfts.propTypes = {
    data: PropTypes.array,
};
