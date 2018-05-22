import React from 'react';
import '../scss/catererManageOrderComponent.scss';

const CatererManageOrderComponent = () => (
  <div className="dashboard">
    <div id="caterer-dashboard-flex">
      <div className="order-summary">
        <h1>Order Summary</h1>
        <p>Number of Orders Received</p>
        <h3>24</h3>
        <p>Total Amount Made</p>
        <h3>&#8358; 5000</h3>
      </div>
      <div id="incoming-orders" className="detailed-orders">
        <h1>Details of Order</h1>
        <div className="order-info description">
          <h4>Order ID</h4>
          <h4>Date/Time</h4>
          <h4>Customer's Name</h4>
          <h4>Meal name</h4>
          <h4>Quantity</h4>
          <h4>Price</h4>
        </div>
        <div className="orders-placed">
          <div className="order-info">
            <h4>01</h4>
            <h4>19/04/2018 12:53:45 PM</h4>
            <p>John Deo</p>
            <p>Coconut rice</p>
            <p>2</p>
            <p>&#8358; 600</p>
          </div>
          <div className="order-info">
            <h4>02</h4>
            <h4>19/04/2018 12:53:45 PM</h4>
            <p>Jane Deo</p>
            <p>Coconut rice</p>
            <p>2</p>
            <p>&#8358; 600</p>
          </div>
          <div className="order-info">
            <h4>03</h4>
            <h4>19/04/2018 12:53:45 PM</h4>
            <p>Lupita Young</p>
            <p>Coconut rice</p>
            <p>2</p>
            <p>&#8358; 600</p>
          </div>
          <div className="order-info">
            <h4>04</h4>
            <h4>19/04/2018 12:53:45 PM</h4>
            <p>Samuel James</p>
            <p>Coconut rice</p>
            <p>2</p>
            <p>&#8358; 600</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CatererManageOrderComponent;
