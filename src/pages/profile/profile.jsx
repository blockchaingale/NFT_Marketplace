import { Navigate, Route, Routes } from "react-router-dom";
import User from "../../components/profile/user/user";
import Merchant from "../../components/profile/merchant/merchant";
import { MerchatRoutes, UserRoutes } from '../../helpers/privateRoute';


const Profile = () => {
    return (
        <>
            <Routes>
                <Route element={<UserRoutes />}>
                    <Route path="user/*" element={<User />} />
                </Route>
                {/* Seller */}
                <Route element={<MerchatRoutes />}>
                    <Route path="merchant/*" element={<Merchant />} />
                    <Route path={"*"} element={<Navigate replace to="user" />} />
                </Route>

            </Routes>
        </>
    );
}

export default Profile;
