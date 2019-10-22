import React from 'react';
import { TopBar, Workspace, SkipLink, MenuItem } from 'cauldron-react';
import Offscreen from 'react-offscreen';
import { Provider } from 'unstated';
import ColorForm from '../ColorForm';
import Palette from '../Palette';
import ResultsForm from '../ResultsForm';
import ColorCombos from '../ColorCombos';

export default function App() {
  return (
    <Provider>
      <SkipLink target="#main-content" />
      <TopBar>
        <MenuItem>Color Palette</MenuItem>
        <MenuItem className="dqpl-right-aligned">
          <a
            tabIndex={-1}
            href="https://github.com/dequelabs/color-palette"
            className="fa fa-github"
          >
            <Offscreen>Color Palette on GitHub</Offscreen>
          </a>
        </MenuItem>
      </TopBar>
      <Workspace id="main-content" tabIndex={-1}>
        <h1>Color Palette Contrast Checker</h1>
        <p>
          Selecting high contrast color combinations is critical to deliver
          accessible content. The W3C&apos;s Web Content Accessibility
          Guidelines or WCAG, suggest that foreground text over background
          colors meet a minimum contrast ratio. Adhering to these guidelines
          enables all users, including people vision impairments, to enjoy your
          content.
        </p>
        <h2>How to use</h2>
        <p>
          Import the hex or RGB color values that comprise your current color
          palette to see where they stand against WCAG 2.1 AA color contrast
          requirements. Indicate which colors are used for text or background
          treatments, as well as the font size and weight. The results will
          indicate the accessibility of your color choices. Combinations that
          exceed a contrast ratio of 4.5:1 or greater, will pass WCAG 2.1 AA. In
          some cases where the contrast ratio has failed to meet the guideline,
          a similar, higher contrast replacement color will be suggested.
        </p>
        <ColorForm />
        <Palette />
        <ResultsForm />
        <ColorCombos />
      </Workspace>
    </Provider>
  );
}
