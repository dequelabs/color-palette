import React, { Component } from 'react';
import { Subscribe } from 'unstated';
import { Checkbox } from 'cauldron-react';
import classNames from 'classnames';
import PaletteContainer from '../../containers/PaletteContainer';
import Swatch from '../Swatch';
import TextInput from '../TextInput';
import './index.css';

export default class Palette extends Component {
  render() {
    return (
      <Subscribe to={[PaletteContainer]}>
        {({ removeColor, updateColor, swapColor, state: { colors } }) => (
          <div className="palette">
            <h2>{`Palette (${colors.length} of 5 colors added)`}</h2>
            {!colors.length ? (
              <div className="no-colors">Add some colors!</div>
            ) : (
              <ul>
                {colors.map(
                  (
                    { hex, text, background, rgba: [r, g, b, a], original },
                    i
                  ) => (
                    <li key={`color-${i}`}>
                      <Swatch
                        color={hex}
                        number={i + 1}
                        original={original && original.hex}
                      />
                      <div
                        className="fields"
                        role="group"
                        aria-labelledby={`cb-label-${i}`}
                      >
                        <div className="row">
                          {original && (
                            <button
                              aria-label={`Swap ${hex} back into palette`}
                              className="swap-back fa fa-refresh"
                              onClick={() => swapColor(i, original)}
                            />
                          )}
                          <button
                            type="button"
                            aria-label="Remove color from palette"
                            className={classNames('remove-color fa fa-trash', {
                              'no-replacement': !original
                            })}
                            onClick={() => removeColor(i)}
                          />
                        </div>
                        <div className="row rgba-inputs">
                          <TextInput
                            readOnly
                            value={r}
                            id={`r-${i}`}
                            labelText="R"
                          />
                          <TextInput
                            readOnly
                            value={g}
                            id={`g-${i}`}
                            labelText="G"
                          />
                          <TextInput
                            readOnly
                            value={b}
                            id={`b-${i}`}
                            labelText="B"
                          />
                          <TextInput
                            readOnly
                            value={a}
                            id={`a-${i}`}
                            labelText="A"
                          />
                        </div>
                        <div className="row hex-input">
                          <TextInput
                            readOnly
                            value={hex}
                            id={`hex-${i}`}
                            labelText="HEX"
                          />
                        </div>
                        <h3 id={`cb-label-${i}`}>This color is used as...</h3>
                        <Checkbox
                          label="Text"
                          id={`text-cb-${i}`}
                          name={`color-used-as-${i}`}
                          checked={text}
                          onClick={e => {
                            if (
                              !e.target.type ||
                              e.target.type !== 'checkbox'
                            ) {
                              return;
                            }

                            updateColor(i, { text: e.target.checked });
                          }}
                        />
                        <Checkbox
                          label="Background"
                          id={`background-cb-${i}`}
                          name={`color-used-as-${i}`}
                          checked={background}
                          onClick={e => {
                            if (
                              !e.target.type ||
                              e.target.type !== 'checkbox'
                            ) {
                              return;
                            }

                            updateColor(i, { background: e.target.checked });
                          }}
                        />
                      </div>
                    </li>
                  )
                )}
              </ul>
            )}
          </div>
        )}
      </Subscribe>
    );
  }
}
