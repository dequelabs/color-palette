import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';


export default class SelectedColors extends Component {
  static propTypes = {
    colors: PropTypes.array,
    onTrash: PropTypes.func.isRequired,
    focusInput: PropTypes.func.isRequired
  }

  static defaultProps = {
    colors: []
  }

  constructor() {
    super();
    this.state = {};
    this.trashes = [];
  }

  componentDidUpdate(prevProps) {
    const { lastClickedIndex } = this.state;
    const { colors, focusInput } = this.props;
    const hasRemoved = prevProps.colors.length > colors.length;

    if (!hasRemoved) { return; }

    // we don't have to increment/decrement lastClickedIndex because we have updated trashes
    const toFocus = this.trashes[lastClickedIndex] || this.trashes[this.trashes.length - 1];

    if (toFocus) {
      toFocus.focus();
    } else {
      focusInput();
    }
  }

  render() {
    this.trashes = [];
    const { colors, onTrash } = this.props;

    return (
      <div className='selected-colors'>
        {
          colors.map((color, i) => (
            <div className='selected-color' key={i}>
              <div className='swatch' style={{ background: `#${color}` }} />
              <p>{color}</p>
              <button
                aria-label={`Remove ${color}`}
                type='button'
                onClick={() => {
                  onTrash(i); // let App update the colorArray
                  this.onClick(i); // retain focus
                }}
                ref={el => {
                  if (el) { this.trashes[i] = el; }
                }}
              >
                <i aria-hidden='true' className='fas fa-trash' />
              </button>
            </div>
          ))
        }
      </div>
    );
  }

  onClick(lastClickedIndex) {
    this.setState({ lastClickedIndex });
  }
}
