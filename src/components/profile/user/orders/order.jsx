import { useEffect, useState } from "react";
import Header from "./header/header";
import Nfts from "./nfts/nfts";
import styles from "./order.module.css"
import { getUserItems } from "../helper";
import { useSelector } from "react-redux";

const Order = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState("All")

    const authState = useSelector((state) => state.auth.loggedIn);
    const [search, setSearch] = useState("") 

    const { message } = useSelector(
        (state) => state.notification 
      );
    useEffect(() => {
        let abortcontroller;
        (async function () {
            setLoading(true)
            abortcontroller = new AbortController()
            const res = await getUserItems(authState)
            setData(res.items);
            setLoading(false)
        })()
        return () => {
            abortcontroller.abort()
        };
    }, [authState, message])
    return (
        <div className={styles.orders}>
            <Header search={search} setSearch={setSearch} status={status} setStatus={setStatus}/>
            <Nfts data={data} loading={loading} search={search} status={status}/>
        </div>
    );
}

export default Order;
