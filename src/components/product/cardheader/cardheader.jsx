import { getImageUrl } from "../../../helpers/utils";
import styles from "./cardheader.module.css"
import PropTypes from "prop-types";
import { useSelector } from "react-redux";


const Cardheader = ({name,image}) => {
    const { dark } = useSelector(
        (state) => state.mode
      );
    return (
        <div className={`${styles.header} ${dark ? styles.dark : ""}`}>
            <div>
                <img loading="lazy" src={image} alt={name} />
                <p>{name}</p>
            </div>
            <img loading="lazy" src={getImageUrl("angle.png")} alt="angle" />
        </div>
    );
}

export default Cardheader;
Cardheader.propTypes = {
    name: PropTypes.string,
    image: PropTypes.any,
};