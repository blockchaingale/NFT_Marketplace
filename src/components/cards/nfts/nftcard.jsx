import { useDispatch, useSelector } from "react-redux";
import { getImageUrl, numberToTwoDecimals } from "../../../helpers/utils";
import styles from "./nftcard.module.css"
import PropTypes from "prop-types";
import { checkoutActions } from '../../../store/checkout/checkout';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getVideoCover } from '../../product/item/helper';
import numberWithCommas from "../../../helpers/commaSeperator";

const Nftcard = ({ item }) => {
    const dispatch = useDispatch()
    const { rate: { matic } } = useSelector(
        (state) => state.others
    );
    const { basket } = useSelector(
        (state) => state.checkout
    );
    const index = basket.findIndex(object => {
        return object.id === item.id && object.contract === item.contract;
    });
    const handleSelection = () => {
        if (index >= 0) {
            dispatch(checkoutActions.removeFromBasket(item))
        } else {
            dispatch(checkoutActions.addToBasket(item))
        }

    }

    const { dark } = useSelector(
        (state) => state.mode
      );

    const [img, setImg] = useState(getImageUrl("placeholder.png"))

    useEffect(() => {
        (async function () {
            var newImg = new Image;
            newImg.src = item.image;
            return await new Promise(() => {
                newImg.onload = function () {
                    setImg(item.image)
                }
                newImg.onerror = async function () {
                    const reponse = await fetch(item.image, {
                        method: 'GET'
                    });
                    
                    const thumb = await getVideoCover(await (reponse.blob()))
                    setImg(thumb)
                }

            })
        })()
    }, [item])



    const navigate = useNavigate()
    return (
        <div style={{
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }} className={styles.card}>
            <div className={`${styles.overlay} ${dark ? styles.dark : ""}`}>
                <img loading="lazy" onClick={() => navigate("/item/" + item.item_id)} className={index >= 0 ? styles.active : ""} src={img} alt={item.name} />
                <div>
                    <div className={styles.top}>
                        {item.name.length < 18 ?
                            <p>{item.name.toLowerCase()}</p>
                            : <p><marquee>{item.name.toLowerCase()}</marquee></p>}
                    </div>
                    <div className={styles.dets}>
                        <div>
                            <p>${numberWithCommas(item.price * matic)}</p>
                            <span>{numberWithCommas(item.price)}MATIC</span>
                        </div>
                        <div>
                            <button onClick={handleSelection}>
                                <img loading="lazy" src={getImageUrl(index >= 0 ? "check.png" : "add.png")} alt="add/remove NFT" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Nftcard;
Nftcard.propTypes = {
    item: PropTypes.object,
};
