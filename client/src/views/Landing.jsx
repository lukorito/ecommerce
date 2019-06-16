import React from 'react';
import { connect } from 'react-redux';
import NavBar from '../components/NavBar/index';
import Products from './Products/index';
import { getCustomer } from '../redux/actions/customerActions';
import {
  getShoppingCartId,
  getShoppingCartTotal,
} from '../redux/actions/shoppingCartActions';
import { getStoredCartId } from '../helpers/utils';

class Landing extends React.Component {

  async componentDidMount() {
    const {getCustomer, getShoppingCartTotal} = this.props;
    getCustomer();
    const cartId = await this.getCartId();
    getShoppingCartTotal(cartId)
  }

  async getCartId () {
    const {getShoppingCartId} = this.props;
    let cartId;
    cartId = getStoredCartId();
    if(!cartId) {
      await getShoppingCartId();
      cartId = getStoredCartId();
    }
    return cartId;
  }

  render() {
    const  {customer, total} = this.props;
    return (
      <div>
        <NavBar showButtons customer={customer} total={total} />
        <Products />
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
