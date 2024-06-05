import styles from "./nfts.module.css"
import PropTypes from "prop-types";
import Nftcard from '../../../../cards/nfts/nftCardProfile';
import Nftloading from '../../../../load/nftloading';
import { useEffect, useState } from "react";
import AppPagination from "../../../../pagination/pagination";

const Nfts = ({ data, loading, status, search }) => {
    const [paginated, setPaginated] = useState([])
    const [filtered, setFiltered] = useState([])

    useEffect(() => {
        const filter1 = data.filter((item) => {
            return item.name.toLowerCase().includes(search.toLowerCase()) 
        })

        const filter = filter1.filter((item) => {
            return status === "All" ? true : status === "Listed" ? item.listed :  status === "Available" ? !item.listed && !item.redeemed : status === "Redeemed" ? item.redeemed : false
        })

        setFiltered(filter)
    }, [search, data, status])

    return (
        <>
        <div className={styles.nfts}>
            {loading && <Nftloading />}
            {paginated.length === 0 && !loading && <p>No Items found</p>}

            {!loading && paginated.map((item, index) => {
                return <Nftcard key={index} item={item} rate={item.rating} />
            })}
        </div>
        <div className={styles.paginationContainer}>
        <AppPagination callback={setPaginated} rawData={filtered} pageSize={28} />
      </div>
      </>
    );
}

export default Nfts;
Nfts.propTypes = {
    loading: PropTypes.bool,
    data: PropTypes.array,
    search: PropTypes.string,
    status: PropTypes.string,
};
