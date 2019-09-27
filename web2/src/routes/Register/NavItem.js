import React from 'react';
import { Link } from 'react-router-dom';
import NavIcon from '@material-ui/icons/AcUnitRounded';
import { path } from './Route';

export const label = "Join Now";
export { NavIcon };

const NavItem = () => (
  <Link to={path}>{label}</Link>
);

export default NavItem;
