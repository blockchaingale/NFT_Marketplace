import { useRef, useState } from "react";
import { getImageUrl } from "../../../helpers/utils";
import styles from "./search.module.css"
import PropTypes from "prop-types";
import useOutsideAlerter from '../../../hooks/useOutsideClick';
import { useNavigate } from "react-router-dom";
import ValidImage from '../../validImage/validImage';
import { useSelector } from "react-redux";


const Search = ({ type, setMenu }) => {
    const [search, setSearch] = useState("")
    const [sea, setSea] = useState([])
    const ref = useRef(null);
    const conRef = useRef(null);
    const sref = useRef(null);
    const sconRef = useRef(null);
    const { search: mysearch } = useSelector((state) => state.others);

    useOutsideAlerter(ref, conRef, () => setMenu(false));
    useOutsideAlerter(sref, sconRef, () => setSearch(""));
    const navigate = useNavigate()

    const handleSearch = (e) => {
        setSearch(e.target.value)
        const arr = mysearch.filter((item) => item.name.toLowerCase().includes(e.target.value.toLowerCase()))
        setSea(arr)
    }
    const { dark } = useSelector(
        (state) => state.mode
    );
    return (

        <div className={`${styles.container} ${dark ? styles.dark : ""}`}>
            <div className={`${styles.search} ${type === "mobile" ? styles.mob : ""}`}>
                <img loading="lazy" src={getImageUrl(type === "mobile" ? "msearch.png" : "search.png")} alt="search" />
                <input className={type === "mobile" ? styles.mob : ""} ref={sconRef} type="text" placeholder="Search Item, Merchants" value={search} onChange={handleSearch} />
            </div>
            <div ref={sref} className={search.length > 0 ? styles.active : ""}>
                {sea.length === 0 && <p style={{ color: "#FFF", fontSize: 12, fontFamily: "Montserrat" }}>No search result</p>}
                {sea.length > 0 && sea.map((item, index) => {
                    return <div onClick={() => { navigate(`${item.item_id ? "/item/" + item.item_id : "/merchants/" + item.merchant_id}`); setSearch("") }} key={index}>
                        <ValidImage link={item.image} alt={item.name} fallback={getImageUrl("photo.png")}/>
                        <li >{item.name}</li>
                    </div>
                })}
            </div>
        </div>
    );
}

export default Search;
Search.propTypes = {
    type: PropTypes.string,
    setMenu: PropTypes.func
};

