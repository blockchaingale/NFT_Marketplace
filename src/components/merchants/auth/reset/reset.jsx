import { Link, useNavigate } from "react-router-dom";

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
      <h3>Forgot password</h3>
      <p>
      Enter the email associated with your trumart.com BUSINESS profile to receive an email to reset your password.
      </p>

      <form className={styles.form} onSubmit={handleRecover}>
        <label>
          Email
          <input
            name="email"
            type="email"
            placeholder="mystore@gmail.com"
            required
          />
        </label>

        <button>Submit</button>
      </form>
      <div>
        <span>By resetting your password, you agree to our</span>
        <Link to="/">Privacy Statement and Terms of Service.</Link>
      </div>
      <div>
        <p>New to Trumart?</p>
        <Link to="/auth/merchant/signup">Create an account</Link>
      </div>
      <div>
        <p>Have an account?</p>
        <Link to="/auth/merchant/login">Log in</Link>
      </div>
    </div>
  );
};


export default Reset;