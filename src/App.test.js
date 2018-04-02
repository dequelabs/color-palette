import React from 'react'
import { shallow } from 'enzyme'
import App from './App'

test('renders without crashing', () => {
  shallow(<App />)
})