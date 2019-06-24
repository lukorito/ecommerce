import React from 'react';
import {Link} from 'react-router-dom';
import './navbar.scss';
import { Dropdown } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import logo from '../../assets/images/logo.png';
import { removeToken } from '../../helpers/authUser';
import Cart from '../Cart';


const NavBar = (props) => {
  const {history, showButtons, customer, total = '0.00'} = props;
  return (
    <div className="header">
      <nav className="nav">
        <div className="container">
          <Link to="/" id="logo">
            <img src={logo} alt="logo" />
          </Link>
          <div className="nav-buttons">
            {!showButtons || Boolean(!customer.hasOwnProperty('name')) &&
            (
              <div className="auth-buttons">
                <Link to="/customers/login">
                Login
                </Link>
                <Link to="/customers/register">
                Register
                </Link>
              </div>
            )}
            {Boolean(customer.hasOwnProperty('name')) && (
              <div className="customer">
              Hi
                <span className="username">
                  {' '}
                  <Dropdown text={customer.name}>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        text="Profile"
                        onClick={() => (
                          history.push('/customer')
                        )} />
                      <Dropdown.Item
                        text="Logout"
                        onClick={() => {
                          removeToken();
                          window.location.reload();
                        }}
                      />
                    </Dropdown.Menu>
                  </Dropdown>
                </span>
              </div>
            )}
            <Cart total={total} />
          </div>
        </div>
      </nav>
    </div>
  );
};

NavBar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  showButtons: PropTypes.bool.isRequired,
  customer: PropTypes.object,
  total: PropTypes.string.isRequired
};

NavBar.defaultProps = {
  customer: {}
};

export default withRouter(NavBar);
