import { useState } from "react";
import { getImageUrl } from "../../../helpers/utils";
import styles from "./header.module.css"
import PropTypes from "prop-types"; 

const Header = ({search, setSearch}) => {
    const [filter, setFilter] = useState(false)

    return (
        <div className={styles.header}>
            <div className={styles.top}>
                <h3>Explore</h3>
                <div className={styles.search}>
                    <img loading="lazy" src={getImageUrl("esearch.png")} alt="search" />
                    <input type="text" placeholder='Search by Product Name' value={search} onChange={(e)=>setSearch(e.target.value)} />

                </div>
            </div>
            <div className={styles.item} onClick={()=>setFilter((prevState)=>!prevState)}>
                        <div className={styles.tog}><img loading="lazy" src={getImageUrl("filter.png")} alt="explore" /><p>Filter</p></div>
                        <img loading="lazy" src={getImageUrl("angle.png")} alt="angle" />
                    </div>
            <div className={`${styles.filter} ${filter ? styles.show : ""}`}>
                
                <div></div>

            </div>

        </div>
    );
}

export default Header;
Header.propTypes = {
    search: PropTypes.string,
    setSearch: PropTypes.func,
};