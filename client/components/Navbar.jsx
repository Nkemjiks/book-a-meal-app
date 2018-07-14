import React, { Component, Fragment } from 'react';
import Modal from 'react-modal';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import '../scss/navbarComponent.scss';
import '../scss/modal.scss';

import updateUserRoleAction from '../action/updateUserRoleAction';
import imageUploadAction from '../action/imageUploadAction';
import displayToast from '../helpers/displayToast';

/**
 * navigate through the application
 *
 * @class Navbar
 *
 * @extends {Component}
 */
export class Navbar extends Component {
  /**
   * lifecycle methods called when there is an update to the store
   *
   * @memberof Navbar
   *
   * @returns {object} updates component state
   */
  static getDerivedStateFromProps({
    imageURL,
    imageUploadProgress, user,
  }, state) {
    if (user !== state.user) {
      return {
        user,
        modalIsOpen: false,
        logoURL: '',
        businessName: '',
        businessAddress: '',
      };
    }
    if (imageUploadProgress) {
      return { imageUploadProgress };
    }
    if (imageURL !== '') {
      return { logoURL: imageURL };
    }
    /* istanbul ignore next */
    return null;
  }

  state = {
    user: {},
    modalIsOpen: false,
    imageUploadProgress: '',
    logoURL: '',
    businessName: '',
    businessAddress: '',
  }

  /**
   * lifecycle methods called immediately after a component is mounted
   *
   * @memberof Navbar
   *
   * @returns {object} mounts modal on root element
   */
  componentDidMount() {
    Modal.setAppElement('#app');
  }

  /**
   * user logout handler
   *
   * @memberof Navbar
   *
   * @returns {undefined} remove user information from local storage and redirect user to login page
   */
  handleLogout = () => {
    window.localStorage.removeItem('@#$user');
    window.localStorage.removeItem('@#$token');
    window.localStorage.removeItem('@#$getmeal%^');
    this.props.history.push('/login');
  }

