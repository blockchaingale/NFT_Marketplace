import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './header/header';
import NFTs from './nfts/nfts';
import Profile from './profile/profile';
import Orders from './orders/orders';
import Create from './collections/create/create';
import Activities from './activities/activities';
import { useSelector } from 'react-redux';

const Merchant = () => {
    const user = useSelector((state) => state.auth.user);

    return (
        <>
            <Header />
            <main>
                {!user.active && <p className='warning'>Your Account has been deactivated</p>}
                {!user.kyb && <p  className='warning'>Limited functionality as KYC/KYB has not been completed</p>}
            <Routes>
                <Route path="items" element={<NFTs />} />
                <Route path="sold" element={<Orders />} />
                <Route path="activities" element={<Activities />} />
                <Route path="creator" element={<Create />} />
                <Route path="profile" element={<Profile />} />
                <Route path={"*"} element={<Navigate replace to="items" />} />
            </Routes>
            </main>
        </>
    );
}

export default Merchant;
