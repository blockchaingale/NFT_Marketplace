import styles from "./categories.module.css"
import { Link, useLocation } from 'react-router-dom';

const Categories = () => {
    const {pathname} = useLocation()
    return (
        <div className={styles.categories}>
            <div>
            <Link className={pathname === "/" ? styles.active : ""} to="/">All</Link>
            <Link className={pathname === "/category/automobile" ? styles.active : ""} to="/category/automobile">Automobile</Link>
            <Link className={pathname === "/category/accessories" ? styles.active : ""} to="/category/accessories">Jewelry & Watches</Link>
            <Link className={pathname === "/category/collectibles" ? styles.active : ""} to="/category/collectibles">Collectibles</Link>
            <Link className={pathname === "/category/memorabilia" ? styles.active : ""} to="/category/memorabilia">Memorabilia</Link>
            <Link className={pathname === "/category/physical" ? styles.active : ""} to="/category/physical">Physical Art</Link>
            <Link className={pathname === "/category/digital" ? styles.active : ""} to="/category/digital">Digital Art</Link>
            {/* <Link className={pathname === "/category/charitable" ? styles.active : ""} to="/category/charitable">Charitable</Link> */}
            <Link className={pathname === "/category/service" ? styles.active : ""} to="/category/service">Service</Link>
            <Link className={pathname === "/category/others" ? styles.active : ""} to="/category/others">Others</Link>
            </div>
        </div>
    );
}

export default Categories;
