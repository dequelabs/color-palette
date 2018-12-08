import React from 'react';
import PropTypes from 'prop-types';
import Offscreen from 'react-offscreen';
import './index.css';

export default function Swatch({ color, number, children, type, original }) {
  return (
    <div className="swatch" style={{ backgroundColor: color }}>
      {number && (
        <div className="swatch-id" aria-label={`Color #${number}`}>
          <span aria-hidden="true">{number}</span>
        </div>
      )}
      {original && (
        <div
          style={{ background: original }}
          className="swatch-id original"
          aria-label={`Original color ${original}`}
        />
      )}
      <Offscreen>{`${type} color ${color}`}</Offscreen>
      {children}
    </div>
  );
}

Swatch.defaultProps = {
  children: null,
  number: null,
  original: null
};

Swatch.propTypes = {
  color: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  number: PropTypes.number,
  children: PropTypes.node,
  original: PropTypes.string
};
