import { Navigate, Route, Routes } from "react-router-dom";
import Category from "../../components/categories/category/category";

const Categories = () => {
    return (
        <main>
            <Routes>
                <Route path="automobile" element={<Category name="Automobile" />} />
                <Route path="accessories" element={<Category name="Jewelry & Watches" />} />
                <Route path="collectibles" element={<Category name="Collectibles" />} />
                <Route path="memorabilia" element={<Category name="Memorabilia" />} />
                <Route path="digital" element={<Category name="Digital Art" />} />
                <Route path="physical" element={<Category name="Physical Art" />} />
                <Route path="charitable" element={<Category name="Charitable" />} />
                <Route path="services" element={<Category name="Services" />} />
                <Route path="others" element={<Category name="Others" />} />
                <Route path={"*"} element={<Navigate replace to="automobile" />} />
            </Routes>
        </main>
    );
}

export default Categories;
