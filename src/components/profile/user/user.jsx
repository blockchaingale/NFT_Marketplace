import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './header/header';
import Order from './orders/order';
import Activities from './activities/activities';
import Userprofile from './userprofile/userprofile';
import { useSelector } from 'react-redux';

const User = () => {
    const user = useSelector((state) => state.auth.user);

    return (
        <>
            <Header />
            <main>
                {!user.active && <p className='warning'>Your Account has been deactivated</p>}
                {!user.kyc && <p className='warning'>Limited functionality as KYC/KYB has not been completed</p>}
                <Routes>
                    <Route path="items" element={<Order />} />
                    <Route path="activities" element={<Activities />} />
                    <Route path="settings" element={<Userprofile />} />
                    <Route path={"*"} element={<Navigate replace to="items" />} />
                </Routes>
            </main>
        </>
    );
}

export default User;
