import { Container } from 'unstated';

const MIN_WIDTH = 1034;
const isWindowWide = () => window.innerWidth >= MIN_WIDTH;
const STATE_KEY = 'palette';
const storageState = localStorage.getItem(STATE_KEY);
const initialState = storageState
  ? JSON.parse(storageState)
  : {
      colors: [],
      results: {
        sample: 'Sample',
        fontSize: 15,
        fontWeight: 'normal',
        groupBy: 'background',
        includeBlackAndWhite: false,
        combinations: []
      },
      isWide: isWindowWide()
    };

export default class PaletteContainer extends Container {
  state = initialState;

  constructor() {
    super();
    window.addEventListener('resize', this.onResize);
  }

  setStateAndStorage = (data, cb = () => {}) => {
    this.setState(data, () => {
      localStorage.setItem(STATE_KEY, JSON.stringify(this.state));
      cb();
    });
  };

  onResize = () => {
    const wasWide = this.state.isWide;
    const isWide = isWindowWide();

    if (wasWide !== isWide) {
      this.setStateAndStorage({ isWide });
    }
  };

  /**
   * Adds a new color to the pallete
   * @param {Object} data An object containing: hex, rgba, type (background or text)
   */
  addColor = data =>
    this.setStateAndStorage({ colors: this.state.colors.concat(data) });
  /**
   * Removes a color from the palette
   * @param  {Number} index the index of the color to be removed
   */
  removeColor = index => {
    this.setStateAndStorage(
      {
        colors: this.state.colors.map((c, i) => {
          if (i === index) {
            c.fadeout = true;
          }
          return c;
        })
      },
      () => {
        setTimeout(() => {
          this.setStateAndStorage({
            colors: this.state.colors.filter((_, i) => i !== index)
          });
        }, 400); // wait for fadeout
      }
    );
  };
  /**
   * Updates an existing color in the palette
   * @param  {Number} index the target index
   * @param  {Object} data  the data to be updated
   */
  updateColor = (index, data) =>
    this.setStateAndStorage({
      colors: this.state.colors.map((color, i) => {
        if (index === i) {
          return { ...color, ...data };
        }
        return color;
      })
    });
  /**
   * Adds replacement property to original color
   * @param  {Number} index    the target index
   * @param  {Object} replace  the replacement color data
   */
  replaceColor = (index, replacement) =>
    this.setStateAndStorage({
      colors: this.state.colors.map((color, i) => {
        if (i === index) {
          return { ...color, ...replacement, original: color };
        }
        return color;
      })
    });

  /**
   * Swaps original color back in (clobbering the swapped/suggested)
   * @param  {Number} index the target index
   * @param  {Object} swap  the original color
   */
  swapColor = (index, swap) =>
    this.setStateAndStorage({
      colors: this.state.colors.map((color, i) => {
        if (i === index) {
          return swap;
        }
        return color;
      })
    });

  updateResultsSettings = data =>
    this.setStateAndStorage({
      results: {
        ...this.state.results,
        ...data
      }
    });
}
