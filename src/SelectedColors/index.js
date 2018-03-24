import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const SelectedColors = ({ colors }) => (
  <div className='selected-colors'>
    {
      colors.map((color, i) => (
        <div className='selected-color' key={i}>
          <div className='swatch' style={{ background: `#${color}` }} />
          <p>{color}</p>
        </div>
      ))
    }
  </div>
);

SelectedColors.defaultProps = {
  colors: []
}

SelectedColors.propTypes = {
  colors: PropTypes.array
};

export default SelectedColors;
