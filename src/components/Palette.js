import React, { Component } from 'react';
import { Subscribe } from 'unstated';
import { Checkbox } from 'cauldron-react';
import PaletteContainer from '../containers/PaletteContainer';
import Swatch from './Swatch';
import TextInput from './TextInput';
import './Palette.css';

export default class Palette extends Component {
  render() {
    return (
      <Subscribe to={[PaletteContainer]}>
        {
          ({ removeColor, updateColor, state: { colors } }) => (
            <div className='palette'>
              <h2>{`Palette (${colors.length} of 5 colors added)`}</h2>
              {!colors.length ? (
                <div className='no-colors'>Add some colors!</div>
              ) : (
                <ul>
                  {colors.map((color, i) => (
                    <li key={`color-${i}`}>
                      <Swatch color={color.hex} number={i + 1} />
                      <div
                        className='fields'
                        role='group'
                        aria-labelledby={`cb-label-${i}`}
                      >
                        <div className='row'>
                          <button
                            type='button'
                            aria-label='Remove color from palette'
                            className='remove-color fa fa-trash'
                            onClick={() => removeColor(i)}
                          />
                        </div>
                        <div className='row rgba-inputs'>
                          <TextInput
                            readOnly
                            value={color.rgba[0]}
                            id={`r-${i}`}
                            labelText='R'
                          />
                          <TextInput
                            readOnly
                            value={color.rgba[1]}
                            id={`g-${i}`}
                            labelText='G'
                          />
                          <TextInput
                            readOnly
                            value={color.rgba[2]}
                            id={`b-${i}`}
                            labelText='B'
                          />
                          <TextInput
                            readOnly
                            value={color.rgba[3]}
                            id={`a-${i}`}
                            labelText='A'
                          />
                        </div>
                        <div className='row hex-input'>
                          <TextInput
                            readOnly
                            value={color.hex}
                            id={`hex-${i}`}
                            labelText='HEX'
                          />
                        </div>
                        <h3 id={`cb-label-${i}`}>This color is used as...</h3>
                        <Checkbox
                          label='Text'
                          id={`text-cb-${i}`}
                          name={`color-used-as-${i}`}
                          checked={color.text}
                          onClick={e => {
                            if (!e.target.type || e.target.type !== 'checkbox') {
                              return;
                            }

                            updateColor(i, { text: e.target.checked });
                          }}
                        />
                        <Checkbox
                          label='Background'
                          id={`background-cb-${i}`}
                          name={`color-used-as-${i}`}
                          checked={color.background}
                          onClick={e => {
                            if (!e.target.type || e.target.type !== 'checkbox') {
                              return;
                            }

                            updateColor(i, { background: e.target.checked });
                          }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )
        }
      </Subscribe>
    );
  }
}
