import * as MenuType from './types';
import { treeSearch, dataAdapter } from './utils';


// initilal state of the application
export const initialState = {
  // array of node ids
  selectedNodes: [],
  // tree stucture for the menu items
  menuItems: [],
  // top root group item by menuItems array index
  // currentMenuGroup: 0,
  activeItemIds: [],
};

/*
 * Menu Reducer
 * @author Austin Crane
 *
 * @param {object} state - the previous redux state
 * @param {object} action - the incomming action that will generate new
 * state
 * @return {object} new application state
 */
const MenuReducer = (state = initialState, action) => {
  const type = action.type;
  switch (type) {

    case MenuType.MENU_GROUP_SELECTED:
      return { ...state, currentMenuGroup: action.groupIndex };

    // hydrate the menuItems from static file
    case MenuType.GET_MENU_NODES:
      const staticFile = require('../../datasets/games.json');
      return { ...state, menuItems: dataAdapter(staticFile.menuItems) };

    // Add node by node id
    case MenuType.ADD_NODE_TO_SELECTED:
      // add the node
      const addNodeIndex = state.selectedNodes.indexOf(action.nodeId);
      if (addNodeIndex == -1) {
        return { ...state, selectedNodes: [...state.selectedNodes, action.nodeId] };
      } else {
        // duplicate node id, dont do anything
        return state;
      }

    // expand the selected item to show children
    case MenuType.CHANGE_ACTIVE_ITEM:
      if (state.activeItemIds.length > 0) {
        const currentActiveID = state.activeItemIds[0];
        console.log('search ----', currentActiveID);
        // check if the incoming active item is a child of the
        // current active item
        // tree search to find currentActive node
        const currentActiveNode = treeSearch(state.menuItems[state.currentMenuGroup], currentActiveID);
        console.log('currentActiveNode', currentActiveNode);
        const isChildNode = treeSearch(currentActiveNode, action.activeItemId);
        console.log(isChildNode);
        if (isChildNode) {
          // item is a child of the last activeItemId
          return { ...state, activeItemIds: [ ...state.activeItemIds, action.activeItemId ]};
        } else {
          // only one item should be selected sense they arent children
          return { ...state, activeItemIds: [ action.activeItemId ]}
        }
      } else {
        return { ...state, activeItemIds: [ action.activeItemId ] };
      }

    // Remove the selected node from selected node array
    case MenuType.DELETE_NODE_FROM_SELECTED:
      const deleteNodeIndex = state.selectedNodes.indexOf(action.nodeId);
      if (deleteNodeIndex != -1) {
        const selNodes = [
          ...state.selectedNodes.slice(0, deleteNodeIndex),
          ...state.selectedNodes.slice(deleteNodeIndex + 1),
        ];
        return { ...state, selectedNodes: selNodes };
      } else {
        // was not found
        return state;
      }

    // Return previous state when the action is not relavent
    // to this reducer
    default:
      return state;
  }
};

export default MenuReducer;
