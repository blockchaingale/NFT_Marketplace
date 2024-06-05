import { Link, useNavigate } from "react-router-dom";

import styles from "./login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../helper";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    login(dispatch, form, navigate);
  };

  const { dark } = useSelector(
    (state) => state.mode
);
  return (
    <div className={`${styles.login} ${dark ? styles.dark : ""}`}>
      <h3>Merchant Account Sign in</h3>
      <div>
        <p>New here?</p>
        <Link to="/auth/merchant/signup">Create Merchant account</Link>
      </div>
      <form className={styles.form} onSubmit={handleLogin}>
        <label>
          Business Email
          <input
            name="email"
            type="email"
            placeholder="mystore@gmail.com"
            required
          />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            placeholder="*****************"
            required
          />
        </label>
        <span>
          Minimum of 6 characters, atleast 1 uppercase and 1 special character
        </span>
        <button>Sign in</button>
      </form>
      <div>
        <p>Forgotten you password?</p>
        <Link to="/auth/merchant/reset">Click here</Link>
      </div>
    </div>
  );
};
export default Login;
