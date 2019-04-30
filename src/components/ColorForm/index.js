import React, { Component } from 'react';
import { Button } from 'cauldron-react';
import { Subscribe } from 'unstated';
import { cssColorFormat } from 'css-color-checker';
import { SUPPORTED_COLOR_TYPES } from '../../constants';
import { getAllColorTypes } from '../../utils/colors';
import PaletteContainer from '../../containers/PaletteContainer';
import TextInput from '../TextInput';

export default class ColorForm extends Component {
  state = {
    inputValue: ''
  };

  onSubmit = (e, addColor, colors) => {
    e.preventDefault();
    const { value } = this.colorInput;
    // cssColorFormat will return 'hex', 'rgb', 'rgba' or false
    const type = cssColorFormat(value);

    if (SUPPORTED_COLOR_TYPES.includes(type)) {
      const data = getAllColorTypes(value);
      // check for duplicate color
      if (colors.find(c => c.hex === data.hex)) {
        return this.handleError('Color already exists in palette');
      }

      this.colorInput.value = '';
      this.setState({ inputValue: '' });

      return addColor({ ...data, background: true, text: true });
    }

    this.handleError('Enter a valid hex, rgb, or rgba color');
  };

  onChange = () =>
    this.setState({ inputValue: this.colorInput.value, error: '' });

  handleError = msg => {
    this.setState({ error: msg });
    this.colorInput.focus();
  };

  onClick = () => {
    if (this.colorInput) {
      this.colorInput.focus();
    }
  };

  render() {
    const { inputValue, error } = this.state;

    return (
      <Subscribe to={[PaletteContainer]}>
        {({ addColor, state: { colors } }) => (
          <form
            autoComplete="off"
            className="color-form"
            onSubmit={e => this.onSubmit(e, addColor, colors)}
          >
            <div className="row">
              <TextInput
                id="color-field"
                labelText="Enter a color (hex or rgb(a))"
                inputRef={el => (this.colorInput = el)}
                onChange={this.onChange}
                error={error}
              />
              <Button
                secondary
                type="submit"
                disabled={!inputValue || colors.length === 5}
                aria-disabled={!inputValue || colors.length === 5}
                onClick={this.onClick}
              >
                Add Color
              </Button>
            </div>
          </form>
        )}
      </Subscribe>
    );
  }
}
