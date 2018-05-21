import React from 'react';

const SignupComponent = () => {
  return (
    <div id="signup-container">
      <h1>Sign Up Now</h1>
      <form action="">
        <input type="text" name="fullname" placeholder="Full Name" />
        <input type="email" name="email" placeholder="Email Address" />
        <input type="tel" name="phone" placeholder="Phone Number" />
        <input type="password" name="password" placeholder="Password" />
      </form>
      <div>
        <a href="UI/pages/customer/dashboard.html">
          <button>SIGN UP</button>
        </a>
      </div>
    </div>
  );
};

export default SignupComponent;
