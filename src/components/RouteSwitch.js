import { BrowserRouter, Routes, Route } from "react-router-dom";
import products from "../helpers/Product";
import Header from "./Header";
import CartPreview from "./CartPreview";
import Home from "./Home";
import Shop from "./Shop";
import ShopItemsDisplay from "./ShopItemsDisplay";
import ProductDisplay from "./ProductDisplay";
import NotFound from "./NotFound";
import "../styles/RouteSwitch.css";
import { useEffect, useState } from "react";

const RouteSwitch = () => {
    const allProducts = products;
    const [productsInCart, setProductsInCart] = useState([]);
    const [cartPreviewShouldBeOpen, setCartPreviewShouldBeOpen] = useState(false);
    const [productsToRemoveFromCart, setProductsToRemoveFromCart] = useState([]);
    const [productsToAddToCart, setProductsToAddToCart] = useState([]);

    //Currently there are no different options for the same product, so only the name is checked.
    useEffect(() => {
        if(productsToAddToCart.length !== 0) {
            let updatedCart = [...productsInCart];
            productsToAddToCart.forEach((productToAdd) => {
                const existingIndex = updatedCart.findIndex(productInCart => productInCart.name === productToAdd.name);
                if(existingIndex !== -1) updatedCart[existingIndex].quantity += productToAdd.quantity;
                else setProductsInCart(updatedCart.push(Object.assign({}, productToAdd))); 
            });
            setProductsInCart(updatedCart);
            setProductsToAddToCart([]);
        }
    }, [productsToAddToCart]);

    useEffect(() => {
        if(productsToRemoveFromCart.length !== 0) {
            productsToRemoveFromCart.forEach((productToRemove) => {
                const existingIndex = productsInCart.findIndex(cartProduct => productToRemove.name === cartProduct.name);
                productsInCart[existingIndex].quantity -= productToRemove.quantity;
                if(productsInCart[existingIndex].quantity === 0) {
                    let cartContentCopy = [...productsInCart];
                    cartContentCopy.splice(existingIndex, 1)
                    setProductsInCart(cartContentCopy);
                }
            });
            setProductsToRemoveFromCart([]);
        }
    }, [productsToRemoveFromCart]);

    const checkNumberOfProductsInCart= () => productsInCart.reduce((prev, current) => prev + current.quantity, 0);

    return (
        <BrowserRouter>
            <Header numProductsInCart={checkNumberOfProductsInCart()} cartPreviewShouldBeOpen={cartPreviewShouldBeOpen} setCartPreviewShouldBeOpen={setCartPreviewShouldBeOpen}></Header>
            <CartPreview numProductsInCart={checkNumberOfProductsInCart()} productsInCart={productsInCart} cartPreviewShouldBeOpen={cartPreviewShouldBeOpen} setCartPreviewShouldBeOpen={setCartPreviewShouldBeOpen} setProductsToRemoveFromCart={setProductsToRemoveFromCart}></CartPreview>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />}>
                    <Route path="" element={<ShopItemsDisplay allProducts={allProducts} setProductsToAddToCart={setProductsToAddToCart} />}></Route>
                    <Route path="*" element={<ProductDisplay allProducts={allProducts} setProductsToAddToCart={setProductsToAddToCart}/>}></Route>
                </Route>
                <Route path="*" element={<NotFound></NotFound>}></Route>
            </Routes>
        </BrowserRouter>
    );
};

export default RouteSwitch;