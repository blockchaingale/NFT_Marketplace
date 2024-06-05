import Header from '../../components/collection/header/header';
import List from '../../components/collection/nft/list';
import styles from "./collection.module.css"



const Collection = () => {
    return (
        <div className={styles.collection}>

            <Header />
            <List />
        </div>
    );
}

export default Collection;
