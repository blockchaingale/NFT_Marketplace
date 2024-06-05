import styles from "./header.module.css"
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../helper";
import ValidImage from "../../../validImage/validImage";
import { useDisconnect } from "wagmi";
import { getImageUrl } from "../../../../helpers/utils";

const Header = () => {
    const {pathname} = useLocation()
    const navigate = useNavigate()
    const dispatch= useDispatch()
    const authState = useSelector((state) => state.auth.loggedIn);
    const user = useSelector((state) => state.auth.user);
    const { dark } = useSelector(
        (state) => state.mode
    ); 
    const {disconnect} = useDisconnect()

    return (
        <div className={`${styles.header} ${dark ? styles.dark : ""}`}>
            <div> 
                <ValidImage link={user.image} alt={user.name} fallback={getImageUrl("pavatar.png")}/>
                <div>
                    <h3>{user.name}</h3>
                    <span>Store Name</span>
                    <p onClick={()=>logout(dispatch, navigate, authState, disconnect)}>Logout</p>
                </div>
            </div>
            <div className={styles.menu}>
                <li onClick={()=>navigate("/profile/merchant/items")} className={pathname === "/profile/merchant/items" ? styles.active : ""}>Items</li>
                <li onClick={()=>navigate("/profile/merchant/sold")} className={pathname === "/profile/merchant/sold" ? styles.active : ""}>Sold</li>
                <li onClick={()=>navigate("/profile/merchant/activities")} className={pathname === "/profile/merchant/activities" ? styles.active : ""}>Activities</li>
                <li onClick={()=>navigate("/profile/merchant/creator")} className={pathname === "/profile/merchant/creator" ? styles.active : ""}>Add Product/NFT</li>
                <li onClick={()=>navigate("/profile/merchant/profile")} className={pathname === "/profile/merchant/profile" ? styles.active : ""}>Profile</li>
            </div>
        </div>
    );
}

export default Header;
