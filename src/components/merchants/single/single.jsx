import { useEffect, useState } from "react";
import { getImageUrl } from "../../../helpers/utils";
import styles from "./single.module.css"
import Header from "./header/header";
import About from "./about/about";
import { useNavigate, useParams } from "react-router-dom";
import Nftcard from "../../cards/nfts/nftcard";
import { getItemsByMerchant, getMerchantById } from "../../home/helper";
import AppPagination from "../../pagination/pagination";
import Reviews from "./reviews/reviews";


const Single = () => {
    const navigate = useNavigate()
    const [items, setItems] = useState([])
    const [data, setData] = useState({})
    const params = useParams()

    useEffect(() => {
        let abortcontroller;
        (async function(){
            abortcontroller = new AbortController()
            const res = await getMerchantById(params.id, navigate)
            const resp = await getItemsByMerchant(params.id)
            setItems(resp.items)
           
            setData(res.merchant);
        })()
        return () => {
            abortcontroller.abort()
        };
    }, [params, navigate]);



    const [status, setStatus] = useState("Collections")
    const [paginated, setPaginated] = useState([])

    return (
        <>
            < Header status={status} setStatus={setStatus} data={data}/>
            {status === "Collections" ? <div className={styles.collection}>
                <div className={styles.header }>
                    <h3>{data.name} Products</h3>
                    <div className={styles.search}>
                        <img loading="lazy" src={getImageUrl("esearch.png")} alt="search" />
                        <input type="text" placeholder='Search by Product Name' />
                    </div>

                </div>
                <div className={styles.slider}>
                    {paginated.map((item, index) => {
                        return <Nftcard key={index} item={item} />
                    })}
                </div>
                <div className={styles.paginationContainer}>
              <AppPagination callback={setPaginated} rawData={items} pageSize={28} />
            </div>
                 </div> : status === "Reviews" ? <Reviews data={[]}/> : <About data={data} />}
        </>
    );
}

export default Single;
