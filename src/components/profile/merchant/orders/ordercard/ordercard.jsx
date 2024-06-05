import styles from "./ordercard.module.css"
import PropTypes from "prop-types";
import { getImageUrl, numberToTwoDecimals } from "../../../../../helpers/utils";
import CTE from "react-click-to-edit"
import { useRef, useState } from "react";
import DropDown from '../../../../categories/dropDown/dropDown';
import useOutsideAlerter from '../../../../../hooks/useOutsideClick';
import { useDispatch, useSelector } from "react-redux";
import { updateStatus, updateStorage } from "../../helper";
import ValidImage from '../../../../validImage/validImage';

const Ordercard = ({ item }) => {
    const [monthly, setMonthly] = useState(item.monthly)
    const [yearly, setYearly] = useState(item.yearly)
    const [shipingStatus, setShipingStatus] = useState(item.status)
    const [pop, setPop] = useState(false)
    const popper = useRef(null)
    const { rate: { matic } } = useSelector(
        (state) => state.others
    );
    const { dark } = useSelector(
        (state) => state.mode
    );
    const dispatch = useDispatch()

    const now = new Date().getTime()
    const dt = new Date(item.storage_due).getTime()
    const time = (dt - now) / 86400000
    useOutsideAlerter(popper, popper, ()=>setPop(false))
    const authState = useSelector((state) => state.auth.loggedIn);


    const handleStorage = async ()=>{
        await updateStorage(dispatch, {monthly, yearly, item_id: item.item_id}, authState)
    }
    return (
        <div className={`${styles.container} ${dark? styles.dark : ""}`}>
            <div style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }} className={styles.card}>
                <div className={styles.overlay}>
                    <ValidImage src={item.image} fallback={JSON.parse(item.images)[0]} />
                    <div>
                        <div className={styles.top}>
                            <p>{item.name}</p>
                        </div>
                        <div className={styles.dets}>
                            <div>
                                <p>${numberToTwoDecimals(item.price * matic)}</p>
                                <span>{item.price}MATIC</span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.stats}>
                {item.free == "paid" ? <div className={styles.storage}>
                    <div>
                        <img src={getImageUrl("storage.png")} alt="storage" />
                        <p>Storage</p>
                    </div>
                    <div className={styles.info}>
                        <div>
                            <span>Current Balance</span>
                            <p>{numberToTwoDecimals(time)} days</p>
                        </div>
                        <div>
                            <span>Total being Owed</span>
                            <p>${numberToTwoDecimals(item.daily * time)}</p>

                        </div>
                        
                        <div>
                            <span>Monthly rate ($)</span>
                            <CTE
                                wrapperClass="wrapper"
                                textClass={styles.editor}
                                initialValue={monthly}
                                endEditing={(e) => setMonthly(e)}
                            />
                        </div>
                        <div>
                            <span>Yearly rate ($)</span>
                            <CTE
                                wrapperClass="wrapper"
                                textClass={styles.editor}
                                initialValue={yearly}
                                endEditing={(e) => setYearly(e)}
                            />
                        </div>
                        <button onClick={handleStorage}>Update</button>
                    </div>
                </div> : <div className={styles.storage}></div>}
                <div className={styles.shipping}>
                    <div>
                        <img src={getImageUrl("plane.png")} alt="plane" />
                        <p>Shipping</p>
                    </div>
                    {item.redeemed ? <div className={styles.sail}>
                        <div>
                            <span>Satus</span>
                            <p>{item.redeemed}</p>
                            <a ref={popper} onClick={()=>setPop(true)}>View Shipping Info</a>
                        </div>
                        <div>
                            <div>
                                <label>
                                    Shipping Fee And Estimated Delivery time:
                                </label>
                            </div>
                            <button onClick={()=>window.open(`mailto:${item.email? item.email : item.memail}?cc=founder@trumart.com`)}>Send Quote</button>
                        </div>
                        
                        <div>
                            <DropDown setSelected={setShipingStatus} selected={shipingStatus} data={["pending", "shipped", "delivered"]} />
                            <button onClick={()=>updateStatus(dispatch, {item_id : item.item_id, status: shipingStatus}, authState)}>Update Status</button>
                        </div>
                    </div> : <p className={styles.not}>Shipping Not Requested</p>}
                </div>
            </div>
            <div className={`${styles.shippingpop} ${pop ? styles.pop : ""}`}>
                <div>
                    <span>Name</span>
                    <p>{item.first_name} {item.last_name}</p>
                </div>
                <div>
                    <span>Contact Email</span>
                    <p>{item.email}</p>
                </div>
                <div>
                    <span>Street</span>
                    <p>{item.street ? item.street : item.mstreet}</p>
                </div>
                <div>
                    <span>City</span>
                    <p>{item.city ? item.city : item.mcity}</p>
                </div>
                <div>
                    <span>State</span>
                    <p>{item.state ? item.state : item.mstate}</p>
                </div>
                <div>
                    <span>Country</span>
                    <p>{item.country ? item.country : item.mcountry}</p>
                </div>
                <div>
                    <span>Postal Code</span>
                    <p>{item.postal ? item.postal : item.mpostal}</p>
                </div>

            </div>
        </div>
    );
}

export default Ordercard;
Ordercard.propTypes = {
    item: PropTypes.object,
};