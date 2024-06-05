import styles from "./about.module.css"
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const About = ({ data }) => {
    let gallery = []
    if (data.gallery) {
        gallery = JSON.parse(data.gallery)
    }

    const { dark } = useSelector(
        (state) => state.mode
    );

    return (
        <div className={`${styles.about} ${dark ? styles.dark : ""}`}>
            <h3>About {data.name}</h3>
            <div className={styles.front}>
                <h5>Store Front Image</h5>
                <div>{gallery.length === 0 && <p style={{color: dark ? "white" : "black"}}>No Store Images Uploaded</p>}
                    {gallery.length > 0 && gallery.map((item, index) => {
                        return <img key={index} src={item} alt={data.name + " store front"} />
                    })}
                </div>
            </div>

            <div className={styles.business}>
                <h5>Business Information</h5>
                <div>
                    <p>Street:</p>
                    <span>{data.street}</span>
                </div>
                <div>
                    <p>City:</p>
                    <span>{data.city}</span>
                </div>
                <div>
                    <p>Postal Code:</p>
                    <span>{data.postal}</span>
                </div>
                <div>
                    <p>Region:</p>
                    <span>{data.state}</span>
                </div>
                <div>
                    <p>Country:</p>
                    <span>{data.country}</span>
                </div>
                <div>
                    <p>Business Licence :</p>
                    {data.license ? <a href="#">View business license here </a> : <span>None</span>}
                </div>

            </div>
            <div className={styles.shipping}>
                <h5>Shipping and Storage</h5>
                {!data.shipping_policy ? <p>No shipping policy</p> : <p dangerouslySetInnerHTML={{ __html: data.shipping_policy }}></p>}

            </div>
            <div className={styles.refund}>
                <h5>Refunds</h5>
                <p>
                    No refunds
                </p>
            </div>
            <div className={styles.refund}>
                <h5>
                    Additional Information
                </h5>
                {!data.additional ? <p>No additional information</p> : <p dangerouslySetInnerHTML={{ __html: data.additional }}></p>}
                
            </div>
        </div>
    );
}

export default About;
About.propTypes = {
    data: PropTypes.object
};
