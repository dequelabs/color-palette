import colorConverter from 'css-color-converter';
import { suggestColors } from 'a11y-color';

const axe = require('axe-core');

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
  const backgrounds = palette.filter(c => c.background);
  const texts = palette.filter(c => c.text);

  return backgrounds.reduce((acc, bg) => {
    const bgColor = new axe.commons.color.Color(...bg.rgba);

    texts.filter(fg => fg.hex !== bg.hex).forEach(fg => {
      const fgColor = new axe.commons.color.Color(...fg.rgba);
      const contrast = axe.commons.color.getContrast(bgColor, fgColor);
      // TODO: Account for bold text here
      const cutoff = results.fontSize < 18 ? 4.5 : 3;
      const pass = contrast >= cutoff;
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
