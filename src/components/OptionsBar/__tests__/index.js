import React from 'react';
import { Text, ScrollViewMock } from 'react-native';
import { shallow } from 'enzyme';

import OptionsBar from '../';

describe('OptionsBar', () => {
  it('should render with default props', () => {
    const wrapper = shallow(<OptionsBar />);

    expect(wrapper.find('Button').length).toEqual(0);
  });
});
