import { Link } from "react-router-dom";
import "../styles/ShopItemsDisplay.css";

const ShopItemsDisplay = props => {  
    const {allProducts, cartItems, setCartItems} = props;

    const handleProductMouseEnter = e => {
        e.currentTarget.getElementsByTagName("img")[0].classList.add("half-fade-out");
        e.currentTarget.getElementsByClassName("quick-add-container")[0].classList.add("grow-height");
        e.currentTarget.getElementsByClassName("quick-add-container")[0].style.display = "grid";
    }
    
    const handleProductMouseLeave = e => {
        e.currentTarget.getElementsByTagName("img")[0].classList.remove("half-fade-out");
        e.currentTarget.getElementsByClassName("quick-add-container")[0].classList.remove("grow-height");
        e.currentTarget.getElementsByClassName("quick-add-container")[0].style.display = "none";
    }
    
    const handleQuickAddButtonClick = (e, product) => {
        e.preventDefault();
        let productsToAdd = [];
        for (let i = 0; i < e.currentTarget.getElementsByTagName("input")[0].value; i++) productsToAdd.push(product);
        setCartItems(cartItems.concat(productsToAdd));
        e.currentTarget.getElementsByTagName("input")[0].value = 0;
    }

    return (
        <div id="product-container">
            {allProducts.map((p, i) => {return <div key={"product-" + i} onMouseEnter={e =>handleProductMouseEnter(e)} onMouseLeave={e => handleProductMouseLeave(e)}>
                    <Link to={p.pageName}></Link>
                    <img src={p.image} alt=""></img>
                    <div>
                        <h3>{p.name}</h3><p>${p.price}</p>
                        <form method="post" className="quick-add-container" onSubmit={e => handleQuickAddButtonClick(e, p)}>
                            <label htmlFor="quick-add"><button type="submit">Quick Add</button></label>
                            <input type="number" name="quick-add" defaultValue="0" min="0" onInput={e => e.currentTarget.value = Math.abs(e.currentTarget.value)}></input>
                            <button type="button" className="fine-tuning-btn" onClick={() => {document.querySelectorAll("input[name='quick-add'")[i].value++}}>+</button>
                            <button type="button" className="fine-tuning-btn" onClick={() => {if(document.querySelectorAll("input[name='quick-add'")[i].value > 0) document.querySelectorAll("input[name='quick-add'")[i].value--}}>-</button>
                        </form>
                    </div>
                </div>})}
        </div>
    );
};

export default ShopItemsDisplay;