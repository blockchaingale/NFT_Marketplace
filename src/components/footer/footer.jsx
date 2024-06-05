import { Link } from "react-router-dom";
import styles from "./footer.module.css";
import { getImageUrl } from "../../helpers/utils";
import { useSelector } from "react-redux";


const Footer = () => {
  const { dark } = useSelector(
    (state) => state.mode
);
  return (

    <footer className={`${styles.footer} ${dark ? styles.dark : ""}`}>
      <div>
        <div>
          <img onClick={() => window.open("https://trumart.com")} src={getImageUrl("logo.gif")} alt="logo" />
        </div>
        <div className={styles.socials}>
            <img src={getImageUrl("ftwitter.png")} alt="twitter" />
            <img src={getImageUrl("ftelegram.png")} alt="telegram" />
            <img src={getImageUrl("fdiscord.png")} alt="discord" />
        </div>
        
      </div>
      <div className={styles.links}>
        <div>
          <p>Explore</p>
          <Link to="/collections">Collections</Link>
          <Link to="/explore">Explore NFTs</Link>
          <a target="_blank" rel="noreferrer" href="https://trumart.com/contact-us">Contact Us</a>
        </div>
        <div>
          <p>Accounts</p>
          <Link to="/profile">Dashboard</Link>
          <Link to="/profile">Collectibles</Link>
          <Link to="/profile">Merchants</Link>
        </div>
        <div>
          <p>Links</p>
          <a target="_blank" rel="noreferrer" href="https://trumart.com">Terms of Service</a>
          <a target="_blank" rel="noreferrer" href="https://trumart.com">Privacy Policy</a>
        </div>
      </div>
      <p>©️ {new Date().getFullYear()} Trumart</p>
    </footer>
  );
};

export default Footer;
