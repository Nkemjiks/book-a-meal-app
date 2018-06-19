import React from 'react';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import '../../../scss/catererManageMealComponent.scss';

import getMealsAction from '../../../action/getMealsAction';
import addMealAction from '../../../action/addMealAction';
import imageUploadAction from '../../../action/imageUploadAction';
import refreshTokenRequest from '../../../helpers/refreshTokenRequest';
import displayToast from '../../../helpers/displayToast';
import getUserDetailsAction from '../../../action/getUserDetailsAction';
import MealsAddedList from './MealsAddedList';

/**
 * view caterer's meals
 *
 * @class ManageMeal
 *
 * @extends {Component}
 */
export class ManageMeal extends React.Component {
  /**
   * lifecycle methods called when there is an update to the store
   *
   * @memberof ManageMeal
   *
   * @returns {object} updates component state
   */
  static getDerivedStateFromProps({
    meals,
    mealAdded,
    imageURL,
    imageUploadProgress,
  }, state) {
    if (mealAdded) {
      return {
        mealName: '',
        price: '',
        imageURL: '',
        imageUploadProgress: '',
      };
    }
    if (meals !== state.meals) {
      return {
        meals,
      };
    }
    if (imageURL !== '') {
      return { imageURL };
    }
    if (imageUploadProgress) {
      return { imageUploadProgress };
    }
    return null;
  }

  state = {
    mealName: '',
    price: '',
    imageURL: '',
    imageUploadProgress: '',
    selectedFile: '',
    meals: [],
  };

  /**
   * lifecycle methods called immediately after a component is mounted
   *
   * @memberof ManageMeal
   *
   * @returns {object} updates the user and caterer's meal information in the redux store
   */
  componentDidMount() {
    refreshTokenRequest(this.props.history);
    const user = JSON.parse(window.localStorage.getItem('@#$user'));
    this.props.getUserDetailsAction(user);
    this.props.getMealsAction();
  }

  /**
   * lifecycle methods called immediately after a component is updated
   *
   * @memberof ManageMeal
   *
   * @returns {object} updates the caterer's meal information in the redux store
   */
  componentDidUpdate(prevProps) {
    if (prevProps.mealAdded !== this.props.mealAdded) {
      this.props.getMealsAction();
    }
  }
  /**
   * updates component state when form values change
   *
   * @param {Object} event
   *
   * @memberof ManageMeal
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
   * @memberof ManageMeal
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
   * @memberof ManageMeal
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
   * add meal handler
   *
   * @param {Object} event
   *
   * @memberof ManageMeal
   *
   * @returns {undefined} make apicall to add meal to the database
   */
  handleSubmit = (event) => {
    event.preventDefault();

    const {
      mealName,
      price,
      imageURL,
    } = this.state;

    const mealData = {
      name: mealName,
      price,
      imageURL,
    };
    // Check to make sure all fields are provided
    if (!mealName || !price || !imageURL) {
      return displayToast('error', 'Please provide all required fields');
    }
    this.props.addMealAction(mealData);
  }

  /**
   * renders component to DOM
   *
   * @memberof ManageMeal
   *
   * @returns {JSX} JSX representation of component
   */
  render() {
    const { mealName, price, imageURL } = this.state;
    const enabled =
          mealName.length > 0 &&
          price.length > 0 && imageURL.length > 0;
    return (
      <div className="dashboard">
        <div id="caterer-dashboard-flex">
          <div className="add-meal" >
            <h1>Add Meal</h1>
            <form action="">
              <input type="text" name="mealName" placeholder="Meal Name" className="input" value={this.state.mealName} onChange={this.handleChange} />
              <input type="number" name="price" placeholder="Price" className="input" value={this.state.price} onChange={this.handleChange} />
              <input type="file" name="imageURL" className="imageSelector" accept=".jpg, .jpeg, .png" onChange={this.selectFileHandler} />
              <button className="uploadButton" onClick={this.imageUploadHandler}>Upload</button>
              <span> {this.state.imageUploadProgress} %</span>
              { enabled &&
                <button id="enabledAddMealButton" className="button" onClick={this.handleSubmit}>Add Meal</button>
              }
              { !enabled &&
                <button id="disabledAddMealButton" className="button" onClick={this.handleSubmit} disabled>Add Meal</button>
              }
            </form>
          </div>
          <div className="added-meals">
            <h1>Meal Added</h1>
            <div className="meals-added description">
              <h4>Image</h4>
              <h4>Name</h4>
              <h4>Price</h4>
              <h4>Edit/Delete</h4>
            </div>
            <div className="meals" >
              {
              (this.state.meals.length !== 0) &&
                <MealsAddedList meals={this.state.meals} />
              }
              {
              (this.state.meals.length === 0) &&
              <p className="no-meal">You have not added any meal</p>
              }
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

const mapStateToProps = ({
  catererMeals,
  imageUpload, uploadProgress,
}) => {
  const { meals, error, mealAdded } = catererMeals;
  const { imageURL } = imageUpload;
  const { imageUploadProgress } = uploadProgress;
  return {
    meals,
    error,
    mealAdded,
    imageURL,
    imageUploadProgress,
  };
};

const mapActionToProps = {
  getUserDetailsAction,
  getMealsAction,
  addMealAction,
  imageUploadAction,
};

ManageMeal.propTypes = {
  getUserDetailsAction: PropTypes.func.isRequired,
  getMealsAction: PropTypes.func.isRequired,
  addMealAction: PropTypes.func.isRequired,
  imageUploadAction: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  mealAdded: PropTypes.bool.isRequired,
};

export default withRouter(connect(mapStateToProps, mapActionToProps)(ManageMeal));
