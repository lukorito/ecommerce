import React from 'react';
import './signup.scss';
import { Button, Message, Form } from 'semantic-ui-react';
import { Link }from 'react-router-dom';
import {connect} from 'react-redux';
import NavBar from '../../components/NavBar';
import {signUp} from '../../redux/actions/authActions';

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {history} = this.props;
    if(nextProps.success){
      history.push('/customers/login');
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
    const {signUp} = this.props;
    const {name, email, password} = this.state;
    signUp(name, email, password);
  }

  render() {
    const {name, email, password} = this.state;
    const {loading, errors, error, success} = this.props;
    return (
      <div className="signup-container">
        <NavBar showButtons={false} />
        <div id="sign-up">
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
                  content="Login to order"
                />
              )
            }
            <Form.Field>
              <label>Name</label>
              <input placeholder="Name" name="name" value={name} onChange={this.handleInputChange} />
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <input type="email" placeholder="Email" name="email" value={email} onChange={this.handleInputChange} />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input type="password" placeholder="Password" name="password" value={password} onChange={this.handleInputChange} />
            </Form.Field>
            <Button type="submit">Register</Button>
            <p>
              Already registered? Login
              <span><Link to="/customers/login"> Here</Link></span>
            </p>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    loading: state.auth.loading,
    errors: state.auth.errors,
    success: state.auth.success,
    error: state.auth.error
  });
};
const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (name, email, password) => dispatch(signUp(name, email, password))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
