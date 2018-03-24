import React, { Component } from 'react';
import { Workspace, Button } from 'cauldron-react';
import ColorPalette from './color-palette'
import SelectedColors from './SelectedColors/';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      colorArray : []
    };

    this.addColor = this.addColor.bind(this);
    this.doStuff = this.doStuff.bind(this);
  }

  doStuff(e) {
    e.preventDefault();
    this.setState({ colorArray : this.textArea.value.split('\n') });
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
          <SelectedColors colors={colorArray} />
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
  }
}

export default App;
