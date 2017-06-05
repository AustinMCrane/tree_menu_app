import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, LayoutAnimation } from 'react-native';
import { CardSection, Card } from '../../common';

// the containing view of a nodes children
export const ChildrenCard = ({ children }) => {
  LayoutAnimation.spring();
  return (
    <View style={{ paddingLeft: 18 }}>
      {children}
    </View>
  );
};

ChildrenCard.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node
  ]),
};

ChildrenCard.defaultProps = {
  children: [],
};

// used to render a nodes cell and its children
// nodeClicked is a delegate function that is called when the card is clicked
export class NodeCell extends React.Component {
  render() {
    const { node, nodeClicked, children, isExpanded } = this.props;
    return (
      <View key={`child-${node.id}`}>
        <Card onPress={nodeClicked.bind(node)}>
          <CardSection>
            <Text>
              {node.title}
            </Text>
          </CardSection>
        </Card>
        {isExpanded && children && <ChildrenCard>{children}</ChildrenCard>}
      </View>
    );
  }
}

NodeCell.propTypes = {
  node: PropTypes.shape({
    title: PropTypes.string,
    modifierType: PropTypes.string,
    salesMode: PropTypes.string,
  }),
  nodeClicked: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(React.PropTypes.node),
    PropTypes.node
  ]),
  isExpanded: PropTypes.bool
};

NodeCell.defaultProps = {
  node: { title: 'Default Node', modifierType: 'NONE', id: -1, salesMode: 'NONE' },
  nodeClicked: (node) => console.log(node),
  isExpanded: false,
};

export default NodeCell;
