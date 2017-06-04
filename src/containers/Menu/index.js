import React, { Component } from 'react';
import { View, Text, ListView } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Section from '../../components/Section';
import OptionsBar from '../../components/OptionsBar';
import TreeListView from '../../components/TreeListView';
import { dataAdapter } from './utils';
import { getMenuNodes, addNodeToSelected, deleteNodeFromSelected } from './actions';

export class Menu extends Component {
  // wish i could get ride of having a custom constructor
  constructor(props) {
    super(props);
    // probably remove this later
    this.state = {
      selectedNodeChildren: [],
      // create expected nodes data structure
      selectedNodes: [{ title: 'No node selected', children: [] }],
    };
  }

  componentDidMount() {
    // hydrate the menu from static file
    this.props.getMenuNodes();
  }

  optionSelected(option) {
    // create space for appending children where root name equals option
    let children = [];
    this.props.nodes.forEach((node) => { if (node.title === option) return children.push(...node.children)});
    this.setState({
      selectedNodeChildren: children,
    });
  }

  nodePressed(node) {
    if (node.salesMode === 'NORMAL') {
      // if node is the same as one already selected dont add it
      // not sure if we should remove it from the menu all together...?
      const exists = this.props.selectedNodes.find((cn) => cn.id === node.id);
      if (!exists) {
        this.props.addNodeToSelected(node);
      }
    }
  }

  nodeRemove(node) {
    // find the objects index in the selectedNodes array and remove it immutiably
    const nodeIndex = this.props.selectedNodes.indexOf(node);
    this.props.deleteNodeFromSelected(nodeIndex);
  }

  render() {
    return (
      <View style={{ flex: 1, paddingTop: 11, flexWrap: 'wrap', flexDirection: 'row' }}>
        <Section>
          <TreeListView nodes={this.props.selectedNodes} onNodePress={this.nodeRemove.bind(this)} />
        </Section>
        <Section>
          <OptionsBar
            options={this.props.nodes.map((node) => node.title)}
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
};

Menu.defaultProps = {
  nodes: [],
  selectedNodes: [],
};

const mapStateToProps = (state) => {
  return {
    nodes: dataAdapter(state.menuItems),
    selectedNodes: state.selectedNodes,
  };
};

const mapDipsatchToProps = {
  getMenuNodes,
  addNodeToSelected,
  deleteNodeFromSelected,
};

export default connect(mapStateToProps, mapDipsatchToProps)(Menu);
