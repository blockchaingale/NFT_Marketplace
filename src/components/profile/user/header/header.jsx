import styles from "./header.module.css"
import { useLocation, useNavigate } from "react-router-dom";
import { useAccount, useDisconnect } from "wagmi";
import { logout } from "../helper";
import { useDispatch, useSelector } from "react-redux";
import ValidImage from '../../../validImage/validImage';
import { getImageUrl } from "../../../../helpers/utils";
 
const Header = () => {
    const {pathname} = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const authState = useSelector((state) => state.auth.loggedIn);
    const { dark } = useSelector(
        (state) => state.mode
    );
    const {isConnected, address} = useAccount()
    const user = useSelector((state) => state.auth.user);
    const {disconnect} = useDisconnect()

    return (
        <div className={`${styles.header} ${dark ? styles.dark : ""}`}>
            <div>
                <ValidImage link={user.image} alt="avatar" fallback={getImageUrl("pavatar.png")} />
                <div>
                    <h3>{isConnected ? `${address.slice(0, 10)}...${address.slice(address.length-10, address.length)}` : "Not Connected"}</h3>
                    <span>Your address</span>
                    <p onClick={()=>logout(dispatch, navigate, authState, disconnect)}>Logout</p>
                </div>
            </div>
            <div className={styles.menu}>
                <li onClick={()=>navigate("/profile/user/items")} className={pathname === "/profile/user/items" ? styles.active : ""}>Items</li>
                <li onClick={()=>navigate("/profile/user/activities")} className={pathname === "/profile/user/activities" ? styles.active : ""}>Activities</li>
                <li onClick={()=>navigate("/profile/user/settings")} className={pathname === "/profile/user/settings" ? styles.active : ""}>Settings</li>
            </div>
        </div>
    );
}

export default Header;
