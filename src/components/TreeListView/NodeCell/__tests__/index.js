import React from 'react';
import { Text, ScrollViewMock } from 'react-native';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import NodeCell, { ChildrenCard } from '../';

describe('NodeCell', () => {
  it('should render with default props', () => {
    const wrapper = shallow(<NodeCell />);
    const nodeText = wrapper.find('Text').props().children;

    expect(nodeText).toEqual('Default Node');
  });
  it('should render with custom props', () => {
    const node = { title: 'test', children: [] };
    const nodePressSpy = sinon.spy();
    const wrapper = shallow(
      <NodeCell
        node={node}
        onNodePress={nodePressSpy}
      />
    );
    const nodeText = wrapper.find('Text').props().children;

    // expect the text to be test
    expect(nodeText).toEqual('test');

    const cardNode = wrapper.find('Card');
    expect(cardNode.props().onPress).not.toEqual(null);
  });
});

describe('ChildrenCard', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <ChildrenCard>
      </ChildrenCard>
    );
    expect(wrapper.props().children.length).toEqual(0);
  });
});
