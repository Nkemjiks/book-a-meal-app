import React from 'react';
import '../scss/signupComponent.scss';

const SignupComponent = () => {
  return (
    <div id="signup-component">
      <div id="signup-container">
        <h1>Sign Up Now</h1>
        <form action="">
          <input type="text" name="fullname" placeholder="Full Name" />
          <input type="email" name="email" placeholder="Email Address" />
          <input type="tel" name="phone" placeholder="Phone Number" />
          <input type="password" name="password" placeholder="Password" />
          <input type="text" name="address" placeholder="Address" />
        </form>
        <div>
          <a href="/customer">
            <button>SIGN UP</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignupComponent;
