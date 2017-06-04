import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Text, View } from 'react-native';
import styled from 'styled-components/native';

import { CardSection, Card } from '../common/';
import NodeCell from './NodeCell';

const PlaceHolder = styled(Text)`
  flex: 1;
  fontSize: 50;
  flexDirection: row;
  textAlign: center;
  paddingTop: 20;
`;

class TreeListView extends Component {

  nodeClicked(node) {
    this.props.onNodePress(node);
  }

  // recursive tree structure rendering
  renderNode(node) {
    // the case where children key is undefined
    if (node.children === undefined || !node.children.length) {
      return (
        <NodeCell key={`node-${node.id}`} node={node} nodeClicked={this.nodeClicked.bind(this, node)} />
      );
    }

    // recursively render children in parent node
    return (
      <View>
        <NodeCell key={`node-${node.id}`} node={node} nodeClicked={this.nodeClicked.bind(this, node)}>
          {node.children.map((child) => this.renderNode(child))}
        </NodeCell>
      </View>
    );
  }

  render() {
    const nodes = this.props.nodes.map((node) => this.renderNode(node));
    return (
      <ScrollView>
        {nodes.length ? nodes : <PlaceHolder>Select Options</PlaceHolder>}
      </ScrollView>
    );
  }
}

TreeListView.propTypes = {
  nodes: PropTypes.array,
};

TreeListView.defaultProps = {
  nodes: [],
};

export default TreeListView;
