import { useEffect, useState } from "react";
import { getImageUrl, numberToTwoDecimals } from "../../../../../helpers/utils";
import styles from "./table.module.css"
import ReactTimeAgo from "react-time-ago";
import { useSelector } from "react-redux";
import { getUserActivities } from "../../helper";
import AppPagination from "../../../../pagination/pagination";
import Txloading from "../../../../load/txloading";

const Table = () => {
    const [activity, setActivity] = useState([])
    const [loading, setLoading] = useState(true)
    const authState = useSelector((state) => state.auth.loggedIn);
    const [paginated, setPaginated] = useState([])
    const { dark } = useSelector(
        (state) => state.mode
    );
    const { rate: { matic } } = useSelector(
        (state) => state.others
    );
    useEffect(() => {
        let abortcontroller;
        (async function () {
            setLoading(true)
            abortcontroller = new AbortController()
            const res = await getUserActivities(authState)
            setActivity(res.activities);
            setLoading(false)
        })()
        return () => {
            abortcontroller.abort()
        };
    }, [authState])
    return (
        <div className={`${styles.content} ${dark ? styles.dark : ""}`}>
            <div className={styles.header}>
                <p>Event</p>
                <p>Price</p>
                <p>Hash</p>
                <p>Date</p>
            </div>
            {!loading && paginated.length === 0 && <p>You have no transaction records</p>}
            {loading && <Txloading />}
            {!loading && paginated.map((item, index) => {
                return <div key={index} className={styles.body}>
                    <div>
                        <img loading="lazy" src={getImageUrl(item.type === "sale" ? "buy.png" : "list.png")} alt={item.type} />
                        <p>{item.type}</p>
                    </div>
                    <p>${numberToTwoDecimals(item.price * matic)}</p>
                    <a href={"https://goerli.etherscan.io/tx/" + item.harsh} rel="noreferrer" target="_blank">{item.harsh}</a>
                    {<ReactTimeAgo date={new Date(item.date).getTime()} locale="en-US" />}

                </div>
            })}
            <div className={styles.paginationContainer}>
                <AppPagination callback={setPaginated} rawData={activity} pageSize={15} />
            </div>

        </div>
    );
}

export default Table;
