import styles from "./reviews.module.css"
import { getImageUrl } from "../../../../helpers/utils";
import ReactTimeAgo from "react-time-ago";
import ReactStars from 'react-stars'
import PropTypes from "prop-types";
import ValidImage from "../../../validImage/validImage";
import AppPagination from "../../../pagination/pagination";
import { useState } from "react";
import { useSelector } from "react-redux";
import Cardheader from '../../../product/cardheader/cardheader';


const Reviews = ({ data }) => {
    const { dark } = useSelector(
        (state) => state.mode
      );
    const [paginated, setPaginated] = useState([])
    return (
        <div className={`${styles.reviews} ${dark ? styles.dark : ""}`}>
            <Cardheader name="Reviews" image={getImageUrl("reviews.png")} />
            <div className={styles.content}>
                <div className={styles.header}>
                    <p>Name</p>
                    <p>Review</p>
                    <p>Rating</p>
                    <p>Date</p>
                </div>
                {paginated.map((item, index) => {
                    return <div key={index} className={styles.body}>
                        <div>
                            <ValidImage link={item.image ? item.image : item.merchant_image} alt="avatar"  fallback={getImageUrl("avatar.png")} />
                            <p>{item.first_name ? item.first_name : item.merchant_name}</p>
                            <img loading="lazy" src={getImageUrl("verified.png")} alt="verified badge" />
                        </div>
                        <p>{item.text}</p>
                        <ReactStars
                            value={item.rating}
                            count={5}
                            size={23}
                            edit={false}
                            color1={dark ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)'}
                    color2={dark ? "rgba(233, 4, 4, 1)" : "rgba(233, 4, 4, 0.10)"} />
                        {<ReactTimeAgo date={new Date(item.date).getTime()} locale="en-US" />}

                    </div>
                })}
            </div>
            <div className={styles.paginationContainer}>
                <AppPagination callback={setPaginated} rawData={data} pageSize={8} scroll={false} />
            </div>
        </div>

    );
}

export default Reviews;
Reviews.propTypes = {
    data: PropTypes.array,
};