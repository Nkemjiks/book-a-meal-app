import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

/**
 * display the meals in the menu
 *
 * @class AvaliableMenuContent
 *
 * @extends {Component}
 */
export class AvaliableMenuContent extends React.Component {
  /**
   * add meal cart
   *
   * @param {Object} event
   *
   * @memberof AvaliableMenuContent
   *
   * @returns {undefined} calls the addMealToCart method to update state
   */
  handleClick = () => {
    const { history, menu } = this.props;
    window.localStorage.setItem('@#$getmeal%^', menu.catererId);
    history.push(`/customer/dashboard/${menu.caterer.businessName}`);
  }

  /**
   * renders component to DOM
   *
   * @memberof AvaliableMenuContent
   *
   * @returns {JSX} JSX representation of component
   */
  render() {
    const { menu } = this.props;
    return (
      <Fragment key={menu.catererId}>
        <div id="menu-info" onClick={this.handleClick} >
          <div>
            <img src={menu.caterer.logoURL} alt="Meal" id="meal-image" />
          </div>
          <div className="menu-content-info">
            <p className="business-name" id={`${menu.catererId}`}>{menu.caterer.businessName}</p>
            <p id="business-address">{ menu.caterer.businessAddress }</p>
          </div>
        </div>
      </Fragment>
    );
  }
}

AvaliableMenuContent.propTypes = {
  menu: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default AvaliableMenuContent;
