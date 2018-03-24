import React, { Component } from 'react';
import ColorPalette from './color-palette.js'
import './App.css';

class App extends Component {
  constructor (props) {
    super(props);
    this.doStuff = this.doStuff.bind(this);
    this.state ={ colorArray : ['5C9A1B',
              '40752d',
              'aa005f',
              'd5d5d2',
              '1a1812',
              '000000',
              'FFFFFF'] };
  }

  doStuff(e) {
    this.setState({ colorArray : this.textArea.value.split('\n') });
    console.log(this.state.colorArray);
    e.preventDefault();
  }

  render() {
    const { colorArray } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Color Palette Contrast Tester</h1>
        </header>
        <main>

          <form>
            <textarea id="colors" rows='5' ref={ el => this.textArea = el }>
              {colorArray.join('\n')}
            </textarea>
            <button onClick={ this.doStuff }>
              Generate Palette
            </button>
          </form>
          <ColorPalette colors={colorArray}>
          </ColorPalette>
        </main>
      </div>
    );
  }
}

export default App;
