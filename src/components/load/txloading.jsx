import Skeleton from "react-loading-skeleton";

const Txloading = () => {
    return Array(10)
        .fill(0)
        .map((_, i) => {
            return <div style={{ width: "100%" }} key={i}>
                <Skeleton style={{margin: "14px 0"}} />
            </div>

        })
}

export default Txloading;
