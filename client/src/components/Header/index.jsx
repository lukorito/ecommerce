import React from 'react';
import './header.scss';
import {Link} from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import logo from '../../assets/images/logo.png';
import SearchBar from '../Search/index';
import Cart from '../Cart';
import { removeToken } from '../../helpers/authUser';

const Header = (props) => {
  const {customer = {}, history, items, handleSearch, searchResults, searchLoading} = props;
  return(
    <header>
      <h1 id="logo">
        <Link to="/"><img src={logo} alt={logo} /></Link>
      </h1>
      <div className="search">
        <SearchBar
          handleSearch={handleSearch}
          searchResults={searchResults}
          searchLoading={searchLoading}
        />
      </div>
      <div className="cart">
        <Cart items={items} />
      </div>
      <div className="auth">
        {!customer.hasOwnProperty('name') ? (
          <div className="auth-buttons">
            <Link to="/customers/register">
              Register
            </Link>
            <Link to="/customers/login">
              Login
            </Link>
          </div>
        ) : (
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
      </div>
    </header>
  );
};

Header.propTypes = {
  customer: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  handleSearch: PropTypes.func.isRequired,
  searchResults: PropTypes.array.isRequired,
  searchLoading: PropTypes.bool.isRequired
};

export default withRouter(Header);
