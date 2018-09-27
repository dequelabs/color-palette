import colorConverter from 'css-color-converter';

export const getAllColorTypes = value => {
  const color = colorConverter(value);

  return {
    hex: color.toHexString(),
    rgba: color.toRgbaArray()
  };
}
