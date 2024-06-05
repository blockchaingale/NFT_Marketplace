import styles from "./sections.module.css"
import PropTypes from "prop-types";
import Nftcard from '../../cards/nfts/nftcard';
import { useEffect, useState } from "react";
import { getCategory } from "../helper";
import Nftloading from "../../load/nftloading";
import { useSelector } from "react-redux";


const Sections = ({ name }) => {
    const { dark } = useSelector(
        (state) => state.mode
      );
const [items, setItems] = useState([])
const [loading, setLoading] = useState(true)
const {  message } = useSelector(
    (state) => state.notification
  );
    useEffect(() => {
        let abortcontroller;
        (async function(){
            setLoading(true)
            abortcontroller = new AbortController()
            const res = await getCategory(name.toLowerCase().includes("jewelry") ? "jewelry" : name.toLowerCase().includes("physical") ? "physical" : name.toLowerCase().includes("digital") ? "digital" : name.toLowerCase())
            setItems(res.items.splice(0, 7));
            setLoading(false)
        })()
        return () => {
            abortcontroller.abort()
        };
    }, [name, message])
    

    return (
        <div className={styles.section}>
            <h3>{name}</h3>

            <div>
                {items.length == 0 && <p style={{color : dark ? "#fff" : "black"}}>No item found in this category</p>}
                <div className={styles.slider}>
                    {loading && <Nftloading />}
                    {!loading && items.map((item, index) => {
                        return <Nftcard key={index} item={item} />
                    })}
                </div>
            </div>
        </div>
    );
}

export default Sections;
Sections.propTypes = {
    name: PropTypes.string,
};
