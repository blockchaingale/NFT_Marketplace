import Header from './header/header';
import Nfts from './nfts/nfts';
import styles from "./list.module.css"




const List = () => {
    const data = [
        {
            name: "Key #856",
            price: 18,
            image: "/art/1.png",
            id: 1,
            contract: "hbhjbhjb"
        },
        {
            name: "Kuldy #856",
            price: 18,
            image: "/art/2.png",
            id: 2,
            contract: "2hbhjbhjb"
        }, {
            name: "Earth #856",
            price: 18,
            image: "/art/3.png",
            id: 3,
            contract: "3hbhjbhjb"
        }, {
            name: "Kapan #856",
            price: 18,
            image: "/art/4.png",
            id: 4,
            contract: "4hbhjbhjb"
        }, {
            name: "Kapan #856",
            price: 18,
            image: "/art/5.png",
            id: 5,
            contract: "5hbhjbhjb"
        }, {
            name: "Kapan #856",
            price: 18,
            image: "/art/6.png",
            id: 6,
            contract: "6hbhjbhjb"
        },
        {
            name: "Kapan #856",
            price: 18,
            image: "/art/7.png",
            id: 7,
            contract: "7hbhjbhjb"
        }, {
            name: "Kapan #856",
            price: 18,
            image: "/art/8.png",
            id: 8,
            contract: "8hbhjbhjb"
        }, {
            name: "Kapan #856",
            price: 18,
            image: "/art/9.png",
            id: 9,
            contract: "9hbhjbhjb"
        }, {
            name: "Kapan #856",
            price: 18,
            image: "/art/10.png",
            id: 10,
            contract: "10hbhjbhjb"
        }, {
            name: "Kapan #856",
            price: 18,
            image: "/art/11.png",
            id: 11,
            contract: "11hbhjbhjb"
        },
    ]
    return (
        <div className={styles.list}>
            <Header />
            <Nfts data={data} />
        </div>
    );
}

export default List;
