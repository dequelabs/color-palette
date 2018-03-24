import React, { Component } from 'react';
import ColorPalette from './color-palette.js'
import './App.css';

class App extends Component {
  doStuff() {

  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Color Palette Contrast Tester</h1>
        </header>
        <main>

          <button onClick={this.doStuff}>
            Generate Palette
          </button>
          <ColorPalette colors={[
              '5C9A1B',
              '40752d',
              'aa005f',
              'd5d5d2',
              '1a1812',
              '000000',
              'FFFFFF'
            ]}>
          </ColorPalette>
        </main>
      </div>
    );
  }
}

export default App;