  /**
   * updates component state when form values change
   *
   * @param {Object} event
   *
   * @memberof Navbar
   *
   * @returns {undefined} updates state
   */
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  /**
   * updates component state when input with type file values change
   *
   * @param {Object} event
   *
   * @memberof Navbar
   *
   * @returns {undefined} updates state
   */
  selectFileHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
    });
  }

  /**
   * image upload handler
   *
   * @param {Object} event
   *
   * @memberof Navbar
   *
   * @returns {undefined} make apicall to upload an image and update state
   */
  imageUploadHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', this.state.selectedFile);
    formData.append('upload_preset', 'wi9ctqvg');
    this.props.imageUploadAction(formData);
  }
  /**
   * update user role handler
   *
   * @memberof Navbar
   *
   * @returns {undefined} makes an API call to update user role to caterer
   */
  handleRoleUpdate = (event) => {
    event.preventDefault();
    const {
      businessName,
      businessAddress,
      logoURL,
    } = this.state;

    const userData = {
      businessName,
      businessAddress,
      logoURL,
    };
    // Check to make sure all fields are provided
    if (!businessName || !businessAddress || !logoURL) {
      return displayToast('error', 'Please provide all required fields');
    }
    this.props.updateUserRoleAction(userData, this.props.history);
  }

  /**
   * method called to open modal
   *
   * @param  {event} event
   *
   * @memberof Navbar
   *
   * @return {undefined} sets state and call getTotal method
   */
  openModal = () => {
    this.setState({
      modalIsOpen: true,
    });
  }

  /**
   * method called to close modal
   *
   * @memberof Navbar
   *
   * @return {undefined} sets state
   */
  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  /**
   * renders component to DOM
   *
   * @memberof Navbar
   *
   * @returns {JSX} JSX representation of component
   */
  render() {
    return (
      <Fragment>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          className="EditModal"
          overlayClassName="Overlay"
        >
          <h1>Update Role</h1>
          <form action="">
            <input type="text" name="businessName" placeholder="Business Name" className="input" value={this.state.businessName} onChange={this.handleChange} />
            <input type="text" name="businessAddress" placeholder="Business Address" className="input" value={this.state.businessAddress} onChange={this.handleChange} />
            <input type="file" name="logoURL" className="imageSelector" accept=".jpg, .jpeg, .png" onChange={this.selectFileHandler} />
            <button className="uploadButton" onClick={this.imageUploadHandler}>Upload</button>
            <span>{this.state.imageUploadProgress} %</span>
            <button className="button" onClick={this.handleRoleUpdate} >Update Role</button>
          </form>
        </Modal>
        <div id="nav">
          <Link to="/">
            <img src="image/logo.png" alt="logo" />
          </Link>
          {
          ((this.props.location.pathname === '/') ||
          (this.props.location.pathname === '/login') ||
          (this.props.location.pathname === '/signup')) &&
          <Fragment>
            <Link to="/login">
              <button className="signin tablet">LOGIN</button>
            </Link>
            <Link to="/signup">
              <button className="signup tablet">SIGN UP</button>
            </Link>
          </Fragment>
        }
          {
          (/customer/.test(this.props.location.pathname)) &&
          !(/caterer/.test(this.props.location.pathname)) &&
          (this.state.user !== null) &&
          <Fragment>
            <div id="dropdown">
              <i className="fas fa-cog" id="nav-setting" />
              <div className="dropdown-content">
                <h4 id="dropdown-name">{this.state.user.fullName}</h4>
                <Link to="/customer/dashboard/0">Dashboard</Link>
                <Link to="/customer/order">Order History</Link>
                <a href="https://bookameal24.docs.apiary.io/#" target="_blank" rel="noopener noreferrer" className="default">Documentation</a>
                {
                  this.state.user.role === 'customer' &&
                  <button className="logout" onClick={this.openModal}>Become a Caterer</button>
                }
                {
                  this.state.user.role === 'caterer' && <Link to="/caterer/menu">Caterer Panel</Link>
                }
                <button className="logout" onClick={this.handleLogout}>Logout</button>
              </div>
            </div>
            <h3>{this.state.user.fullName}</h3>
            <i className="fas fa-user" id="nav-avatar" />
          </Fragment>
        }
          {
          (/caterer/.test(this.props.location.pathname)) &&
          !(/customer/.test(this.props.location.pathname)) &&
          (this.state.user !== null) &&
          <Fragment>
            <div id="dropdown">
              <i className="fas fa-cog" id="nav-setting-caterer" />
              <div className="dropdown-content-caterer">
                <h4 id="dropdown-name-caterer">{this.state.user.businessName}</h4>
                <Link to="/caterer/menu" className="dropdown-option">Set Menu</Link>
                <Link to="/caterer/meal" className="dropdown-option">Manage Meals</Link>
                <Link to="/caterer/order" className="dropdown-option">Manage Orders</Link>
                <Link to="/customer/dashboard/0" className="default">Customer Dashboard</Link>
                <a target="_blank" rel="noopener noreferrer" href="https://bookameal24.docs.apiary.io/#" className="default">Documentation</a>
                <button className="default logout" onClick={this.handleLogout}>Logout</button>
              </div>
            </div>
            <Link to="/caterer/order">
              <button className="manage-button">Manage Orders</button>
            </Link>
            <Link to="/caterer/menu">
              <button className="manage-button">Set Menu</button>
            </Link>
            <Link to="/caterer/meal">
              <button className="manage-button">Manage Meals</button>
            </Link>
          </Fragment>
        }
        </div>
      </Fragment>
    );
  }
}

/* istanbul ignore next */
const mapStateToProps = ({ userInformation, imageUpload }) => {
  const { user, error } = userInformation;
  const { imageURL, imageUploadProgress } = imageUpload;
  return {
    user,
    error,
    imageURL,
    imageUploadProgress,
  };
};

const mapActionToProps = {
  updateUserRoleAction,
  imageUploadAction,
};

Navbar.propTypes = {
  updateUserRoleAction: PropTypes.func.isRequired,
  imageUploadAction: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(connect(mapStateToProps, mapActionToProps)(Navbar));
