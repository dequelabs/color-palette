import React from 'react'
import { mount } from 'enzyme'
import ColorPalette from './color-palette'

test('that ColorPalette renders an instruction if there are no colors', () => {
  const wrapper = mount(<ColorPalette />)
  expect(wrapper.contains('<p>Add some colours!</p>'))
  expect(wrapper.find('table').length).toBe(0)
})

test('that ColorPalette renders an instruction if there is only one color', () => {
  const wrapper = mount(<ColorPalette colors = {['#ffffff']}/>)
  expect(wrapper.contains('<p>Add some colours!</p>'))
  expect(wrapper.find('table').length).toBe(0)
})

test('that ColorPalette table has two comparison rows when two colors', () => {
  const wrapper = mount(<ColorPalette colors = {['#ffffff', '#000000']}/>)
  const table = wrapper.find('table')
  expect(table.length).toBe(1)
  expect(wrapper.find('p').length).toBe(0) // no instruction
  expect(table.find('tr').length).toBe(3)
  expect(table.find('tbody > tr').length).toBe(2)
})

test('that ColorPalette table has six comparison rows when three colors', () => {
  const wrapper = mount(<ColorPalette colors = {['#ffffff', '#000000', '#eeeeee']}/>)
  const table = wrapper.find('table')
  expect(table.find('tbody > tr').length).toBe(6)
})

test('that ColorPalette table has ratios with pass or fail', () => {
  const wrapper = mount(<ColorPalette colors = {['#ddd', '#666']}/>)
  const tbody = wrapper.find('table > tbody')
  expect(tbody.find('td').at(3).contains(':'))
  expect(tbody.find('td').at(3).contains('\u2718')) //fail
  expect(tbody.find('td').at(4).contains(':'))
  expect(tbody.find('td').at(4).contains('\u2714')) //pass
})

test('that ColorPalette table has suggestion button', () => {
  const wrapper = mount(<ColorPalette colors = {['#ddd', '#666']}/>)
  const tbody = wrapper.find('table > tbody')
  expect(tbody.find('td').at(5).contains('<button class="selected-color">'))
})