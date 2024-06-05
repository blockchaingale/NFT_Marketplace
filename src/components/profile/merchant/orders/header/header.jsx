
import { useState } from "react";
import { getImageUrl } from "../../../../../helpers/utils";
import PropTypes from "prop-types"; 
import { useSelector } from "react-redux";

import styles from "./header.module.css"

const Header = ({search, setSearch, status, setStatus}) => {

    const [filter, setFilter] = useState(false)

    const { dark } = useSelector(
        (state) => state.mode
    );
    return (
        <div className={`${styles.header} ${dark ? styles.dark : ""}`}>
            <div className={styles.top}>
                <h3>My Orders</h3>
                <div className={styles.search}>
                    <img loading="lazy" src={getImageUrl("esearch.png")} alt="search" />
                    <input type="text" placeholder='Search by Product Name' value={search} onChange={(e)=>setSearch(e.target.value)}/>
                </div>
            </div>
            <div className={styles.item} onClick={()=>setFilter((prevState)=>!prevState)}>
                        <div className={styles.tog}><img loading="lazy" src={getImageUrl("filter.png")} alt="explore" /><p>Filter</p></div>
                        <img loading="lazy" src={getImageUrl("angle.png")} alt="angle" />
                    </div>
            <div className={`${styles.filter} ${filter ? styles.show : ""}`}>
                <div className={styles.status}>
                    <p>Status</p>
                    <div>
                        <button onClick={()=>setStatus("All")} className={status === "All" ? styles.active : ""}>All</button>
                        <button onClick={()=>setStatus("Requested")} className={status === "Requested" ? styles.active : ""}>Ship Requested</button>
                        <button onClick={()=>setStatus("Shipped")} className={status === "Shipped" ? styles.active : ""}>Shipped</button>
                    </div>
                </div>
              

            </div>

        </div>
    );
}

export default Header;
Header.propTypes = {
    search: PropTypes.string,
    status: PropTypes.string,
    setSearch: PropTypes.func,
    setStatus: PropTypes.func
};