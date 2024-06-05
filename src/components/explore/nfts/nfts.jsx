import Nftcard from "../../cards/nfts/nftcard";
import styles from "./nfts.module.css"
import PropTypes from "prop-types";
import Nftloading from '../../load/nftloading';
import AppPagination from "../../pagination/pagination";
import { useEffect, useState } from "react";

const Nfts = ({ data, loading, search }) => {
    const [paginated, setPaginated] = useState([])
    const [filtered, setFiltered] = useState([])

    useEffect(() => {
        const filter = data.filter((item) => {
          return item.name.toLowerCase().includes(search.toLowerCase())
        })
    
        setFiltered(filter)
      }, [search, data])
    return (
        <>
        <div className={styles.nfts}>
            {!loading && paginated.length == 0 && <p>There are no listed NFTs to explore</p>}
            {loading && <Nftloading />}
            {!loading && paginated.map((item, index) => {
                return <Nftcard key={index} item={item} />
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
    data: PropTypes.array,
    loading: PropTypes.bool,
    search: PropTypes.string
};
