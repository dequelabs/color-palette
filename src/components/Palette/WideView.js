import React, { Component } from 'react';
import { Subscribe } from 'unstated';
import classNames from 'classnames';
import PaletteContainer from '../../containers/PaletteContainer';
import Swatch from '../Swatch';
import ColorConfig from '../ColorConfig';

export default class WideView extends Component {
  render() {
    return (
      <Subscribe to={[PaletteContainer]}>
        {({ state: { colors }, setListRef }) =>
          !!colors.length && (
            <ul
              tabIndex={-1}
              aria-labelledby="palette-heading"
              ref={setListRef}
            >
              {colors.map((color, i) => (
                <li
                  key={`color-${i}`}
                  className={classNames({
                    palette__fadeout: color.fadeout
                  })}
                >
                  <Swatch
                    color={color.hex}
                    number={i + 1}
                    original={color.original && color.original.hex}
                    type="palette"
                  />
                  <ColorConfig color={color} i={i} />
                </li>
              ))}
            </ul>
          )
        }
      </Subscribe>
    );
  }
}
