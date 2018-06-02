import React from 'react';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';
import axios from 'axios';

import 'react-toastify/dist/ReactToastify.css';
import '../scss/catererManageMealComponent.scss';

import apiCall from '../helpers/axios';
import getToken from '../helpers/getToken';
import getMealsAction from '../action/getMealsAction';
import displayToast from '../helpers/displayToast';
import getUserDetailsAction from '../action/getUserDetailsAction';
import getMealsRequest from '../helpers/getMealsRequest';
import MealsAddedListComponent from './MealsAddedListComponent';


class CatererManageMealComponent extends React.Component {
  state = {
    mealName: '',
    price: '',
    imageURL: '',
    uploadProgress: '',
    selectedFile: '',
    meals: [],
  };

  // Update user and meal details in Store
  // Set the state of the meals from local storage
  componentWillMount() {
    const user = JSON.parse(window.localStorage.getItem('@#$user'));
    this.props.getUserDetailsAction(user);
    getMealsRequest(getToken(), this.props.getMealsAction);
  }

  componentWillReceiveProps({ meals }) {
    if (meals.length > 0) {
      this.setState({
        meals,
      });
    } else {
      this.setState({
        meals: [],
      });
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  selectFileHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
    });
  }

  // Upload meal image to cloudinary
  imageUploadHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', this.state.selectedFile);
    formData.append('upload_preset', 'wi9ctqvg');
    axios.post('https://api.cloudinary.com/v1_1/dqsmurjpg/image/upload', formData, {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        this.setState({
          uploadProgress: `${percentCompleted} %`,
        });
      },
    })
      .then((response) => {
        this.setState({
          imageURL: response.data.url,
        });
        return displayToast('success', 'Image Uploaded successfully');
      })
      .catch(() => displayToast('error', 'There was error while uploading the image. Try again'));
  }

  // Submit meal details, dispatch appropriate actions and update store
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

    // Add meal API call
    apiCall('/meals', 'post', mealData, getToken())
      .then(() => {
        displayToast('success', 'Meal Added Successfully');
        getMealsRequest(getToken(), this.props.getMealsAction);
      })
      .catch(err => displayToast('error', err.response.data.message));

    this.setState({
      mealName: '',
      price: '',
      imageURL: '',
      uploadProgress: '',
    });
  }

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
              <span>{this.state.uploadProgress}</span>
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
                <MealsAddedListComponent meals={this.state.meals} />
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

const mapStateToProps = ({ getMeals }) => {
  const { meals, error } = getMeals;
  return {
    meals,
    error,
  };
};

const mapActionToProps = {
  getUserDetailsAction,
  getMealsAction,
};

CatererManageMealComponent.propTypes = {
  getUserDetailsAction: PropTypes.func.isRequired,
  getMealsAction: PropTypes.func.isRequired,
  meals: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapActionToProps)(CatererManageMealComponent);
