import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Divider, Header, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import NavBar from '../../components/NavBar';
import { getCustomer } from '../../redux/actions/customerActions';
import './customer.scss';
import Spinner from '../../components/Spinner';
import { getShoppingCartTotal } from '../../redux/actions/shoppingCartActions';
import { getStoredCartId } from '../../helpers/utils';

class Customer extends React.Component {
  componentDidMount() {
    const {getCustomer, getShoppingCartTotal} = this.props;
    getCustomer();
    const cartId = getStoredCartId();
    getShoppingCartTotal(cartId);
  }

  render() {
    const {customer, loading, total} = this.props;
    return(
      <div className="profile-container">
        <Spinner isLoading={loading} />
        <NavBar showButtons={false} customer={customer} total={total} />
        <div id="profile">
          <Form size="large">
            <Form.Field>
              <Header as="h2" icon textAlign="center">
                <Icon name="users" circular />
                <Header.Content>Profile</Header.Content>
              </Header>
            </Form.Field>
            <Form.Field>
              <label>Name</label>
              <Divider />
              <div>{customer.name}</div>
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <Divider />
              <div>{customer.email}</div>
            </Form.Field>
            <Form.Field>
              <label>Address</label>
              <Divider />
              <div>{customer.address_1 || 'null'}</div>
            </Form.Field>
            <Form.Field>
              <label>City</label>
              <Divider />
              <div>{customer.city || 'null'}</div>
            </Form.Field>
            <Form.Field>
              <label>Country</label>
              <Divider />
              <div>{customer.country || 'null'}</div>
            </Form.Field>
            <Form.Field>
              <label>Day Phone</label>
              <Divider />
              <div>{customer.day_phone || 'null'}</div>
            </Form.Field>
            {/*Todo
            - Add Edit Section
            */}
            <Button>Edit</Button>
          </Form>
        </div>
      </div>
    );
  }
}

Customer.propTypes = {
  customer: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  total: PropTypes.string.isRequired,
  getCustomer: PropTypes.func.isRequired,
  getShoppingCartTotal: PropTypes.func.isRequired
};

Customer.defaultProps = {
  customer: {}
};

const mapStateToProps = (state) => {
  return {
    customer: state.customer.customer,
    loading: state.customer.loading,
    total: state.total.total
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCustomer: () => dispatch(getCustomer()),
    getShoppingCartTotal: (cartId) => dispatch(getShoppingCartTotal(cartId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Customer);
