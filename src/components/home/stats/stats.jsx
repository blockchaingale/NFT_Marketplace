import { useEffect, useState } from "react";
import styles from "./stats.module.css"
import PropTypes from "prop-types";
import Table from "./table/table";
import { getTopMerchants } from "../helper";
import { useSelector } from "react-redux";


const Stats = ({ name }) => {
const [list, setList] = useState([])
const {  message } = useSelector(
    (state) => state.notification
  );

  const { dark } = useSelector(
    (state) => state.mode
  );


    useEffect(() => {
        let abortcontroller;
        (async function(){
            abortcontroller = new AbortController()
            const res = await getTopMerchants()
            setList(res.merchants);
        })()
        return () => {
            abortcontroller.abort()
        };
    }, [message])
    
    return (
        <div className={`${styles.stats} ${dark ? styles.dark : ""}`}>
            <div className={styles.header}>
                <h2>{name}</h2>
                
            </div>
             <div className={styles.table}>
                <Table data={list.slice(0, 4)} />
               {list.slice(4, 8).length > 0 && <Table data={list.slice(4, 8)} />}
            </div>
        </div>
    );
}

export default Stats;
Stats.propTypes = {
    name: PropTypes.string,
};
