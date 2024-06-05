import { Navigate, Route, Routes } from "react-router-dom";
import List from '../../components/merchants/list/list';
import Single from '../../components/merchants/single/single';


const Merchant = () => {
    return (
        <>
           <Routes>
                <Route path="" element={<List />} />
                <Route path=":id" element={<Single />} />
                <Route path={"*"} element={<Navigate replace to="" />} />
            </Routes> 
        </>
    );
}

export default Merchant;
