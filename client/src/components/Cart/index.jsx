import React from 'react';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './cart.scss';

const Cart = ({total}) => {
  return (
    <div className="cart">
      <Link to="/shoppingCart" id="cart-link">
        <Icon.Group size="large">
          <Icon name="shopping cart" />
        </Icon.Group>
        <span>
        Cart :
          <span>{total}</span>
        </span>
      </Link>

    </div>
  );
};

Cart.propTypes = {
  total: PropTypes.string.isRequired
};

export default Cart;
