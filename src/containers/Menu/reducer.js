import * as MenuType from './types';


// initilal state of the application
export const initialState = {
  // array of node ids
  selectedNodes: [],
  // tree stucture for the menu items
  menuItems: [],
  // top root group item by menuItems array index
  // currentMenuGroup: 0,
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
      return { ...state, menuItems: staticFile.menuItems };

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
