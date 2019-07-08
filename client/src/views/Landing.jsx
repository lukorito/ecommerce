import React from 'react';
import { connect } from 'react-redux';
import Wrapper from '../components/Wrapper/index';
import { getCustomer } from '../redux/actions/customerActions';
import {
  getShoppingCartId,
  getShoppingCartTotal,
} from '../redux/actions/shoppingCartActions';

class Landing extends React.Component {
  render() {
    return (
      <div>
        <Wrapper />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    customer: state.customer.customer,
    total: state.total.total
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCustomer: () => dispatch(getCustomer()),
    getShoppingCartTotal: (cartId) => dispatch(getShoppingCartTotal(cartId)),
    getShoppingCartId: () => dispatch(getShoppingCartId())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
