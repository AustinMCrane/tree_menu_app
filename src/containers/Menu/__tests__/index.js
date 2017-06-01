import React from 'react';
import { Text, ScrollViewMock } from 'react-native';
import { shallow } from 'enzyme';

import Menu, { dataAdapter, rawChildToChild } from '../';

describe('Menu', () => {
  it('renders with default props', () => {
    const wrapper = shallow(<Menu />);

    expect(wrapper.props().nodes.length).toEqual(0);
  });
});

describe('dataAdapter', () => {
  it('should return menu data structure', () => {
    const input = require('../../../datasets/games.json');
    const output = dataAdapter(input);

    expect(output.length).toEqual(input.menuItems.length);
  });
});
describe('rawChildToChild', () => {
  it('should return child data structure', () => {
    const input = require('../../../datasets/games.json');
    let firstChild = input.menuItems[0];

    expect(rawChildToChild(firstChild).title).toEqual(firstChild.checkDesc);
  });
});
