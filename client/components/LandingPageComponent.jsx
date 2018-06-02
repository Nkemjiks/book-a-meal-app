import React from 'react';
import { connect } from 'react-redux';
import '../scss/landingPageComponent.scss';

const LandingPageComponent = () => (
  <div id="app-summary">
    <h1>Register to Order a Meal</h1>
    <p>Book-A-Meal makes it easier for you to have a delicious meal at your doorstep in 3 simple steps</p>
    <div id="steps">
      <div>
        <p>Sign up</p>
      </div>
      <span>&#10142;</span>
      <div>
        <p>Place Your Order</p>
      </div>
      <span>&#10142;</span>
      <div>
        <p>Receive Your Order</p>
      </div>
    </div>
    <p>Simply sign up to begin</p>
  </div>
);

export default connect()(LandingPageComponent);
