import React from 'react';

const LoginComponent = () => {
  return (
    <div id="signin-container">
      <h1>Sign in</h1>
      <form action="">
        <input type="email" name="Email Address" id="" placeholder="Email Address" />
        <input type="password" name="Password" id="" placeholder="Password" />
      </form>
      <div>
        <a href="dashboard.html">
          <button>SIGN IN</button>
        </a>
        <p id="forget">
          <a href="#">Forgot Password?</a>
        </p>
      </div>
    </div>
  );
};

export default LoginComponent;
