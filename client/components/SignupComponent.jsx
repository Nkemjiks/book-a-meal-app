import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
      fullName,
      email,
      phoneNumber,
      password,
      address,
    } = this.state;
    if (!fullName || !email || !phoneNumber || !password || !address) {
      return toast.error('You are missing a field');
    }
    this.props.signupAction(this.state);
    this.setState({
      fullName: '',
      email: '',
      phoneNumber: '',
      password: '',
      address: '',
    });
  }
  render() {

    if (Object.keys(this.props.user).length !== 0 && this.props.user.constructor === Object) {
      return <Redirect to="/customer" />;
    }

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

export default connect(mapStateToProps, mapActionToProps)(SignupComponent);
