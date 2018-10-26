import React, { Component } from 'react';
import { Subscribe } from 'unstated';
import classNames from 'classnames';
import Offscreen from 'react-offscreen';
import { suggestColors } from 'a11y-color';
import PaletteContainer from '../../containers/PaletteContainer';
import Swatch from '../Swatch';
import { getAllColorTypes } from '../../utils/colors';
import './index.css';
const axe = require('axe-core');

// NOTE: contrast requirements (AA): 4.5:1 for normal text and 3:1 for large text
export default class ColorCombos extends Component {
  render() {
    return (
      <Subscribe to={[PaletteContainer]}>
        {({ state: { colors, results } }) => {
          // map colors with it's original index position
          const palette = colors.map((c, i) => ({
            ...c,
            originalIndex: i
          }));
          const backgrounds = palette.filter(c => c.background);
          const texts = palette.filter(c => c.text);

          // for each background color -> pair it with each foreground color
          const combos = backgrounds.map(bg => {
            const bgColor = new axe.commons.color.Color(...bg.rgba);

            return (
              texts
                // don't compare it to itself
                .filter(fg => fg.hex !== bg.hex)
                .map(fg => {
                  const fgColor = new axe.commons.color.Color(...fg.rgba);
                  const contrast = axe.commons.color.getContrast(
                    bgColor,
                    fgColor
                  );
                  const cutoff = results.fontSize < 18 ? 4.5 : 3;
                  const pass = contrast >= cutoff;
                  const suggestedColor =
                    !pass &&
                    suggestColors(bgColor, fgColor, {
                      AA: cutoff
                    });
                  const suggestion = suggestedColor && suggestedColor['AA'];
                  const { rgba, hex } =
                    suggestion && getAllColorTypes(suggestion.fg);

                  return (
                    <li
                      className="row combo-row"
                      key={`${fg.originalIndex}-${bg.originalIndex}`}
                    >
                      <Swatch color={fg.hex} number={fg.originalIndex + 1}>
                        <Offscreen>{`Text color (${fg.hex})`}</Offscreen>
                      </Swatch>
                      <div className="fa fa-plus" aria-hidden="true" />
                      <Swatch color={bg.hex} number={bg.originalIndex + 1}>
                        <Offscreen>{`Background color (${fg.hex})`}</Offscreen>
                        <div
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
                            <div className="spec">{`rgba(${rgba.join(
                              ', '
                            )})`}</div>
                            <div className="spec">{`${
                              suggestion.contrast
                            }:1`}</div>
                          </div>
                        )}
                    </li>
                  );
                })
            );
          });

          return <ul className="color-combos">{combos}</ul>;
        }}
      </Subscribe>
    );
  }
}
