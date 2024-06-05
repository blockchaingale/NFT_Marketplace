import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
export const UserRoutes = () => {
  const user = useSelector((state) => state.auth.user);
  return user.user_id ? <Outlet /> : <Navigate to="/auth/login" />;
};
export const MerchatRoutes = () => {
  const user = useSelector((state) => state.auth.user);

  return user.merchant_id ? <Outlet /> : <Navigate to="/auth/login" />;
};

export const AdminRoutes = () => {
  const user = useSelector((state) => state.auth.user);
  return user.admin_id ? <Outlet /> : <Navigate to="/myadmin/login" />;
};

