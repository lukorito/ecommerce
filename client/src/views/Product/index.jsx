import React from 'react';
import PropTypes from 'prop-types';
import './product.scss';
import { connect } from 'react-redux';
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
    const {match : {params : { id }}, fetchProduct, getProductAttributes, getCustomer, success, resetSuccess, getShoppingCartTotal} = this.props;
    const cartId = getStoredCartId();
    getShoppingCartTotal(cartId);
    fetchProduct(id);
    getProductAttributes(id);
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
    const { productAttributes, product={}, loading, success} = this.props;
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
                <div>
                  <div className="color" onClick={event => console.log(event.target.dataset)}>
                    <div className="green" data-color="green" style={{'border': '2px solid green', 'width': '200px'}}></div>
                    <div data-color="red" style={{'border': '2px solid red'}}></div>
                  </div>
                </div>
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
                <div>Color</div>
                <div className="color">
                  {
                    productAttributes.length > 0 &&
                    productAttributes.map((attribute) => {
                      return attribute.attribute_name === 'Color'
                        ? (
                          <span key={attribute.attribute_value_id}>
                            <input type="radio" value={attribute.attribute_value} name={attribute.attribute_name} onChange={this.handleChange} />
                            <span>
                              {' '}
                              {attribute.attribute_value}
                              {' '}
                            </span>
                          </span>
                        )
                        :
                        null;
                    })
                  }
                </div>
                <div>Size</div>
                <div className="size">
                  {/*TODO
                  - Refactor
                  */}
                  {
                    productAttributes.length > 0 &&
                    productAttributes.map((attribute) => {
                      return attribute.attribute_name === 'Size'
                        ? (
                          <span key={attribute.attribute_value_id}>
                            <input type="radio" value={attribute.attribute_value} name={attribute.attribute_name} onChange={this.handleChange} />
                            <span>
                              {' '}
                              {attribute.attribute_value}
                              {' '}
                            </span>
                          </span>
                        )
                        :
                        null;
                    })
                  }
                </div>
              </div>
              <Button color="teal" loading={loading} onClick={() => this.handleAddCart(product.product_id)}> Add to Cart</Button>
              {success && (
                <Message positive>
                  <p>Added to Cart Successfully</p>
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
  getProductAttributes: PropTypes.func.isRequired,
  getCustomer: PropTypes.func.isRequired,
  getShoppingCartId: PropTypes.func.isRequired,
  addProductToCart: PropTypes.func.isRequired,
  getShoppingCartTotal: PropTypes.func.isRequired,
  resetSuccess: PropTypes.func.isRequired,
  product: PropTypes.object,
  customer: PropTypes.object,
  productAttributes: PropTypes.object,
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
  productAttributes: {}
};


const mapStateToProps = (state) => {
  return {
    product: state.product.product,
    customer: state.customer.customer,
    productAttributes: state.productAttributes.attributes,
    loading: state.shoppingCart.loading,
    success: state.shoppingCart.success,
    total: state.total.total
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProduct: (productId) => dispatch(fetchProduct(productId)),
    getProductAttributes: (productId) => dispatch(getProductAttributes(productId)),
    getCustomer: () => dispatch(getCustomer()),
    getShoppingCartId: () => dispatch(getShoppingCartId()),
    addProductToCart: (cartId, productId, attributes) => dispatch(addProductToCart(cartId, productId, attributes)),
    getShoppingCartTotal: (cartId) => dispatch(getShoppingCartTotal(cartId)),
    resetSuccess: () => dispatch(resetSuccess()),
    getShoppingCartItems: (cartId) => dispatch(getShoppingCartItems(cartId))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Product);
