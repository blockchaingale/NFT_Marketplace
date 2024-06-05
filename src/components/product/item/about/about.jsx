import { getImageUrl } from "../../../../helpers/utils";
import Cardheader from "../../cardheader/cardheader";
import styles from "./about.module.css"
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const About = ({data}) => {
const navigate = useNavigate()
const { dark } = useSelector(
  (state) => state.mode
);
    return (
        <div className={`${styles.about} ${dark ? styles.dark : ""}`}>
            <Cardheader name="About" image={getImageUrl("about.png")} />
            <div className={styles.content}>
                <p className={styles.internals} dangerouslySetInnerHTML={{__html: data.store_description}}></p>
                <p style={{cursor: "pointer"}} onClick={()=>navigate("/merchants/" + data.merchant_id)}><span>Merchant Storefront</span></p>
                <p>Founding Year: <span>{data.year}</span></p>
                <div className={styles.socials}>
                    {data.website ? (
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={data.website}
                      >
                        <img loading="lazy" src={getImageUrl("link.png")} alt="website" />
                      </a>
                    ) : (
                      <></>
                    )}
                    {data.twitter ? (
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={data.twitter}
                      >
                        <img loading="lazy" src={getImageUrl("twitter.png")} alt="twitter" />
                      </a>
                    ) : (
                      <></>
                    )}
                    {data.telegram ? (
                      <a
                        target="_blank" 
                        rel="noreferrer"
                        href={data.telegram}
                      >
                        <img loading="lazy" src={getImageUrl("telegram.png")} alt="telegram" />
                      </a>
                    ) : (
                      <></>
                    )}
                    {data.discord ? (
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={data.discord}
                      >
                        <img loading="lazy" src={getImageUrl("discord.png")} alt="discord" />
                      </a>
                    ) : (
                      <></>
                    )}
                    {data.tiktok ? (
                        <a
                            id="tiktok"
                            target="_blank"
                            rel="noreferrer"
                            href={data.tiktok}
                        >
                            <img loading="lazy" src={getImageUrl("tiktok.png")} alt="tiktok" />
                        </a>
                    ) : (
                        <></>
                    )}
                    {data.facebook ? (
                        <a
                            id="facebook"
                            target="_blank"
                            rel="noreferrer"
                            href={data.facebook}
                        >
                            <img loading="lazy" src={getImageUrl("facebook.png")} alt="facebook" />
                        </a>
                    ) : (
                        <></>
                    )}
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href={`tel:${data.phone}`}
                      >
                        <img loading="lazy" src={getImageUrl("phone.png")} alt="discord" />
                      </a>
                      <a
                        id="email"
                        target="_blank"
                        rel="noreferrer"
                        href={`mailto:${data.email}`}
                      >
                        <img loading="lazy" src={getImageUrl("email.png")} alt="discord" />
                      </a>
                      <a
                        id="search"
                        target="_blank"
                        rel="noreferrer"
                        href={`https://www.google.com/search?q=${data.store_name}`}
                      >
                        <img loading="lazy" src={getImageUrl("google.png")} alt="discord" />
                      </a>
                    
                  </div>
            </div>
        </div>
    );
}

export default About;
About.propTypes = {
  data: PropTypes.object,
};