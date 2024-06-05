import Sections from "../../components/home/sections/sections";
import Stats from "../../components/home/stats/stats";

const Home = () => {
    return (
        <main>
            <Stats name="Overall Stats" />
            <Sections name="Automobile" />
            <Sections name="Jewelry & Watches" />
            <Sections name="Collectibles" />
            <Sections name="Memorabilia" />
            <Sections name="Physical Art" />
            <Sections name="Digital Art" />
            {/* <Sections name="Charitable" /> */}
            <Sections name="Services" />
            <Sections name="Others" />
            
        </main>
    );
}

export default Home;
