import { Link } from "react-router-dom";
import React from "react";
import NotFound from "./NotFound";
import "../styles/ProductDisplay.css";

const ProductDisplay = props => {
    const {allProducts, setProductsToAddToCart} = props;
    const pathName = window.location.hash;
    const productPageName = pathName.substring(pathName.indexOf("/shop/") + 6);

    const displayAllPreviousPaths = () => {
        let paths = [];
        let pathNames = [];
        let initialIndex = pathName.indexOf("/shop/");
        let startIndex = initialIndex;
        let remainingPath = pathName;

        while(startIndex !== -1) {            
            remainingPath = remainingPath.substring(startIndex + 1);
            let endIndex = remainingPath.indexOf("/");

            let currentPath;
            if(endIndex === -1) currentPath = pathName.substring(initialIndex);
            else {
                endIndex += startIndex + 1;
                currentPath = pathName.substring(initialIndex, endIndex);
            }

            paths.push(currentPath);
            pathNames.push(currentPath.substring(currentPath.lastIndexOf("/") + 1).replaceAll("-", " "));

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
        setProductsToAddToCart(productsToAdd);
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
                            <button type="button" className="fine-tuning-btn" onClick={e => {if(e.currentTarget.nextElementSibling.value > 0) e.currentTarget.nextElementSibling.value--}}>-</button>
                            <input type="number" name="add-to-cart" defaultValue="0" min="0" onInput={e => e.currentTarget.value = Math.abs(e.currentTarget.value)}></input>
                            <button type="button" className="fine-tuning-btn" onClick={e => e.currentTarget.previousElementSibling.value++}>+</button>
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
