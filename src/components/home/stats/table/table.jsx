import styles from "./table.module.css"
import PropTypes from "prop-types";
import { getImageUrl, numberToTwoDecimals } from '../../../../helpers/utils';
import numberWithCommas from '../../../../helpers/commaSeperator';
import ValidImage from "../../../validImage/validImage";
import { useSelector } from "react-redux";
import Statsloading from "../../../load/statsloading";
import { useNavigate } from "react-router-dom";

const Table = ({ data }) => {
    const navigate = useNavigate()
    const { rate: {matic} } = useSelector(
        (state) => state.others
    );
    const { dark } = useSelector(
        (state) => state.mode
      );
    return (
        <div className={`${styles.table} ${dark ? styles.dark : ""}`}>
            <div className={styles.header}>
                <p>Store</p>
                <p>Volume</p>
                <p>Products</p>
            </div>
            {data.length === 0 && <Statsloading />}

            {data.length > 0 && data.map((item, index) => {
                return <div onClick={()=>navigate("/merchants/" + item.merchant_id)} key={index} className={styles.body}>
                    <div>
                        <ValidImage link={item.image} alt={item.name} fallback={getImageUrl("avatar.png")} />
                        <p>{item.name}</p>
                        <img loading="lazy" src={getImageUrl("verified.png")} alt="verified" />
                    </div>
                    <div>
                        <p>${numberWithCommas(numberToTwoDecimals(item.volume * matic))}</p>
                        <span>{numberWithCommas(numberToTwoDecimals(item.volume))}MATIC</span>
                    </div>
                    <p>{numberWithCommas(numberToTwoDecimals(item.products))}</p>
                </div>
            })}

        </div>
    );
}

export default Table;
Table.propTypes = {
    data: PropTypes.array,
};
