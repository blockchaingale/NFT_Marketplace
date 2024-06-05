import { useSelector } from "react-redux";
import styles from "./connect.module.css"
import { getImageUrl } from '../../../helpers/utils';
import { switchNetwork } from '@wagmi/core';

const ConnectionPop = () => {
    const { dark } = useSelector(
        (state) => state.mode
    );
    
    const { connection } = useSelector(
        (state) => state.pop
    );
    

    return (
        <div className={`${styles.overlay} ${connection ? styles.soverlay : ""} ${dark ? styles.dark : ""}`}>
            <div className={styles.checkout}>
                <h2>Wrong Network</h2>
                <p>Please switch to Polygon Network below</p>
                <div>
                    <div className={styles.options}>
                        <div className={styles.active} onClick={() => switchNetwork({chainId: 5})}>
                            <img src={getImageUrl("matic.png")} alt="matic" />
                            <p>Switch Network</p>
                        </div>
                       
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    );
}

export default ConnectionPop;
