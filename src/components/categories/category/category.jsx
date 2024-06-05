import { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import styles from "./category.module.css"
import Nftcard from '../../cards/nfts/nftcard';
import { getCategory } from '../../home/helper';
import Nftloading from '../../load/nftloading';
import AppPagination from '../../pagination/pagination';
import {  useSelector } from "react-redux";

const Category = ({ name }) => {

    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [paginated, setPaginated] = useState([])
    const { dark } = useSelector(
        (state) => state.mode
      );
    useEffect(() => {
        let abortcontroller;
        (async function () {
            setLoading(true) 
            abortcontroller = new AbortController()
            const res = await getCategory(name.toLowerCase().includes("jewelry") ? "jewelry" : name.toLowerCase().includes("physical") ? "physical" : name.toLowerCase().includes("digital") ? "digital" : name.toLowerCase())
            setItems(res.items.splice(0, 7));
            setLoading(false)
        })()
        return () => {
            abortcontroller.abort()
        };
    }, [name])

    return (
        <div>
            <div className={styles.section}>
                <h3>{name}</h3>
            </div>
            <div className={styles.slider}>
                {paginated.length === 0 && !loading && <p style={{color : dark ? "#fff" : "black"}}>No item found in this category</p>}
                {loading && <Nftloading />}
                {!loading && paginated.map((item, index) => {
                    return <Nftcard key={index} item={item} />
                })}
            </div>
            <div className={styles.paginationContainer}>
              <AppPagination callback={setPaginated} rawData={items} pageSize={28} />
            </div>
        </div>
    );
}

export default Category;
Category.propTypes = {
    name: PropTypes.string,
};

