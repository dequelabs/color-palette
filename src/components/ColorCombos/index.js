import React, { Component } from 'react';
import { Subscribe } from 'unstated';
import classNames from 'classnames';
import Offscreen from 'react-offscreen';
import PaletteContainer from '../../containers/PaletteContainer';
import Swatch from '../Swatch';
import { getCombos } from '../../utils/colors';
import './index.css';

export default class ColorCombos extends Component {
  render() {
    return (
      <Subscribe to={[PaletteContainer]}>
        {({ state: { colors, results } }) => {
          const combos = getCombos([...colors], results);
          const comboItems = combos
            .sort((a, b) => {
              const property = results.groupBy === 'background' ? 'bg' : 'fg';
              return a[property].hex > b[property].hex;
            })
            .map(({ fg, bg, contrast, rgba, hex, suggestion, pass }) => (
              <li
                className="row combo-row"
                key={`${fg.forced || fg.originalIndex}-${bg.forced ||
                  bg.originalIndex}`}
              >
                <Swatch
                  color={fg.hex}
                  number={
                    typeof fg.originalIndex !== 'undefined'
                      ? fg.originalIndex + 1
                      : null
                  }
                >
                  <Offscreen>{`Text color (${fg.hex})`}</Offscreen>
                </Swatch>
                <div className="fa fa-plus" aria-hidden="true" />
                <Swatch
                  color={bg.hex}
                  number={
                    typeof bg.originalIndex !== 'undefined'
                      ? bg.originalIndex + 1
                      : null
                  }
                >
                  <Offscreen>{`Background color (${fg.hex})`}</Offscreen>
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
                      <h3>Suggestion</h3>
                      <Swatch color={suggestion.fg} />
                      <div className="spec">{suggestion.fg}</div>
                      <div className="spec">{`rgba(${rgba.join(', ')})`}</div>
                      <div className="spec">{`${suggestion.contrast}:1`}</div>
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
