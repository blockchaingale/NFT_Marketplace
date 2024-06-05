import { useSelector } from "react-redux";
import { getImageUrl, numberToTwoDecimals } from "../../../../helpers/utils";
import styles from "./table.module.css"
import ReactTimeAgo from "react-time-ago";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppPagination from "../../../pagination/pagination";
import Txloading from "../../../load/txloading";

const Table = ({ data, loading, search }) => {
    const { rate: {matic} } = useSelector(
        (state) => state.others
    );

    const [filtered, setFiltered] = useState([])
    const [paginated, setPaginated] = useState([])
 
    useEffect(() => {
        const filter = data.filter((item) => {
            return item.memail.toLowerCase().includes(search.toLowerCase())
        })

        setFiltered(filter)
    }, [search, data]) 
    const { dark } = useSelector(
        (state) => state.mode
    ); 
    return (
        <div className={`${styles.content} ${dark ? styles.dark : ""}`}>
            <div className={styles.header}>
                <p>Event</p>
                <p>Price</p>
                <p>From</p>
                <p>Harsh</p>
                <p>Date</p>
            </div>
            {loading && <Txloading />}

            {!loading && paginated.map((item, index) => {
                return <div key={index} className={styles.body}>
                    <div>
                        <img loading="lazy" src={getImageUrl(item.type === "Buy" ? "buy.png" : "list.png")} alt={item.type} />
                        <p>{item.type}</p>
                    </div>
                    <p>${numberToTwoDecimals(item.price * matic)}</p>
                    <p>{item.memail?.slice(0.13)}</p>
                    <a href="">{item.harsh?.slice(0.13)}</a>
                    {<ReactTimeAgo date={new Date(item.date).getTime()} locale="en-US" />}

                </div>
            })}
            <div className={styles.paginationContainer}>
                <AppPagination callback={setPaginated} rawData={filtered} pageSize={30} />
            </div>
        </div>
    );
}

export default Table;
Table.propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,
    search: PropTypes.string
};