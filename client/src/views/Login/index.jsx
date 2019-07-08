import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import NavBar from '../../components/NavBar';
import {login} from '../../redux/actions/authActions';
import './login.scss';
import { getShoppingCartTotal } from '../../redux/actions/shoppingCartActions';
import { getStoredCartId } from '../../helpers/utils';
import { clearErrors } from '../../redux/actions/generalActions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {
    const {errors, clearErrors} = this.props;
    if(errors.length > 0 ){
      clearErrors();
    }
  }

  componentDidMount() {
    const { getShoppingCartTotal } = this.props;
    const cartId = getStoredCartId();
    getShoppingCartTotal(cartId);
  }



  componentWillReceiveProps(nextProps) {
    const {history} = this.props;
    const {location: {state}} = history;
    if(state !== undefined) {
      const {pathname} = state.from;
      if(nextProps.success){
        history.push(pathname);
      }
    } else if(nextProps.success){
      history.push('/');
    }
  }

  handleInputChange(event) {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const {email, password} = this.state;
    const {login} = this.props;
    login(email, password);
  }

  render() {
    const { email, password} = this.state;
    const {loading, errors, error, success, total} = this.props;
    return (
      <div className="login-container">
        <NavBar showButtons={false} total={total} />
        <div id="login">
          <Form size="large" onSubmit={this.handleSubmit} loading={loading}>
            {error
              ? (
                <Message
                  visible={error}
                  error
                  header={errors[0].field}
                  content={errors[0].message}
                />
              )
              : (
                <Message
                  visible={success}
                  success
                  header="Success"
                  content="Login successful"
                />
              )
            }
            <Form.Field>
              <label>Email</label>
              <input type="email" placeholder="Email" name="email" value={email} onChange={this.handleInputChange} />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input type="password" placeholder="Password" name="password" value={password} onChange={this.handleInputChange} />
            </Form.Field>
            <Button type="submit">Login</Button>
            <p>
              New? Click
              <span><Link to="/customers/register"> Here </Link></span>
              to register
            </p>
          </Form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loading: PropTypes.bool.isRequired,
  errors: PropTypes.array,
  error: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  getShoppingCartTotal: PropTypes.func.isRequired,
  total: PropTypes.string.isRequired,
  clearErrors: PropTypes.func.isRequired
};

Login.defaultProps = {
  errors: []
};


const mapStateToProps = (state) => {
  return {
    loading: state.login.loading,
    errors: state.login.errors,
    success: state.login.success,
    error: state.login.error,
    total: state.total.total,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    login : (email, password) => dispatch(login(email, password)),
    getShoppingCartTotal: (cartId) => dispatch(getShoppingCartTotal(cartId)),
    clearErrors: () => dispatch(clearErrors())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
