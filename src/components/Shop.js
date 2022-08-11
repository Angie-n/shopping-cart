import ShopItemsDisplay from "./ShopItemsDisplay";

const Shop = props => {
    const {cartItems, setCartItems} = props;

    return (
        <main>
            <ShopItemsDisplay cartItems={cartItems} setCartItems={setCartItems} />
        </main>
    );
};

export default Shop;