import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../scss/loginComponent.scss';
import loginAction from '../action/loginAction';

class LoginComponent extends React.Component {
  state = {
    email: '',
    password: '',
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      return toast.error(nextProps.error);
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      email,
      password,
    } = this.state;

    if (!email || !password) {
      return toast.error('You are missing a field');
    }

    this.props.loginAction(this.state);

    this.setState({
      email: '',
      password: '',
    });
  }

  render() {

    if (Object.keys(this.props.user).length !== 0 && this.props.user.constructor === Object) {
      return <Redirect to="/customer" />;
    }

    return (
      <div id="signin-component">
        <div id="signin-container">
          <h1>Sign in</h1>
          <ToastContainer />
          <form action="">
            <input type="email" name="email" placeholder="Email Address" onChange={this.handleChange} />
            <input type="password" name="password" placeholder="Password" onChange={this.handleChange} />
            <button className="button" onClick={this.handleSubmit}>SIGN IN</button>
          </form>
          <div>
            <p id="forget">
              <a href="#">Forgot Password?</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ userInformation }) => {
  const { user, error } = userInformation;
  return {
    user,
    error,
  };
};

const mapActionToProps = {
  loginAction,
};

export default connect(mapStateToProps, mapActionToProps)(LoginComponent);
