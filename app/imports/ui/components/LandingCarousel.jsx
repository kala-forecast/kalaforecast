import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Image } from 'react-bootstrap';

const LandingCarousel = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="landing-carousel p-4 my-5">
      <h1>Featured pages:</h1>
      <Carousel activeIndex={index} onSelect={handleSelect} className="carousel-dark">
        <Carousel.Item>
          <div>
            <h3>Registration:</h3>
            <p>Sign-up and create your username and password</p>
          </div>
          <Image src="/images/sign-up.png" fluid />
        </Carousel.Item>
        <Carousel.Item>
          <div>
            <h3>Sign-In:</h3>
            <p>Using your username and password</p>
          </div>
          <Image src="/images/sign-in.png" fluid />
        </Carousel.Item>
      </Carousel>
    </div>

  );
};

export default LandingCarousel;
