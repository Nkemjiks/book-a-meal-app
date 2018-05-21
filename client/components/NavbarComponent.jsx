import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../scss/navbarComponent.scss';

class NavbarComponent extends Component {
  render() {
    console.log(this.props, 'tttttt');
    return (
      <div id="nav">
        <a href="/">
          <img src="image/logo.png" alt="logo" />
        </a>
        <a href="/login">
          <button className="signin tablet">LOGIN</button>
        </a>
        <a href="/signup">
          <button className="signup tablet">SIGN UP</button>
        </a>
      </div>
    );
  }
}

export default withRouter(NavbarComponent);
