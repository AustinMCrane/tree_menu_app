// took this project head on with some tree traversals to give
// it a robust dynamic functionality

// helper for tree traversal to transform data
// structure for the child nodes
export const rawChildToChild = (rawChild) => {
  // if the data is completely messed up return
  if (!rawChild) return {};

  // start new structure
  let newStruct = {
    id: rawChild.id,
    title: rawChild.checkDesc,
    salesMode: rawChild.salesMode,
    modifierType: rawChild.modifierType,
  };

  // deepest child
  if (rawChild.childMenuItems === undefined) return newStruct;

  // children exist or is empty
  // recurse and go
  newStruct.children = rawChild.childMenuItems.map((child) => rawChildToChild(child));
  // return the new struct with children restrcutured
  return newStruct;
};

// maps the data structure to the components
// expectations
export const dataAdapter = (data) => {
  // if data not yet populated return empty array
  if (!data.menuItems) return [];
  return data.menuItems.map((menuItem) => rawChildToChild(menuItem));
};

