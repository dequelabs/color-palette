import React, { Component } from 'react';
import { Workspace, Button } from 'cauldron-react';
import ColorPalette from './color-palette'
import SelectedColors from './SelectedColors/';
import './App.css';

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
              />
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

    updatedColorArray.push(this.input.value);
    this.setState({ colorArray: updatedColorArray });
    localStorage.setItem('colorArray', JSON.stringify(updatedColorArray));
    this.input.value = '';
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
