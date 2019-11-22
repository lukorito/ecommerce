import React from 'react';
import PropTypes from 'prop-types';
import './product.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Image, Message } from 'semantic-ui-react';
import { fetchProduct } from '../../redux/actions/productsActions';
import { getProductAttributes } from '../../redux/actions/attributesActions';
import { getCustomer } from '../../redux/actions/customerActions';
import {
  addProductToCart,
  getShoppingCartId, getShoppingCartItems, getShoppingCartTotal,
} from '../../redux/actions/shoppingCartActions';
import { getStoredCartId } from '../../helpers/utils';
import { resetSuccess } from '../../redux/actions/generalActions';
import ImageSlider from '../../components/Carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import RadioComponent from '../../components/RadioComponent';

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: '',
      color: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAddCart = this.handleAddCart.bind(this);
  }

  componentDidMount() {
    const {match : {params : { id }}, fetchProduct, getCustomer, success, resetSuccess, getShoppingCartTotal} = this.props;
    const cartId = getStoredCartId();
    getShoppingCartTotal(cartId);
    fetchProduct(id);
    getCustomer();
    if(success) resetSuccess();
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

  handleChange(e){
    const {value, name} = e.target;
    this.setState({
      [name.toLowerCase()]: value
    });
  }

  async handleAddCart (productId) {
    const {addProductToCart, getShoppingCartTotal, getShoppingCartItems} = this.props;
    const {size, color} = this.state;
    const cartId = await this.getCartId();
    const attributes = `${size}, ${color}`;
    await addProductToCart(cartId, productId, attributes);
    getShoppingCartTotal(cartId);
    getShoppingCartItems(cartId);
  }

  // TODO
  // finish designing product colors and size picker
  // continue refactor

  render() {
    const { product={}, loading, success} = this.props;
    const { size, color } = this.state;
    const sizeOptions = ['S', 'M', 'L', 'XL', 'XXL'];
    const colorOptions = ['White', 'Black', 'Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Purple'];
    return(
      <div className="wrapper">
        {product.hasOwnProperty('name') && (
          <div className="product-container">
            <div className="product-image">
              <ImageSlider product={product} />
            </div>
            <div className="product-description">
              <h1>{product.name}</h1>
              <div className="product-price">
                <span>&#36;</span>
                {parseInt(product.discounted_price, 10)
                  ? (
                    <div>
                      <span>
                        {' '}
                        {product.discounted_price}
                        {' '}
                      </span>
                      <span>{product.price}</span>
                    </div>
                  )
                  : (
                    <span>
                      {' '}
                      {product.price}
                      {' '}
                    </span>
                  )}
              </div>
              <div className="description">
                {product.description}
              </div>
              <div className="attributes">
                <div className="color">
                  <span>Color</span>
                  <RadioComponent onChange={this.handleChange} name="color" selected={color} options={colorOptions} />
                </div>

                <div className="size">
                  <span>Size</span>
                  <RadioComponent onChange={this.handleChange} name="size" selected={size} options={sizeOptions} />
                </div>
              </div>
              <Button color="teal" loading={loading} onClick={() => this.handleAddCart(product.product_id)} disabled={!(Boolean(size) && Boolean(color))}> Add to Cart</Button>
              {success && (
                <Message positive>
                  <span>Added to Cart Successfully </span>
                  <Link to="/shoppingCart">Go to Cart</Link>
                </Message>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

Product.propTypes = {
  fetchProduct: PropTypes.func.isRequired,
  getCustomer: PropTypes.func.isRequired,
  getShoppingCartId: PropTypes.func.isRequired,
  addProductToCart: PropTypes.func.isRequired,
  getShoppingCartTotal: PropTypes.func.isRequired,
  resetSuccess: PropTypes.func.isRequired,
  product: PropTypes.object,
  customer: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired,
  total: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }).isRequired
};

Product.defaultProps = {
  product: {},
  customer: {},
};


const mapStateToProps = (state) => {
  return {
    product: state.product.product,
    customer: state.customer.customer,
    loading: state.shoppingCart.loading,
    success: state.shoppingCart.success,
    total: state.total.total
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProduct: (productId) => dispatch(fetchProduct(productId)),
    getCustomer: () => dispatch(getCustomer()),
    getShoppingCartId: () => dispatch(getShoppingCartId()),
    addProductToCart: (cartId, productId, attributes) => dispatch(addProductToCart(cartId, productId, attributes)),
    getShoppingCartTotal: (cartId) => dispatch(getShoppingCartTotal(cartId)),
    resetSuccess: () => dispatch(resetSuccess()),
    getShoppingCartItems: (cartId) => dispatch(getShoppingCartItems(cartId))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Product);
