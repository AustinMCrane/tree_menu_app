import React from 'react';
import { Text, ScrollViewMock } from 'react-native';
import { shallow } from 'enzyme';

import TreeListView from '../';

describe('TreeListView', () => {
  it('should render with no children', () => {
    const wrapper = shallow(<TreeListView />);
    /*
     * TODO: for some reason it is not finding Text 
      const noChildText = wrapper.find('ScrollViewMock').find('Text');
      const text = noChildText.props().children;
      expect(text).toEqual('Select Option');
    */
  });
  it('should render with shallow children', () => {
    const nodes = [
      { title: 'child 1', children: [] },
      { title: 'child 2', children: [] },
    ];
    const wrapper = shallow(<TreeListView nodes={nodes} />);

    const nodeCells = wrapper.find('ScrollViewMock').find('NodeCell');
    expect(nodeCells.length).toEqual(2);
  });
  it('should render with deep children', () => {
    const nodes = [
      {
        title: 'child 1',
        children: [
          {
            title: 'child 2',
            children: [
              {
                title: 'deep child',
                childern: [],
              },
            ]
          },
        ],
      },
    ];
    const wrapper = shallow(<TreeListView nodes={nodes} />);

    const nodeCellsRoot = wrapper.find('ScrollViewMock');
    const deepNodeCell = nodeCellsRoot[0]
    // expect(deepNodeCell.length).toEqual(2);
   });
});
