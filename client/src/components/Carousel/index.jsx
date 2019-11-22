import React from 'react';
import PropTypes from 'prop-types';
import './carousel.scss';
import { Carousel } from 'react-responsive-carousel';

const ImageSlider = ({product}) => {
  return (
    <div className="slider-container">
      <Carousel>
        <div>
          <img src={require(`../../assets/product_images/${product.image}`)} alt={product.image} />
        </div>
        <div>
          <img src={require(`../../assets/product_images/${product.image_2}`)} alt={product.image_2} />
        </div>
      </Carousel>
    </div>
  );
};

ImageSlider.propTypes = {
  product: PropTypes.object.isRequired
};

export default ImageSlider;
