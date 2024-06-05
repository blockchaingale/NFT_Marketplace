import styles from "./header.module.css"
import { useLocation, useNavigate } from "react-router-dom";
import { getImageUrl } from '../../../helpers/utils';
import { logout } from "../auth/helper";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
    const {pathname} = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const authState = useSelector((state) => state.auth.loggedIn);
    const { dark } = useSelector(
        (state) => state.mode
    );

    return (
        <div className={`${styles.header} ${dark ? styles.dark : ""}`}>
            <div>
                <img src={getImageUrl("pavatar.png")} alt="avatar" />
                <div>
                    <h3>Admin</h3>
                    <p onClick={()=>logout(dispatch, navigate, authState)}>Logout</p>
                </div>
            </div>
            <div className={styles.menu}>
                <ul>
                <li onClick={()=>navigate("/myadmin/dashboard")} className={pathname === "/myadmin/dashboard" ? styles.active : ""}>Dashboard</li>
                <li onClick={()=>navigate("/myadmin/users")} className={pathname === "/myadmin/users" ? styles.active : ""}>Users</li>
                <li onClick={()=>navigate("/myadmin/merchants")} className={pathname === "/myadmin/merchants" ? styles.active : ""}>Merchants</li>
                <li onClick={()=>navigate("/myadmin/sales")} className={pathname === "/myadmin/sales" ? styles.active : ""}>Sales</li>
                <li onClick={()=>navigate("/myadmin/transactions")} className={pathname === "/myadmin/transactions" ? styles.active : ""}>Transactions</li>
                <li onClick={()=>navigate("/myadmin/settings")} className={pathname === "/myadmin/settings" ? styles.active : ""}>Settings</li>
           
                </ul>
                </div>
        </div>
    );
}

export default Header;
