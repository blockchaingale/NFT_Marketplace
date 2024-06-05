import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from '../../components/admin/dashboard/dashboard';
import Users from '../../components/admin/users/users';
import Orders from '../../components/admin/orders/orders';
import Transactions from '../../components/admin/transactions/transactions';
import Settings from '../../components/admin/settings/settings';
import Header from '../../components/admin/header/header';
import Login from '../../components/admin/auth/login/login';
import Reset from '../../components/admin/auth/reset/reset';
import SetPassword from '../../components/admin/auth/setPassword/setPassword';
import { AdminRoutes } from '../../helpers/privateRoute';
import Merchants from '../../components/admin/merchants/merchants';
const Myadmin = () => {
    return <>
        <Header />
        <main>
            <Routes>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="users" element={<Users />} />
                <Route path="merchants" element={<Merchants />} />
                <Route path="sales" element={<Orders />} />
                <Route path="transactions" element={<Transactions />} />
                <Route path="settings" element={<Settings />} />
                <Route path={"*"} element={<Navigate replace to="dashboard" />} />
            </Routes>
        </main>

    </>
}

const Admin = () => {
    return (
        <>
            <Routes>
                <Route path="login" element={<Login />} />
                <Route path="reset" element={<Reset />} />
                <Route path="set-password" element={<SetPassword />} />
                {/* Admin protected */}
                <Route element={<AdminRoutes />}>
                    <Route path={"/*"} element={<Myadmin />} />
                </Route>


            </Routes>
        </>

    );
}

export default Admin;
