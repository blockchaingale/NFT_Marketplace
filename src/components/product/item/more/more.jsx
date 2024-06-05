import styles from "./more.module.css";
import Nfts from './nfts/nfts';
import PropTypes from "prop-types";

const More = ({data}) => {

    return (
        <div className={styles.more}>
            <h3>More From This Merchant</h3>
            <Nfts data={data} />
        </div>
    );
}

export default More;
More.propTypes = {
    data: PropTypes.array,
};