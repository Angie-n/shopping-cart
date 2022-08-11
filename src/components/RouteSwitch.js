import { BrowserRouter, Routes, Route } from "react-router-dom";
import products from "../helpers/Product";
import Header from "./Header";
import Home from "./Home";
import Shop from "./Shop";
import ShopItemsDisplay from "./ShopItemsDisplay";
import ProductDisplay from "./ProductDisplay";
import NotFound from "./NotFound";
import "../styles/RouteSwitch.css";
import { useState } from "react";

const RouteSwitch = () => {
    const allProducts = products;
    const [cartItems, setCartItems] = useState([]);

    return (
        <BrowserRouter>
            <Header numCartItems={cartItems.length}></Header>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />}>
                    <Route path="" element={<ShopItemsDisplay allProducts={allProducts} cartItems={cartItems} setCartItems={setCartItems} />}></Route>
                    <Route path="*" element={<ProductDisplay allProducts={allProducts} cartItems={cartItems} setCartItems={setCartItems}/>}></Route>
                </Route>
                <Route path="*" element={<NotFound></NotFound>}></Route>
            </Routes>
        </BrowserRouter>
    );
};

export default RouteSwitch;