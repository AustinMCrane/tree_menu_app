import React, { Component } from 'react';
import { View, Text, ListView } from 'react-native';
import styled from 'styled-components/native';

import Section from '../../components/Section';
import OptionsBar from '../../components/OptionsBar';
import TreeListView from '../../components/TreeListView';

const SelectedNode = styled.Text`
  fontSize: 30;
  textAlign: center;
`;

// helper for tree traversal to transform data
// structure for the child nodes
export const rawChildToChild = (rawChild) => {
  if (!rawChild) return {};

  // start new structure
  let newStruct = {
    title: rawChild.checkDesc,
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
  constructor(props) {
    super(props);

    // probably remove this later
    const rawNodes = require('../../datasets/games.json');
    this.state = {
      selectedNodeChildren: [],
      nodes: dataAdapter(rawNodes), 
      selectedNode: { title: 'No node selected', children: [] },
    };
  }
  optionSelected(option) {
    // create space for appending children where root name equals option
    let children = [];
    this.state.nodes.forEach((node) => { if (node.title === option) return children.push(...node.children)});
    console.log(children);
    this.setState({
      selectedNodeChildren: children,
    });
  }

  nodePressed(node) {
    console.log(node);
    this.setState({
      selectedNode: node,
    });
  }
  render() {
    return (
      <View style={{ flex: 1, paddingTop: 11, flexWrap: 'wrap', flexDirection: 'row' }}>
        <Section>
          <SelectedNode>{this.state.selectedNode.title}</SelectedNode>
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
