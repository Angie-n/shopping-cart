import Carousel from "./Carousel";
import "../styles/Home.css";

const OurValues = () => {
    let index = 0;

    const createValueDiv = (icon, header, text) => {
        index++;
        return (<div key={"our-values-" + index}>{icon}<h3>{header}</h3><p>{text}</p></div>);
    };

    const fillOurValuesDivs = () => {
        let values = [];
        values.push(createValueDiv(<i className="fa-solid fa-truck"></i>, "Delivery guaranteed", "Unsure about fast, but it'll come eventually."));
        values.push(createValueDiv(<i className="fa-solid fa-book"></i>, "Free plant care guides", "So many have died"));
        values.push(createValueDiv(<i className="fa-solid fa-heart"></i>, "Grown with love", "Try and prove it's wrong, we'll wait"));
        return values;
    }

    const ourValuesDivs = fillOurValuesDivs();
    
    return (
        <div id="our-values-container">
            {ourValuesDivs.map(vd => vd)}
        </div>
    );
}

const Home = () => {
    return (
        <main>
            <Carousel></Carousel>
            <OurValues></OurValues>
        </main>
    );
}

export default Home;