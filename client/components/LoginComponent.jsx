import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import '../scss/loginComponent.scss';
import apiCall from '../helpers/axios';
import loginAction from '../action/loginAction';

class LoginComponent extends React.Component {
  state = {
    email: '',
    password: '',
  };

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
      return toast.error('Please provide all required fields', {
        hideProgressBar: true,
      });
    }

    apiCall('/auth/login', 'post', this.state)
      .then((response) => {
        window.localStorage.setItem('user', JSON.stringify(response.data.data));
        window.localStorage.setItem('token', response.data.token);
        this.props.loginAction(response.data.data, true);
        this.props.history.push('/customer');
      })
      .catch((err) => {
        this.props.loginAction(err.response.data.message, false);
        return toast.error(err.response.data.message, {
          hideProgressBar: true,
        });
      });

    this.setState({
      email: '',
      password: '',
    });
  }

  render() {
    return (
      <div id="signin-component">
        <div id="signin-container">
          <h1>Sign in</h1>
          <ToastContainer />
          <form action="">
            <input type="email" name="email" placeholder="Email Address" value={this.state.email} onChange={this.handleChange} />
            <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
            <button className="button" onClick={this.handleSubmit}>SIGN IN</button>
          </form>
          <div>
            <p id="forget">
              <Link to="#">Forgot Password?</Link>
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

LoginComponent.propTypes = {
  loginAction: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapActionToProps)(LoginComponent);
