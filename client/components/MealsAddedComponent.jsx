import React, { Fragment } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import '../scss/modal.scss';

import apiCall from '../helpers/axios';
import displayToast from '../helpers/displayToast';
import modifyMealAction from '../action/modifyMealAction';
import deleteMealAction from '../action/deleteMealAction';
import getMealsRequest from '../helpers/getMealsRequest';
import getMealsAction from '../action/getMealsAction';

let token;
Modal.setAppElement('#app');

class MealAddedComponent extends React.Component {
  state = {
    modifyModalIsOpen: false,
    deleteModalIsOpen: false,
    mealId: '',
    uploadProgress: '',
    mealName: '',
    price: '',
    imageURL: '',
    selectedFile: '',
  };
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
      .catch(err => displayToast('error', 'There was error while uploading the image. Try again'));
  }

  // Submit meal details, dispatch appropriate actions and update store
  handleModifyMeal = (event) => {
    event.preventDefault();
    token = window.localStorage.getItem('token');

    const {
      mealName,
      price,
      imageURL,
      mealId,
    } = this.state;

    let mealData;
    const currentMealName = document.getElementById(`${mealId}name`).innerText;
    const currentMealPrice = Number(document.getElementById(`${mealId}price`).innerText.substr(2));

    // Check to make sure all fields are provided
    if (!mealName || !price) {
      return displayToast('error', 'Please provide all required fields');
    }

    if (
      (mealName === currentMealName) &&
      (price === currentMealPrice) && !imageURL) {
      return displayToast('error', 'You have not made any changes');
    } else if (
      (mealName === currentMealName) &&
      (price !== currentMealPrice) && !imageURL) {
      mealData = {
        price,
      };
    } else if (
      (mealName !== currentMealName) &&
      (price !== currentMealPrice) && !imageURL) {
      mealData = {
        name: mealName,
        price,
      };
    } else if (
      (mealName === currentMealName) &&
      (price !== currentMealPrice) && imageURL) {
      mealData = {
        price,
        imageURL,
      };
    } else if (
      (mealName === currentMealName) &&
      (price === currentMealPrice) && imageURL) {
      mealData = {
        imageURL,
      };
    } else if (
      (mealName !== currentMealName) &&
      (price !== currentMealPrice) && imageURL) {
      mealData = {
        name: mealName,
        price,
        imageURL,
      };
    }

    // Add meal API call
    apiCall(`/meals/${this.state.mealId}`, 'put', mealData, token)
      .then((response) => {
        this.props.modifyMealAction(true);
        displayToast('success', 'Meal Modified Successfully');
        getMealsRequest(token, this.props.getMealsAction);
      })
      .catch((err) => {
        this.props.modifyMealAction(false);
        return displayToast('error', err.response.data.message);
      });
    this.setState({
      mealName: '',
      price: '',
      imageURL: '',
      uploadProgress: '',
      mealId: '',
    });
    this.closeEditModal();
  }

  handleDeleteMeal = (event) => {
    event.preventDefault();
    token = window.localStorage.getItem('token');

    // Delete meal API call
    apiCall(`/meals/${this.state.mealId}`, 'delete', null, token)
      .then((response) => {
        this.props.deleteMealAction(true);
        displayToast('success', 'Meal Deleted Successfully');
        getMealsRequest(token, this.props.getMealsAction);
      })
      .catch((err) => {
        this.props.deleteMealAction(false);
        return displayToast('error', err.response.data.message);
      });
    this.setState({
      mealName: '',
      price: '',
      imageURL: '',
      uploadProgress: '',
    });
    this.closeDeleteModal();
  }
  openEditModal = (event) => {
    const currentMealName = document.getElementById(`${event.target.id}name`).innerText;
    const currentMealPrice = Number(document.getElementById(`${event.target.id}price`).innerText.substr(2));
    this.setState({
      modifyModalIsOpen: true,
      mealId: event.target.id,
      mealName: currentMealName,
      price: currentMealPrice,
    });
  }
  openDeleteModal = () => {
    this.setState({
      deleteModalIsOpen: true,
      mealId: event.target.id,
    });
  }
  closeEditModal = () => {
    this.setState({ modifyModalIsOpen: false });
  }
  closeDeleteModal = () => {
    this.setState({ deleteModalIsOpen: false });
  }

  render() {
    const { meal } = this.props;
    return (
      <Fragment>
        <Modal
          isOpen={this.state.modifyModalIsOpen}
          onRequestClose={this.closeEditModal}
          className="EditModal"
        >
          <h1>Modify Meal</h1>
          <form action="">
            <input type="text" name="mealName" placeholder="Meal Name" className="input" value={this.state.mealName} onChange={this.handleChange} />
            <input type="number" name="price" placeholder="Price" className="input" value={this.state.price} onChange={this.handleChange} />
            <input type="file" name="imageURL" className="imageSelector" accept=".jpg, .jpeg, .png" onChange={this.selectFileHandler} />
            <button className="uploadButton" onClick={this.imageUploadHandler}>Upload</button>
            <span>{this.state.uploadProgress}</span>
            <button className="button" onClick={this.handleModifyMeal}>Modify Meal</button>
          </form>
        </Modal>
        <Modal
          isOpen={this.state.deleteModalIsOpen}
          onRequestClose={this.closeDeleteModal}
          className="DeleteModal"
        >
          <h1>Delete Meal</h1>
          <p>Are You Sure You Want To Delete This Meal?</p>
          <div className="select">
            <button onClick={this.handleDeleteMeal} className="yes">Yes</button>
            <button onClick={this.closeDeleteModal} className="no">No</button>
          </div>
        </Modal>
        <div className="meals-added">
          <div>
            <img src={meal.imageURL} alt="Edit Icon" className="meal-image" />
          </div>
          <p id={`${meal.id}name`}>{meal.name}</p>
          <p id={`${meal.id}price`}>&#8358; {meal.price}</p>
          <div id="modify-div">
            <i id={meal.id} onClick={this.openEditModal} className="far fa-edit" />
            <i id={meal.id} onClick={this.openDeleteModal} className="far fa-trash-alt" />
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ addMeal, getMeals }) => {
  const { isMealModified, isMealDeleted } = addMeal;
  const { meals, error } = getMeals;
  return {
    isMealModified,
    isMealDeleted,
    meals,
    error,
  };
};

const mapActionToProps = {
  modifyMealAction,
  deleteMealAction,
  getMealsAction,
};

MealAddedComponent.propTypes = {
  modifyMealAction: PropTypes.func.isRequired,
  deleteMealAction: PropTypes.func.isRequired,
  getMealsAction: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapActionToProps)(MealAddedComponent);
