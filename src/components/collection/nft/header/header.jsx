import { useState } from "react";
import styles from "./header.module.css"
import { getImageUrl } from "../../../../helpers/utils";
import DropDown from '../../../categories/dropDown/dropDown';

const Header = () => {
    const [selected, setSelected] = useState("Top Volume")
    const [status, setStatus] = useState("All")
    const [filter, setFilter] = useState(false)

    return (
        <div className={styles.header}>
            <div className={styles.top}>
                <h3>Listings</h3>
                <div className={styles.search}>
                    <img loading="lazy" src={getImageUrl("esearch.png")} alt="search" />
                    <input type="text" placeholder='Search by Product Name' />
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
                        <button onClick={()=>setStatus("New")} className={status === "New" ? styles.active : ""}>New</button>
                        <button onClick={()=>setStatus("Has Offers")} className={status === "Has Offers" ? styles.active : ""}>Has Offers</button>
                    </div>
                </div>
                <div className={styles.price}>
                    <p>Price</p>
                    <div>
                        <input type="number" onWheel={(e) => e.target.blur()} placeholder="Min Price" />
                        <input type="number" onWheel={(e) => e.target.blur()} placeholder="Max Price" />
                    </div>
                </div>
                <DropDown selected={selected} setSelected={setSelected} />

            </div>

        </div>
    );
}

export default Header;
