import Skeleton from "react-loading-skeleton";

const Statsloading = () => {
    return Array(4)
        .fill(0)
        .map((_, i) => {
            return <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} key={i}>
                <Skeleton style={{margin: "14px 0"}} width={100}/>
                <Skeleton  width={100}/>
                <Skeleton width={50}/>
            </div>

        })
}

export default Statsloading;
