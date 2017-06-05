import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Text, View } from 'react-native';
import styled from 'styled-components/native';

import { CardSection, Card } from '../common/';
import NodeCell from './NodeCell';

// the placeholder whne there are no children
const PlaceHolder = styled(Text)`
  flex: 1;
  fontSize: 50;
  flexDirection: row;
  textAlign: center;
  paddingTop: 20;
`;

const Footer = styled(View)`
  marginTop: 10;
  borderTopWidth: 4;
  borderColor: #eee;
`;

// A tree data structure visualization component
class TreeListView extends Component {

  nodeClicked(node) {
    this.props.onNodePress(node);
  }

  // recursive tree structure rendering
  renderNode(node) {
    // the case where children key is undefined
    if (node.children === undefined || !node.children.length) {
      return (
        <NodeCell 
          key={`node-${node.id}`}
          node={node}
          isExpanded={this.props.activeItemIds.indexOf(node.id) != -1}
          nodeClicked={this.nodeClicked.bind(this, node)} 
        />
      );
    }

    // recursively render children in parent node
    return (
      <View>
        <NodeCell
          key={`node-${node.id}`}
          node={node}
          isExpanded={this.props.activeItemIds.indexOf(node.id) != -1}
          nodeClicked={this.nodeClicked.bind(this, node)}
        >
          {node.children.map((child) => this.renderNode(child))}
        </NodeCell>
      </View>
    );
  }

  render() {
    const nodes = this.props.nodes.map((node) => this.renderNode(node));
    return (
      <ScrollView>
        {nodes.length > 0 && nodes}
        {this.props.children &&
          <Footer>
            {this.props.children}
          </Footer>
        }
      </ScrollView>
    );
  }
}

TreeListView.propTypes = {
  nodes: PropTypes.array,
  activeItemIds: PropTypes.array,
};

TreeListView.defaultProps = {
  nodes: [],
  activeItemIds: [],
};

export default TreeListView;
