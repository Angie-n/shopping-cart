import { Link } from "react-router-dom";
import storeLogoSrc from "../assets/images/icons/leaves-icon.svg";
import "../styles/Header.css";

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li><h1><Link to=""><img id="store-logo" src={storeLogoSrc} alt="" /><p>Business Name</p></Link></h1></li>
                <li><Link to="/shop">Shop</Link></li>
            </ul>
        </nav>
    );
};

const Header = props => {
    const {numProductsInCart, setCartPreviewShouldBeOpen} = props;

    const createCartItemIcon = () => {
        if(numProductsInCart === 0) return (<></>);
        let numDisplay = numProductsInCart;
        if(numProductsInCart > 10) numDisplay = "10+";

        return (<div id="cart-num-icon" style={{display: "flex"}}>{numDisplay}</div>);
    }

    return (
        <header>
            <Navigation />
            <button id="cart-btn" onClick={() => setCartPreviewShouldBeOpen(true)}><i className="fa-solid fa-cart-shopping"></i>{createCartItemIcon()}</button>
        </header>
    );
};

export default Header;