import React from 'react';
import './productitem.scss';
import { Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProductItem = ({product}) => {
  return (
    <div className="product-item">
      <div className="image-container">
        <Link to={`/products/${product.product_id}`} key={product.product_id}>
          <Image src={require(`../../assets/product_images/${product.thumbnail}`)} alt={product.thumbnail} />
        </Link>
        {parseInt(product.discounted_price, 10) ? <span className="discount">Discounted</span> : null}
      </div>
      <div className="product-item-description">
        <span className="product-name">{product.name}</span>
        <div className="product-price">
          {parseInt(product.discounted_price, 10)
            ? (
              <div className="discounted">
                <span>
                  {' '}
                  <span>$</span>
                  {product.discounted_price}
                  {' '}
                </span>
                <span>{product.price}</span>
              </div>

            )
            : (
              <span>
                {' '}
                <span>$</span>
                {product.price}
                {' '}
              </span>
            )}
        </div>
        <div className="description">
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductItem;
