import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class TextInput extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    labelText: PropTypes.string.isRequired,
    inputRef: PropTypes.func,
    className: PropTypes.string,
    error: PropTypes.string
  };

  render() {
    const { id, labelText, className, inputRef, error, ...other } = this.props;
    const errorId = `${id}-error-message`;
    const additionalProps = {};

    if (error) {
      additionalProps['aria-invalid'] = 'true';
      additionalProps['aria-describedby'] = errorId;
    }

    return (
      <div className='dqpl-field-wrap'>
        <label htmlFor={id} className='dqpl-label'>{labelText}</label>
        <input
          id={id}
          type='text'
          className={classNames('dqpl-text-input', className, {
            'dqpl-error': error
          })}
          ref={inputRef}
          {...additionalProps}
          {...other}
        />
        {error && (
          <div className='dqpl-error-wrap' id={errorId}>
            {error}
          </div>
        )}
      </div>
    );
  }
}
