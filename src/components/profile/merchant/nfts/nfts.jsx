import Header from "./header/header";
import Nfts from "./nfts/nfts";
import styles from "./nfts.module.css"
import { useEffect, useState } from "react";
import { getItems } from '../helper';
import { useSelector } from "react-redux";

const NFTs = () => {
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("All")
  const [data, setData] = useState([])
  const authState = useSelector((state) => state.auth.loggedIn);
  const [loading, setLoading] = useState(true)
  const { message } = useSelector(
    (state) => state.notification
  );
  useEffect(() => {
    let abortController
    (async function () {
      setLoading(true)
      abortController = new AbortController()
      const res = await getItems(authState)
      setData(res.items)
      setLoading(false)
    })()

    return () => {
      abortController.abort()
    }
  }, [authState, message])

  return (
    <div className={styles.orders}>
      <Header search={search} setSearch={setSearch} status={status} setStatus={setStatus} />
      <Nfts data={data} loading={loading} search={search} status={status} />
    </div>
  );
}

export default NFTs;
