import { Link, useNavigate } from "react-router-dom";

import styles from "./setPassword.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setPassword } from "../helper";

const SetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSetpassword = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    setPassword(dispatch, form, navigate);
  };
  const { dark } = useSelector(
    (state) => state.mode
);
  return (
    <div className={`${styles.login} ${dark ? styles.dark : ""}`} onSubmit={handleSetpassword}>
      <h3>Reset Merchant password</h3>
      <p>
        Enter the token from your BUSINESS email below with the new password you want for
        your BUSINESS account
      </p>
      <form className={styles.form}>
        <label>
          Email token
          <input name="token" type="text" placeholder="*******" required />
        </label>
        <div className={styles.formFlex}>
          <label>
            Password
            <input
              name="password"
              type="password"
              placeholder="*****************"
              required
            />
          </label>
          <label>
            Confirm password
            <input
              name="password2"
              type="password"
              placeholder="*****************"
              required
            />
          </label>
        </div>

        <span>
          Minimum of 6 characters, atleast 1 uppercase and 1 special character
        </span>
        <button>Submit</button>
      </form>
      <div>
        <p>Have an account?</p>
        <Link to="/auth/merchant/login">Sign in</Link>
      </div>
      <div>
        <p>New to Trumart?</p>
        <Link to="/auth/merchant/login">Create an account</Link>
      </div>
      <div>
        <span>By resetting your password, you agree to our </span>
        <Link to="/">Privacy Statement and Terms of Service.</Link>
      </div>
    </div>
  );
};

export default SetPassword;