import React from 'react';
import {
  TopBar,
  Workspace,
  SkipLink,
  MenuItem
} from 'cauldron-react';
import Offscreen from 'react-offscreen';
import { Provider } from 'unstated'
import ColorForm from './ColorForm';
import Palette from './Palette';
import ResultsForm from './ResultsForm';
import ColorCombos from './ColorCombos';

export default function App() {
  return (
    <Provider>
      <SkipLink target='#main-content' />
      <TopBar>
        <MenuItem>Color Palette</MenuItem>
        <MenuItem className="dqpl-right-aligned">
          <a
            tabIndex={-1}
            href='https://github.com/dequelabs/color-palette'
            className='fa fa-github'
          >
            <Offscreen>Color Palette on GitHub</Offscreen>
          </a>
        </MenuItem>
      </TopBar>
      <Workspace id='main-content' tabIndex={-1}>
        <h1>Color Palette</h1>
        <ColorForm />
        <Palette />
        <ResultsForm />
        <ColorCombos />
      </Workspace>
    </Provider>
  );
}
