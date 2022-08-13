function importAll(r) {
    return r.keys().map(r);
}
  
const images = importAll(require.context('../assets/images/shop', true, /\.(png|jpe?g)$/));

const Product = (name, description, image, price, categories, quantity, pageName) => {
    return {name, description, image, price, categories, quantity, pageName};
}

const createProducts = () => {
    let products = [];
    const defaultDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
    const defaultPrice = 10000;
    images.forEach(img => {
        let indexOfStaticMedia = img.indexOf("static/media");
        let imgNoStaticMedia = img.substring(indexOfStaticMedia + 13);
        let endOfName = imgNoStaticMedia.indexOf(".");
        let pageName = imgNoStaticMedia.substring(0, endOfName);
        let name = pageName.replaceAll("-", " ");
        products.push(Product(name, defaultDescription, img, defaultPrice, [], 1, pageName));
    });
    return products;
}

const products = createProducts();

export default products;