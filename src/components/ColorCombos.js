import React, { Component } from 'react';
import { Subscribe } from 'unstated';
import classNames from 'classnames';
import Offscreen from 'react-offscreen';
import PaletteContainer from '../containers/PaletteContainer';
import Swatch from './Swatch';
import './ColorCombos.css';
const axe = require('axe-core');

// NOTE: contrast requirements (AA): 4.5:1 for normal text and 3:1 for large text
export default class ColorCombos extends Component {
  render() {
    return (
      <Subscribe to={[PaletteContainer]}>
        {
          ({ state: { colors, results } }) => {
            const backgrounds = colors
              .map((c, i) => ({ ...c, originalIndex: i }))
              .filter(c => c.background);
            const texts = colors
              .map((c, i) => ({ ...c, originalIndex: i }))
              .filter(c => c.text);

            // for each background color -> pair it with each foreground color
            const combos = backgrounds.map(bg => {
              // TODO: the existing one divides alpha by 255...is that needed here?
              const bgColor = new axe.commons.color.Color(...bg.rgba);

              return texts
                // don't compare it to itself
                .filter(fg => fg.hex !== bg.hex)
                .map(fg => {
                  const fgColor = new axe.commons.color.Color(...fg.rgba)
                  const contrast = axe.commons.color.getContrast(bgColor, fgColor);
                  const cutoff = results.fontSize < 18 ? 4.5 : 3;
                  const pass = contrast >= cutoff;

                  return (
                    <li
                      className='row combo-row'
                      key={`${fg.originalIndex}-${bg.originalIndex}`}
                    >
                      <Swatch color={fg.hex} number={fg.originalIndex}>
                        <Offscreen>{`Text color (${fg.hex})`}</Offscreen>
                      </Swatch>
                      <div className='fa fa-plus' aria-hidden='true' />
                      <Swatch color={bg.hex} number={bg.originalIndex}>
                        <Offscreen>{`Background color (${fg.hex})`}</Offscreen>
                        <div
                          style={{
                            fontSize: `${(results.fontSize * 96 / 72)}px`,
                            color: fg.hex,
                            fontWeight: results.fontWeight
                          }}
                        >
                          {results.sample}
                        </div>
                      </Swatch>
                      <div className='fa fa-pause' aria-hidden='true' />
                      <div className='row res-row'>
                        <div
                          className={classNames('fa', {
                            'fa-check-circle': pass,
                            'fa-close': !pass
                          })}
                          aria-hidden='true'
                        />
                        <div>
                          {pass ? 'PASS' : 'FAIL'}
                          <p>{`(${contrast.toFixed(2)}:1)`}</p>
                        </div>
                      </div>
                    </li>
                  );
                })
            });

            return (
              <ul className='color-combos'>
                {combos}
              </ul>
            );
          }
        }
      </Subscribe>
    );
  }
}
