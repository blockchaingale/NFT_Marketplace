import { Link, useNavigate } from "react-router-dom";

import styles from "./signup.module.css";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../helper";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    signup(dispatch, form, navigate);
  };
  const { dark } = useSelector(
    (state) => state.mode
);
  return (
    <div className={`${styles.login} ${dark ? styles.dark : ""}`}>
      <h3>Create Merchant Account</h3>


      <form className={styles.form} onSubmit={handleSignup}>
        <label>
          Business name
          <input name="name" type="text" placeholder="My Business" required />
        </label>
        <label>
          Email
          <input
            name="email"
            type="email"
            placeholder="mystore@gmail.com"
            required
          />
        </label>
        <div className={styles.formFlex}>
          <label>
            Your first name
            <input name="first_name" type="text" placeholder="John" required />
          </label>
          <label>
            Your last name
            <input name="last_name" type="text" placeholder="Doe" required />
          </label>
        </div>
        <div className={styles.formFlex}>
          <label>
            Street name
            <input name="street" type="text" placeholder="Store street" required />
          </label>
          <label>
            City name
            <input name="city" type="text" placeholder="Store city" required />
          </label>
        </div>

        <div className={styles.formFlex}>
          <label>
            State
            <input name="state" type="text" placeholder="Store state" required />
          </label>
          <label>
            Country
            <input name="country" type="text" placeholder="Store country" required />
          </label>
        </div>

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
        <button>Sign Up</button>
      </form>
      <div>
        <p>Have an account?</p>
        <Link to="/auth/merchant/login">Sign in</Link>
      </div>
      <div>
        <span>By creating an account, you agree to our </span>
        <Link to="/">Privacy Statement and Terms of Service.</Link>
      </div>
    </div>
  );
};

export default Signup;