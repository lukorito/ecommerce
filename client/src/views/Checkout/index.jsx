import React from 'react';
import PropType from 'prop-types';
import './checkout.scss';
import { Form, Input, Button, Dropdown, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {Elements, StripeProvider} from 'react-stripe-elements';
import NavBar from '../../components/NavBar';
import {
  getCustomer, getShippingRegions,
  getTaxDetails, updateCustomerAddress,
} from '../../redux/actions/customerActions';
import { createOrder } from '../../redux/actions/orderActions';
import { getShoppingCartTotal } from '../../redux/actions/shoppingCartActions';
import { getStoredCartId } from '../../helpers/utils';
import CheckoutForm from '../../components/CheckoutForm/CheckoutForm';
import { resetSuccess } from '../../redux/actions/generalActions';

class Checkout extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      firstAddress: '',
      secondAddress: '',
      city: '',
      region:'',
      postalCode: '',
      country: '',
      shippingRegionId: '',
      taxId: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  componentDidMount() {
    const {getCustomer, getTaxDetails, getShippingRegions, getShoppingCartTotal} = this.props;
    getCustomer();
    getTaxDetails();
    getShippingRegions();
    getShoppingCartTotal(getStoredCartId());
  }

  componentWillReceiveProps(nextProps) {
    const {history} = this.props;
    if(nextProps.paymentSuccess) {
      setTimeout(() => history.push('/'), 2000);
    }
  }

  componentWillUnmount() {
    const {resetSuccess, orderSuccess } = this.props;
    if(orderSuccess) {
      resetSuccess();
    }
  }


  handleInputChange = (e, data) => {
    const {name, value} = data;
    this.setState({
      [name]: value
    });
  };

  handleSubmit (e) {
    e.preventDefault();
    const {firstAddress, secondAddress, city, region, postalCode, country, shippingRegionId, taxId} = this.state;
    const {createOrder, updateCustomerAddress,} = this.props;
    const cartId = getStoredCartId();
    createOrder(cartId, shippingRegionId, taxId);
    updateCustomerAddress(firstAddress, secondAddress, city, region, postalCode, country, shippingRegionId);
  }

  render() {
    const {customer, regions, taxes, total, orderSuccess} = this.props;
    const shippingOptions = regions.map((item, index) => ({
      text: item.shipping_region,
      key: index,
      value: item.shipping_region_id
    }));
    const taxOptions = taxes.map((item, index) => ({
      text: item.tax_type,
      key: index,
      value: item.tax_id
    }));
    return(
      <div className="wrapper">
        <NavBar showButtons={false} customer={customer} total={total} />
        <div className="checkout-container">
          <div className="customer-info">
            <h2>Shipping Information</h2>
            {orderSuccess ? (
              <Message success compact>
                <Message.Header>Success</Message.Header>
                <p>Order successfully created, please make payment</p>
              </Message>
            ) : (
              <Message negative compact>
                <Message.Header>Notice</Message.Header>
                <p>Please save order before completing payment</p>
              </Message>
            )}
            <Form onSubmit={this.handleSubmit}>
              <Form.Group inline>
                <Form.Field inline required>
                  <label>Address 1</label>
                  <Input placeholder="Address 1" onChange={this.handleInputChange} name="firstAddress" />
                </Form.Field>
                <Form.Field inline>
                  <label>Address 2</label>
                  <Input placeholder="Address 2" onChange={this.handleInputChange} name="secondAddress" />
                </Form.Field>
                <Form.Field inline required>
                  <label>City</label>
                  <Input placeholder="City" onChange={this.handleInputChange} name="city" />
                </Form.Field>
                <Form.Field inline required>
                  <label>Region</label>
                  <Input placeholder="Region" onChange={this.handleInputChange} name="region" />
                </Form.Field>
                <Form.Field inline required>
                  <label>Postal Code</label>
                  <Input placeholder="Postal Code" onChange={this.handleInputChange} name="postalCode" />
                </Form.Field>
                <Form.Field inline required>
                  <label>Country</label>
                  <Input placeholder="Country" onChange={this.handleInputChange} name="country" />
                </Form.Field>
                <Form.Field inline required>
                  <label>Shipping Region</label>
                  <span>
                    <Dropdown
                      simple
                      selection
                      openOnFocus={false}
                      options={shippingOptions.length > 0 ? shippingOptions : null}
                      onChange={this.handleInputChange}
                      name="shippingRegionId"
                    />
                  </span>
                </Form.Field>
                <Form.Field inline required>
                  <label>Tax</label>
                  <span>
                    <Dropdown
                      simple
                      selection
                      openOnFocus={false}
                      options={taxOptions.length > 0 ? taxOptions : null}
                      onChange={this.handleInputChange}
                      name="taxId"
                    />
                  </span>
                </Form.Field>

              </Form.Group>
              <Button color="teal" type="submit">Save Order</Button>
            </Form>
          </div>
          <div className="payment-container">
            <h1>Payment</h1>
            <StripeProvider apiKey="pk_test_Wnlj3KQoq9bQPFWrh6CO2KQz00avyqcsV4">
              <Elements>
                <CheckoutForm total={total} />
              </Elements>
            </StripeProvider>
          </div>
        </div>
      </div>
    );
  }
}

Checkout.propTypes = {
  customer: PropType.object,
  regions: PropType.array.isRequired,
  taxes: PropType.array.isRequired,
  total: PropType.string.isRequired,
  orderSuccess: PropType.bool.isRequired,
  getCustomer: PropType.func.isRequired,
  getTaxDetails: PropType.func.isRequired,
  getShippingRegions: PropType.func.isRequired,
  updateCustomerAddress: PropType.func.isRequired,
  createOrder: PropType.func.isRequired,
  getShoppingCartTotal: PropType.func.isRequired,
  resetSuccess: PropType.func.isRequired,
  paymentSuccess: PropType.bool.isRequired,
  history: PropType.shape({
    push: PropType.func
  }).isRequired
};

Checkout.defaultProps = {
  customer: {}
};

const mapStateToProps = (state) => {
  return {
    customer: state.customer.customer,
    regions: state.addressDetails.regions,
    taxes: state.addressDetails.taxes,
    total: state.total.total,
    orderSuccess: state.order.success,
    paymentSuccess: state.payment.success
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCustomer: () => dispatch(getCustomer()),
    getTaxDetails: () => dispatch(getTaxDetails()),
    getShippingRegions: () => dispatch(getShippingRegions()),
    updateCustomerAddress: (firstAddress, secondAddress, city, region, postalCode, country, shippingRegionId) => dispatch(updateCustomerAddress(firstAddress, secondAddress, city, region, postalCode, country, shippingRegionId)),
    createOrder: (cartId, shippingId, taxId) => dispatch(createOrder(cartId, shippingId, taxId)),
    getShoppingCartTotal: (cartId) => dispatch(getShoppingCartTotal(cartId)),
    resetSuccess: () => dispatch(resetSuccess())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
