import React from "react";
import "../styles/ImageCarousel.css";

const images = [
  "/images/test1.jpg",
  "/images/test2.jpg",
  "/images/test3.jpg",
  "/images/test4.jpg",
  "/images/test5.jpg"
];

const ImageCarousel = () => {
  return (
    <div className="auto-carousel-container">
      <div className="auto-carousel-track">
        {[...images, ...images].map((img, i) => (
          <div className="auto-image-card" key={i}>
            <img src={img} alt={`Slide ${i}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
