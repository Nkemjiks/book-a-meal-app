import React, { Fragment } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
  }
};

Modal.setAppElement('#app');

class MealAddedComponent extends React.Component {
  state = {
    modalIsOpen: false,
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }
  render() {
    const { meal } = this.props;
    return (
      <Fragment>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
        >
          <h1>Modify Meal</h1>
          <form action="">
            <input type="text" name="mealName" placeholder="Meal Name" className="input" value={this.state.mealName} onChange={this.handleChange} />
            <input type="number" name="price" placeholder="Price" className="input" value={this.state.price} onChange={this.handleChange} />
            <input type="file" name="imageURL" className="imageSelector" accept=".jpg, .jpeg, .png" onChange={this.selectFileHandler} />
            <button className="uploadButton" onClick={this.imageUploadHandler}>Upload</button>
            <span>{this.state.uploadProgress}</span>
            <button className="button" onClick={this.handleSubmit}>Modify Meal</button>
          </form>
        </Modal>
        <div className="meals-added">
          <div>
            <img src={meal.imageURL} alt="Edit Icon" className="meal-image" />
          </div>
          <p>{meal.name}</p>
          <p>&#8358; {meal.price}</p>
          <div id="modify-div">
            <i id={meal.id} onClick={this.openModal} className="far fa-edit" />
            <i id={meal.id} onClick={this.openModal} className="far fa-trash-alt" />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default MealAddedComponent;
