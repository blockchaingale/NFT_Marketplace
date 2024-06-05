import { useMemo, useRef, useState } from "react";
import { getImageUrl } from "../../../../../../helpers/utils";
import styles from "./form.module.css"
import FileInputComponent from 'react-file-input-previews-base64'
import DropDown from "../../../../../categories/dropDown/dropDown";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { notificationActions } from "../../../../../../store/notification/notification";
import { useWeb3Modal } from '@web3modal/react';
import ReactPlayer from "react-player";
import JoditEditor from "jodit-react";
import { createItem } from '../../../nfts/helper';

const Form = () => {
    const authState = useSelector((state) => state.auth.loggedIn);
    const { open } = useWeb3Modal()
    const editor = useRef(null);


    const [content, setContent] = useState("");
    const config = useMemo(
        () => ({
            readonly: false, // all options from https://xdsoft.net/jodit/doc/,
            height: 400,
            placeholder: "Start typing description...",
            
        }),
        []
    );

    const [selected, setSelected] = useState("")
    const [drop, setDrop] = useState("Others")
    const [type, setType] = useState("")
    const [value, setValue] = useState("")
    const [traits, setTraits] = useState([])
    const [free, setFree] = useState("free")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { address, isConnected } = useAccount()

    const handleUpdate = (event) => {
        setContent(event);
    };
    const handleAdd = () => {
        if (value.length > 0 && type.length > 0) {
            const arr = [...traits]
            arr.push({ type, value })
            setTraits(arr)
            setType("")
            setValue("")
        }
    }
    const handleClose = (index) => {
        const arr = [...traits]
        arr.splice(index, 1)
        setTraits(arr)
    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        if (!selected) {
            dispatch(notificationActions.setNotify(true));
            dispatch(notificationActions.setMessage("Main media cannot be empty"));
            return
        }

        if (content.length == 0) {
            dispatch(notificationActions.setNotify(true));
            dispatch(notificationActions.setMessage("Description cannot be empty"));
            return
        }

        if (!isConnected || !address) {
            open({ route: "ConnectWallet" })
        } else {

            dispatch(notificationActions.setNotify(true));

            const form = new FormData(e.target)


            if (!selected.includes("image") && form.get("gallery").size == 0) {
                dispatch(notificationActions.setMessage("You must select atleast one image to serve as thumbnail in the files upload section"));
                return
            }

            if (free != "paid") {
                form.append("monthly", 0.25)
                form.append("yearly", 2.5)
            }

            form.append("description", content)

            form.append("category", drop.toLowerCase().includes("jewelry") ? "jewelry" : drop.toLowerCase().includes("physical") ? "physical" : drop.toLowerCase().includes("digital") ? "digital" : drop.toLowerCase())
            createItem(dispatch, form, navigate, address, traits, free, authState)
        }
    }

    const categories = [
        "Automobile",
        "Jewelry & Watches",
        "Collectibles",
        "Memorabilia",
        "Physical Art",
        "Digital Art",
        // "Charitable",
        "Services",
        "Others"
    ]

    const { dark } = useSelector(
        (state) => state.mode
    );

    return (
        <div className={`${styles.profile} ${dark ? styles.dark : ""}`} >
            <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.purchase}>
                    <p>Item Type</p>
                    <div>
                        <div onClick={() => setFree("free")} className={free == "free" ? styles.active : ""}>
                            <p>Buy & Ship
                            </p>
                            <span>Traditional E-commerce</span>
                        </div>
                        <div onClick={() => setFree("paid")} className={free == "paid" ? styles.active : ""}>
                            <p>Buy, Hold, Resell, Ship
                                </p>
                            <span>
                                Traditional E-commerce + <br />
                                90 days merchant provided free storage included in price. <br />
                                Merchant provides renewable storage extensions for a fee. <br />
                                Allows buyer to resell item on secondary marketplace
                            </span>
                        </div>
                        <div onClick={() => setFree("service")} className={free == "service" ? styles.active : ""}>
                            <p>Service Listing</p>
                            <span>
                                Platform Services + <br />
                                Cannot be resold <br />
                            </span>
                        </div>

                    </div>
                </div>
                <div className={styles.image}>
                    <p>Main Image, Video, Audio, or 3D Model</p>
                    <span>File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 250 MB</span>
                    <div className={styles.main}>
                        {selected?.includes("image") ? <img style={{ zIndex: -50 }} className={styles.selected} src={selected} alt="" /> :
                            <section style={{ zIndex: -50, marginTop: "-90px" }} className={styles.selected}>  <ReactPlayer width="100%" url={selected} playing playIcon={<img loading="lazy" className={styles.play} src={getImageUrl("play.png")} alt="play button" />} /> </section>
                        }
                        <img src={getImageUrl("photo.png")} alt="photo" />
                        <FileInputComponent
                            labelText="Select file"
                            labelStyle={{ fontSize: 14 }}
                            multiple={false}
                            callbackFunction={(file_arr) => { setSelected(file_arr.base64) }}
                            accept="image/*"
                            inputName="image"
                        />
                    </div>
                    <div>
                        <span>Select supporting IMAGES (Multiple selections allowed AND Max: 25)</span>
                        <input type="file" name="gallery" multiple />
                    </div>
                </div>
                <label>
                    Item Name
                    <input type="text" name="name" placeholder="John" required />
                </label>
                <label>
                    Item Password (Optional. Only for private Items)
                    <input type="text" name="password" placeholder="************" />
                </label>
                <label className={styles.editor}>
                    Description
                    <JoditEditor
                        ref={editor}
                        value={content}
                        config={config}
                        tabIndex={1} // tabIndex of textarea
                        onChange={newContent => handleUpdate(newContent)} // preferred to use only this option to update the content for performance reasons
                    />
                </label>

                <label className={styles.drop}>
                    Choose NFT Category
                    <DropDown selected={drop} setSelected={setDrop} data={categories} />
                </label>

                <div className={styles.traits}>
                    <p>Traits</p>
                    {traits.map((item, index) => {
                        return <div className={styles.card} key={index}>
                            <p>{item.type}</p>
                            <p>{item.value}</p>
                            <img onClick={() => handleClose(index)} src={getImageUrl("close.png")} alt="delete" />
                        </div>
                    })}
                    <div className={styles.placer}>
                        <label>
                            Type
                            <input maxLength={25} type="text" placeholder="Manufacturer" value={type} onChange={(e) => setType(e.target.value)} />
                        </label>
                        <label>
                            Value
                            <input maxLength={25} type="text" placeholder="Name" value={value} onChange={(e) => setValue(e.target.value)} />
                        </label>
                        <button type="button" onClick={handleAdd}>Add</button>
                    </div>
                </div>

                
                {free == "paid" ?
                    <>
                        <p>Renewable Storage Extension Fees</p>

                        <label>
                            Monthly Fee
                            <input type="tel" name="monthly" placeholder="0.25" required />
                        </label>
                        <label>
                            Yearly Fee
                            <input type="tel" name="yearly" placeholder="2.5" required />
                        </label>
                        <label>
                            Max Storage Years
                            <input type="tel" name="maxyears" placeholder="20" required />
                        </label>
                    </>
                    : <></>}
                <button>Save</button>
            </form>

        </div>
    );
}

export default Form;
