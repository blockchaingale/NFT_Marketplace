import { Navigate, Route, Routes } from "react-router-dom";
import Login from './login/login';
import Signup from './signup/signup';
import Reset from './reset/reset';
import SetPassword from './setPassword/setPassword';
import Verify from './verify/verify';

const MerchantAuth = () => {
    return <>

    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="reset" element={<Reset />} />
      <Route path="set-password" element={<SetPassword />} />
      <Route path="verify/:token" element={<Verify />} />
      <Route path={"*"} element={<Navigate replace to="login" />} />
    </Routes>
  </>
}

export default MerchantAuth;
