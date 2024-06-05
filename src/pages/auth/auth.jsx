import Login from "../../components/auth/login/login";
import Reset from "../../components/auth/reset/reset";

import styles from "./auth.module.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Signup from '../../components/auth/signup/signup';
import SetPassword from "../../components/auth/setPassword/setPassword";
import Verify from "../../components/auth/verify/verify";
import MerchantAuth from "../../components/merchants/auth/merchantauth";

const Auth = () => {
  return (
    <main>
      <section className={styles.container}>
        <div className={styles.auth}>
          <Routes>
            <Route path="merchant/*" element={<MerchantAuth />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="reset" element={<Reset />} />
            <Route path="set-password" element={<SetPassword />} />
            <Route path="verify/:token" element={<Verify />} />
            <Route path={"*"} element={<Navigate replace to="login" />} />
          </Routes>
        </div>

      </section>
    </main>
  );
};

export default Auth;