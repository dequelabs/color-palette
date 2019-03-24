import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Subscribe } from 'unstated';
import { Checkbox } from 'cauldron-react';
import TextInput from '../TextInput';
import PaletteContainer from '../../containers/PaletteContainer';
import TabsContainer from '../../containers/TabsContainer';

export default class ColorConfig extends Component {
  static propTypes = {
    color: PropTypes.object.isRequired,
    i: PropTypes.number.isRequired
  };

  render() {
    const {
      i,
      color: {
        hex,
        text,
        background,
        rgba: [r, g, b, a],
        original
      }
    } = this.props;

    return (
      <Subscribe to={[PaletteContainer, TabsContainer]}>
        {(
          { updateColor, swapColor, removeColor, state: { isWide }, setItem },
          { onDelete }
        ) => (
          <div
            className="fields"
            role="group"
            aria-labelledby={`cb-label-${i}`}
            tabIndex={-1}
            ref={el => setItem(el, i)}
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
                onClick={() => {
                  if (!isWide) {
                    onDelete(i);
                  }

                  removeColor(i);
                }}
              />
            </div>
            <div className="row rgba-inputs">
              <TextInput readOnly value={r} id={`r-${i}`} labelText="R" />
              <TextInput readOnly value={g} id={`g-${i}`} labelText="G" />
              <TextInput readOnly value={b} id={`b-${i}`} labelText="B" />
              <TextInput readOnly value={a} id={`a-${i}`} labelText="A" />
            </div>
            <div className="row hex-input">
              <TextInput readOnly value={hex} id={`hex-${i}`} labelText="HEX" />
            </div>
            <div className="used-as">
              <h3 id={`cb-label-${i}`}>This color is used as...</h3>
              <Checkbox
                label="Text"
                id={`text-cb-${i}`}
                name={`color-used-as-${i}`}
                checked={text}
                onClick={e => {
                  if (!e.target.type || e.target.type !== 'checkbox') {
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
                  if (!e.target.type || e.target.type !== 'checkbox') {
                    return;
                  }

                  updateColor(i, { background: e.target.checked });
                }}
              />
            </div>
          </div>
        )}
      </Subscribe>
    );
  }
}
