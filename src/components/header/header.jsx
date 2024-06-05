import styles from "./header.module.css"
import Search from "./search/search";
import { getImageUrl } from '../../helpers/utils';
import { Link, useNavigate } from "react-router-dom";
import Categories from "./categories/categories";
import { useRef, useState } from "react";
import useWindowDimensions from '../../hooks/useWindowDimension';
import useOutsideAlerter from "../../hooks/useOutsideClick";
import { useDispatch, useSelector } from "react-redux";
import { checkoutActions } from "../../store/checkout/checkout";
import { HideScroll } from "react-hide-on-scroll";
import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/react";
import { modeActions } from "../../store/mode/mode";

const Header = () => {
    const [open, setOpen] = useState(false)
    const [prof, setProf] = useState(false)
    const [menu, setMenu] = useState(false)
    const authState = useSelector((state) => state.auth.loggedIn);
    const user = useSelector((state) => state.auth.user);
    const { open: openConnect } = useWeb3Modal()

    const { isConnected } = useAccount()
    const { width } = useWindowDimensions()
    const { dark } = useSelector(
        (state) => state.mode
    );
    const toggleRef = useRef(null)
    const menuRef = useRef(null)
    useOutsideAlerter(menuRef, toggleRef, () => setMenu(false))
    const navigate = useNavigate()
    const dispatch = useDispatch()
    return (
        <>
            <header
                style={{
                    backgroundImage: `url(/images/home.png)`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                }} className={styles.header}>
                <div className={styles.overlay}>
                    <div className={styles.top}>
                        <div className={styles.logo} onClick={() => window.open("https://trumart.com")}>
                            <img loading="lazy" src={getImageUrl("logo.gif")} alt="logo" />
                            <h3>Storefronts</h3>
                        </div>
                        <div className={styles.other}>
                            <div>
                                <Link to="/merchants">Merchants</Link>
                                <Link to="/explore">Explore</Link>
                                <a href="https://www.trumart.com/news" target="_blank" rel="noreferrer">News</a>
                            </div>
                            {width > 700 && <Search />}
                            <button onClick={() => authState.state ? openConnect({ route: isConnected ? "Account" : "ConnectWallet" }) : navigate("/auth")} className={styles.login}>{authState.state && isConnected ? "Disconnet Wallet" : authState.state ? "Connect Wallet" : "Login/Signup"}</button>
                            {authState.state && <button onClick={() => user.user_id ? navigate("/profile/user") : navigate("/profile/merchant/items")} className={styles.avatar}>
                                <img loading="lazy" src={getImageUrl("pavatar.png")} alt="cart" />
                            </button>}
                            <button onClick={() => dispatch(checkoutActions.setPop(true))} className={styles.cart}>
                                <img loading="lazy" src={getImageUrl("cart.png")} alt="cart" />
                            </button>

                            <button ref={toggleRef} onClick={() => setMenu(true)} className={styles.menu}>
                                <img loading="lazy" src={getImageUrl("burger.png")} alt="menu" />
                            </button>

                            {width > 700 && <button onClick={() => dispatch(modeActions.setMode(!dark))} className={styles.cart}>
                                <img loading="lazy" src={getImageUrl(dark ? "light.png" : "dark.png")} alt="mode" />
                            </button>}

                        </div>
                    </div>
                    <HideScroll variant="down" showOnPageInit={true}>
                        <Categories />
                    </HideScroll>

                </div>
                <div ref={menuRef} className={`${styles.mobile} ${dark ? styles.dark : ""} ${menu ? styles.display : ""}`}>
                    <div className={styles.item}>
                        <div className={styles.logo}>
                            <img loading="lazy" src={getImageUrl("logo.gif")} alt="logo" />
                            <h3></h3>
                        </div>
                        <button onClick={() => setMenu(false)} className={styles.mmenu}>
                            <img loading="lazy" src={getImageUrl("close.png")} alt="menu" />
                        </button>
                    </div>
                    <div className={styles.scontainer}>
                        <Search type="mobile" setMenu={setMenu} />
                    </div>
                    <div className={styles.item} onClick={() => { navigate("/explore"); setMenu(false) }}>
                        <div className={styles.tog}><img loading="lazy" src={getImageUrl("exp.png")} alt="explore" /><p>Explore</p></div>
                        <img loading="lazy" src={getImageUrl("angle.png")} alt="angle" />
                    </div>
                    <div className={styles.item} onClick={() => { window.open("https://www.trumart.com/news", "_blank"); setMenu(false) }}>
                        <div className={styles.tog}><img loading="lazy" src={getImageUrl("news.png")} alt="explore" /><p>News & Updates</p></div>
                        <img loading="lazy" src={getImageUrl("angle.png")} alt="angle" />
                    </div>
                    <div className={styles.item} onClick={() => { navigate("/merchants"); setMenu(false) }}>
                        <div className={styles.tog}><img loading="lazy" src={getImageUrl("shop.png")} alt="merchants" /><p>Merchants</p></div>
                        <img loading="lazy" src={getImageUrl("angle.png")} alt="angle" />
                    </div>
                    <div className={styles.drop}>
                        <div className={styles.dheader} onClick={() => setOpen((prevState) => !prevState)}>
                            <div className={styles.tog}><img loading="lazy" src={getImageUrl("cat.png")} alt="categories" /><p>Categories</p></div>
                            <img loading="lazy" src={getImageUrl("angle.png")} alt="angle" />
                        </div>
                        <div className={`${styles.down} ${open ? styles.show : ""}`}>
                            <div onClick={() => { navigate("/category/automobile"); setMenu(false) }}><p>Automobile</p> <img loading="lazy" src={getImageUrl("angle.png")} alt="auto" /></div>
                            <div onClick={() => { navigate("/category/accessories"); setMenu(false) }}><p>Collectibles</p> <img loading="lazy" src={getImageUrl("angle.png")} alt="auto" /></div>
                            <div onClick={() => { navigate("/category/collectibles"); setMenu(false) }}><p>Jewelry & Watches</p> <img loading="lazy" src={getImageUrl("angle.png")} alt="auto" /></div>
                            <div onClick={() => { navigate("/category/memorabilia"); setMenu(false) }}><p>Memorabilia</p> <img loading="lazy" src={getImageUrl("angle.png")} alt="auto" /></div>
                            <div onClick={() => { navigate("/category/physical"); setMenu(false) }}><p>Physical Art</p> <img loading="lazy" src={getImageUrl("angle.png")} alt="auto" /></div>
                            <div onClick={() => { navigate("/category/digital"); setMenu(false) }}><p>Digital Art</p> <img loading="lazy" src={getImageUrl("angle.png")} alt="auto" /></div>
                            <div onClick={() => { navigate("/category/charitable"); setMenu(false) }}><p>Charitable</p> <img loading="lazy" src={getImageUrl("angle.png")} alt="auto" /></div>
                            <div onClick={() => { navigate("/category/service"); setMenu(false) }}><p>Service</p> <img loading="lazy" src={getImageUrl("angle.png")} alt="auto" /></div>
                            <div onClick={() => { navigate("/category/others"); setMenu(false) }}><p>Others</p> <img loading="lazy" src={getImageUrl("angle.png")} alt="auto" /></div>
                        </div>
                    </div>
                    <div className={styles.drop}>
                        <div className={styles.dheader} onClick={() => setProf((prevState) => !prevState)}>
                            <div className={styles.tog}><img loading="lazy" src={getImageUrl("prof.png")} alt="categories" /><p>Profile</p></div>
                            <img loading="lazy" src={getImageUrl("angle.png")} alt="angle" />
                        </div>
                        {user.user_id ?
                            <div className={`${styles.down} ${prof ? styles.show : ""}`}>
                                <div onClick={() => { navigate("/profile/user/items"); setMenu(false) }}><p>My Items</p> <img loading="lazy" src={getImageUrl("angle.png")} alt="auto" /></div>
                                <div onClick={() => { navigate("/profile/user/activities"); setMenu(false) }}><p>Activities</p> <img loading="lazy" src={getImageUrl("angle.png")} alt="auto" /></div>
                                <div onClick={() => { navigate("/profile/user/settings"); setMenu(false) }}><p>Settings</p> <img loading="lazy" src={getImageUrl("angle.png")} alt="auto" /></div>
                            </div> : user.merchant_id ?
                                <div className={`${styles.down} ${prof ? styles.show : ""}`}>
                                    <div onClick={() => { navigate("/profile/merchant/items"); setMenu(false) }}><p>My Items</p> <img loading="lazy" src={getImageUrl("angle.png")} alt="auto" /></div>
                                    <div onClick={() => { navigate("/profile/merchant/sold"); setMenu(false) }}><p>Orders</p> <img loading="lazy" src={getImageUrl("angle.png")} alt="auto" /></div>
                                    <div onClick={() => { navigate("/profile/merchant/creator"); setMenu(false) }}><p>Add Product</p> <img loading="lazy" src={getImageUrl("angle.png")} alt="auto" /></div>
                                    <div onClick={() => { navigate("/profile/merchant/profile"); setMenu(false) }}><p>Profile</p> <img loading="lazy" src={getImageUrl("angle.png")} alt="auto" /></div>
                                </div> : <></>
                        }

                    </div>

                    <button onClick={authState.state ? () => { setMenu(false); openConnect({ route: isConnected ? "Account" : "ConnectWallet" }) } : () => { setMenu(false); navigate("/auth") }} className={styles.mlogin}>{authState.state && isConnected ? "Disconnet Wallet" : authState.state ? "Connect Wallet" : "Login/Signup"}</button>
                    <button  onClick={() => dispatch(modeActions.setMode(!dark))} className={styles.cart}>
                        <img loading="lazy" src={getImageUrl(dark ? "light.png" : "dark.png")} alt="mode" />
                    </button>

                </div>
            </header>

        </>
    );
}

export default Header;
