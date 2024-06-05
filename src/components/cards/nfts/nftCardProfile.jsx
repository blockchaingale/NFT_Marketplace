import { useDispatch, useSelector } from "react-redux";
import styles from "./nftcard.module.css"
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { popActions } from "../../../store/pops/pops";
import { getImageUrl, setLocalStorage } from "../../../helpers/utils";
import { useEffect, useState } from "react";
import { deleteNFT } from "../../profile/merchant/helper";
import { getVideoCover } from "../../product/item/helper";

const Nftcard = ({ item, rate = true }) => {
    const user = useSelector((state) => state.auth.user);

    const dispatch = useDispatch()
    const { basket } = useSelector(
        (state) => state.checkout
    );
    const index = basket.findIndex(object => {
        return object.id === item.id && object.contract === item.contract;
    });

    const [img, setImg] = useState(getImageUrl("placeholder.png"))
    const authState = useSelector((state) => state.auth.loggedIn);

    const handleDelete = async ()=>{
       await deleteNFT(dispatch, item.item_id, authState)
    }


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

    const { dark } = useSelector(
        (state) => state.mode
      );



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
                            <p>${item.price ? item.price : '_'}</p>
                            <span>{item.price ? item.price : '_'} MATIC</span>
                        </div>
                        {rate ? <div></div> : 
                        <button onClick={()=> {setLocalStorage("rate", {name: item.name, id: item.review_id}); dispatch(popActions.setRate(true))}} className={styles.rate}>Rate Item</button> }
                        {user.merchant_id && !item.listed && item.merchant_id === item.owner_id && item.merchant_id === user.merchant_id ? 
                        <button onClick={handleDelete} className={styles.rate}>Delete NFT</button> : <div></div>}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Nftcard;
Nftcard.propTypes = {
    item: PropTypes.object,
    rate: PropTypes.bool
};
