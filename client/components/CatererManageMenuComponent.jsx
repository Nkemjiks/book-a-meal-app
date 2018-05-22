import React from 'react';
import '../scss/catererManageMenuComponent.scss';

const CatererManageMenuComponent = () => (
  <div className="dashboard">
    <div id="caterer-dashboard-flex">
      <div className="menu">
        <h1>Menu</h1>
        <div className="meals-added description">
          <h4>Meal name</h4>
          <h4>Meal Price</h4>
          <h4>Remove</h4>
        </div>
        <div className="meals">
          <div className="meals-added">
            <p>Coconut rice</p>
            <p>&#8358; 300</p>
            <div id="modify-div">
              <img src="../../image/delete.png" alt="Delete Icon" className="modify" />
            </div>
          </div>
          <div className="meals-added">
            <p>Coconut rice</p>
            <p>&#8358; 300</p>
            <div id="modify-div">
              <img src="../../image/delete.png" alt="Delete Icon" className="modify" />
            </div>
          </div>
          <div className="meals-added">
            <p>Coconut rice</p>
            <p>&#8358; 300</p>
            <div id="modify-div">
              <img src="../../image/delete.png" alt="Delete Icon" className="modify" />
            </div>
          </div>
        </div>
      </div>
      <div className="create-menu">
        <h1>Meal Available</h1>
        <div className="meals-added description">
          <h4>Meal name</h4>
          <h4>Meal Price</h4>
          <h4>Add</h4>
        </div>
        <div className="meals-avaliable">
          <div className="meals-added">
            <p>Coconut rice</p>
            <p>&#8358; 300</p>
            <div id="checkdiv">
              <input type="checkbox" name="Add" id="" />
            </div>
          </div>
          <div className="meals-added">
            <p>Coconut rice</p>
            <p>&#8358; 300</p>
            <div id="checkdiv">
              <input type="checkbox" name="Add" id="" />
            </div>
          </div>
        </div>
        <div>
          <button>Create Menu</button>
        </div>
      </div>
    </div>
    <div id="incoming-orders">
      <h1>Order Placed</h1>
      <div className="order-info description">
        <h4>Customer's Name</h4>
        <h4>Meal name</h4>
        <h4>Quantity</h4>
        <h4>Price</h4>
        <h4>Price</h4>
        <h4>Price</h4>
        <h4>Price</h4>
        <h4>Price</h4>
      </div>
      <div className="orders-placed">
        <div className="order-info">
          <p>John Deo</p>
          <p>Coconut rice</p>
          <p>2</p>
          <p>&#8358; 600</p>
          <p>&#8358; 600</p>
          <p>&#8358; 600</p>
          <p>&#8358; 600</p>
          <p>&#8358; 600</p>
        </div>
        <div className="order-info">
          <p>John Deo</p>
          <p>Coconut rice</p>
          <p>2</p>
          <p>&#8358; 600</p>
          <p>&#8358; 600</p>
          <p>&#8358; 600</p>
          <p>&#8358; 600</p>
          <p>&#8358; 600</p>
        </div>
        <div className="order-info">
          <p>John Deo</p>
          <p>Coconut rice</p>
          <p>2</p>
          <p>&#8358; 600</p>
          <p>&#8358; 600</p>
          <p>&#8358; 600</p>
          <p>&#8358; 600</p>
          <p>&#8358; 600</p>
        </div>
        <div className="order-info">
          <p>John Deo</p>
          <p>Coconut rice</p>
          <p>2</p>
          <p>&#8358; 600</p>
          <p>&#8358; 600</p>
          <p>&#8358; 600</p>
          <p>&#8358; 600</p>
          <p>&#8358; 600</p>
        </div>
      </div>
    </div>
  </div>
);

export default CatererManageMenuComponent;
