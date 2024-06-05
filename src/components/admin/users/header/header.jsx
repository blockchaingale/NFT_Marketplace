
import { getImageUrl } from "../../../../helpers/utils";
import styles from "./header.module.css"
import PropTypes from "prop-types";

const Header = ({search, setSearch}) => {
    return (
        <div className={styles.header}>
        <h3>Users</h3>
        <div className={styles.search}>
            <img loading="lazy" src={getImageUrl("esearch.png")} alt="search" />
            <input type="text" placeholder='Search' value={search} onChange={(e)=>setSearch(e.target.value)}/>
        </div>

    </div>
    );
}

export default Header;
Header.propTypes = {
    search: PropTypes.string,
    setSearch: PropTypes.func
};