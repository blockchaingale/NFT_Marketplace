import { useEffect, useState } from "react";
import styles from "./list.module.css"
import { getImageUrl } from "../../../helpers/utils";
import Merchantcard from '../../cards/merchantcard/merchantcard';
import { getTopMerchants } from '../../home/helper';
import AppPagination from "../../pagination/pagination";
import Nftloading from "../../load/nftloading";

const List = () => {
    const [list, setList] = useState([])
    const [paginated, setPaginated] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [filtered, setFiltered] = useState([])

    useEffect(() => {
        const filter = list.filter((item) => {
          return item.name.toLowerCase().includes(search.toLowerCase())
        })
    
        setFiltered(filter)
      }, [search, list])

    useEffect(() => {
        let abortcontroller;
        (async function () {
            setLoading(true)
            abortcontroller = new AbortController()
            const res = await getTopMerchants()
            setList(res.merchants);
            setLoading(false)
        })()
        return () => {
            abortcontroller.abort()
        };
    }, [])

    useEffect

    return (
        <main>
            <div className={styles.list}>
                <div className={styles.header}>
                    <h3>Trumart Merchants</h3>
                    <div className={styles.search}>
                        <img loading="lazy" src={getImageUrl("esearch.png")} alt="search" />
                        <input type="text" placeholder='Search by Merchant Name' value={search} onChange={(e)=>setSearch(e.target.value)} />
                    </div>

                </div>
                {!loading && paginated.length == 0 && <p>There are no Merchants to explore</p>}

                <div className={styles.slider}>
                    {loading && <Nftloading />}
                    {!loading && paginated.map((item, index) => {
                        return <Merchantcard key={index} item={item} />
                    })}
                </div>
                <div className={styles.paginationContainer}>
                    <AppPagination callback={setPaginated} rawData={filtered} pageSize={28} />
                </div>
            </div>

        </main>
    );
}

export default List;
