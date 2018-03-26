import React from 'react';
import { suggestColors } from 'a11y-color';
import getColor from './get-color';

const axe = require('axe-core');

function generateSuggestedSwatch(fgColor, bgColor, onColorSuggestion) {
  let suggestedColors = suggestColors(bgColor, fgColor, { AA: 4.5 })['AA'];
  let bgColorHex = bgColor.toHexString();
  if (suggestedColors.bg !== bgColorHex) {
    return '';
  }
  const fgColorHex = fgColor.toHexString();

  return (
    <button className='selected-color'
      onClick={() => onColorSuggestion(fgColorHex, suggestedColors.fg)}
      title={ 'Replace ' + fgColorHex + ' with ' + suggestedColors.fg }
    >
     <span
      className='swatch'
      style={{ color: suggestedColors.fg,  backgroundColor: suggestedColors.fg }}
    />
    <p>{suggestedColors.fg}</p>
   </button>
 );
}

export default function getColorRows(combos, onColorSuggestion) {
  return combos.map((combo, i) => {
    const fgColor = getColor(combo[0]);
    const bgColor = getColor(combo[1]);
    const contrast = axe.commons.color.getContrast(bgColor, fgColor);

    return (
      <tr key={ i }>
        <td style={{ backgroundColor: '#' + combo[0]}} />
        <td style={{ backgroundColor: '#' + combo[1]}} />
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
          {
            contrast >= 3.0 && contrast < 4.5
            ? generateSuggestedSwatch(fgColor, bgColor, onColorSuggestion)
            : ''
          }
        </td>
      </tr>
    );
  });
}
