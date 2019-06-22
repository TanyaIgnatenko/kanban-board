import React from 'react';
import PropTypes from 'prop-types';

function FirstChild({ children }) {
  const childrenArray = React.Children.toArray(children);
  return childrenArray[0] || null;
}

FirstChild.propTypes = {
  children: PropTypes.any.isRequired,
};

export { FirstChild };
