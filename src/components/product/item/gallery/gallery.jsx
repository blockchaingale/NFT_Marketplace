import styles from "./gallery.module.css"
import PropTypes from "prop-types";
import ReactPlayer from "react-player";
import { Carousel } from "react-responsive-carousel";
import { getImageUrl } from "../../../../helpers/utils";
import useWindowDimensions from "../../../../hooks/useWindowDimension";
import { useEffect, useState } from "react";
import { getVideoCover } from "../helper";
import Skeleton from "react-loading-skeleton";

const Gallery = ({ data }) => {
    const { width } = useWindowDimensions()
    const [media, setMedia] = useState(false)
    const [thumb, setThumb] = useState([])
    useEffect(() => {
        let abortcontroller;
        (async function () {
            abortcontroller = new AbortController()
            const videos = []
            const thum = []

            try {
                const reponse = await fetch(data.image, {
                    method: 'GET'
                });
                if (reponse.headers.get('Content-Type').includes("image")) {
                    videos.push(data.image)
                    thum.push(<img style={{width: "80 !important", height: "80 !important", objectFit: "cover"}} key={0} src={data.image} alt="thumb" />)
                } else {
                    const thumb = await getVideoCover(await (reponse.blob()))
                    videos.push({ video: data.image, thumb })
                    thum.push(<img style={{width: "80 !important", height: "80 !important", objectFit: "cover"}} key={0} src={thumb} alt="thumb" />)

                }
            } catch (error) {
                videos.push(data.image)
                thum.push(<img style={{width: "80 !important", height: "80 !important", objectFit: "cover"}} key={0} src={data.image} alt="thumb" />)
            }

            if (data.images.length > 0) {
                for (let i = 0; i < data.images.length; i++) {
                    const element = data.images[i];

                    try {
                        const res = await fetch(element, {
                            method: 'GET'
                        });
                        if (res.headers.get('Content-Type').includes("image")) {
                            videos.push(element)
                            thum.push(<img style={{width: "80 !important", height: "80 !important", objectFit: "cover"}} key={i + 1} src={element} alt="thumb" />)
                        } else {
                            const thumb = await getVideoCover(await (res.blob()))

                            videos.push({ video: element, thumb })
                            thum.push(<img style={{width: "80 !important", height: "80 !important", objectFit: "cover"}} key={i + 1} src={thumb} alt="thumb" />)
                        }
                    } catch (error) {
                        videos.push(element)
                        thum.push(<img style={{width: "80 !important", height: "80 !important", objectFit: "cover"}} key={i + 1} src={element} alt="thumb" />)
                    }

                    if (data.images.length - 1 === i) {
                        setMedia(videos)
                        setThumb(thum)

                    }
                }
            } else {
                setMedia(videos)
                setThumb(thum)
            }


        })();

        return () => {
            abortcontroller.abort()
        }
    }, [data])


    return (
        media ? <div className={styles.gallery} >
            <Carousel width={width > 800 ? 550 : 450} dynamicHeight={false} infiniteLoop={true} renderThumbs={() => thumb} statusFormatter={() => { }}>
                {media?.map((item, index) => {
                    return typeof item === "string" ? <div onClick={()=>window.open(item, "_blank")} key={index + 1}>
                        <img  style={{ width: "88% !important", height: 500, objectFit: "cover" }} loading="lazy" src={item} />
                    </div> : <div key={index + 1}>
                        <ReactPlayer style={{ margin: "0 auto", objectFit: "cover" }} width="88%" height="500px" url={item.video} playing controls light={item.thumb} playIcon={<img loading="lazy" className={styles.play} src={getImageUrl("play.png")} alt="play button" />} />
                    </div>
                })
                }

            </Carousel>
        </div> : <Skeleton height={450} width={350} style={{ display: "block", margin: "0 auto" }} />
    );
}

export default Gallery;
Gallery.propTypes = {
    data: PropTypes.object,
};