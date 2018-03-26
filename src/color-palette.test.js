import React from 'react'
import ReactDOM from 'react-dom'
import ColorPalette from './color-palette'

test('should render a paragraph if there are no colors', () => {
  const div = document.createElement('div')
  ReactDOM.render(<ColorPalette />, div)
  expect(div.querySelectorAll('p')).toBeDefined()
  ReactDOM.unmountComponentAtNode(div)
})