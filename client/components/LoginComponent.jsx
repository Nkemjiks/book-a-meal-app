import React from 'react';
import '../scss/loginComponent.scss';

const LoginComponent = () => {
  return (
    <div id="signin-component">
      <div id="signin-container">
        <h1>Sign in</h1>
        <form action="">
          <input type="email" name="Email Address" placeholder="Email Address" />
          <input type="password" name="Password" placeholder="Password" />
        </form>
        <div>
          <a href="/customer">
            <button>SIGN IN</button>
          </a>
          <p id="forget">
            <a href="#">Forgot Password?</a>
          </p>
        </div>
      </div>
    </div>
    
  );
};

export default LoginComponent;
