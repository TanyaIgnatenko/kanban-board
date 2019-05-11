import React from 'react';
import PropTypes from 'prop-types';

import './ItemList.scss';

function ItemList({children}) {
  return (
    <div className='item-list'>
      {children}
    </div>
  );
}

ItemList.propTypes = {};
ItemList.defaultProps = {};

export default ItemList;
