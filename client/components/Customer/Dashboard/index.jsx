import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Pagination from 'react-js-pagination';
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
    activePage: 1,
  }

  /**
   * lifecycle methods called immediately after a component is mounted
   *
   * @memberof AvaliableMenu
   *
   * @returns {object} updates the user and menu information in the redux store
   */
  componentDidMount() {
    const offset = (Number(this.state.activePage) - 1) * 10;
    const user = JSON.parse(window.localStorage.getItem('@#$user'));
    this.props.getUserDetailsAction(user);
    this.props.getAllMenuAction(offset, 10);
    refreshTokenRequest(this.props.history);
  }

  /**
   * handle pagination
   *
   * @memberof AvaliableMenu
   *
   * @returns {undefined} generate all pages with links to the next page
   */
  handlePageChange = (pageNumber) => {
    this.setState({ activePage: pageNumber });
    const offset = (Number(pageNumber) - 1) * 10;
    this.props.getAllMenuAction(offset, 10);
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
            <div id="first">
              <h1>Available Menu</h1>
              <p className="order-period">Opening Hours: 9:00AM - 4:00PM</p>
            </div>
            <div className="menu-main">
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
          {
            (this.state.allMenu.length !== 0) &&
            <div>
              <Pagination
                hideDisabled
                activePage={this.state.activePage}
                itemsCountPerPage={10}
                totalItemsCount={this.state.allMenu.count}
                pageRangeDisplayed={5}
                onChange={this.handlePageChange}
                getPageUrl={() => `${window.location.origin}/#/customer/dashboard`}
              />
            </div>
          }
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
