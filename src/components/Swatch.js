import React from 'react';
import PropTypes from 'prop-types';
import './Swatch.css';

export default function Swatch({ color, number, children }) {
  return (
    <div className='swatch' style={{ backgroundColor: color }}>
      {number && (<div className='swatch-id'>{number}</div>)}
      {children}
    </div>
  );
}

Swatch.defaultProps = {
  children: null,
  number: null
};

Swatch.propTypes = {
  color: PropTypes.string.isRequired,
  number: PropTypes.number,
  children: PropTypes.node
};
