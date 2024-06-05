import styles from "./activity.module.css"
import { getImageUrl, numberToTwoDecimals } from '../../../../helpers/utils';
import Cardheader from "../../cardheader/cardheader";
import ReactTimeAgo from "react-time-ago";
import PropTypes from "prop-types";
import AppPagination from "../../../pagination/pagination";
import { useState } from "react";
import numberWithCommas from '../../../../helpers/commaSeperator';
import { useSelector } from "react-redux";

const Activity = ({ data }) => {
    const { dark } = useSelector(
        (state) => state.mode
      );
    const [paginated, setPaginated] = useState([])

    return (
        <>
            <div className={`${styles.activity} ${dark ? styles.dark : ""}`}>
                <Cardheader name="Activity" image={getImageUrl("activity.png")} />
                <div className={styles.content}>
                    <div className={styles.header}>
                        <p>Event</p>
                        <p>Price</p>
                        <p>Hash</p>
                        <p>Date</p>
                    </div>
                    {paginated.map((item, index) => {
                        return <div key={index} className={styles.body}>
                            <div>
                                <img loading="lazy" src={getImageUrl(item.type === "Buy" ? "buy.png" : "list.png")} alt={item.type} />
                                <p>{item.type}</p>
                            </div>
                            <p>${numberWithCommas(numberToTwoDecimals(item.price))}</p>
                            <a href={"https://goerli.etherscan.io/tx/" + item.harsh} rel="noreferrer" target="_blank">{item.harsh}</a>

                            {<ReactTimeAgo date={new Date(item.date).getTime()} locale="en-US" />}

                        </div>
                    })}

                </div>

            </div>
            <div className={styles.paginationContainer}>
                <AppPagination callback={setPaginated} rawData={data} pageSize={4} scroll={false}/>
            </div>
        </>
    );
}

export default Activity;
Activity.propTypes = {
    data: PropTypes.array,
};