import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { CardSection, Card } from '../../common';

export const ChildrenCard = ({ children }) => {
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

const NodeCell = ({ node, nodeClicked, children }) => {
  return (
    <View>
      <Card onPress={nodeClicked.bind(node)}>
        <CardSection>
          <Text>
            {node.title}
          </Text>
        </CardSection>
      </Card>
      {children && <ChildrenCard>{children}</ChildrenCard>}
    </View>
  );
};

NodeCell.propTypes = {
  node: PropTypes.shape({
    title: PropTypes.string,
  }),
  nodeClicked: PropTypes.func,
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node
  ]),
};

NodeCell.defaultProps = {
  node: { title: 'Default Node' },
  nodeClicked: (node) => console.log(node)
};

export default NodeCell;
