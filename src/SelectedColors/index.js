import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const SelectedColors = ({ colors, onTrash }) => (
  <div className='selected-colors'>
    {
      colors.map((color, i) => (
        <div className='selected-color' key={i}>
          <div className='swatch' style={{ background: `#${color}` }} />
          <p>{color}</p>
          <button
            aria-label={`Remove ${color}`}
            type='button'
            onClick={() => onTrash(i)}
          >
            <i aria-hidden='true' className='fas fa-trash' />
          </button>
        </div>
      ))
    }
  </div>
);

SelectedColors.defaultProps = {
  colors: []
}

SelectedColors.propTypes = {
  colors: PropTypes.array,
  onTrash: PropTypes.func.isRequired
};

export default SelectedColors;
