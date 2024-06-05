import Skeleton from "react-loading-skeleton";

const Nftloading = () => {
    return Array(7) 
        .fill(0)
        .map((_, i) => {
            return <Skeleton borderRadius={10} key={i} width={190} height={243}/>
        })
}

export default Nftloading;
