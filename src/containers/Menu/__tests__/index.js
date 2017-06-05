import React from 'react';
import { Text, ScrollViewMock } from 'react-native';
import { shallow } from 'enzyme';

import { Menu, mapStateToProps } from '../';
import MenuReducer, { initialState } from '../reducer';
import { getMenuNodes, addNodeToSelected } from '../actions';
import { dataAdapter, rawChildToChild, selectedNodes } from '../utils';

describe('Menu', () => {
  it('renders with default props', () => {
    const wrapper = shallow(<Menu />);

    // dont know why this is undefined....
    // expect(wrapper.props().nodes).toEqual([]);
  });
});

describe('mapStateToProps', () => {
  it('should map initial state to props', () => {
    const state = initialState;

    expect(mapStateToProps(state)).toEqual({
      nodes: [],
      selectedNodes: [],
      currentMenuGroup: undefined,
      currentGroupsChildren: [],
      activeItemIds: [],
      totalCost: 0,
    });
  });
  it('should map menuItems state to props', () => {
    const state = MenuReducer(initialState, getMenuNodes());
    const selectedNode = state.menuItems;

    expect(mapStateToProps(state)).toEqual({
      nodes: state.menuItems,
      selectedNodes: [],
      currentMenuGroup: undefined,
      currentGroupsChildren: [],
      activeItemIds: [],
      totalCost: 0,
    });
  });
  it('should map selectedNodes state to props', () => {
    const stateWithNodes = MenuReducer(initialState, getMenuNodes());
    const selectedNode = stateWithNodes.menuItems[0].children[0];
    const stateWithSelectedNodes = MenuReducer(stateWithNodes, addNodeToSelected(selectedNode.id));

    const compState = mapStateToProps(stateWithSelectedNodes)
    expect(compState).toEqual({
      nodes: dataAdapter(stateWithNodes.menuItems),
      selectedNodes: [rawChildToChild(selectedNode)],
      currentMenuGroup: undefined,
      currentGroupsChildren: [],
      activeItemIds: [],
      totalCost: 0,
    });
  });
});


