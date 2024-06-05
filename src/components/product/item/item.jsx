import About from "./about/about";
import Activity from "./activity/activity";
import styles from "./item.module.css"
import Description from "./description/description";
import Details from "./details/details";
import Gallery from "./gallery/gallery";
import More from "./more/more";
import Purchase from "./purchase/purchase";
import Reviews from "./reviews/reviews";
import { useEffect, useState } from "react";
import { getItemById, getItemByIdAndPassword } from "./helper";
import { useNavigate, useParams } from "react-router-dom";
import ItemLoading from "./itemLoading/itemLoading";
import { useSelector } from "react-redux";
import Storage from './purchase/storage/storage';
import Recharge from './purchase/recharge/recharge';

const Item = () => {

    const navigate = useNavigate()
    const [data, setData] = useState(false)
    const params = useParams()
    const [loading, setLoading] = useState(true)
    const user = useSelector((state) => state.auth.user);
    const [password, setPassword] = useState()


    useEffect(() => {
        let abortcontroller;
        (async function () {
            setLoading(true)
            abortcontroller = new AbortController()
            let res = await getItemById(params.id, navigate)
            if (res.status == 202) {
                if (!password) {
                    const _password = window.prompt("Enter password to view item", "");
                    setPassword(_password)
                    res = await getItemByIdAndPassword(_password, params.id, navigate)
                }else{
                    res = await getItemByIdAndPassword(password, params.id, navigate)
                }
            }
            res.item.images = JSON.parse(res.item.images)
            setData(res.item);
            setLoading(false)

        })()
        return () => {
            abortcontroller.abort()
        };
    }, [params, navigate]);


    return (
        <main>
            {loading &&
                <div className={styles.buy}>
                    <ItemLoading />
                </div>}
            {!loading && <><div className={styles.buy}>
                <Gallery data={data} />
                {!data.redeemed && <Purchase data={data} />}
                <Description data={data} />
                <>
                    {user.user_id && !data.listed && user.user_id === data.owner_id && data.free == "paid" ? <Recharge data={data} /> : user.user_id ? <Storage data={data} /> : <></>}
                    {user.merchant_id && !data.listed && user.merchant_id === data.owner_id && user.merchant_id !== data.merchant_id && data.free == "paid" ? <Recharge data={data} /> : user.merchant_id ? <Storage data={data} /> : <></>}
                    {!user.merchant_id && !user.user_id && <Storage data={data} />}
                </>
                <About data={data} />
                {data.reviews.length > 0 ? <Reviews data={data.reviews} /> : <></>}
                <Details data={data} />
            </div>
                {data.activities.length > 0 ? <Activity data={data.activities} /> : <></>}
                {data.similar.length > 0 ? <More data={data.similar} /> : <></>}
            </>}
        </main>
    );
}

export default Item;
