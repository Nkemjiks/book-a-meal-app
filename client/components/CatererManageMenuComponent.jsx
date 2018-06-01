import React from 'react';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';

import 'react-toastify/dist/ReactToastify.css';
import '../scss/catererManageMenuComponent.scss';

import apiCall from '../helpers/axios';
import getToken from '../helpers/getToken';
import getMealsAction from '../action/getMealsAction';
import getUserDetailsAction from '../action/getUserDetailsAction';
import getMealsRequest from '../helpers/getMealsRequest';
import getMenuRequest from '../helpers/getMenuRequest';
import getMenuAction from '../action/getMenuAction';
import createMenuAction from '../action/createMenuAction';
import displayToast from '../helpers/displayToast';
import MenuComponent from './MenuComponent';
import MealsAvailableListComponent from './MealsAvailableListComponent';

class CatererManageMenuComponent extends React.Component {
  state = {
    meals: [],
    menuIds: [],
    menu: {},
    mealsInMenuId: [],
  }

  componentWillMount() {
    const user = JSON.parse(window.localStorage.getItem('user'));
    this.props.getUserDetailsAction(user);
    getMealsRequest(getToken(), this.props.getMealsAction);
    getMenuRequest(getToken(), this.props.getMenuAction);
  }

  componentWillReceiveProps({ meals, menu }) {
    if (meals.length > 0) {
      this.setState({ meals });
    } else {
      this.setState({ meals: [] });
    }
    if (menu.meals) {
      this.setState({ menu });
      const ids = [];
      menu.meals.forEach(meal => ids.push(meal.menuItems.mealId));
      this.setState({ mealsInMenuId: ids });
    } else {
      this.setState({ menu: {} });
    }
  }

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

  handleSubmit = () => {
    const meals = { meals: this.state.menuIds };
    apiCall('/menu', 'post', meals, getToken())
      .then((response) => {
        this.props.createMenuAction(true);
        displayToast('success', 'Menu Created Successfully');
        getMenuRequest(getToken(), this.props.getMenuAction);
      })
      .catch((err) => {
        this.props.createMenuAction(false);
        return displayToast('error', err.response.data.message);
      });
    this.setState({ menuIds: [] });
  }

  render() {
    const { menuIds } = this.state;
    const enabled = menuIds.length > 0;
    return (
      <div className="dashboard">
        <ToastContainer />
        <div id="caterer-dashboard-flex">
          <div className="menu">
            <h1>Menu</h1>
            <div className="meals-added description">
              <h4>Image</h4>
              <h4>Price </h4>
              <h4>Price</h4>
            </div>
            <div className="meals">
              { (this.state.menu.meals) && <MenuComponent menu={this.state.menu.meals} /> }
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
                <MealsAvailableListComponent
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

const mapStateToProps = ({ getMeals, getMenu }) => {
  const { meals, error } = getMeals;
  const { menu } = getMenu;
  return {
    meals,
    error,
    menu,
  };
};

const mapActionToProps = {
  getUserDetailsAction,
  getMealsAction,
  getMenuAction,
  createMenuAction,
};

CatererManageMenuComponent.propTypes = {
  getUserDetailsAction: PropTypes.func.isRequired,
  getMealsAction: PropTypes.func.isRequired,
  getMenuAction: PropTypes.func.isRequired,
  createMenuAction: PropTypes.func.isRequired,
  meals: PropTypes.array.isRequired,
  menu: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapActionToProps)(CatererManageMenuComponent);
