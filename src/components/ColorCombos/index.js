import React, { Component } from 'react';
import { Subscribe } from 'unstated';
import classNames from 'classnames';
import PaletteContainer from '../../containers/PaletteContainer';
import Swatch from '../Swatch';
import { getCombos, getAllColorTypes } from '../../utils/colors';
import './index.css';

export default class ColorCombos extends Component {
  listItemRef = el => (this.listItem = el);
  render() {
    return (
      <Subscribe to={[PaletteContainer]}>
        {({ state: { colors, results }, replaceColor }) => {
          const combos = getCombos([...colors], results);
          const comboItems = combos
            .sort((a, b) => {
              const property = results.groupBy === 'background' ? 'bg' : 'fg';
              return a[property].hex > b[property].hex;
            })
            .map(({ fg, bg, contrast, rgba, hex, suggestion, pass }, i) => (
              <li
                className="row combo-row"
                key={`${fg.forced || fg.originalIndex}-${bg.forced ||
                  bg.originalIndex}`}
                tabIndex={-1}
                ref={el => (this.listItem = el)}
              >
                <Swatch
                  color={fg.hex}
                  number={
                    typeof fg.originalIndex !== 'undefined'
                      ? fg.originalIndex + 1
                      : null
                  }
                  type="text"
                />
                <div className="fa fa-plus" aria-hidden="true" />
                <Swatch
                  color={bg.hex}
                  number={
                    typeof bg.originalIndex !== 'undefined'
                      ? bg.originalIndex + 1
                      : null
                  }
                  type="background"
                >
                  <div
                    className="color-combos__sample"
                    style={{
                      fontSize: `${(results.fontSize * 96) / 72}px`,
                      color: fg.hex,
                      fontWeight: results.fontWeight
                    }}
                  >
                    {results.sample}
                  </div>
                </Swatch>
                <div className="fa fa-pause" aria-hidden="true" />
                <div className="row res-row">
                  <div
                    className={classNames('fa', {
                      'fa-check-circle': pass,
                      'fa-close': !pass
                    })}
                    aria-hidden="true"
                  />
                  <div>
                    {pass ? 'PASS' : 'FAIL'}
                    <p>{`(${contrast.toFixed(2)}:1)`}</p>
                  </div>
                </div>
                {!pass &&
                  suggestion &&
                  hex !== fg.hex && (
                    <div className="suggestion">
                      <h3 id={`suggestion-${i}`}>Suggestion</h3>
                      <div role="group" aria-labelledby={`suggestion-${i}`}>
                        <Swatch color={suggestion.fg} type="palette" />
                        <div>
                          <div className="spec">{suggestion.fg}</div>
                          <div className="spec">{`rgba(${rgba.join(
                            ', '
                          )})`}</div>
                          <div className="spec">{`${
                            suggestion.contrast
                          }:1`}</div>
                        </div>
                        <button
                          className="dqpl-link"
                          onClick={() => {
                            replaceColor(
                              fg.originalIndex,
                              getAllColorTypes(suggestion.fg)
                            );

                            if (this.listItem) {
                              this.listItem.focus();
                            }
                          }}
                        >
                          replace with this color
                        </button>
                      </div>
                    </div>
                  )}
              </li>
            ));

          return <ul className="color-combos">{comboItems}</ul>;
        }}
      </Subscribe>
    );
  }
}
