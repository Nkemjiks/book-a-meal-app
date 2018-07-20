import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import '../../../scss/customerComponent.scss';

import getUserDetailsAction from '../../../action/getUserDetailsAction';
import refreshTokenRequest from '../../../helpers/refreshTokenRequest';
import getAllMenuAction from '../../../action/getAllMenuAction';
import AvaliableMenuSort from './AvaliableMenuSort';

/**
 * customer dashboard to view menu and place an order
 *
 * @class Dashboard
 *
 * @extends {Component}
 */
export class AvaliableMenu extends React.Component {
  /**
   * lifecycle methods called when there is an update to the store
   *
   * @memberof Dashboard
   *
   * @returns {object} updates component state
   */
  static getDerivedStateFromProps({ allMenu }, state) {
    if (allMenu !== state.allMenu) {
      return {
        allMenu,
      };
    }
    return {
      allMenu: [],
    };
  }

  state = {
    allMenu: [],
  }

  /**
   * lifecycle methods called immediately after a component is mounted
   *
   * @memberof AvaliableMenu
   *
   * @returns {object} updates the user and menu information in the redux store
   */
  componentDidMount() {
    const { params } = this.props.match;
    const offset = Number(params.id) * 10;
    const user = JSON.parse(window.localStorage.getItem('@#$user'));
    this.props.getUserDetailsAction(user);
    this.props.getAllMenuAction(offset);
    refreshTokenRequest(this.props.history);
  }

  /**
   * handle pagination
   *
   * @memberof AvaliableMenu
   *
   * @returns {undefined} generate all pages with links to the next page
   */
  createPages = () => {
    const { params } = this.props.match;
    const holder = [];
    let numberOfPage = 0;
    if ((Number(this.state.allMenu.count) / 10) === 0) {
      numberOfPage = Number(this.state.allMenu.count) / 10;
    } else {
      numberOfPage = Math.ceil(Number(this.state.allMenu.count) / 10);
    }
    for (let i = 0; i < numberOfPage; i += 1) {
      if (Number(params.id) === i) {
        holder.push(
          <a href={`${window.location.origin}/customer/dashboard/${i}`} id={i} key={`page${i}`}>
            <button className="current-button">{i}</button>
          </a>);
      } else {
        holder.push(
          <a href={`${window.location.origin}/customer/dashboard/${i}`} id={i} key={`page${i}`}>
            <button className="enabled-button">{i}</button>
          </a>);
      }
    }
    return holder;
  }

  /**
   * renders component to DOM
   *
   * @memberof Dashboard
   *
   * @returns {JSX} JSX representation of component
   */
  render() {
    return (
      <div>
        <div id="customer-dashboard">
          <div id="available-menu">
            <h1>&#9832; Menu for Today &#9832;</h1>
            <p className="order-period">Opening Hours: 9:00AM - 4:00PM</p>
            <div className="meal">
              {
              (this.state.allMenu.length !== 0) &&
              <AvaliableMenuSort
                allMenu={this.state.allMenu.data}
                history={this.props.history}
                match={this.props.match}
              />
              }
              {
              (this.state.allMenu.length === 0) && <p className="no-meal">No Menu Available yet</p>
              }
            </div>
          </div>
          <div id="navigate">{this.createPages()}</div>
        </div>
      </div>
    );
  }
}

const mapActionToProps = {
  getUserDetailsAction,
  getAllMenuAction,
};

/* istanbul ignore next */
const mapStateToProps = ({ userInformation, getAllMenu }) => {
  const { user, error } = userInformation;
  const { allMenu } = getAllMenu;
  return {
    user,
    error,
    allMenu,
  };
};

AvaliableMenu.propTypes = {
  getUserDetailsAction: PropTypes.func.isRequired,
  getAllMenuAction: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
};

export default withRouter(connect(mapStateToProps, mapActionToProps)(AvaliableMenu));
