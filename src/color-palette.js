import React from 'react';
import PropTypes from 'prop-types';
import './index.css';
import {suggestColors} from 'a11y-color';
import hexRgb from './hex-rgb.js';
var axe = require('axe-core');

function getColor(hex) {
	const { red, green, blue, alpha } = hexRgb(hex);
	return new axe.commons.color.Color(red, green, blue, alpha/255
	);
}

function getColorRows(combos, onColorSuggestion) {
	return combos.map((combo, i) => {
		var fgColor = getColor(combo[0]);
		var bgColor = getColor(combo[1]);
		var contrast = axe.commons.color.getContrast(bgColor, fgColor);
		return <tr key={ i }>
		<td style={{ backgroundColor: '#' + combo[0]}}>
		</td>
		<td style={{ backgroundColor: '#' + combo[1]}}>
		</td>
		<td style={{ color: '#' + combo[0], backgroundColor: '#' + combo[1]}}>
			Sample Text
		</td>
		<td>
			{ `${(contrast >= 4.5 ? '\u2714' : '\u2718')}  (${contrast.toFixed(2)}:1)` }
		</td>
		<td>
			{ `${(contrast >= 3.0 ? '\u2714' : '\u2718')}  (${contrast.toFixed(2)}:1)` }
		</td>
      <td>
        { contrast >= 3.0 && contrast < 4.5 ?
          generateSuggestedSwatch(fgColor, bgColor, onColorSuggestion) :
          "" }
      </td>
		</tr>
	});
}

function generateSuggestedSwatch(fgColor, bgColor, onColorSuggestion) {
  let suggestedColors = suggestColors(bgColor, fgColor, { AA: 4.5 })['AA'];
  let bgColorHex = bgColor.toHexString();
  if (suggestedColors.bg !== bgColorHex) {
    return '';
  }
  let fgColorHex = fgColor.toHexString();

  return <button className='selected-color'
                 onClick={() => onColorSuggestion(fgColorHex, suggestedColors.fg)}
                 title={ 'Replace ' + fgColorHex + ' with ' + suggestedColors.fg }>
           <span className='swatch'
                 style={{ color: suggestedColors.fg,  backgroundColor: suggestedColors.fg }}></span>
           <p>{suggestedColors.fg}</p>
         </button>
}

const ColorPalette = ({ colors, className, onColorSuggestion }) => {
	let combos = [];
	let i, j;
	for (i = 0; i < colors.length; i++) {
		for (j = 0; j < colors.length; j++) {
            if (i === j) continue;

			combos.push([colors[i], colors[j]]);
		}
	}
	const colorRows = getColorRows(combos, onColorSuggestion);
	if (colors.length < 2) {
		return (<p>Add some colours!</p>);
	}
  return <div className={`${className}`}>
  	<table summary='Color Palette Analysis'>
  		<thead>
	  		<tr>
	  			<th scope="col">
	  				Color 1
	  			</th>
	  			<th scope="col">
	  				Color 2
	  			</th>
	  			<th>
	  				Sample
	  			</th>
	  			<th scope="col">
	  				AA any font
	  			</th>
	  			<th scope="col">
	  				AA large font
	  			</th>
	  			<th scope="col">
	  				Suggestion
	  			</th>
	  		</tr>
  		</thead>
  		<tbody>
  			{colorRows}
			</tbody>
  	</table>
  </div>
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
