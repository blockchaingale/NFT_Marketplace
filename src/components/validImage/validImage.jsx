import { useState } from 'react';
import { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import PropTypes from "prop-types";


const ValidImage = ({link, alt, fallback}) => {
    
    const [load, setLoad] = useState(true)
    const [url, setUrl] = useState("")

    useEffect(() => {
        (async function () {
            var newImg = new Image;
            newImg.src = link;
            return await new Promise(() => {
                newImg.onload = function () {
                    setUrl(link)
                    setLoad(false)
                }
                newImg.onerror = function () {
                    setUrl(fallback)
                    setLoad(false)
                }

            })
        })()
    }, [link, fallback])

    return (
        <>
            {load ? <Skeleton circle width={40} height={40}  /> : <img loading="lazy" src={url} alt={alt} />}
        </>
    );
}

export default ValidImage;
ValidImage.propTypes = {
    link: PropTypes.string,
    alt: PropTypes.string,
    fallback: PropTypes.string
  };
  