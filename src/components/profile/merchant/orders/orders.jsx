import { useEffect, useState } from 'react';
import Header from './header/header';
import Ordercard from "./ordercard/ordercard";
import { useSelector } from 'react-redux';
import { getOrders } from '../helper';
import OrderLoading from './orderLoading';
import AppPagination from '../../../pagination/pagination';
import styles from "./orders.module.css"

const Orders = () => {

  const [orders, setOrders] = useState([])
  const authState = useSelector((state) => state.auth.loggedIn);
  const [loading, setLoading] = useState(true)
  const [paginated, setPaginated] = useState([])
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("All")
  const { message } = useSelector(
    (state) => state.notification
  );
  const { dark } = useSelector(
    (state) => state.mode
);
  useEffect(() => {
    let abortController
    (async function () {
      setLoading(true)
      abortController = new AbortController()
      const res = await getOrders(authState)
      setOrders(res.orders.reverse())
      setLoading(false)
    })()

    return () => {
      abortController.abort()
    }
  }, [authState, message])

  const [filtered, setFiltered] = useState([])

  useEffect(() => {
    const filter1 = orders.filter((item) => {
      return item.name?.toLowerCase().includes(search.toLowerCase())
    })

    const filter = filter1.filter((item) => {
      return status === "All" ? true : status === "Requested" ? item.redeemed : status === "Shipped" ? !item.redeemed : false
    })

    setFiltered(filter)
  }, [search, orders, status])
  return (
    <>
      <Header search={search} setSearch={setSearch} status={status} setStatus={setStatus} />

      {loading && <OrderLoading />}
      {paginated.length === 0 && !loading && <p style={{color: dark ? "#fff" : "#000"}}>No orders found</p>}

      {!loading && paginated.map((item, index) => {
        return <Ordercard key={index} item={item} />
      })}

      <div className={styles.paginationContainer}>
        <AppPagination callback={setPaginated} rawData={filtered} pageSize={10} />
      </div>

    </>
  );
}

export default Orders;
