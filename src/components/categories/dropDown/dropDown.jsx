import { useState } from "react";
import styles from "./dropDown.module.css"
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const DropDown = ({selected, setSelected, data}) => { 
    const [open, setOpen] = useState(false)
    const { dark } = useSelector(
        (state) => state.mode
    );
    return (
        <div className={`${styles.dropDown} ${dark ? styles.dark : ""}`}>
            <div onClick={()=>setOpen((prevState)=>!prevState)} className={styles.header}>
                <p>{selected}</p>
                <i className={open ? "fa-solid fa-caret-up" : "fa-solid fa-caret-down"}></i>
            </div>
            <div className={`${styles.list} ${open ? styles.show : ""}`}>
                {data?.map((item, index)=>{
                    return <li className={item === selected ? styles.none : ""} key={index} onClick={()=>{ setOpen(false); setSelected(item)}}>{item}</li>
                })}
            </div>
        </div>
    );
}

export default DropDown;
DropDown.propTypes = {
    selected: PropTypes.string,
    setSelected: PropTypes.func,
    data: PropTypes.array
  };
  