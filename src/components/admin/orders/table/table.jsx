import styles from "./table.module.css"
import PropTypes from "prop-types";
import Txloading from "../../../load/txloading";
import { useSelector } from "react-redux";
import { numberToTwoDecimals } from "../../../../helpers/utils";
import { useEffect, useState } from "react";
import AppPagination from "../../../pagination/pagination";

const Table = ({ data, loading, search }) => {
    const { rate: {matic} } = useSelector(
        (state) => state.others
    );

    const [filtered, setFiltered] = useState([])
    const [paginated, setPaginated] = useState([])

    useEffect(() => {
        const filter = data.filter((item) => {
            return item.memail.toLowerCase().includes(search.toLowerCase()) || item.uemail.toLowerCase().includes(search.toLowerCase())
        })

        setFiltered(filter)
    }, [search, data]) 
    const { dark } = useSelector(
        (state) => state.mode
    ); 
    return (
        <div className={`${styles.table} ${dark ? styles.dark : ""}`}>
            <div className={styles.header}>
                <p>ID</p>
                <p>BUYER</p>
                <p>SELLER</p>
                <p>AMOUNT</p>
                <p>DATE</p>
                <p>TYPE</p>
                <p>ITEM</p>
            </div>
            {loading && <Txloading />}

            {!loading && paginated.map((item, index) => {
                return <div key={index} className={styles.body}>
                    <p>{item.transaction_id}</p>
                    <span>{item.uemail}</span>
                    <span>{item.memail}</span>
                    <span style={{color: "#0FAF62", fontWeight: 600}}>${numberToTwoDecimals(item.price * matic)}</span>
                    <span>{new Date(item.date).getDate()} {new Date(item.date).getMonth() + 1} {new Date(item.date).getFullYear()}</span>
                    <span>{item.type.toUpperCase()}</span>
                        <button onClick={()=>window.open("https://goerli.etherscan.io/tx/" + item.harsh, "_blank")} className={styles.action}>
                            View
                        </button>
                       
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