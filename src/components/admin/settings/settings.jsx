import { useDispatch, useSelector } from 'react-redux';
import styles from './settings.module.css';
import { useEffect, useState } from 'react';
import { getFees, updateAdmin } from '../helper';

const Settings = () => {
    const [data, setData] = useState({})
    const authState = useSelector((state) => state.auth.loggedIn);
    const { message } = useSelector(
        (state) => state.notification
    );
    const dispatch = useDispatch()
    useEffect(() => {
        let abortcontroller;
        (async function () {
            abortcontroller = new AbortController()
            const res = await getFees(authState)
            setData(res.fees);
        })()
        return () => {
            abortcontroller.abort()
        };
    }, [authState, message])
    const handleUpdate = async (e) => {
        e.preventDefault()
        const form = new FormData(e.target)
        updateAdmin(dispatch, authState, {sale_fee: form.get("sale_fee"), resale_fee: form.get("resale_fee"), merchant_resale : form.get("merchant_resale"), storage: form.get("storage"), password: form.get("password")})
    }
    const { dark } = useSelector(
        (state) => state.mode
    ); 
    return (
        <div className={`${styles.settings} ${dark ? styles.dark : ""}`}>
            <h3>
                Settings
            </h3>
            <form onSubmit={handleUpdate}>
                <div>
                    <p>Manage Fees</p>
                    <div className={styles.fees}>
                        <div>
                            <div className={styles.current}>
                                <span>Current Fee - {data.sale_fee}%</span>
                                <span>Contract - 2.5%</span>
                            </div>
                            <label>
                                Platform Sale Fee
                                <input type="number" placeholder='4' name='sale_fee' />
                            </label>
                            <button>Update</button>
                            <button type='button'>Contract</button>
                        </div>

                        <div>
                            <div className={styles.current}>
                                <span>Current Fee - {data.resale_fee}%</span>
                                <span>Contract - 2.5%</span>

                            </div>
                            <label>
                                Platform Resale Fee
                                <input type="number" placeholder='4' name='resale_fee' />
                            </label>
                            <button>Update</button>
                            <button type='button'>Contract</button>

                        </div>

                        <div>
                            <div className={styles.current}>
                                <span>Current Fee - {data.merchant_resale}%</span>
                                <span>Contract - 2.5%</span>

                            </div>
                            <label>
                                Merchant Resale Fee
                                <input type="number" placeholder='4' name='merchant_resale' />
                            </label>
                            <button>Update</button>
                            <button type='button'>Contract</button>

                        </div>
                        
                        <div>
                            <div className={styles.current}>
                                <span>Storage Fee - {data.storage}%</span>
                                <span>Contract - 2.5%</span>

                            </div>
                            <label>
                                New Storage Fee
                                <input type="number" placeholder='4' name='storage' />
                            </label>
                            <button>Update</button>
                            <button type='button'>Contract</button>

                        </div>
                    </div>
                </div>
                <div>
                    <label>
                        New Password
                        <input type="password" placeholder='**********' name='password' />
                    </label>
                    <button>Save</button>
                </div>
            </form>
        </div>
    );
}

export default Settings;
