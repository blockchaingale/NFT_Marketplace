import Dougnut from './dougnut/dougnut';
import Profit from './profit/profit';
import Transaction from './transactions/transactions';
import styles from "./dashboard.module.css"
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getDashboard } from '../helper';

const Dashboard = () => {
    const [data, setData] = useState(false)
    const { rate: {matic} } = useSelector(
        (state) => state.others
    );

    const authState = useSelector((state) => state.auth.loggedIn);
    const { message } = useSelector(
        (state) => state.notification
      );
    useEffect(() => {
        let abortcontroller;
        (async function () {
            abortcontroller = new AbortController()
            const res = await getDashboard(authState)
            res.data.matic = matic
            setData(res.data);
        })()
        return () => {
            abortcontroller.abort()
        };
    }, [authState, message, matic])
    return (
        data && <div>
            <div className={styles.grid}>
                <Dougnut data={data}/>
                <Profit data={data} />
            </div>
            <Transaction data={data}/>
        </div>
    );
}

export default Dashboard;
