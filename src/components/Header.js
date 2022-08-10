import { Link } from "react-router-dom";
import "../styles/Header.css";

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li><h1><Link to="">Business Name</Link></h1></li>
                <li><Link to="/shop">Shop</Link></li>
            </ul>
        </nav>
    );
};

const Header = props => {
    const {numCartItems} = props;

    const createCartItemIcon = () => {
        if(numCartItems === 0) return (<></>);
        let numDisplay = numCartItems;
        if(numCartItems > 10) numDisplay = "10+";

        return (
            <div id="cart-num-icon" style={{display: "flex"}}>{numDisplay}</div>
        );

    }

    return (
        <header>
            <button id="cart-btn"><i className="fa-solid fa-cart-shopping"></i>{createCartItemIcon()}</button>
            <Navigation />
        </header>
    );
};

export default Header;