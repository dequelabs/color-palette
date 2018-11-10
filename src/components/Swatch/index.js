import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

export default function Swatch({ color, number, original, children }) {
  return (
    <div className="swatch" style={{ backgroundColor: color }}>
      {number && <div className="swatch-id">{number}</div>}
      {original && (
        <div
          style={{ background: original }}
          className="swatch-id original"
          aria-label={`Original color ${original}`}
        />
      )}
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
  number: PropTypes.number,
  children: PropTypes.node,
  original: PropTypes.string
};
