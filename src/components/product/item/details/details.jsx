import styles from './details.module.css';
import Cardheader from '../../cardheader/cardheader';
import { getImageUrl } from '../../../../helpers/utils';
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const Details = ({data}) => {
    const { dark } = useSelector(
        (state) => state.mode
      );
    return (
        <div className={`${styles.details} ${dark ? styles.dark : ""}`}>
            <Cardheader name="Details" image={getImageUrl("details.png")} />
            <div className={styles.content}>
                
                <div>
                    <span>Contract Address</span>
                    <p style={{cursor: 'pointer'}} onClick={()=>window.open("https://goerli.etherscan.io/address/"+data.contract)}>{data.contract.slice(0,10)}....{data.contract.slice(data.contract.length-10,data.contract.length)}</p>
                </div>
                <div>
                    <span>Token Id</span>
                    <p>1</p>
                </div>
                <div>
                    <span>Token Standard</span>
                    <p>ERC721</p>
                </div>
            </div>
        </div>
    );
}

export default Details;
Details.propTypes = {
    data: PropTypes.object,
};