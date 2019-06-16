import React from 'react';
import { Button, Form, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import './login.scss';
import {connect} from 'react-redux';
import {login} from '../../redux/actions/authActions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {history} = this.props;
    const {state} = history.location;
    const {pathname} = state.from;
    if(nextProps.success){
      history.push(pathname);
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
    const {loading, errors, error, success} = this.props;
    console.log(this.props.history)
    return (
      <div className="login-container">
        <NavBar showButtons={false} />
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
const mapStateToProps = (state) => {
  return {
    loading: state.login.loading,
    errors: state.login.errors,
    success: state.login.success,
    error: state.login.error
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    login : (email, password) => dispatch(login(email, password))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
