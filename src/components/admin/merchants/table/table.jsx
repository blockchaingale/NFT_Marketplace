import { useDispatch, useSelector } from "react-redux";
import { getImageUrl } from "../../../../helpers/utils";
import Txloading from "../../../load/txloading";
import styles from "./table.module.css"
import PropTypes from "prop-types";
import { kybAction, merchantAction } from "../../helper";
import { useEffect, useState } from "react";
import AppPagination from "../../../pagination/pagination";

const Table = ({ data, loading, search }) => {
    const dispatch = useDispatch()
    const authState = useSelector((state) => state.auth.loggedIn);
    const [filtered, setFiltered] = useState([])
    const [paginated, setPaginated] = useState([])

    useEffect(() => {
        const filter = data.filter((item) => {
            const name = item.first_name + " " + item.last_name
            return name.toLowerCase().includes(search.toLowerCase()) || item.email.toLowerCase().includes(search.toLowerCase())
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
                <p>NAME</p>
                <p>EMAIL</p>
                <p>VERIFIED</p>
                <p>LOCATION</p>
                <p>STATUS</p>
                <p>KYB</p>
            </div>
            {loading && <Txloading />}
            {!loading && paginated.map((item, index) => {
                return <div key={index} className={styles.body}>
                    <p>{item.merchant_id}</p>
                    <span>{item.first_name} {item.last_name}</span>
                    <span>{item.email}</span>
                    <span style={{ color: item.verified ? "#0FAF62" : "#E90404" }}>{item.verified ? "YES" : "NO"}</span>
                    <span>{item.street}, {item.city}, {item.state}, {item.country}</span>
                    {item.active ? <button className={styles.deactivate} onClick={() => merchantAction(dispatch, { merchant_id: item.merchant_id, action: false }, authState)}>
                        <img src={getImageUrl("reject.png")} alt="reject" />
                    </button>
                        :
                        <button className={styles.activate} onClick={() => merchantAction(dispatch, { merchant_id: item.merchant_id, action: true }, authState)}>
                            <img src={getImageUrl("approve.png")} alt="approve" />
                        </button>}
                        {item.kyb ? <button className={styles.deactivate} onClick={() => kybAction(dispatch, { merchant_id: item.merchant_id, action: false }, authState)}>
                        <img src={getImageUrl("reject.png")} alt="reject" />
                    </button>
                        :
                        <button className={styles.activate} onClick={() => kybAction(dispatch, { merchant_id: item.merchant_id, action: true }, authState)}>
                            <img src={getImageUrl("approve.png")} alt="approve" />
                        </button>}
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