import React from 'react';
import {Link} from 'react-router-dom';
import './navbar.scss';
import { Dropdown, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import logo from '../../assets/images/logo.png';
import { removeToken } from '../../helpers/authUser';

const NavBar = (props) => {
  const {history, showButtons, customer = {}, total, shoppingCart} = props;
  return (
    <div className="header">
      <nav className="nav">
        <div className="container">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          {!showButtons || Boolean(!customer.hasOwnProperty('name')) &&
            (
              <div className="nav-buttons">
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
          <div className="cart">
            <Link to="/shoppingCart">
              <Icon.Group size="large">
                <Icon name="shopping cart" />
                <Icon corner color="pink">{}</Icon>
              </Icon.Group>
            </Link>
            <div>{total}</div>
          </div>

        </div>
      </nav>
    </div>
  );
};

export default withRouter(NavBar);
