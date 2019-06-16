import React from 'react';
import './checkout.scss';
import {CardElement, injectStripe} from 'react-stripe-elements';
import { Form, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getCustomer } from '../../redux/actions/customerActions';
import { getShoppingCartTotal } from '../../redux/actions/shoppingCartActions';
import { getStoredCartId } from '../../helpers/utils';
import { makePayment } from '../../redux/actions/orderActions';

const createOptions = () => {
  return {
    style: {
      base: {
        fontSize: '16px',
        color: '#000',
        fontFamily: 'Open Sans, sans-serif',
        letterSpacing: '0.025em',
        '::placeholder': {
        },
      },
      invalid: {
        color: '#c23d4b',
      },
    }
  };
};

class CheckoutForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      description: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    const {getCustomer} = this.props;
    getCustomer();
    getShoppingCartTotal(getStoredCartId());
  }


  async handleSubmit(e){
    e.preventDefault();
    const {stripe, customer, order, makePayment, total} = this.props;
    const {description} = this.state;
    const {token} = await stripe.createToken({name: customer.name});
    makePayment(token.id, order.orderId, description, total);
  }

  handleChange (e) {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    const {paymentSuccess} = this.props;
    return (
      <div className="checkout">
        <Form onSubmit={this.handleSubmit}>
          <CardElement {...createOptions()} />
          <textarea
            name="description" onChange={this.handleChange}
            className="description" placeholder="Order Description" required />
          <button type="submit">Pay</button>
        </Form>
        {paymentSuccess && (
          <Message success compact>
            <Message.Header>Success</Message.Header>
            <p>Payment Successful</p>
          </Message>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    customer: state.customer.customer,
    order: state.order.order,
    paymentSuccess: state.payment.success
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCustomer: () => dispatch(getCustomer()),
    makePayment: (stripeToken, orderId, description, amount) => dispatch(makePayment(stripeToken, orderId, description, amount))
  };
};

export default injectStripe(connect(mapStateToProps, mapDispatchToProps)(CheckoutForm));
