import React, { Component, Fragment } from 'react';
import { Subscribe } from 'unstated';
import PaletteContainer from '../../containers/PaletteContainer';
import TabsContainer from '../../containers/TabsContainer';
import Swatch from '../Swatch';
import ColorConfig from '../ColorConfig';
import './NarrowView.css';

// TODO: Handle deleting active
export default class NarrowView extends Component {
  render() {
    return (
      <Subscribe to={[PaletteContainer, TabsContainer]}>
        {(
          { state: { colors } },
          { setTabRef, clearTabs, onKeyDown, onClick, state: { activeTab } }
        ) => {
          clearTabs();

          return (
            <Fragment>
              <ul role="tablist" aria-label="Color Palette">
                {colors.map((c, i) => (
                  <li
                    key={`tab-${i}`}
                    id={`tab-${i}`}
                    role="tab"
                    tabIndex={activeTab === i ? 0 : -1}
                    aria-selected={activeTab === i}
                    onKeyDown={onKeyDown}
                    onClick={() => onClick(i)}
                    ref={el => setTabRef(el, i)}
                    aria-controls={`panel-${i}`}
                  >
                    <Swatch
                      color={c.hex}
                      number={i + 1}
                      original={c.original && c.original.hex}
                      type="palette"
                    />
                  </li>
                ))}
              </ul>
              <div className="panels">
                {colors.map((c, i) => (
                  <div
                    key={`panel-${i}`}
                    className="panel"
                    id={`panel-${i}`}
                    aria-labelledby={`tab-${i}`}
                    role="tabpanel"
                  >
                    {activeTab === i && <ColorConfig color={c} i={i} />}
                  </div>
                ))}
              </div>
            </Fragment>
          );
        }}
      </Subscribe>
    );
  }
}
