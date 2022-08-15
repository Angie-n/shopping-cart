import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/CartPreview.css";

const CartPreview = props => {
    const {numProductsInCart, productsInCart, setProductsToRemoveFromCart, cartPreviewShouldBeOpen, setCartPreviewShouldBeOpen} = props;
    const [animationClass, setAnimationClass] = useState("");  
    const [inputTriggered, setInputTriggered] = useState(false);
    const [totalCost, setTotalCost] = useState(0);

    const updateValues = () => {
        let inputs = [...document.getElementById("cart-preview-items").querySelectorAll("input[name='add-to-cart']")];
        let costs = 0;
        inputs.forEach((input, i) => {
            input.value = productsInCart[i].quantity;
            costs += productsInCart[i].quantity * productsInCart[i].price;
        });
        setTotalCost(costs);
    }

    useEffect(() => {
        if(numProductsInCart !== 0) {
            if(animationClass !== "open-cart-preview") setCartPreviewShouldBeOpen(true);
            updateValues();
        }
    }, [numProductsInCart]);

    useEffect(() => {
        if(cartPreviewShouldBeOpen) setAnimationClass("open-cart-preview");
        else setAnimationClass("");
    }, [cartPreviewShouldBeOpen]);

    useEffect(() => {
        if(inputTriggered) setInputTriggered(false);
    }, [inputTriggered]);

    const determineTabIndex = () => {
        if(!cartPreviewShouldBeOpen) return -1;
        else return 0;
    }

    const handleCartItemBlur = (e, p) => {
        e.currentTarget.value = Math.abs(e.currentTarget.value);
        if(e.currentTarget.value > 0) {
            setTotalCost(totalCost + (parseInt(e.currentTarget.value) * p.price) - (p.quantity * p.price));
            p.quantity = parseInt(e.currentTarget.value);
            setInputTriggered(true);
        }
        else e.currentTarget.value = p.quantity;
    }

    const handleCartItemDecrement = (e, p) => {
        if(p.quantity > 1) {
            setTotalCost(totalCost - p.price);
            e.currentTarget.nextElementSibling.value--;
            p.quantity--;
            setInputTriggered(true);
        }
    }

    const handleCartItemIncrement = (e, p) => {
        setTotalCost(totalCost + p.price);
        e.currentTarget.previousElementSibling.value++;
        p.quantity++;
        setInputTriggered(true);
    }

    const handleRemoveButtonOnClick = p => {
        setTotalCost(totalCost - p.price * p.quantity);
        setProductsToRemoveFromCart([p]);
    }

    const createPreviewItem = (p, i) => {
        return (
            <div key={"preview-cart-item-" + i} className="cart-preview-item">
                <Link to={"/shop/" + p.pageName} onClick={() => setCartPreviewShouldBeOpen(false)}><img src={p.image} alt="" /></Link>
                <div>
                    <Link to={"/shop/" + p.pageName} onClick={() => setCartPreviewShouldBeOpen(false)}><h3>{p.name}</h3></Link>
                    <p>${p.price}</p>
                    <div className="fine-tuning-container">
                        <button type="button" className="fine-tuning-btn" onClick={e => handleCartItemDecrement(e, p)}>-</button>
                        <input type="number" name="add-to-cart" min="1" defaultValue={p.quantity} onBlur={e => handleCartItemBlur(e, p)}></input>
                        <button type="button" className="fine-tuning-btn" onClick={e => handleCartItemIncrement(e, p)}>+</button>
                    </div>
                    <button type="button" onClick={() => handleRemoveButtonOnClick(p)} className="remove-cart-preview-item-btn">Remove</button>
                </div>
            </div>
        );
    }

    const BlockerDiv = () => {
        if(!cartPreviewShouldBeOpen) return <></>;
        else return <div id="blocker-div"></div>;
    }

    return (
        <>
        <BlockerDiv />
        <div id="cart-preview" className={animationClass} tabIndex={determineTabIndex()}>
            <button id="cart-preview-exit-btn" tabIndex={determineTabIndex()} onClick={() => setCartPreviewShouldBeOpen(false)}>X</button>
            <h2>Cart Items</h2>
            <hr></hr>
            <div id="cart-preview-items">{productsInCart.map((p,i) => createPreviewItem(p, i))}</div>
            <div id="cart-preview-cost"><p>Total:</p><p>${totalCost}</p></div>
            <div id="cart-preview-btn-container">
                <button tabIndex={determineTabIndex()}>Checkout</button>
                <button tabIndex={determineTabIndex()} onClick={() => setCartPreviewShouldBeOpen(false)}>Continue Shopping</button>
            </div>
        </div>
        </>
    );
}

export default CartPreview;