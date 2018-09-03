import React, { Fragment } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import '../../../scss/modal.scss';

import displayToast from '../../../helpers/displayToast';
import getMealsAction from '../../../action/getMealsAction';
import modifyMealAction from '../../../action/modifyMealAction';
import deleteMealAction from '../../../action/deleteMealAction';
import imageUploadAction from '../../../action/imageUploadAction';

/**
 * view each meal
 *
 * @class MealAdded
 *
 * @extends {Component}
 */
export class MealsAdded extends React.Component {
  /**
   * lifecycle methods called when there is an update to the store
   *
   * @memberof MealAdded
   *
   * @returns {object} updates component state
   */
  static getDerivedStateFromProps({
    mealModified, mealDeleted,
    imageURL,
    imageUploadProgress,
  }) {
    if (mealModified) {
      return {
        mealName: '',
        price: '',
        imageURL: '',
        imageUploadProgress: '',
        mealId: '',
        modifyModalIsOpen: false,
      };
    }
    if (mealDeleted) {
      return {
        mealName: '',
        price: '',
        imageURL: '',
        imageUploadProgress: '',
        deleteModalIsOpen: false,
      };
    }
    if (imageUploadProgress) {
      return { imageUploadProgress };
    }
    if (imageURL !== '') {
      return { imageURL };
    }
    return null;
  }

  state = {
    modifyModalIsOpen: false,
    deleteModalIsOpen: false,
    mealId: '',
    imageUploadProgress: '',
    mealName: '',
    price: '',
    imageURL: '',
    selectedFile: '',
  };

  /**
   * lifecycle methods called immediately after a component is mounted
   *
   * @memberof MealsAdded
   *
   * @returns {object} mounts modal on root element
   */
  componentDidMount() {
    Modal.setAppElement('#app');
  }

  /**
   * updates component state when form values change
   *
   * @param {Object} event
   *
   * @memberof MealAdded
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
   * @memberof MealAdded
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
   * @memberof MealAdded
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
   * modify meal handler
   *
   * @param {Object} event
   *
   * @memberof MealAdded
   *
   * @returns {undefined} make apicall to modify a meal in the database
   */
  handleModifyMeal = (event) => {
    event.preventDefault();

    const {
      mealName,
      price,
      imageURL,
    } = this.state;

    let mealData = {};
    const currentMealName = this.props.meal.name;
    const currentMealPrice = this.props.meal.price;

    if (!mealName || !price) {
      return displayToast('error', 'Please provide all required fields');
    }

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

    this.props.modifyMealAction(this.state.mealId, mealData);
  }

  /**
   * delete meal handler
   *
   * @param {Object} event
   *
   * @memberof MealAdded
   *
   * @returns {undefined} make apicall to delete a meal from the database
   */
  handleDeleteMeal = (event) => {
    event.preventDefault();
    this.props.deleteMealAction(this.state.mealId);
  }

  /**
   * method called to open edit modal
   *
   * @param  {event} event
   *
   * @memberof MealAdded
   *
   * @return {undefined} sets state
   */
  openEditModal = (event) => {
    this.setState({
      modifyModalIsOpen: true,
      mealId: event.target.id,
      mealName: this.props.meal.name,
      price: this.props.meal.price,
    });
  }

  /**
   * method called to open delete modal
   *
   * @param  {event} event
   *
   * @memberof MealAdded
   *
   * @return {undefined} sets state
   */
  openDeleteModal = (event) => {
    this.setState({
      deleteModalIsOpen: true,
      mealId: event.target.id,
    });
  }

  /**
   * method called to close edit modal
   *
   * @memberof MealAdded
   *
   * @return {undefined} sets state
   */
  closeEditModal = () => {
    this.setState({ modifyModalIsOpen: false });
  }

  /**
   * method called to close delete modal
   *
   * @memberof MealAdded
   *
   * @return {undefined} sets state
   */
  closeDeleteModal = () => {
    this.setState({ deleteModalIsOpen: false });
  }

  /**
   * renders component to DOM
   *
   * @memberof MealAdded
   *
   * @returns {JSX} JSX representation of component
   */
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
            <input type="number" name="price" placeholder="Price" className="input update-price" value={this.state.price} onChange={this.handleChange} />
            <input type="file" name="imageURL" className="imageSelector" accept=".jpg, .jpeg, .png" onChange={this.selectFileHandler} />
            <button className="uploadButton" onClick={this.imageUploadHandler}>Upload</button>
            <span>{this.state.imageUploadProgress} %</span>
            <button className="button modify-btn" onClick={this.handleModifyMeal}>Modify Meal</button>
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
            <img src={meal.imageURL} alt="Meal" className="meal-image" />
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

/* istanbul ignore next */
const mapStateToProps = ({ catererMeals, imageUpload }) => {
  const {
    mealModified,
    mealDeleted,
  } = catererMeals;

  const { imageURL, imageUploadProgress } = imageUpload;
  return {
    mealModified,
    mealDeleted,
    imageURL,
    imageUploadProgress,
  };
};

const mapActionToProps = {
  getMealsAction,
  modifyMealAction,
  deleteMealAction,
  imageUploadAction,
};

MealsAdded.propTypes = {
  modifyMealAction: PropTypes.func.isRequired,
  deleteMealAction: PropTypes.func.isRequired,
  imageUploadAction: PropTypes.func.isRequired,
  meal: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapActionToProps)(MealsAdded);
