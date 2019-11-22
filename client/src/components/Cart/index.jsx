import React from 'react';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './cart.scss';

const Cart = ({items}) => {
  return (
    <div className="shopping-cart">
      <Link to="/shoppingCart" id="cart-link">
        <Icon.Group size="large">
          <Icon name="shopping cart" />
        </Icon.Group>
      </Link>
      <span className="quantity">
        {items.length}
      </span>
    </div>
  );
};

Cart.propTypes = {
  items: PropTypes.array.isRequired
};

export default Cart;
