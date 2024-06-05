import styles from "./description.module.css"
import Cardheader from '../../cardheader/cardheader';
import { getImageUrl } from "../../../../helpers/utils";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const Description = ({data}) => {
    let traits = []
    if (data.traits) {
        traits = JSON.parse(data.traits)
    }
    const { dark } = useSelector(
        (state) => state.mode
      );
    return (
        <div className={`${styles.description} ${dark ? styles.dark : ""}`}>
            <Cardheader name="Description" image={getImageUrl("description.png")} />
            <div className={styles.content}>

                <strong>Item Properties</strong>
                {traits.map((item, i)=>{
                    return  <div key={i}>
                    <span>{item.type}</span>
                    <p>{item.value}</p>
                </div>
                })}
                <p className={styles.desc} dangerouslySetInnerHTML={{__html: data.description}}></p>
            </div>
        </div>
    );
}

export default Description;
Description.propTypes = {
    data: PropTypes.object,
};