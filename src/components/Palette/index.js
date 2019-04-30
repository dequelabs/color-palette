import React, { Fragment } from 'react';
import { Subscribe } from 'unstated';
import PaletteContainer from '../../containers/PaletteContainer';
import WideView from './WideView';
import NarrowView from './NarrowView';
import './index.css';

export default function Pallette() {
  return (
    <Subscribe to={[PaletteContainer]}>
      {({ state: { isWide, colors } }) => (
        <Fragment>
          <h2 id="palette-heading">
            Palette ({colors.length} of 5 colors added)
          </h2>
          <div className="palette">
            {!colors.length && (
              <div className={`no-colors ${!isWide ? 'narrow' : ''}`}>
                Add some colors!
              </div>
            )}
            {isWide ? <WideView /> : <NarrowView />}
          </div>
        </Fragment>
      )}
    </Subscribe>
  );
}
