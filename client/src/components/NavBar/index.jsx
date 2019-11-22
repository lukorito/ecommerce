import React from 'react';
import './navbar.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../Header/index';
import { getShoppingCartItems } from '../../redux/actions/shoppingCartActions';
import { getStoredCartId } from '../../helpers/utils';
import { searchProduct } from '../../redux/actions/productsActions';

class NavBar extends React.Component {
  componentDidMount() {
    const {getShoppingCartItems} = this.props;
    const cartId = getStoredCartId();
    getShoppingCartItems(cartId);
  }

  render() {
    const {customer, items, searchProduct, results, searchLoading} = this.props;
    return(
      <nav>
        <Header
          customer={customer}
          items={items}
          handleSearch={searchProduct}
          searchResults={results}
          searchLoading={searchLoading}
        />
        <ul className="subnav">
          <li className="department-subnav">
            <Link to="/products">
              <span>All Products</span>
            </Link>
          </li>
          <li className="department-subnav">
            <Link to="/products/inDepartment/1">
              <span>Regional</span>
            </Link>
          </li>
          <li className="department-subnav">
            <Link to="/products/inDepartment/2">
              <span>Nature</span>
            </Link>
          </li>
          <li className="department-subnav">
            <Link to="/products/inDepartment/3">
              <span>Seasonal</span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

NavBar.propTypes = {
  customer: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  getShoppingCartItems: PropTypes.func.isRequired,
  searchProduct: PropTypes.func.isRequired,
  results: PropTypes.array.isRequired,
  searchLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  return {
    customer: state.customer.customer,
    items: state.items.items,
    results: state.search.results,
    searchLoading: state.search.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getShoppingCartItems: (cartId) => dispatch(getShoppingCartItems(cartId)),
    searchProduct: (query) => dispatch(searchProduct(query))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
