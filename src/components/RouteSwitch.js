import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Shop from "./Shop";
import "../styles/RouteSwitch.css";
import { useState } from "react";

const RouteSwitch = () => {
    const [cartItems, setCartItems] = useState([]);

    return (
        <BrowserRouter>
            <Header numCartItems={cartItems.length}></Header>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop/>} />
            </Routes>
        </BrowserRouter>
    );
};

export default RouteSwitch;