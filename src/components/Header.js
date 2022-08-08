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

const Header = () => {
    return (
        <header>
            <button id="cart-btn"><i className="fa-solid fa-cart-shopping"></i></button>
            <Navigation />
        </header>
    );
};

export default Header;