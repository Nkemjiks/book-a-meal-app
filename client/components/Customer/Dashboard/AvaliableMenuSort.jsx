import React, { Fragment } from 'react';
import AvaliableMenuContent from './AvaliableMenuContent';

/**
 * display the menu for the day
 *
 * @param {array} allMenu all menu for the day
 *
 * @returns {JSX} JSX representation of component
 */
const AvaliableMenuSort = ({ allMenu, history, match }) => (
  allMenu.sort((a, b) =>
    a.caterer.businessName.toLowerCase() > b.caterer.businessName.toLowerCase()).map(menu => (
      <Fragment key={menu.id}>
        <AvaliableMenuContent menu={menu} history={history} match={match} />
      </Fragment>
  ))
);

export default AvaliableMenuSort;
