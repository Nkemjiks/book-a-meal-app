import React from 'react';
import '../scss/catererManageMealComponent.scss';

const CatererManageMealComponent = () => (
  <div className="dashboard">
    <div id="caterer-dashboard-flex">
      <div className="add-meal" >
        <h1>Add Meal</h1>
        <form action="">
          <input type="text" name="mealName" id="" placeholder="Meal Name" />
          <input type="number" name="price" id="" placeholder="Price" />
          <input type="text" name="imageURL" id="" placeholder="Image URL" />
        </form>
        <div>
          <button>Add Meal</button>
        </div>
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
              <img src="../../image/edit.png" alt="Edit Icon" className="modify edit" />
              <img src="../../image/delete.png" alt="Delete Icon" className="modify" />
            </div>
          </div>
          <div className="meals-added">
            <p>Coconut rice</p>
            <p>&#8358; 300</p>
            <div id="modify-div">
              <img src="../../image/edit.png" alt="Edit Icon" className="modify edit" />
              <img src="../../image/delete.png" alt="Delete Icon" className="modify" />
            </div>
          </div>
          <div className="meals-added">
            <p>Coconut rice</p>
            <p>&#8358; 300</p>
            <div id="modify-div">
              <img src="../../image/edit.png" alt="Edit Icon" className="modify edit" />
              <img src="../../image/delete.png" alt="Delete Icon" className="modify" />
            </div>
          </div>
          <div className="meals-added">
            <p>Coconut rice</p>
            <p>&#8358; 300</p>
            <div id="modify-div">
              <img src="../../image/edit.png" alt="Edit Icon" className="modify edit" />
              <img src="../../image/delete.png" alt="Delete Icon" className="modify" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CatererManageMealComponent;
