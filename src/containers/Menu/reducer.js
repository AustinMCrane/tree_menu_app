import * as MenuType from './types';


const initialState = {
  selectedNodes: [],
  menuItems: [],
  currentMenuGroup: 0,
};

const MenuReducer = (state = initialState, action) => {
  const type = action.type;
  switch (type) {

    case MenuType.MENU_GROUP_SELECTED:
      return { ...state, currentMenuGroup: action.menuGroup };

    // hydrate the menuItems from static file
    case MenuType.GET_MENU_NODES:
      return { ...state, menuItems: require('../../datasets/games.json') };

    case MenuType.ADD_NODE_TO_SELECTED:
      // add the node
      const newSelectedNodes = [ ...state.selectedNodes, action.node ];
      return { ...state, selectedNodes: newSelectedNodes };

    case MenuType.DELETE_NODE_FROM_SELECTED:
      const selNodes = [
        ...state.selectedNodes.slice(0, action.nodeIndex),
        ...state.selectedNodes.slice(action.nodeIndex + 1),
      ];
      return { ...state, selectedNodes: selNodes };

    default:
      return state;
  }
};

export default MenuReducer;
