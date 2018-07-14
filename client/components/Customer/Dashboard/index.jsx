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
    currentCount: 0,
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
    const user = JSON.parse(window.localStorage.getItem('@#$user'));
    this.props.getUserDetailsAction(user);
    this.props.getAllMenuAction(params.id);
    refreshTokenRequest(this.props.history);
  }

  /**
   * handle pagination
   *
   * @memberof AvaliableMenu
   *
   * @returns {undefined} moves to the previous page
   */
  handlePrevious = () => {
    const { id } = this.props.match.params;
    const newId = Number(id) - 10;
    this.props.history.push(`/customer/dashboard/${newId}`);
    this.setState({
      currentCount: newId,
    });
  }

  /**
   * handle pagination
   *
   * @memberof AvaliableMenu
   *
   * @returns {undefined} moves to the next page
   */
  handleNext = () => {
    const { id } = this.props.match.params;
    const newId = Number(id) + 10;
    this.props.history.push(`/customer/dashboard/${newId}`);
    this.setState({
      currentCount: newId,
    });
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
          <div id="navigate">
            {
              (this.state.currentCount >= 10) &&
              <button className="enabled-button" onClick={this.handlePrevious} >Previous</button>
            }
            {
              (this.state.currentCount <= 10) &&
              <button className="disabled-button" disabled >Previous</button>
            }
            {
              ((this.state.allMenu.count - this.state.currentCount) >= 10) &&
              <button className="enabled-button" onClick={this.handleNext} >Next</button>
            }
            {
              (((this.state.allMenu.count - this.state.currentCount) <= 10) ||
              (this.state.allMenu.count === undefined)) &&
              <button className="disabled-button" disabled >Next</button>
            }
          </div>
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
