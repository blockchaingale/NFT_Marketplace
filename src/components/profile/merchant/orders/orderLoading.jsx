
import Skeleton from 'react-loading-skeleton';

const OrderLoading = () => {
    return Array(6)
        .fill(0)
        .map((_, i) => {
            return <div style={{margin: "10px 0" }} key={i}>
                <Skeleton height={130}/>
            </div>

        })
}

export default OrderLoading;
