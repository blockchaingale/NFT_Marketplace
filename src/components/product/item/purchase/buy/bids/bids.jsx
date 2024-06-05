import styles from "./bids.module.css"
import ReactTimeAgo from "react-time-ago";
import PropTypes from "prop-types";
import { useState } from "react";
import { getImageUrl } from '../../../../../../helpers/utils';
import Cardheader from '../../../../cardheader/cardheader';
import AppPagination from '../../../../../pagination/pagination';
import { useSelector } from "react-redux";

const Bids = ({ data }) => {

    const [paginated, setPaginated] = useState([])
    const { rate: { matic } } = useSelector(
        (state) => state.others
    );
    const { dark } = useSelector(
        (state) => state.mode
      );
    return (
        <>
            <div className={`${styles.activity} ${dark ? styles.dark : ""}`}>
                <Cardheader name="Bids" image={getImageUrl("activity.png")} />
                <div className={styles.content}>
                    <div className={styles.header}>
                        <p>Bidder</p>
                        <p>Price</p>
                        <p>Date</p>
                    </div>
                    {paginated.map((item, index) => {
                        return <div key={index} className={styles.body}>
                            <a href={"https://goerli.etherscan.io/address/" + item.buyer} rel="noreferrer" target="_blank">{item.buyer.slice(0,13)}</a>
                            <p>${item.price * matic}</p>
                            <ReactTimeAgo date={new Date(item.date).getTime()} locale="en-US" />
                        </div>
                    })}

                </div>
                <div className={styles.paginationContainer}>
                <AppPagination callback={setPaginated} rawData={data} pageSize={4} scroll={false} />
            </div>

            </div>

        </>
    );
}

export default Bids;
Bids.propTypes = {
    data: PropTypes.array,
};