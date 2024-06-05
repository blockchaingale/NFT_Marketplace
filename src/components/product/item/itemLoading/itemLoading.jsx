import Skeleton from "react-loading-skeleton";
const ItemLoading = () => {
    return (
        <>
            <Skeleton height={450} width={350} style={{display: "block", margin: "0 auto"}} />
            <Skeleton height={300} />
            <Skeleton height={150} />
            <Skeleton height={150} />
            <Skeleton height={150} />
            <Skeleton height={150} />
        </>
    );
}

export default ItemLoading;
