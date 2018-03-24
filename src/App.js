import React, { Component } from 'react';
import { Workspace, Button } from 'cauldron-react';
import ColorPalette from './color-palette'
import SelectedColors from './SelectedColors/';
import rgbHex from 'rgb-hex';
import './App.css';

function normalizeColor(inputValue) {
  if (!inputValue || !inputValue.length) {
    throw new Error('please provide a color');
  }
  const span = document.createElement('span');
  document.body.appendChild(span);
  let styl = window.getComputedStyle(span);
  span.style.backgroundColor = inputValue;
  if (!span.style.backgroundColor) {
    throw new Error('please provide a valid color string')
  }
  styl = window.getComputedStyle(span);
  return rgbHex(styl.backgroundColor);
}

class App extends Component {
  constructor() {
    super();

    const initialColors = localStorage.getItem('colorArray');
    this.state = {
      colorArray : initialColors && JSON.parse(initialColors) || []
    };

    this.addColor = this.addColor.bind(this);
    this.removeColor = this.removeColor.bind(this);
  }

  render() {
    const { colorArray } = this.state;
    return (
      <div className="App">
        <div className='dqpl-top-bar'>
          <h1 className="App-title">Color Palette Contrast Tester</h1>
        </div>
        <Workspace>
          <form className='any-colour-you-like' onSubmit={this.addColor}>
            <div className='dqpl-field-wrap'>
              <label className='dqpl-label' htmlFor='add-color'>Color (hex)</label>
              <input
                type='text'
                id='add-color'
                className='dqpl-text-input'
                ref={el => this.input = el}
                aria-describedby='error'
              />
              <div id='error' className='dqpl-error-wrap'>{ this.state.error }</div>
            </div>
            <Button type='submit'>Add color</Button>
          </form>
          <SelectedColors colors={colorArray} onTrash={this.removeColor} />
          <ColorPalette colors={colorArray} />
        </Workspace>
      </div>
    );
  }

  addColor(e) {
    e.preventDefault();
    const { colorArray } = this.state;
    const updatedColorArray = colorArray.slice();
    try {
      const color = normalizeColor(this.input.value);
      if (updatedColorArray.includes(color)) {
        throw new Error('duplicate color');
      }
      updatedColorArray.push(color);

      this.setState({
        colorArray: updatedColorArray,
        error: undefined
      });
      localStorage.setItem('colorArray', JSON.stringify(updatedColorArray));
      this.input.value = '';
    } catch (error) {
      this.setState({ error: `Incorrect input: ${error.message}` });
    }
  }

  removeColor(index) {
    const { colorArray } = this.state;
    const updatedColorArray = colorArray.slice();
    updatedColorArray.splice(index, 1);

    this.setState({ colorArray: updatedColorArray });
    localStorage.setItem('colorArray', JSON.stringify(updatedColorArray));
  }
}

export default App;
