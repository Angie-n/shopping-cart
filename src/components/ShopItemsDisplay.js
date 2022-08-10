import "../styles/ShopItemsDisplay.css";

function importAll(r) {
    return r.keys().map(r);
}
  
const images = importAll(require.context('../assets/images/shop', true, /\.(png|jpe?g)$/));

const Product = (name, description, image, price, categories) => {
    return {name, description, image, price, categories};
}

const createProducts = () => {
    let products = [];
    const defaultDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
    const defaultPrice = 10000;
    images.forEach(img => {
        let indexOfStaticMedia = img.indexOf("static/media");
        let imgNoStaticMedia = img.substring(indexOfStaticMedia + 13);
        let endOfName = imgNoStaticMedia.indexOf(".");
        let name = imgNoStaticMedia.substring(0, 1).toUpperCase() + imgNoStaticMedia.substring(1, endOfName);
        name = name.replaceAll("-", " ");
        products.push(Product(name, defaultDescription, img, defaultPrice, []));
    });
    return products;
}

const products = createProducts();

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

const ShopItemsDisplay = () => {  
    return (
        <div id="product-container">
            {products.map((p, i) => {return <div key={"product-" + i} onMouseEnter={e =>handleProductMouseEnter(e)} onMouseLeave={e => handleProductMouseLeave(e)}>
                    <img src={p.image} alt=""></img>
                    <div>
                        <h3>{p.name}</h3><p>${p.price}</p>
                        <div className="quick-add-container">
                            <label htmlFor="quick-add"><button type="button">Quick Add</button></label>
                            <input type="number" name="quick-add" defaultValue="0" min="0" onInput={(e) => e.currentTarget.value = Math.abs(e.currentTarget.value)}></input>
                            <button type="button" className="quick-add-fine-tuning" onClick={() => document.querySelectorAll("input[name='quick-add'")[i].value++}>+</button>
                            <button type="button" className="quick-add-fine-tuning" onClick={() => {if(document.querySelectorAll("input[name='quick-add'")[i].value > 0) document.querySelectorAll("input[name='quick-add'")[i].value--}}>-</button></div>
                        </div>
                </div>})}
        </div>
    );
};

export default ShopItemsDisplay;