import colorConverter from 'css-color-converter';
import { suggestColors } from 'a11y-color';

const axe = require('axe-core');
const BLACK_HEX = '#000000';
const WHITE_HEX = '#ffffff';

export const getAllColorTypes = value => {
  const color = colorConverter(value);

  return {
    hex: color.toHexString(),
    rgba: color.toRgbaArray()
  };
};

/**
 * Gets color combinations for current palette
 * @param  {Array} colors   an array of color palette objects
 * @param  {Object} results object containing current results configuration (fontSize, fontWeight, etc..)
 * @return {Array} an array of color combinations, each containing:
 * @property {Object} fg         a color palette object
 * @property {Object} bg         a color palette object
 * @property {Number} contrast   the contrast between the fg and bg (calculated by axe)
 * @property {Array} rgba        an array of rgba values
 * @property {String} hex        a suggested hex for combos that do not meet contast requirements
 * @property {Object} suggestion a suggestion color object returned by a11y-color
 * @property {Boolean} pass      whether or not the combo passes color contrast requirements
 */
export const getCombos = (colors, results) => {
  // map colors with it's original index position
  const palette = colors.map((c, i) => ({
    ...c,
    originalIndex: i
  }));

  if (results.includeBlackAndWhite) {
    const hasBlackText = colors.find(c => c.hex === BLACK_HEX);
    const hasWhiteText = colors.find(c => c.hex === WHITE_HEX);
    const data = { background: false, text: true };

    if (!hasBlackText) {
      palette.push({
        ...getAllColorTypes(BLACK_HEX),
        ...data,
        forced: 'black'
      });
    }

    if (!hasWhiteText) {
      palette.push({
        ...getAllColorTypes(WHITE_HEX),
        ...data,
        forced: 'white'
      });
    }
  }

  const backgrounds = palette.filter(c => c.background);
  const texts = palette.filter(c => c.text);

  return backgrounds.reduce((acc, bg) => {
    const bgColor = new axe.commons.color.Color(...bg.rgba);

    texts.filter(fg => fg.hex !== bg.hex).forEach(fg => {
      const fgColor = new axe.commons.color.Color(...fg.rgba);
      const contrast = axe.commons.color.getContrast(bgColor, fgColor);
      const isLarge =
        results.fontSize >= 18 ||
        (results.fontWeight === 'bold' && results.fontSize >= 14);
      const cutoff = isLarge ? 3 : 4.5;
      // NOTE calling `toFixed` here because a11y-colors does...
      // This is a problem imo, #ccc and #575757 is 4.4996128
      // however a11y-colors suggests it (and lists as 4.5:1)
      // TODO Decide if we're cool with this toFixed-ing
      const pass = contrast.toFixed(2) >= cutoff;
      const suggestedColor =
        !pass &&
        suggestColors(bgColor, fgColor, {
          AA: cutoff
        });
      const suggestion = suggestedColor && suggestedColor['AA'];
      const { rgba, hex } = suggestion && getAllColorTypes(suggestion.fg);

      acc.push({
        fg,
        bg,
        contrast,
        rgba,
        hex,
        suggestion,
        pass
      });
    });

    return acc;
  }, []);
};
