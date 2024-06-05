import {  useNavigate } from "react-router-dom";

import styles from "./reset.module.css";
import { useDispatch, useSelector } from "react-redux";
import { recover } from "../helper";

const Reset = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRecover = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    recover(dispatch, form, navigate);
  };

  const { dark } = useSelector(
    (state) => state.mode
);
  return (
    <div className={`${styles.login} ${dark ? styles.dark : ""}`}>
      <h3>Forgot Admin Password</h3>

      <form className={styles.form} onSubmit={handleRecover}>
        <label>
          Email
          <input
            name="email"
            type="email"
            placeholder="189652@gmail.com"
            required
          />
        </label>

        <button>Submit</button>
      </form>
   
    </div>
  );
};


export default Reset;