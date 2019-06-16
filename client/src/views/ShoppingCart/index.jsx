import React from 'react';
import './shoppingcart.scss';
import { connect } from 'react-redux';
import {Table, Dropdown, Icon, Button} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import { getCustomer } from '../../redux/actions/customerActions';
import {
  deleteItemFromCart, emptyCart,
  getShoppingCartItems,
  getShoppingCartTotal, updateShoppingCart,
} from '../../redux/actions/shoppingCartActions';
import { getStoredCartId, removeStoredCartId } from '../../helpers/utils';

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      items: []
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEmptyCart = this.handleEmptyCart.bind(this);
  }

  async componentDidMount() {
    const {getCustomer, getShoppingCartTotal, getShoppingCartItems} = this.props;
    getCustomer();
    const cartId = await this.getCartId();
    getShoppingCartTotal(cartId);
    getShoppingCartItems(cartId);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      items: nextProps.items
    });
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

  handleChange(itemId) {
    const {updateShoppingCart} = this.props;
    return function (e, {value}) {
      updateShoppingCart(itemId, value);
    };
  }

  handleDelete(itemId) {
    const {deleteItemFromCart} = this.props;
    const {items} = this.state;
    return () => {
      this.setState({
        items: items.filter((item) => item.item_id !== itemId)
      });
      deleteItemFromCart(itemId);
    };
  }
  async handleEmptyCart(){
    const {emptyCart} = this.props;
    const cartId = await this.getCartId();
    await emptyCart(cartId);
    removeStoredCartId();
  }

  render() {
    const {items} = this.state;
    const {customer} = this.props;
    const selectOptions = [
      {value: 1, text: 1},
      {value: 2, text: 2},
      {value: 3, text: 3},
      {value: 4, text: 4},
      {value: 5, text: 5}
    ];
    return(
      <div className="wrapper">
        <NavBar showButtons customer={customer} />

        <div className="cart-container">
          <h1>
            {items.length}
            {' '}
item(s) in the Cart
          </h1>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Product</Table.HeaderCell>
                <Table.HeaderCell>Attributes</Table.HeaderCell>
                <Table.HeaderCell>Price</Table.HeaderCell>
                <Table.HeaderCell>Quantity</Table.HeaderCell>
                <Table.HeaderCell>Subtotal</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {items.length > 0 && items.map((item) => {
                return (
                  <Table.Row key={item.item_id}>
                    <Table.Cell>{item.name}</Table.Cell>
                    <Table.Cell>{item.attributes}</Table.Cell>
                    <Table.Cell>{item.price}</Table.Cell>
                    <Table.Cell>
                      <Dropdown
                        selection
                        options={selectOptions}
                        value={item.quantity}
                        onChange={this.handleChange(item.item_id)}
                      />
                    </Table.Cell>
                    <Table.Cell>{item.subtotal}</Table.Cell>
                    <Table.Cell>
                      <span className="delete">
                        <Button onClick={this.handleDelete(item.item_id)}>
                          <Icon name="trash" />
                        </Button>
                      </span>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
            <Table.Footer fullWidth>
              <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell colSpan="6">
                  <Link to="/checkout">
                    <Button floated="right" icon labelPosition="left" color="teal" size="small">
                      <Icon name="money" />
                      {' '}
                      Checkout
                    </Button>
                  </Link>
                  {items.length > 0
                    ? <Button size="small" color="red" onClick={this.handleEmptyCart}>Empty Cart</Button>
                    : <Link to="/products"><Button size="small" color="teal">Continue Shopping</Button></Link>}
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    customer: state.customer.customer,
    total: state.total.total,
    items: state.items.items
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCustomer: () => dispatch(getCustomer()),
    getShoppingCartTotal: (cartId) => dispatch(getShoppingCartTotal(cartId)),
    getShoppingCartItems: (cartId) => dispatch(getShoppingCartItems(cartId)),
    updateShoppingCart: (itemId, quantity) => dispatch(updateShoppingCart(itemId, quantity)),
    deleteItemFromCart: (itemId) => dispatch(deleteItemFromCart(itemId)),
    emptyCart: (cartId) => dispatch(emptyCart(cartId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
