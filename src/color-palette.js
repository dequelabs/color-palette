import React from 'react';
import PropTypes from 'prop-types';
import './index.css';
var axe = require('axe-core');

function getColor(hex) {
	var i = 0
	var chars = hex.toUpperCase().split('');
	chars = chars.map((c) => {
		if (c >= '0' && c <= '9') {
			return c - '0';
		} else if (c === 'A') {
			return 10;
		} else if (c === 'B') {
			return 11;
		} else if (c === 'C') {
			return 12;
		} else if (c === 'D') {
			return 13;
		} else if (c === 'E') {
			return 14;
		}
		return 15
	});
	var red = chars[i++]*16 + chars[i++]
	var green = chars[i++]*16 + chars[i++]
	var blue = chars[i++]*16 + chars[i++]
	return new axe.commons.color.Color(red, green, blue, 1);
}

function getColorRows(combos) {
	return combos.map((combo) => {
		var fgColor = getColor(combo[0]);
		var bgColor = getColor(combo[1]);
		var contrast = axe.commons.color.getContrast(bgColor, fgColor);
		return <tr>
		<td style={{ backgroundColor: '#' + combo[0]}}>
		</td>
		<td style={{ backgroundColor: '#' + combo[1]}}>
		</td>
		<td style={{ color: '#' + combo[0], backgroundColor: '#' + combo[1]}}>
			Sample Text
		</td>
		<td>
			{ contrast >= 4.5 ? '\u2714' : '\u2718'}
		</td>
		<td>
			{ contrast >= 3.0 ? '\u2714' : '\u2718'}
		</td>
		</tr>
	});
}

const ColorPalette = ({ colors, className }) => {
	let combos = [];
	let i, j;
	for (i = 0; i < colors.length - 1; i++) {
		for (j = i+1; j < colors.length; j++) {
			combos.push([colors[i], colors[j]]);
		}
	}
	const colorRows = getColorRows(combos);
  return <div className={`${className}`}>
  	<table>
  		<caption>Color Palette Analysis</caption>
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
  className: PropTypes.string
};

export default ColorPalette;