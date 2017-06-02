import React, { Component } from 'react';
import { View, Text, ListView } from 'react-native';
import styled from 'styled-components/native';

import Section from '../../components/Section';
import OptionsBar from '../../components/OptionsBar';
import TreeListView from '../../components/TreeListView';

// just styling for text on left
const SelectedNode = styled.Text`
  fontSize: 30;
  textAlign: center;
`;

// took this project head on with some tree traversals to give
// it a robust dynamic functionality

// helper for tree traversal to transform data
// structure for the child nodes
export const rawChildToChild = (rawChild) => {
  // if the data is completely messed up return
  if (!rawChild) return {};

  // start new structure
  let newStruct = {
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
  return data.menuItems.map((menuItem) => rawChildToChild(menuItem));
};

class Menu extends Component {
  // wish i could get ride of having a custom constructor
  constructor(props) {
    super(props);

    // probably remove this later
    const rawNodes = require('../../datasets/games.json');
    this.state = {
      selectedNodeChildren: [],
      // create expected nodes data structure
      nodes: dataAdapter(rawNodes), 
      selectedNodes: [{ title: 'No node selected', children: [] }],
    };
  }

  optionSelected(option) {
    // create space for appending children where root name equals option
    let children = [];
    this.state.nodes.forEach((node) => { if (node.title === option) return children.push(...node.children)});
    this.setState({
      selectedNodeChildren: children,
    });
  }

  // WIP: still need to implement business logic
  nodePressed(node) {
    const newSelectedNodes = [ ...this.state.selectedNodes, node ];
    this.setState({
      selectedNodes: newSelectedNodes,
    });
  }

  nodeRemove(node) {
    const nodeIndex = this.state.selectedNodes.map((n, i) => { if (n.title === node.title) return i })[1];
    const newSelectedNodes = [
      ...this.state.selectedNodes.slice(0, nodeIndex),
      ...this.state.selectedNodes.slice(nodeIndex + 1),
    ]
    console.log(newSelectedNodes);
    console.log(nodeIndex);
    this.setState({
      selectedNodes: newSelectedNodes,
    });
  }

  render() {
    return (
      <View style={{ flex: 1, paddingTop: 11, flexWrap: 'wrap', flexDirection: 'row' }}>
        <Section>
          <TreeListView nodes={this.state.selectedNodes} onNodePress={this.nodeRemove.bind(this)} />
        </Section>
        <Section>
          <OptionsBar
            options={this.state.nodes.map((node) => node.title)}
            onOptionSelect={this.optionSelected.bind(this)}
          />
          <Section>
            <TreeListView nodes={this.state.selectedNodeChildren} onNodePress={this.nodePressed.bind(this)}/>
          </Section>
        </Section>
      </View>
    );
  }
};

export default Menu;
