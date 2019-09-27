import React from 'react';
import * as routes from '../routes';

const NavItems = () => (
  <React.Fragment>
    {Object.entries(routes).map(([key, { NavItem }]) => {
      return (NavItem && <NavItem key={key} />);
    })}
  </React.Fragment>
);

export default NavItems;
