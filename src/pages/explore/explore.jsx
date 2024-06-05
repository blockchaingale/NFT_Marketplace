import { useEffect, useState } from "react";
import Header from "../../components/explore/header/header";
import Nfts from '../../components/explore/nfts/nfts';
import { getExplore } from "../../components/profile/merchant/helper";


const Explore = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        let abortcontroller;
        (async function () {
            setLoading(true)
            abortcontroller = new AbortController()
            const res = await getExplore()
            setData(res.items);
            setLoading(false)
        })()
        return () => {
            abortcontroller.abort()
        };
    }, [])

    return (
        <main>
            <Header search={search} setSearch={setSearch}/>
            <Nfts data={data} loading={loading} search={search}/>
        </main>
    );
}

export default Explore;
