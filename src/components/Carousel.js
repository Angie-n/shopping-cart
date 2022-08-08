import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/Carousel.css";

function importAll(r) {
    return r.keys().map(r);
}
  
const images = importAll(require.context('../assets/images/carousel', true, /\.(png|jpe?g)$/));
const imageTexts = ["A diverse collection for your varied tastes", "Beautiful bouquets for every occasion", "A way to touch grass without stepping outside", "Smells fresh so you don't have to", "Start your collection today"];

const Carousel = () => {
    const [currentImage, setCurrentImage] = useState(images[0]);
    const [nextImage, setNextImage] = useState(null);
    const [isDelayed, setIsDelayed] = useState(false);

    const backToDefaultPosition = imageElement => {
        if(imageElement.style.transform !== "translate(0%)") {
            imageElement.style.left = imageElement.dataset.offsetLeft + "%";
            imageElement.classList.add("no-transition");
            imageElement.style.transform = "translate(0%)";
            //Need to force DOM redraw.
            let redraw = imageElement.offsetHeight;
            imageElement.classList.remove("no-transition");
        }
    }

    const moveCarousel = () => {
        const imageElements = document.getElementById("carousel-images").getElementsByTagName("img");

        const currentIndex = images.indexOf(currentImage);
        const currentImageElement = imageElements[currentIndex];

        const nextIndex = images.indexOf(nextImage);
        const nextImageElement = imageElements[nextIndex];

        let transVal = -100;
        if(currentIndex > nextIndex) transVal = 100;

        backToDefaultPosition(currentImageElement);
        backToDefaultPosition(nextImageElement);

        nextImageElement.style.left = nextImageElement.dataset.offsetLeft - transVal + "%";
        nextImageElement.style.zIndex = "1";

        currentImageElement.style.transform = "translate(" + transVal + "%)";
        nextImageElement.style.transform = "translate(" + transVal + "%)";

        setTimeout(() => {
            currentImageElement.style.zIndex = "0";
        },1000);

        setCurrentImage(nextImage);
        updateActiveIndicator(document.getElementsByClassName("carousel-indicator-btn")[nextIndex], currentImage);
        setNextImage(null);
    }

    const indicatorContainerHandleClick = e => {
        let container = e.currentTarget;
        container.style.pointerEvents = "none";
        setTimeout(() => {container.style.pointerEvents = "auto"}, 1000);
    }

    const updateActiveIndicator = (indicatorBtn, img) => {
        let currentlyActive = document.getElementById("carousel-indicator-btn-active");
        if(currentlyActive !== indicatorBtn) {
            if(currentlyActive != null) currentlyActive.id = "";
            indicatorBtn.id = "carousel-indicator-btn-active";
            if(currentImage !== img) setNextImage(img);
        }
    }

    const nextBtnHandleClick = e => {
        const currentIndex = images.indexOf(currentImage);
        const nextIndex = (currentIndex + 1) % images.length;
        const nextBtn = e.currentTarget;
        nextBtn.disabled = true;
        setTimeout(() => {nextBtn.disabled = false}, 1000);
        setNextImage(images[nextIndex]);
    }

    const previousBtnHandleClick = e => {
        const currentIndex = images.indexOf(currentImage);
        const nextIndex = (((currentIndex - 1) % images.length) + images.length) % images.length;
        const prevBtn = e.currentTarget;
        prevBtn.disabled = true;
        setTimeout(() => {prevBtn.disabled = false}, 1000);
        setNextImage(images[nextIndex]);
    }

    function useInterval(callback, delay) {
        const savedCallback = useRef();
      
        useEffect(() => {
          savedCallback.current = callback;
        }, [callback]);
      
        useEffect(() => {
          function tick() {
            savedCallback.current();
          }
          if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
          }
        }, [delay]);
    }

    useInterval(() => {
        let currentIndex = images.indexOf(currentImage);
        let nextIndex = (currentIndex + 1) % images.length;
        setNextImage(images[nextIndex]);
    }, isDelayed ? null : 6000);

    useEffect(() => {
        if(nextImage != null) {
            let carouselText = document.getElementById("carousel-text");
            carouselText.classList.add("faded-text");
            carouselText.textContent = imageTexts[images.indexOf(nextImage)];
            moveCarousel();
            setIsDelayed(true);
            setTimeout(() => {
                setIsDelayed(false);
                carouselText.classList.remove("faded-text");
            }, 1000);
        }
    }, [nextImage]);
    

    useEffect(() => {
        document.getElementById("carousel-text").textContent = imageTexts[0];
        document.getElementsByClassName("carousel-indicator-btn")[0].id = "carousel-indicator-btn-active";
    }, []);

    return (
        <div id="carousel-container">
            <div className="black-screen"></div>
            <div id="carousel-text-container"><h2 id="carousel-text"></h2><Link to='/shop'>Shop Now</Link></div>
            <div id="carousel-images">
                {images.map((img, i) => <img data-index-number={i} style={{left: i * -100 + "%"}} data-offset-left={i * -100} key={"carousel-img-" + i} src={img} alt=""></img>)}
            </div>
            <div id="carousel-indicator-btn-container" onClick={e => indicatorContainerHandleClick(e)}>
                {images.map((img, i) => <button data-index-number={i} key={"carousel-indicator-" + i} className="carousel-indicator-btn" onClick={e => updateActiveIndicator(e.currentTarget, img)}></button>)}
            </div>
            <div id="carousel-next-btn-container">
                <button value="previous" onClick={e => previousBtnHandleClick(e)}>{"<"}</button>
                <button value="next" onClick={e => nextBtnHandleClick(e)}>{">"}</button>
            </div>
        </div>
    )
}

export default Carousel;