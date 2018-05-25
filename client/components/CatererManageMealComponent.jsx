import React from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import PropTypes from 'prop-types';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import apiCall from '../helpers/axios';
import '../scss/catererManageMealComponent.scss';
import addMealAction from '../action/addMealAction';
import getUserDetailsAction from '../action/getUserDetailsAction';


class CatererManageMealComponent extends React.Component {
  state = {
    mealName: '',
    price: '',
    imageURL: '',
    uploadProgress: '',
    selectedFile: '',
  };

  componentWillMount() {
    const user = JSON.parse(window.localStorage.getItem('user'));
    this.props.getUserDetailsAction(user);
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
        return toast.success('Image Uploaded successfully', {
          hideProgressBar: true,
        });
      })
      .catch((err) => {
        return toast.error('There was error while uploading the image. Try again', {
          hideProgressBar: true,
        });
      });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const token = window.localStorage.getItem('token');

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

    if (!mealName || !price || !imageURL) {
      return toast.error('Please provide all required fields', {
        hideProgressBar: true,
      });
    }
    apiCall('/meals', 'post', mealData, token)
      .then((response) => {
        window.localStorage.setItem('meal', JSON.stringify(response.data.data));
        this.props.addMealAction(true);
        return toast.success('Meal Added Successfully', {
          hideProgressBar: true,
        });
      })
      .catch((err) => {
        this.props.addMealAction(false);
        return toast.error(err.response.data.message, {
          hideProgressBar: true,
        });
      });

    this.setState({
      mealName: '',
      price: '',
      imageURL: '',
      uploadProgress: '',
    });
  }
  render() {
    return (
      <div className="dashboard">
        <div id="caterer-dashboard-flex">
          <div className="add-meal" >
            <h1>Add Meal</h1>
            <form action="">
              <input type="text" name="mealName" placeholder="Meal Name" className="input" value={this.state.mealName} onChange={this.handleChange} />
              <input type="number" name="price" placeholder="Price" className="input" value={this.state.price} onChange={this.handleChange} />
              <input type="file" name="imageURL" className="imageSelector" accept=".jpg, .jpeg, .png" value={this.state.imageURL} onChange={this.selectFileHandler} />
              <button className="uploadButton" onClick={this.imageUploadHandler}>Upload</button>
              <span>{this.state.uploadProgress}</span>
              <button className="button" onClick={this.handleSubmit}>Add Meal</button>
            </form>
          </div>
          <div className="added-meals">
            <h1>Meal Added</h1>
            <div className="meals-added description">
              <h4>Meal name</h4>
              <h4>Meal Price</h4>
              <h4>Edit/Delete</h4>
            </div>
            <div className="meals" >
              <div className="meals-added">
                <p>Coconut rice</p>
                <p>&#8358; 300</p>
                <div id="modify-div">
                  <img src="image/edit.png" alt="Edit Icon" className="modify edit" />
                  <img src="image/delete.png" alt="Delete Icon" className="modify" />
                </div>
              </div>
              <div className="meals-added">
                <p>Coconut rice</p>
                <p>&#8358; 300</p>
                <div id="modify-div">
                  <img src="image/edit.png" alt="Edit Icon" className="modify edit" />
                  <img src="image/delete.png" alt="Delete Icon" className="modify" />
                </div>
              </div>
              <div className="meals-added">
                <p>Coconut rice</p>
                <p>&#8358; 300</p>
                <div id="modify-div">
                  <img src="image/edit.png" alt="Edit Icon" className="modify edit" />
                  <img src="image/delete.png" alt="Delete Icon" className="modify" />
                </div>
              </div>
              <div className="meals-added">
                <p>Coconut rice</p>
                <p>&#8358; 300</p>
                <div id="modify-div">
                  <img src="image/edit.png" alt="Edit Icon" className="modify edit" />
                  <img src="image/delete.png" alt="Delete Icon" className="modify" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

const mapStateToProps = ({ addMeal }) => {
  const { isMealAdded } = addMeal;
  return {
    isMealAdded,
  };
};

const mapActionToProps = {
  addMealAction,
  getUserDetailsAction,
};

CatererManageMealComponent.propTypes = {
  addMealAction: PropTypes.func.isRequired,
  getUserDetailsAction: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapActionToProps)(CatererManageMealComponent);
