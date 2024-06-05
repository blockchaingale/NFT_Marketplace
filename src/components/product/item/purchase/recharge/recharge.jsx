import { useState } from "react";
import { getImageUrl, numberToTwoDecimals } from '../../../../../helpers/utils';
import Cardheader from "../../../cardheader/cardheader";
import { notificationActions } from "../../../../../store/notification/notification";

import styles from "./recharge.module.css"
import Slider from 'rc-slider';
import PropTypes from "prop-types";
import { recharge } from "../../helper";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
moment().format();

const Recharge = ({ data }) => {
    const [filter, setFilter] = useState("M")
    const [days, setDays] = useState(1)
    const now = new Date().getTime()
    const dt = new Date(data.storage_due).getTime()
    const momentA = moment(data.date)
    const momentB = moment(data.storage_due)
    console.log((momentA.diff(momentB, "days")/365) + data.maxyears);
    const time = (dt - now) / 86400000

    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.user);
    const { rate: {matic} } = useSelector(
        (state) => state.others
    );

    const handleRecharge = async () => {
        if (filter === "M" && days > ((momentA.diff(momentB, "days")/30) + data.maxyears * 12)) {
        dispatch(notificationActions.setNotify(true))
        dispatch(notificationActions.setMessage("Max number of storage months available is " + numberToTwoDecimals((momentA.diff(momentB, "days")/30) + data.maxyears * 12)))
        return

            
        } else if (filter === "Y" && days > ((momentA.diff(momentB, "days")/365) + data.maxyears)) {
            //dispatch
            dispatch(notificationActions.setNotify(true))
            dispatch(notificationActions.setMessage("Max number of storage years available is " + numberToTwoDecimals((momentA.diff(momentB, "days")/365) + data.maxyears)))
            return
        }
        await recharge(dispatch, data, 
            user.user_id ? user.user_id : user.merchant_id, 
            filter === "M" ? "monthly" : "yearly", 
            days * (filter === "M" ? data.monthly : data.yearly) / matic,
        )
    }
    const { dark } = useSelector(
        (state) => state.mode
      );
    return (
        <div className={`${styles.storage} ${dark ? styles.dark : ""}`}>
            <Cardheader name="Storage" image={getImageUrl("storage.png")} />
            <div className={styles.content}>
                <div>
                    <p> Rate <span>${numberToTwoDecimals( filter === "M" ? data.monthly : data.yearly)} / {filter === "M" ? "month" : "year"}</span></p>
                    <div className={styles.filter}>
                        <button onClick={() => { setFilter("M") }} className={filter === "M" ? styles.active : ""}>M</button>
                        <button onClick={() => { setFilter("Y") }} className={filter === "Y" ? styles.active : ""}>Y</button>
                    </div>
                </div>
                <div>
                    <div>
                        <span>Current Balance</span>
                        <p>{numberToTwoDecimals(time)} days</p>
                    </div>
                    <div>
                        <span>Purchase</span>
                        <p>{days} { filter === "M" ? "month(s)" : "year(s)"}</p>
                    </div>
                    <div>
                        <span>New Balance</span>
                        <p>{numberToTwoDecimals((time) + ( filter === "M" ? days * 30 : days * 365))} day(s)</p>
                    </div>
                    <div>
                        <span>Fee</span>
                        <p>10%</p>
                    </div>
                    <div>
                        <span>Total to pay</span>
                        <p>$({ filter === "M" ? numberToTwoDecimals(data.monthly * days) : numberToTwoDecimals(data.yearly * days)})</p>
                    </div>
                </div>
                <>
                    <Slider onChange={(e) => setDays(e)} 
                    handleStyle={{ background: "#E90404", borderColor: "none", top: 6, boxShadow: "none", width: 15, height: 15, }} 
                    railStyle={{ background: "rgba(255, 147, 147, 0.10)", height: 8 }} 
                    dotStyle={{ borderColor: "#E90404", width: 10, height: 10, top: -2 }} 
                    trackStyle={{ background: "#E90404", height: 8 }} 
                    min={0} 
                    max={12} 
                    marks={{ "0": `1 ${filter === "M" ? "Month" : "Year"}`, "12": `${"12"} ${filter === "M" ? "Months" : "Years"}` }} />
                </>
                <button onClick={handleRecharge} className={styles.recharge}>Recharge Storage</button>

            </div>
        </div>
    );
}

export default Recharge;
Recharge.propTypes = {
    data: PropTypes.object,
};