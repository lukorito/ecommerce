import React from 'react';
import './productscontainer.scss';
import PropTypes from 'prop-types';
import ProductItem from '../ProductItem';

const ProductsContainer = ({products}) => {
  return (
    <div className="grid-container">
      <div className="product-list">
        {
          products.map((product) => {
            return (
              <ProductItem product={product} key={product.product_id} />
            );
          })
        }
      </div>
    </div>
  );
};

ProductsContainer.propTypes = {
  products: PropTypes.array.isRequired
};

export default ProductsContainer;
