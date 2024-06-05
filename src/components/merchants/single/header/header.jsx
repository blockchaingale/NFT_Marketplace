import { getImageUrl, numberToTwoDecimals } from "../../../../helpers/utils";
import styles from "./header.module.css"
import numberWithCommas from '../../../../helpers/commaSeperator';
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import ValidImage from "../../../validImage/validImage";

const Header = ({ status, setStatus, data }) => {
    const { rate: { matic } } = useSelector(
        (state) => state.others
    );
    const { dark } = useSelector(
        (state) => state.mode
    );
    const d = new Date(data.date)
    return (
        <div className={`${styles.header} ${dark ? styles.dark : ""}`}>
            <ValidImage link={data.banner} alt={data.name} fallback={getImageUrl("dembanner.png")} />
            <ValidImage link={data.image} alt={data.name} fallback={getImageUrl("avatar.png")} />

            <div className={styles.details}>
                <div className={styles.socials}>
                    {data.website ? (
                        <a
                            id="website"
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
                            id="twitter"
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
                            id="telegram"
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
                            id="discord"
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
                    {data.phone ? (
                        <a
                            id="phone"
                            target="_blank"
                            rel="noreferrer"
                            href={data.phone}
                        >
                            <img loading="lazy" src={getImageUrl("phone.png")} alt="phone" />
                        </a>
                    ) : (
                        <></>
                    )}
                    {data.email ? (
                        <a
                            id="email"
                            target="_blank"
                            rel="noreferrer"
                            href={"mailto:" + data.email}
                        >
                            <img loading="lazy" src={getImageUrl("email.png")} alt="email" />
                        </a>
                    ) : (
                        <></>
                    )}
                    <a
                        id="search"
                        target="_blank"
                        rel="noreferrer"
                        href={`https://www.google.com/search?q=${data.store_name}`}
                    >
                        <img loading="lazy" src={getImageUrl("google.png")} alt="discord" />
                    </a>

                </div>
                <div className={styles.info}>
                    <button onClick={() => window.open("mailto:" + data.email)}>Contact Merchant</button>

                    <div>
                        <h3>{data.name}</h3>
                        <img loading="lazy" src={getImageUrl("verified.png")} alt="verified" />
                    </div>

                    {!data.description ? <p>No decription</p> : <p dangerouslySetInnerHTML={{ __html: data.description }}></p>}
                </div>

                <div>

                    <div className={styles.stats}>
                        <div>
                            <span>Items</span>
                            <p>{numberWithCommas(data.products)}</p>
                        </div>
                        <div>
                            <span>Total Volume</span>
                            <p>${numberWithCommas(numberToTwoDecimals(data.volume * matic))}</p>
                        </div>
                        <div>
                            <span>Joined</span>
                            <p>{`${d.getDate()}-${d.getDate()}-${d.getFullYear()}`}</p>
                        </div>
                    </div>

                </div>

                <div className={styles.status}>
                    <div className={styles.filter}>
                        <button onClick={() => setStatus("Collections")} className={status === "Collections" ? styles.active : ""}>Products</button>
                        <button onClick={() => setStatus("About Merchant")} className={status === "About Merchant" ? styles.active : ""}>About Merchant</button>
                        <button onClick={() => setStatus("Reviews")} className={status === "Reviews" ? styles.active : ""}>Reviews</button>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default Header;
Header.propTypes = {
    status: PropTypes.string,
    setStatus: PropTypes.any,
    data: PropTypes.object
};
