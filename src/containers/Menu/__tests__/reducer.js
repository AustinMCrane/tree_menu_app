import MenuReducer, { initialState } from '../reducer';
import {
  addNodeToSelected,
  deleteNodeFromSelected,
  getMenuNodes,
  selectMenuGroup,
} from '../actions';

describe('MenuReducer', () => {
  describe('initial state', () => {
    it('should return initialState', () => {
      const newState = MenuReducer(initialState, {});

      expect(newState).toEqual(initialState);
    });
  });
  describe('getMenuNodes', () => {
    it('should return state menuNodes', () => {
      const newState = MenuReducer(initialState, getMenuNodes());

      expect(newState).toEqual({
        ...initialState,
        menuItems: require('../../../datasets/games.json').menuItems,
      });
    });
  });
  describe('menuGroupSelected', () => {
    it('should return state with selected group', () => {
      const newState = MenuReducer(initialState, selectMenuGroup(1));

      expect(newState).toEqual({
        ...initialState,
        currentMenuGroup: 1,
      });
    });
  });
  describe('addNodeToSelected', () => {
    it('should return state with new selected node', () => {
      const newState = MenuReducer(initialState, addNodeToSelected(203));

      expect(newState).toEqual({
        ...initialState,
        selectedNodes: [203],
      });
    });
    it('should not select a duplicate node', () => {
      const newState = MenuReducer(initialState, addNodeToSelected(203));

      expect(newState).toEqual({
        ...initialState,
        selectedNodes: [203],
      });

      // add it again
      const nextState = MenuReducer(newState, addNodeToSelected(203));
      // should not duplicate 203
      expect(nextState).toEqual({
        ...initialState,
        selectedNodes: [203],
      });
    });
  });
  describe('deleteNodeToSelected', () => {
    it('should return state with new selected node', () => {
      const newState = MenuReducer(initialState, deleteNodeFromSelected(203));

      expect(newState).toEqual({
        ...initialState,
        selectedNodes: [],
      });
    });
    it('should delete node id', () => {
      const startingState = { ...initialState, selectedNodes: [203, 202] };
      const newState = MenuReducer(startingState, deleteNodeFromSelected(203));

      expect(newState).toEqual({
        ...initialState,
        selectedNodes: [202],
      });
    });
  });
});
