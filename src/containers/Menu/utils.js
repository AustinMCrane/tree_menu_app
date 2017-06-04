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
  if (!data) return [];
  return data.map((menuItem) => rawChildToChild(menuItem));
};


export const topLevelChildren = (data) => {
  let children = [];
  data.forEach((node) => {
    children = children.concat(node.children);
  });
  return children
};

// gets all nodes that are selected by node id
// i am assuming that we will probably only select 1 node
// deep so i will not have to make this a traversal to bottom
// nodes.
// nodes => button group top level nodes
// NEEDS SOME OPTIMIZATION!!!
export const selectedNodes = (nodeIDs, nodes) => {
  // get the top level children of the nodes
  let topChildren = topLevelChildren(nodes);
  // loop through nodeIds and find the corisponding nodes
  let selected = [];
  nodeIDs.forEach((id) => {
    topChildren.forEach((child) => {
      if (child.id === id) {
        selected.push(child);
      }
    });
  });
  return selected;
};
