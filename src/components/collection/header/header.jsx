import styles from "./header.module.css"
import numberWithCommas from '../../../helpers/commaSeperator';
import { getImageUrl, numberToTwoDecimals } from '../../../helpers/utils';

const Header = () => {
    const data ={
        website: "fdsf",
        twitter: "hjbsjf",
        telegram: "hjsdbfhjs0",
        discord: "sjhdbjh"
    }
    return (
        <div className={styles.header}>
            <img loading="lazy" src={getImageUrl("ycbanner.png")} alt="banner" />
            <img loading="lazy" src={getImageUrl("ycpics.png")} alt="collection image" />
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
                    {data.twitter != "#" ? (
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
                    {data.telegram != "#" ? (
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
                    {data.discord != "#" ? (
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
                    
                  </div>
                    <div className={styles.info}>
                        <div>
                            <h3>Kudy Ape Club</h3>
                            <img loading="lazy" src={getImageUrl("verified.png")} alt="verified" />
                        </div>
                        <div>
                            <h5>By Reznik</h5>
                            <img loading="lazy" src={getImageUrl("verified.png")} alt="verified" />
                        </div>
                        <p>The Kudy Ape Club is a collection of up to 20,000 Mutant Apes that can only be created by exposing an existing Bored Ape to a vial of MUTANT SERUM or by minting a Mutant Ape in the public sale.</p>
                    </div>

                    <div>

                    <div className={styles.stats}>
                        <div>
                            <span>Items</span>
                            <p>{numberWithCommas(numberToTwoDecimals(60000))}</p>
                        </div>
                        <div>
                            <span>Owners</span>
                            <p>{numberWithCommas(numberToTwoDecimals(4700))}</p>
                        </div>
                        <div>
                            <span>Created</span>
                            <p>20 Feb 2023</p>
                        </div>
                    </div>
                    <div className={styles.stats}>

                        <div>
                            <span>Total Volume</span>
                            <p>${numberWithCommas(numberToTwoDecimals(478415))}</p>
                        </div>
                        <div>
                            <span>Floor Price</span>
                            <p>${numberWithCommas(numberToTwoDecimals(0.223))}</p>
                        </div>
                        <div>
                            <span>Best Offer</span>
                            <p>${numberWithCommas(numberToTwoDecimals(4000))}</p>
                        </div>
                    </div>
                    </div>

                </div>

        </div>
    );
}

export default Header;
