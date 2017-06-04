import * as MenuType from './types';

// Add selected node to the left
export const addNodeToSelected = (nodeId) => {
  return {
    type: MenuType.ADD_NODE_TO_SELECTED,
    nodeId,
  };
};

// Remove selected node from the left
export const deleteNodeFromSelected = (nodeId) => {
  return {
    type: MenuType.DELETE_NODE_FROM_SELECTED,
    nodeId,
  };
};

// For now this just hydrates the nodes
// from the state games.json file
export const getMenuNodes = () => {
  // could add a rest api call here
  // also could add search
  return {
    type: MenuType.GET_MENU_NODES,
  };
};

export const selectMenuGroup = (groupIndex) => {
  return {
    type: MenuType.MENU_GROUP_SELECTED,
    groupIndex,
  };
};
