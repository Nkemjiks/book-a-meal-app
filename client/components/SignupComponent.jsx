import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import apiCall from '../helpers/axios';
import '../scss/signupComponent.scss';
import signupAction from '../action/signupAction';

class SignupComponent extends React.Component {
  state = {
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    address: '',
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let user = null;
    let error = null;

    const {
      fullName,
      email,
      phoneNumber,
      password,
      address,
    } = this.state;

    if (!fullName || !email || !phoneNumber || !password || !address) {
      return toast.error('Please provide all required fields', {
        hideProgressBar: true,
      });
    }

    apiCall('/auth/signup', 'post', this.state)
      .then((response) => {
        window.localStorage.setItem('user', JSON.stringify(response.data.data));
        window.localStorage.setItem('token', response.data.token);
        user = response.data.data;
        this.props.signupAction(user);
        this.props.history.push('/customer');
      })
      .catch((err) => {
        error = err.response.data.message;
        this.props.signupAction(user, error);
        return toast.error(error, {
          hideProgressBar: true,
        });
      });

    if (user) {
      this.setState({
        fullName: '',
        email: '',
        phoneNumber: '',
        password: '',
        address: '',
      });
    }
  }
  render() {
    return (
      <div id="signup-component">
        <div id="signup-container">
          <h1>Sign Up Now</h1>
          <ToastContainer />
          <form>
            <input type="text" name="fullName" value={this.state.fullName} placeholder="Full Name" onChange={this.handleChange} />
            <input type="email" name="email" value={this.state.email} placeholder="Email Address" onChange={this.handleChange} />
            <input type="tel" name="phoneNumber" value={this.state.phoneNumber} placeholder="Phone Number" onChange={this.handleChange} />
            <input type="password" name="password" value={this.state.password} placeholder="Password" onChange={this.handleChange} />
            <input type="text" name="address" value={this.state.address} placeholder="Address" onChange={this.handleChange} />
            <button className="button" onClick={this.handleSubmit}>SIGN UP</button>
          </form>
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
  signupAction,
};

SignupComponent.propTypes = {
  signupAction: PropTypes.func.isRequired,
};

export default withRouter(connect(mapStateToProps, mapActionToProps)(SignupComponent));
