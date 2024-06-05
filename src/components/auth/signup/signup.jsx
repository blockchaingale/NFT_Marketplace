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
    <div className={`${styles.login} ${dark ? styles.dark : ""}`} >
      <h3>Create your account</h3>
     
      
      <form className={styles.form} onSubmit={handleSignup}>
        <div className={styles.formFlex}>
          <label>
            First name
            <input name="first_name" type="text" placeholder="John" required />
          </label>
          <label>
            Last name
            <input name="last_name" type="text" placeholder="Doe" required />
          </label>
        </div>
        <label>
          Email
          <input
            name="email"
            type="email"
            placeholder="my189652@gmail.com"
            required
          />
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
        <button>Sign Up</button>
      </form>
      <div>
        <p>Have an account?</p>
        <Link to="/auth/login">Sign in</Link>
      </div>
      <div>
        <span>By creating an account, you agree to our </span>
        <Link to="/">Privacy Statement and Terms of Service.</Link>
      </div>
    </div>
  );
};

export default Signup;