import React from 'react';
import '../styles/herobanner.css';
import Carousel from 'react-bootstrap/Carousel';
import img1 from '../assets/images/herobanner/img1.jpg';
import img2 from '../assets/images/herobanner/img2.jpg';
import img3 from '../assets/images/herobanner/img3.jpg';
import img4 from '../assets/images/herobanner/img4.jpg';

function HeroBanner() {

    const images = [img1, img2, img3, img4];
  return (
    <div className='hero-main'>
              <Carousel>
     {images.map((image, index) => ( 
      <Carousel.Item key={index} interval={1500}>
              <img className='carousel-img d-block w-100' src={image} alt="banner-images" />
        
      </Carousel.Item>
    ))}
      
    </Carousel>
    </div>
  );
}

export default HeroBanner;
