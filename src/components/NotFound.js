import "../styles/NotFound.css";
import notFoundIconSrc from "../assets/images/icons/wind.png";

const NotFound = () => {
    return (
        <div id="product-display-not-found">
            <img src={notFoundIconSrc} alt=""></img>
            <p>Page Not Found</p><a href="https://www.flaticon.com/free-icons/wind" title="wind icon">Wind icon created by max.icons - Flaticon</a>
        </div>
    );
}

export default NotFound;