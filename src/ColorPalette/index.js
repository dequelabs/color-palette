import React from 'react';
import PropTypes from 'prop-types';
import getColorRows from './get-color-rows';
import './index.css';

const ColorPalette = ({ colors, className, onColorSuggestion }) => {
  if (colors.length < 2) {
    return (<p>Add some colours!</p>);
  }

  let combos = [];
  let i, j;

  for (i = 0; i < colors.length; i++) {
    for (j = 0; j < colors.length; j++) {
      if (i === j) continue;
      combos.push([colors[i], colors[j]]);
    }
  }

  const colorRows = getColorRows(combos, onColorSuggestion);

  return (
    <div className={`${className}`}>
      <table summary='Color Palette Analysis'>
        <thead>
          <tr>
            <th scope="col">Color 1</th>
            <th scope="col">Color 2</th>
            <th>Sample</th>
            <th scope="col">AA any font</th>
            <th scope="col">AA large font</th>
            <th scope="col">Suggestion</th>
          </tr>
        </thead>
        <tbody>
          {colorRows}
        </tbody>
      </table>
    </div>
  );
};

ColorPalette.defaultProps = {
  colors: [],
  className: ''
};

ColorPalette.propTypes = {
  colors:PropTypes.array,
  className: PropTypes.string,
  onColorSuggestion: PropTypes.func
};

export default ColorPalette;
