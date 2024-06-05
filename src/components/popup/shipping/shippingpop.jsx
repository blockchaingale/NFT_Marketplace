import { useDispatch, useSelector } from "react-redux";
import styles from "./shippingpop.module.css"
import { getImageUrl } from '../../../helpers/utils';
import { popActions } from "../../../store/pops/pops";

const Shippingpop = () => {
  const dispatch = useDispatch()

  const { shipping } = useSelector(
    (state) => state.pop
  );
  const { dark } = useSelector(
    (state) => state.mode
);
  return (
    <div className={`${styles.overlay} ${shipping ? styles.soverlay : ""}  ${dark ? styles.dark : ""}`}>
      <div className={styles.checkout}>
        <h2>Request Shipping</h2>
        <p>Here you can request that the Item be shipped to you. The seller would add the shipping price and once you pay, your time would be shipped</p>
        <div>
          <form>
            <label>
            Full Name
              <div>
                <input type="text" placeholder="Joe Doe" />
              </div>
            </label>
            <label>
            House Number and Street Name
              <div>
                <input type="text" placeholder="No 15, John doe avenue" />
              </div>
            </label>
            <label>
             City
              <div>
                <input type="text" placeholder="Doe" />
              </div>
            </label>
            <label>
              State
              <div>
                <input type="text" placeholder="John" />
              </div>
            </label>
            <label>
            Postal Code
              <div>
                <input type="number" onWheel={(e) => e.target.blur()} placeholder="904256"/>
              </div>
            </label>
            <label>
            Country
              <div>
                <input type="number" onWheel={(e) => e.target.blur()} placeholder="John Republic"/>
              </div>
            </label>
          </form>
        </div>
        <div className={styles.button}>
          <button onClick={() => dispatch(popActions.setShipping(false))}>Cancel</button>
          <button>Request</button>
        </div>
        <img loading="lazy" onClick={() => dispatch(popActions.setShipping(false))} src={getImageUrl("wclose.png")} alt="x" />
      </div>
    </div>
  );
}

export default Shippingpop;
