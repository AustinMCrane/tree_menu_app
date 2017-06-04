import * as MenuType from './types';

// Add selected node to the left
export const addNodeToSelected = (node) => {
  return {
    type: MenuType.ADD_NODE_TO_SELECTED,
    node,
  };
};

// Remove selected node from the left
export const deleteNodeFromSelected = (nodeIndex) => {
  return {
    type: MenuType.DELETE_NODE_FROM_SELECTED,
    nodeIndex,
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
