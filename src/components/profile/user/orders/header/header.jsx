
import { useState } from "react";
import { getImageUrl } from "../../../../../helpers/utils";
import styles from "./header.module.css"
import PropTypes from "prop-types"; 
import { useSelector } from "react-redux";

const Header = ({search, setSearch, status, setStatus}) => {
    const [filter, setFilter] = useState(false)
    const { dark } = useSelector(
        (state) => state.mode
    );
    return (
        <div className={`${styles.header} ${dark ? styles.dark : ""}`}>
            <div className={styles.top}>
                <h3>Items</h3>
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
                        <button onClick={()=>setStatus("Listed")} className={status === "Listed" ? styles.active : ""}>Listed</button>
                        <button onClick={()=>setStatus("Available")} className={status === "Available" ? styles.active : ""}>Available</button>
                        <button onClick={()=>setStatus("Redeemed")} className={status === "Redeemed" ? styles.active : ""}>Redeemed</button>
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