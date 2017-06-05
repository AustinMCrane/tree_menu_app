import React, { Component } from 'react';
import { View, Text, ListView } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Section from '../../components/Section';
import OptionsBar from '../../components/OptionsBar';
import TreeListView from '../../components/TreeListView';
import { Card, CardSection } from '../../components/common';
import { dataAdapter, selectedNodes } from './utils';
import { 
  getMenuNodes,
  addNodeToSelected,
  deleteNodeFromSelected,
  selectMenuGroup,
  changeActiveItem,
} from './actions';

export class Menu extends Component {
  componentDidMount() {
    // hydrate the menu from static file
    this.props.getMenuNodes();
  }

  optionSelected(option) {
    const topLevelNode = this.props.nodes.find((node) => node.title == option);
    this.props.selectMenuGroup(this.props.nodes.indexOf(topLevelNode));
  }

  nodePressed(node) {
    if (node.salesMode === 'NORMAL' || node.salesMode === 'MODIFIER_GROUP') {
      this.props.changeActiveItem(node.id);
      // if node is the same as one already selected dont add it
      // not sure if we should remove it from the menu all together...?
      const exists = this.props.selectedNodes.find((cn) => cn.id === node.id);
      if (!exists) {
        if (node.salesMode === 'MODIFIER_GROUP') {
          // add all of its children too
          this.props.addNodeToSelected(node.id);
          node.children.forEach((child) => this.props.addNodeToSelected(child.id));
        } else {
          this.props.addNodeToSelected(node.id);
        }
      }
    }
  }

  nodeRemove(node) {
    this.props.deleteNodeFromSelected(node.id);
  }

  render() {
    return (
      <View style={{ flex: 1, paddingTop: 30, flexWrap: 'wrap', flexDirection: 'row' }}>
        <Section>
          <TreeListView nodes={this.props.selectedNodes} onNodePress={this.nodeRemove.bind(this)} >
            <Card>
              <CardSection>
                <Text>Total: {this.props.totalCost}</Text>
              </CardSection>
            </Card>
          </TreeListView>
        </Section>
        <Section>
          <OptionsBar
            options={this.props.nodes.map((node) => node.title)}
            onOptionSelect={this.optionSelected.bind(this)}
            selectedOption={this.props.currentMenuGroup}
          />
          <Section>
            <TreeListView
              activeItemIds={this.props.activeItemIds}
              nodes={this.props.currentGroupsChildren}
              onNodePress={this.nodePressed.bind(this)}
            />
          </Section>
        </Section>
      </View>
    );
  }
};

Menu.propTypes = {
  nodes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      salesmode: PropTypes.string,
      modifiertype: PropTypes.string,
    }),
  ),
  selectedNodes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      salesmode: PropTypes.string,
      modifiertype: PropTypes.string,
    }),
  ),
  currentGroupsChildren: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      salesmode: PropTypes.string,
      modifiertype: PropTypes.string,
    }),
  ),
  getMenuNodes: PropTypes.func,
  addNodeToSelected: PropTypes.func,
  deleteNodeFromSelected: PropTypes.func,
};

// default properties, used when props arent defined
Menu.defaultProps = {
  nodes: [],
  selectedNodes: [],
  getMenuNodes: () => console.log('getMenuNodes is default'),
  addNodeToSelected: () => console.log('addNodeToSelected is default'),
  deleteNodeFromSelected: () => console.log('deleteNodeFromSelected is default'),
  activeItemIds: [],
};

// export for testing
// Optimization needed....
export const mapStateToProps = (state) => {
  const nodes = state.menuItems;
  const currentGroup = nodes[state.currentMenuGroup]
  const selected = selectedNodes(state.selectedNodes, nodes);
  let totalCost = 0.0;
  // add them together for total cost
  selected.forEach((node) => { totalCost = Number(totalCost) + Number(node.cost) });
  return {
    nodes: nodes,
    activeItemIds: state.activeItemIds,
    currentMenuGroup: state.currentMenuGroup,
    selectedNodes: selected,
    currentGroupsChildren: currentGroup ? currentGroup.children : [],
    totalCost,
  };
};

const mapDipsatchToProps = {
  getMenuNodes,
  addNodeToSelected,
  deleteNodeFromSelected,
  selectMenuGroup,
  changeActiveItem,
};

export default connect(mapStateToProps, mapDipsatchToProps)(Menu);
