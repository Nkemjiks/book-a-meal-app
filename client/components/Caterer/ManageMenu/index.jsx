import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import '../../../scss/catererManageMenuComponent.scss';

import getMealsAction from '../../../action/getMealsAction';
import getUserDetailsAction from '../../../action/getUserDetailsAction';
import getMenuAction from '../../../action/getMenuAction';
import removeMealAction from '../../../action/removeMealAction';
import createMenuAction from '../../../action/createMenuAction';
import refreshTokenRequest from '../../../helpers/refreshTokenRequest';
import MenuList from './MenuList';
import MealsAvailableList from './MealsAvailableList';

/**
 * view caterer's meals
 *
 * @class ManageMenu
 *
 * @extends {Component}
 */
export class ManageMenu extends React.Component {
  /**
   * lifecycle methods called when there is an update to the store
   *
   * @memberof ManageMenu
   *
   * @returns {object} updates component state
   */
  static getDerivedStateFromProps({ meals, menu, menuCreated }, state) {
    if (meals !== state.meals) {
      return {
        meals,
      };
    }
    if (menu.meals !== state.menu.meals) {
      const ids = [];
      menu.meals.forEach(meal => ids.push(meal.menuItems.mealId));
      return {
        menu,
        mealsInMenuId: ids,
      };
    }
    if (menuCreated) {
      return {
        menuIds: [],
      };
    }
    return null;
  }

  state = {
    meals: [],
    menuIds: [],
    menu: {},
    mealsInMenuId: [],
  }

  /**
   * lifecycle methods called immediately after a component is mounted
   *
   * @memberof ManageMenu
   *
   * @returns {object} updates the user, caterer's meal and menu information in the redux store
   */
  componentDidMount() {
    refreshTokenRequest(this.props.history);
    const user = JSON.parse(window.localStorage.getItem('@#$user'));
    this.props.getUserDetailsAction(user);
    this.props.getMealsAction();
    this.props.getMenuAction();
  }

  /**
   * lifecycle methods called immediately after a component is updated
   *
   * @memberof MealsAdded
   *
   * @returns {object} updates the caterer's meal information in the redux store
   */
  componentDidUpdate(prevProps) {
    if (prevProps.menuCreated !== this.props.menuCreated) {
      this.props.getMenuAction();
    }
    if (prevProps.mealRemoved !== this.props.mealRemoved) {
      this.props.getMenuAction();
    }
  }
  /**
   * method called to update state
   *
   * @param  {string} mealId meal id
   * @param  {boolean} isChecked check if meal is already in menu
   *
   * @memberof ManageMenu
   *
   * @return {undefined} sets state
   */
  addMealIdToArray = (mealId, isChecked) => {
    if (isChecked) {
      this.setState({ menuIds: [...this.state.menuIds, mealId] });
    } else {
      const index = this.state.menuIds.indexOf(mealId);
      const newState = this.state.menuIds;
      newState.splice(index, 1);
      this.setState({ menuIds: newState });
    }
  }

  /**
   * method called to update state
   *
   * @param  {string} mealId meal id
   * @param  {boolean} isChecked check if meal is already in menu
   *
   * @memberof ManageMenu
   *
   * @return {undefined} sets state
   */
  removeMealFromMenu = (mealId) => {
    this.props.removeMealAction(mealId);
  }

  /**
   * create menu handler
   *
   * @param {Object} event
   *
   * @memberof ManageMenu
   *
   * @returns {undefined} make apicall to create menu
   */
  handleSubmit = () => {
    const meals = { meals: this.state.menuIds };
    this.props.createMenuAction(meals);
  }

  /**
   * renders component to DOM
   *
   * @memberof ManageMenu
   *
   * @returns {JSX} JSX representation of component
   */
  render() {
    const { menuIds } = this.state;
    const enabled = menuIds.length > 0;
    return (
      <div className="dashboard">
        <div id="caterer-dashboard-flex">
          <div className="menu">
            <h1>Menu</h1>
            <div className="meals-added description">
              <h4>Image</h4>
              <h4>Name </h4>
              <h4>Price</h4>
              <h4>Remove</h4>
            </div>
            <div className="meals">
              { (this.state.menu.meals) && <MenuList menu={this.state.menu.meals} removeMealFromMenu={this.removeMealFromMenu} /> }
              { (!this.state.menu.meals) && <p className="no-meal">You have not set the menu</p> }
            </div>
          </div>
          <div className="create-menu">
            <h1>Meal Available</h1>
            <div className="meals-added description">
              <h4>Image</h4>
              <h4>Name</h4>
              <h4>Price</h4>
              <h4>Add</h4>
            </div>
            <div className="meals-avaliable">
              {
              (this.state.meals.length !== 0) &&
                <MealsAvailableList
                  meals={this.state.meals}
                  mealsInMenuId={this.state.mealsInMenuId}
                  addMealIdToArray={this.addMealIdToArray}
                />
              }
              {
              (this.state.meals.length === 0) &&
              <p className="no-meal">You have not added any meal</p>
              }
            </div>
            <div>
              { (!this.state.menu.meals) && enabled &&
                <button
                  id="enabledAddMealButton"
                  className="button"
                  onClick={this.handleSubmit}
                >Create Menu
                </button>
              }
              { (!this.state.menu.meals) && !enabled &&
                <button
                  id="disabledAddMealButton"
                  className="button"
                  onClick={this.handleSubmit}
                  disabled
                >Create Menu
                </button>
              }
              { (this.state.menu.meals) && enabled &&
                <button
                  id="enabledAddMealButton"
                  className="button"
                  onClick={this.handleSubmit}
                >Update Menu
                </button>
              }
              { (this.state.menu.meals) && !enabled &&
                <button
                  id="disabledAddMealButton"
                  className="button"
                  onClick={this.handleSubmit}
                  disabled
                >Update Menu
                </button>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
const mapStateToProps = ({ catererMeals, catererMenu }) => {
  const { meals, error } = catererMeals;
  const { menu, menuCreated, mealRemoved } = catererMenu;
  return {
    meals,
    error,
    menu,
    menuCreated,
    mealRemoved,
  };
};

const mapActionToProps = {
  getUserDetailsAction,
  getMealsAction,
  getMenuAction,
  createMenuAction,
  removeMealAction,
};

ManageMenu.propTypes = {
  getUserDetailsAction: PropTypes.func.isRequired,
  getMealsAction: PropTypes.func.isRequired,
  getMenuAction: PropTypes.func.isRequired,
  createMenuAction: PropTypes.func.isRequired,
  removeMealAction: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  menuCreated: PropTypes.bool.isRequired,
  mealRemoved: PropTypes.bool.isRequired,
};

export default withRouter(connect(mapStateToProps, mapActionToProps)(ManageMenu));
