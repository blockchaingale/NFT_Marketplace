import { useDispatch, useSelector } from "react-redux";
import { getImageUrl } from "../../../../helpers/utils";
import Txloading from "../../../load/txloading";
import styles from "./table.module.css"
import PropTypes from "prop-types";
import { kycAction, userAction } from "../../helper";
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
                <p>KYC</p>
            </div>
            {loading && <Txloading />}
            {!loading && paginated.map((item, index) => {
                return <div key={index} className={styles.body}>
                    <p>{item.user_id}</p>
                    <span>{item.first_name} {item.last_name}</span>
                    <span>{item.email}</span>
                    <span style={{ color: item.verified ? "#0FAF62" : "#E90404" }}>{item.verified ? "YES" : "NO"}</span>
                    <span>{item.street}, {item.city}, {item.state}, {item.country}</span>
                    {item.active ? <button className={styles.deactivate} onClick={() => userAction(dispatch, { user_id: item.user_id, action: false }, authState)}>
                        <img src={getImageUrl("reject.png")} alt="reject" />
                    </button>
                        :
                        <button className={styles.activate} onClick={() => userAction(dispatch, { user_id: item.user_id, action: true }, authState)}>
                            <img src={getImageUrl("approve.png")} alt="approve" />
                        </button>}
                    {item.kyc ? <button className={styles.deactivate} onClick={() => kycAction(dispatch, { user_id: item.user_id, action: false }, authState)}>
                        <img src={getImageUrl("reject.png")} alt="reject" />
                    </button>
                        :
                        <button className={styles.activate} onClick={() => kycAction(dispatch, { user_id: item.user_id, action: true }, authState)}>
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