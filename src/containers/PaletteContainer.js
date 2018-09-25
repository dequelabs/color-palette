import { Container } from 'unstated';

const initialState = {
  colors: [],
  results: {
    sample: 'Sample',
    fontSize: 15,
    fontWeight: 'normal',
    groupBy: 'background',
    includeBlackAndWhite: false,
    combinations: []
  }
};

export default class PaletteContainer extends Container {
  state = initialState;
  /**
   * Adds a new color to the pallete
   * @param {Object} data An object containing: hex, rgba, type (background or text)
   */
  addColor = data => this.setState({ colors: this.state.colors.concat(data) });
  /**
   * Removes a color from the palette
   * @param  {Number} index the index of the color to be removed
   */
  removeColor = index => this.setState({ colors: this.state.colors.filter((_, i) => i !== index) });
  /**
   * Updates an existing color in the palette
   * @param  {Number} index the target index
   * @param  {Object} data  the data to be updated
   */
  updateColor = (index, data) => (
    this.setState({
      colors: this.state.colors.map((color, i) => {
        if (index === i) {
          return { ...color, ...data }
        }
        return color;
      })
    })
  )

  updateResultsSettings = data => (
    this.setState({
      results: {
        ...this.state.results,
        ...data
      }
    })
  )
}
