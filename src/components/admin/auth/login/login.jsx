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
      <h3>Admin</h3>
      <div>
      </div>
      <form className={styles.form} onSubmit={handleLogin}>
        <label>
          Email
          <input
            name="email"
            type="email"
            placeholder="189652@gmail.com"
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
       
        <button>Sign in</button>
      </form>
      <div>
        <p>Forgotten you password?</p>
        <Link to="/myadmin/reset">Click here</Link>
      </div>
    </div>
  );
};
export default Login;
