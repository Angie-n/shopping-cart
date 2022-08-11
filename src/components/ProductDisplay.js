import { Link } from "react-router-dom";
import React from "react";
import NotFound from "./NotFound";
import "../styles/ProductDisplay.css";

const ProductDisplay = props => {
    const {allProducts, cartItems, setCartItems} = props;
    const pathName = window.location.pathname;
    const productPageName = pathName.substring(pathName.indexOf("/shop/") + 6);

    const displayAllPreviousPaths = () => {
        let paths = [];
        let pathNames = [];
        let startIndex = pathName.indexOf("/");
        let remainingPath = pathName.substring(1);

        while(startIndex !== -1) {
            remainingPath = remainingPath.substring(startIndex)
            let endIndex = remainingPath.indexOf("/");

            let currentPath;
            if(endIndex === -1) currentPath = pathName;
            else {
                endIndex += startIndex + 1;
                currentPath = pathName.substring(0, endIndex);
            }

            paths.push(currentPath);
            pathNames.push(currentPath.substring(startIndex + 1).replaceAll("-", " "));

            startIndex = endIndex;
        }

        const addSeparatorIfNeeded = (condition) => {
            if(condition) return <li><p>{" > "}</p></li>
            return <></>
        }

        return (
            <div id="previous-pathways">
                <ul>
                    {pathNames.map((p, i) => {
                        return <React.Fragment key={"previous-pathway-" + i}>
                            <li><Link to={paths[i]}>{p}</Link></li>
                            {addSeparatorIfNeeded(i !== pathNames.length - 1)}
                        </React.Fragment>
                    })}
                </ul>
            </div>
        );
    }
    
    const determineProduct = () => {
        for(let i = 0; i < allProducts.length; i++) if(allProducts[i].pageName === productPageName) return allProducts[i];
        return null;
    };

    const handleAddToCartButtonClick = (e, product) => {
        e.preventDefault();
        let productsToAdd = [];
        for (let i = 0; i < e.currentTarget.getElementsByTagName("input")[0].value; i++) productsToAdd.push(product);
        setCartItems(cartItems.concat(productsToAdd));
        e.currentTarget.getElementsByTagName("input")[0].value = 0;
    }

    const displayProduct = () => {
        const product = determineProduct();
        if(product === null) return <NotFound></NotFound>;
        
        return (
            <>
            {displayAllPreviousPaths()}
            <div id="product-display">
                <div><img src={product.image} alt=""></img></div>
                <div>
                    <h2>{product.name}</h2>
                    <p id="product-display-price">${product.price}</p>
                    <hr />
                    <p>{product.description}</p>
                    <form method="post" id="add-to-cart-form" onSubmit={e => handleAddToCartButtonClick(e, product)}>
                        <label htmlFor="add-to-cart">Quantity</label>
                        <div className="fine-tuning-container">
                            <button type="button" className="fine-tuning-btn" onClick={() => document.querySelector("input[name='add-to-cart'").value++}>+</button>
                            <input type="number" name="add-to-cart" defaultValue="0" min="0" onInput={e => e.currentTarget.value = Math.abs(e.currentTarget.value)}></input>
                            <button type="button" className="fine-tuning-btn" onClick={() => {if(document.querySelector("input[name='add-to-cart'").value > 0) document.querySelector("input[name='add-to-cart'").value--}}>-</button>
                        </div>
                        <button type="submit">Add to Cart</button>
                    </form>
                </div>
            </div>
            </>
        );
    };

    return (
       <>{displayProduct()}</>
    );
}

export default ProductDisplay;
