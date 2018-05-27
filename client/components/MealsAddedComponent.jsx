import React, { Fragment } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import '../scss/modal.scss';

import apiCall from '../helpers/axios';
import getToken from '../helpers/getToken';
import displayToast from '../helpers/displayToast';
import modifyMealAction from '../action/modifyMealAction';
import deleteMealAction from '../action/deleteMealAction';
import getMealsRequest from '../helpers/getMealsRequest';
import getMealsAction from '../action/getMealsAction';

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

  // Update the state of the meal name and price when its changed
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  // Update the state of the selected image
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
          uploadProgress: `${percentCompleted}%`,
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

    const {
      mealName,
      price,
      imageURL,
      mealId,
    } = this.state;

    let mealData = {};
    const currentMealName = document.getElementById(`${mealId}name`).innerText;
    const currentMealPrice = Number(document.getElementById(`${mealId}price`).innerText.substr(2));

    // Check to make sure all fields are provided
    if (!mealName || !price) {
      return displayToast('error', 'Please provide all required fields');
    }

    // Check which of the field was changed and assign them to the mealData variable
    if ((mealName === currentMealName) && (price === currentMealPrice) && !imageURL) {
      return displayToast('error', 'You have not made any changes');
    }
    if (mealName !== currentMealName) {
      mealData = {
        ...mealData,
        name: mealName,
      };
    }
    if (price !== currentMealPrice) {
      mealData = {
        ...mealData,
        price,
      };
    }
    if (imageURL) {
      mealData = {
        ...mealData,
        imageURL,
      };
    }

    // Update meal API call
    apiCall(`/meals/${this.state.mealId}`, 'put', mealData, getToken())
      .then((response) => {
        this.props.modifyMealAction(true);
        displayToast('success', 'Meal Modified Successfully');
        getMealsRequest(getToken(), this.props.getMealsAction);
      })
      .catch((err) => {
        this.props.modifyMealAction(false);
        return displayToast('error', err.response.data.message);
      });

    // Update the state after a successful modification
    this.setState({
      mealName: '',
      price: '',
      imageURL: '',
      uploadProgress: '',
      mealId: '',
    });

    // Close the modal
    this.closeEditModal();
  }

  // Handle delete meal function
  handleDeleteMeal = (event) => {
    event.preventDefault();

    // Delete meal API call
    apiCall(`/meals/${this.state.mealId}`, 'delete', null, getToken())
      .then((response) => {
        this.props.deleteMealAction(true);
        displayToast('success', 'Meal Deleted Successfully');
        getMealsRequest(getToken(), this.props.getMealsAction);
      })
      .catch((err) => {
        this.props.deleteMealAction(false);
        return displayToast('error', err.response.data.message);
      });

    // Reset the state for meal name, price, image url and upload progress
    this.setState({
      mealName: '',
      price: '',
      imageURL: '',
      uploadProgress: '',
    });

    // Close delete meal modal
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

  openDeleteModal = (event) => {
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
          overlayClassName="Overlay"
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
          overlayClassName="Overlay"
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

const mapStateToProps = ({ singleMeal, getMeals }) => {
  const { isMealModified, isMealDeleted } = singleMeal;
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
  meal: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapActionToProps)(MealAddedComponent);
