import React from 'react';
import PropTypes from 'prop-types';
import Offscreen from 'react-offscreen';
import './index.css';

export default function Swatch({ color, number, children, type }) {
  return (
    <div className="swatch" style={{ backgroundColor: color }}>
      {number && (
        <div className="swatch-id" aria-label={`Color #${number}`}>
          <span aria-hidden="true">{number}</span>
        </div>
      )}
      <Offscreen>{`${type} color ${color}`}</Offscreen>
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
  type: PropTypes.string.isRequired,
  number: PropTypes.number,
  children: PropTypes.node
};
